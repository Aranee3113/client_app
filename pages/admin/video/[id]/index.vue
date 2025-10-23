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
  existingVideos: [], // { post_image_id, post_image_path }
  keep_image_ids: [], 
  videos: [], // { file, url }
});

// ---- helpers ----
const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

const getMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const normalizeVideos = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const handleFileChange = (event) => {
  const files = Array.from(event.target.files || []).filter(file =>
    file.type.startsWith("video/")
  );

  form.value.videos.forEach((i) => URL.revokeObjectURL(i.url));

  form.value.videos = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));
};

onBeforeUnmount(() => {
  form.value.videos.forEach((i) => URL.revokeObjectURL(i.url));
});

// โหลดข้อมูลโพสต์
onMounted(async () => {
  const token = useCookie("token").value;
  if (token) {
    try {
      const decoded = decodeJwt(token);
      form.value.user_id = decoded.user_id; 
    } catch(e) {
      console.error("Invalid token:", e);
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
        form.value.user_id = data.user_id || form.value.user_id; 

        const videos = normalizeVideos(data.images); 
        form.value.existingVideos = videos;
        form.value.keep_image_ids = videos.map((video) => video.post_image_id);
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
  loading.value = true; 

  const payload = new FormData();
  payload.append("post_name", form.value.post_name);
  payload.append("post_description", form.value.post_description);
  
  try {
    if (isEditMode) {
      // --- EDIT MODE ---
      form.value.videos.forEach((video) => {
        payload.append("post_images", video.file);
      });

      form.value.keep_image_ids.forEach((id) => {
        payload.append("keep_image_ids", String(id));
      });

      await $axios.put(`/post/${id}`, payload);
      success.value = "อัปเดตโพสต์สำเร็จ";
    } else {
      // --- ADD MODE ---
      form.value.videos.forEach((video) => {
        payload.append("video_files", video.file);
      });

      await $axios.post(`/post/video`, payload);
      success.value = "เพิ่มโพสต์ใหม่สำเร็จ";
    }

    setTimeout(() => router.push("/admin/video"), 800); 
  } catch (err) {
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  } finally {
    loading.value = false; 
  }
};
</script>

<template>
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      
      <h1 class="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขวิดีโอ" : "เพิ่มวิดีโอ" }}
      </h1>

      <div v-if="loading" class="text-center p-4">
        <p>Loading...</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-5 text-lg">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อวิดีโอ</label>
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียดวิดีโอ</label>
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <!-- วิดีโอเดิม -->
        <div v-if="form.existingVideos.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">วิดีโอเดิม</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="video in form.existingVideos"
              :key="video.post_image_id"
              class="relative border rounded overflow-hidden shadow-sm"
            >
              <video
                :src="getMediaUrl(video.post_image_path)"
                class="w-full h-32 object-cover bg-black"
                controls
                muted
                loop
                playsinline
              ></video>
              
              <label class="absolute top-1 right-1 bg-white/80 backdrop-blur-sm text-xs p-1 rounded shadow cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.keep_image_ids"
                  :value="video.post_image_id"
                />
                เก็บไว้
              </label>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">* เอาเครื่องหมายถูกออก = ลบวิดีโอนั้นเมื่อบันทึก</p>
        </div>

        <!-- วิดีโอใหม่ -->
        <div v-if="form.videos.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">วิดีโอใหม่</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div 
              v-for="(video, index) in form.videos" 
              :key="index" 
              class="border rounded overflow-hidden shadow-sm"
            >
              <video 
                :src="video.url" 
                class="w-full h-32 object-cover bg-black" 
                controls
                muted
                loop
                playsinline
              ></video>
            </div>
          </div>
        </div>

        <!-- อัปโหลด -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ isEditMode ? "อัปโหลดวิดีโอ (เพื่อแทนที่ทั้งหมด)" : "อัปโหลดวิดีโอ" }}
          </label>
          <input
            type="file"
            multiple
            accept="video/*" 
            @change="handleFileChange"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
          />
           <p v-if="isEditMode && form.videos.length" class="text-xs text-red-500 mt-1">
             * การอัปโหลดวิดีโอใหม่จะลบวิดีโอเก่าที่ "เก็บไว้" ทั้งหมด
           </p>
           <p v-else-if="isEditMode" class="text-xs text-gray-500 mt-1">
             * หากไม่ต้องการเปลี่ยนวิดีโอ ให้ปล่อยว่างไว้ และเลือกเฉพาะวิดีโอที่ "เก็บไว้" ด้านบน
           </p>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:scale-100"
            :disabled="loading"
          >
            <span v-if="loading">กำลังบันทึก...</span>
            <span v-else>{{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มวิดีโอ" }}</span>
          </button>

          <NuxtLink
            to="/admin/video"
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
