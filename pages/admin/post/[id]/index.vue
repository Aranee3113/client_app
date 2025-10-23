<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = id !== "add";
const loading = ref(false);
const error = ref("");
const success = ref("");

const form = ref({
  post_name: "",
  post_description: "",
  user_id: "",
  existingImages: [], // { post_image_id, post_image_path, post_image_description }
  keep_image_ids: [], // [id1, id2, ...]
  images: [], // { file, url, description } - สำหรับ preview รูปใหม่
});
// ❌ ลบ const newImages = ref([]); (ไม่จำเป็นแล้ว เพราะข้อมูล file อยู่ใน form.value.images)

// ---- helpers ----
const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const normalizeImages = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// เลือกรูปใหม่
const handleFileChange = (event) => {
  const files = Array.from(event.target.files || []);
  // clear previews เดิม
  form.value.images.forEach((i) => URL.revokeObjectURL(i.url));
  
  // ✅ สร้าง object ที่มี file, url, และ description
  form.value.images = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
    description: "", // ✅ เพิ่ม field สำหรับคำอธิบาย
  }));
};

onBeforeUnmount(() => {
  form.value.images.forEach((i) => URL.revokeObjectURL(i.url));
});

// โหลดข้อมูลโพสต์
onMounted(async () => {
  const token = useCookie("token").value;
  if (token) {
    try {
      const decoded = decodeJwt(token);
      form.value.user_id = decoded.user_id; // ✅ แก้ไข user_id เป็น userId
    } catch(e) {
      console.error("Invalid token:", e);
      // อาจจะต้อง redirect หรือแสดงข้อผิดพลาด
    }
  }

  if (isEditMode) {
    loading.value = true;
    try {
      const res = await $axios.get(`/post/${id}`);
      if (res.status === 200) {
        const data = res.data?.data || {};
        form.value.post_name = data.post_name || "";
        form.value.post_description = data.post_description || "";
        form.value.user_id = data.user_id || form.value.user_id; // ✅ ใช้ user_id จาก data ถ้ามี

        const imgs = normalizeImages(data.images);
        
        // ✅ map เพื่อให้แน่ใจว่า description เป็น string (สำหรับ v-model)
        form.value.existingImages = imgs.map(img => ({
          ...img,
          post_image_description: img.post_image_description || ''
        }));
        
        form.value.keep_image_ids = imgs.map((img) => img.post_image_id);
      }
    } catch (e) {
      error.value = "โหลดข้อมูลล้มเหลว";
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true; // ✅ เพิ่ม loading state

  const payload = new FormData();
  payload.append("post_name", form.value.post_name);
  payload.append("post_description", form.value.post_description);
  
  // ✅ user_id อาจจะไม่ได้ set ถ้าเป็นโหมด add แล้ว token decode ไม่ได้
  // ✅ backend (createpost) จะดึง user_id จาก token อยู่แล้ว เลยไม่จำเป็นต้องส่ง
  // payload.append("user_id", String(form.value.user_id)); // (เอาออกก็ได้)


  // ✅ แนบไฟล์ใหม่ + คำอธิบายใหม่ (สำหรับทั้ง create และ edit)
  form.value.images.forEach((img) => {
    payload.append("post_images", img.file);
    payload.append("post_image_descriptions", img.description || "");
  });

  try {
    if (isEditMode) {
      // ✅ แนบ ID รูปเก่าที่เก็บ + คำอธิบายรูปเก่า (edit only)
      form.value.keep_image_ids.forEach((id) => {
        payload.append("keep_image_ids", String(id));
        
        // หาคำอธิบายที่ตรงกับ ID นั้น
        const img = form.value.existingImages.find(i => i.post_image_id === id);
        payload.append("update_descriptions", img?.post_image_description || "");
      });
      
      await $axios.put(`/post/${id}`, payload);
      success.value = "อัปเดตโพสต์สำเร็จ";
    } else {
      await $axios.post(`/post`, payload);
      success.value = "เพิ่มโพสต์ใหม่สำเร็จ";
    }
    setTimeout(() => router.push("/admin/post"), 800);
  } catch (err) {
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  } finally {
    loading.value = false; // ✅ สิ้นสุด loading
  }
};
</script>

<template>
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขโพสต์" : "เพิ่มโพสต์" }}
      </h1>

      <div v-if="loading" class="text-center p-4">
        <p>Loading...</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-5 text-lg">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อโพสต์</label>
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียดโพสต์</label>
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div v-if="form.existingImages.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพเดิม</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="img in form.existingImages"
              :key="img.post_image_id"
              class="relative border rounded overflow-hidden shadow-sm"
            >
              <img
                :src="getImageUrl(img.post_image_path)"
                class="w-full h-32 object-cover"
                alt="post old image"
                loading="lazy"
              />
              <label class="absolute top-1 right-1 bg-white/80 backdrop-blur-sm text-xs p-1 rounded shadow cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.keep_image_ids"
                  :value="img.post_image_id"
                />
                เก็บไว้
              </label>

              <input
                type="text"
                v-model="img.post_image_description"
                placeholder="คำอธิบายรูป..."
                class="w-full text-xs p-2 border-t bg-white focus:outline-none focus:ring-1 focus:ring-orange-300"
                :disabled="!form.keep_image_ids.includes(img.post_image_id)"
                :class="{ 'bg-gray-100 text-gray-400': !form.keep_image_ids.includes(img.post_image_id) }"
              />
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">* เอาเครื่องหมายถูกออก = ลบรูปนั้นเมื่อบันทึก</p>
          <p class="text-xs text-gray-500 mt-1">* แก้ไขคำอธิบายได้เฉพาะรูปที่ "เก็บไว้"</p>
        </div>

        <div v-if="form.images.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพใหม่</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div 
              v-for="(img, index) in form.images" 
              :key="index" 
              class="border rounded overflow-hidden shadow-sm"
            >
              <img :src="img.url" class="w-full h-32 object-cover" alt="post new image preview" />
              <input
                type="text"
                v-model="img.description"
                placeholder="คำอธิบายรูป..."
                class="w-full text-xs p-2 border-t bg-white focus:outline-none focus:ring-1 focus:ring-orange-300"
              />
            </div>

          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ isEditMode ? "อัปโหลดรูป (เพื่อแทนที่ทั้งหมด)" : "อัปโหลดรูป" }}
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
          />
           <p v-if="isEditMode && form.images.length" class="text-xs text-red-500 mt-1">
             * การอัปโหลดรูปใหม่จะลบรูปเก่าที่ "เก็บไว้" ทั้งหมด (ตาม logic backend `updatepostById`)
           </p>
           <p v-else-if="isEditMode" class="text-xs text-gray-500 mt-1">
             * หากไม่ต้องการเปลี่ยนรูป ให้ปล่อยว่างไว้ และเลือกเฉพาะรูปที่ "เก็บไว้" ด้านบน
           </p>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:scale-100"
            :disabled="loading"
          >
            <span v-if="loading">กำลังบันทึก...</span>
            <span v-else>{{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มโพสต์" }}</span>
          </button>

          <NuxtLink
            to="/admin/post"
            class="px-6 py-2 rounded-lg text-gray-700 font-medium bg-white hover:bg-gray-100 transition shadow-md border"
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