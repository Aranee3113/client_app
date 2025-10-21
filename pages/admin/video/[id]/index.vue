<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useCookie } from "#app"; // ไม่จำเป็นถ้า $axios ส่ง token ให้อัตโนมัติ
// import { decodeJwt } from "jose"; // ไม่จำเป็น เพราะ backend จัดการเอง

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = id !== "add";
const loading = ref(false);
const error = ref("");
const success = ref("");

// ------- ฟอร์มวิดีโอ -------
const form = ref({
  post_name: "",
  post_description: "",
  existingVideos: [], // path วิดีโอเดิม (ถ้ามี) [{ post_image_id, post_image_path }]
  newVideoPreviewUrls: [], // objectURLs สำหรับพรีวิววิดีโอใหม่
});
const newVideoFiles = ref([]); // Array of File (วิดีโอใหม่)

// ---- helpers ----
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

// เปลี่ยนชื่อเป็น getMediaUrl เพื่อความชัดเจน
const getMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// (ลบ loadUserFromToken และ loadPosts เพราะไม่จำเป็นสำหรับฟอร์มนี้)

// โหลดโพสต์วิดีโอเดิมตอนแก้ไข
const loadVideoPost = async () => {
  // สมมติว่ามี endpoint สำหรับดึง post 1 รายการ
  const res = await $axios.get(`/post/${id}`); 
  const postData = res.data?.data;

  if (!postData) {
    throw new Error("ไม่พบโพสต์วิดีโอที่ต้องการแก้ไข");
  }
  
  form.value.post_name = postData.post_name || "";
  form.value.post_description = postData.post_description || "";
  // 'videos' คือ array ที่ backend คืนค่ามาใน 'createvideo'
  form.value.existingVideos = postData.videos || []; 
};

// เลือกวิดีโอใหม่ (รองรับหลายไฟล์)
const handleFileChange = (e) => {
  // 1. clear พรีวิวเดิมทั้งหมด
  if (form.value.newVideoPreviewUrls.length > 0) {
    form.value.newVideoPreviewUrls.forEach(URL.revokeObjectURL);
    form.value.newVideoPreviewUrls = [];
  }
  newVideoFiles.value = [];

  const files = e.target.files;
  if (!files) return;

  // 2. วนลูปไฟล์ใหม่
  for (const file of files) {
    // 3. กรองเฉพาะ MP4 (ตามที่ backend บังคับ)
    if (file.type === "video/mp4") { 
      newVideoFiles.value.push(file);
      form.value.newVideoPreviewUrls.push(URL.createObjectURL(file));
    } else {
      console.warn(`ไฟล์ ${file.name} ไม่ใช่ .mp4 และจะถูกข้าม`);
    }
  }
};

onBeforeUnmount(() => {
  // เคลียร์ object URL ทั้งหมด
  if (form.value.newVideoPreviewUrls.length > 0) {
    form.value.newVideoPreviewUrls.forEach(URL.revokeObjectURL);
  }
});

// ส่งฟอร์ม
const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    const fd = new FormData();
    // 1. เพิ่ม fields ที่ backend ต้องการ (จาก createvideo)
    fd.append("post_name", form.value.post_name);
    fd.append("post_description", form.value.post_description);

    // 2. เพิ่มไฟล์วิดีโอทั้งหมด (ใช้ key "video_files" ตาม backend)
    if (newVideoFiles.value.length > 0) {
      for (const file of newVideoFiles.value) {
        fd.append("video_files", file);
      }
    }

    if (isEditMode) {
      // 3. (Edit) สมมติว่าใช้ PUT /post/:id สำหรับอัปเดต
      // หมายเหตุ: backend `createvideo` ของคุณคือการ 'สร้าง'
      // คุณต้องสร้าง endpoint 'updatevideo' ที่รับ PUT/POST และจัดการไฟล์เก่า/ใหม่ด้วย
      await $axios.put(`/post/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "อัปเดตวิดีโอสำเร็จ";
    } else {
      // 4. (Add) ใช้ POST /post/video (ตามที่เราคาดเดาจากชื่อ createvideo)
      await $axios.post("/post/video", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "เพิ่มวิดีโอสำเร็จ";
    }

    setTimeout(() => router.push("/admin/video"), 800); // 5. เปลี่ยน path ย้อนกลับ
  } catch (e) {
    console.error(e);
    error.value = e?.response?.data?.message || "เกิดข้อผิดพลาด";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (isEditMode) {
    loading.value = true;
    try {
      await loadVideoPost();
    } catch (e) {
      error.value = e?.message || "โหลดข้อมูลวิดีโอล้มเหลว";
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขวิดีโอ" : "เพิ่มวิดีโอ" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5 text-lg">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อเรื่องวิดีโอ</label>
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">คำอธิบาย</label>
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div v-if="isEditMode && form.existingVideos.length > 0" class="mt-2">
          <label class="block mb-1 text-sm font-medium text-gray-700">วิดีโอเดิม</label>
          <div class="flex flex-wrap gap-2">
            <video
              v-for="video in form.existingVideos"
              :key="video.post_image_id"
              :src="getMediaUrl(video.post_image_path)"
              class="w-32 h-24 object-cover rounded border bg-black"
              controls
              preload="metadata"
              muted
              playsinline
            ></video>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            * ถ้าอัปโหลดวิดีโอใหม่ ระบบจะทับวิดีโอเดิมทั้งหมด (ขึ้นอยู่กับการออกแบบ backend)
          </p>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            อัปโหลดวิดีโอ (MP4 เท่านั้น)
          </label>
          <input
            type="file"
            accept="video/mp4"
            @change="handleFileChange"
            multiple 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none bg-white"
          />

          <div v-if="form.newVideoPreviewUrls.length > 0" class="mt-3">
            <label class="block text-xs text-gray-600 mb-1">
              วิดีโอใหม่ที่จะอัปโหลด ({{ form.newVideoPreviewUrls.length }} ไฟล์)
            </label>
            <div class="flex flex-wrap gap-2">
              <video
                v-for="(url, index) in form.newVideoPreviewUrls"
                :key="index"
                :src="url"
                class="w-32 h-24 object-cover rounded border bg-black"
                controls
                preload="metadata"
                muted
                playsinline
              ></video>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md disabled:opacity-60"
            :disabled="loading"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มวิดีโอ" }}
          </button>

          <NuxtLink
            to="/admin/video"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>

        <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center text-sm mt-4">{{ success }}</p>
      </form>
    </div>
  </div>
</template>