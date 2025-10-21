<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const videos = ref([]); // 1. เปลี่ยนชื่อ state เป็น videos
const loading = ref(true);
const error = ref("");

// ---- helpers ----
// (ใช้ helper เดิมได้เลย แต่เปลี่ยนชื่อให้สื่อความหมายมากขึ้น)
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getMediaUrl = (path) => {
  if (!path || typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// 2. สร้างฟังก์ชันสำหรับดึงข้อมูลวิดีโอ
const fetchVideos = async () => {
  loading.value = true;
  error.value = "";
  try {
    // สมมติว่า endpoint สำหรับดึงวิดีโอคือ /post/video
    const res = await $axios.get("/post/video"); 
    videos.value = Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (e) {
    console.error("โหลดวิดีโอล้มเหลว", e);
    error.value = "ไม่สามารถโหลดวิดีโอได้";
  } finally {
    loading.value = false;
  }
};

// 3. เรียกใช้ fetchVideos เมื่อ component ถูก mount
onMounted(fetchVideos);
</script>

<template>
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">จัดการวิดีโอ</h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/video/add" class="inline-flex items-center px-5 py-2 bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มวิดีโอ
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
        <table class="min-w-full text-left text-lg">
          <thead class="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700 ">
            <tr>
              <th class="py-3 px-4 font-semibold text-center">ID</th>
              <th class="py-3 px-4 font-semibold">ชื่อเรื่อง</th>
              <th class="py-3 px-4 font-semibold">คำอธิบาย</th>
              <th class="py-3 px-4 font-semibold text-center">วิดีโอ</th>
              <th class="py-3 px-4 font-semibold">เวลา</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="py-6 text-center text-gray-500">กำลังโหลดข้อมูล...</td> </tr>

            <tr v-else-if="error">
              <td colspan="6" class="py-6 text-center text-red-500">{{ error }}</td> </tr>

            <tr
              v-else
              v-for="v in videos"
              :key="v.post_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ v.post_id }}</td>

              <td class="py-3 px-4">
                <div class="font-medium">{{ v.post_name || 'ไม่มีชื่อเรื่อง' }}</div>
              </td>

              <td class="py-3 px-4 max-w-[22rem]">
                <div class="line-clamp-2 text-gray-700">
                  {{ v.post_description }}
                </div>
              </td>

              <td class="py-3 px-4">
                <div class="flex justify-center">
                  <video
                    v-if="v.videos && v.videos.length > 0 && v.videos[0].post_image_path"
                    :src="getMediaUrl(v.videos[0].post_image_path)"
                    alt="video preview"
                    class="w-24 h-16 object-cover rounded-lg shadow-md border bg-black"
                    controls
                    preload="metadata"
                    muted
                    playsinline
                  ></video>
                  <span v-else class="text-gray-400">ไม่มีวิดีโอ</span>
                </div>
              </td>

              <td class="py-3 px-4 whitespace-nowrap">
                {{ new Date(v.post_timestamp).toLocaleString() }}
              </td>

              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/video" :params="v.post_id"
                  />

                  <CommonButtonDeletebutton
                    type="video" path="post" :params="v.post_id"
                    @deleted="fetchVideos" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && !error && videos.length === 0">
              <td colspan="6" class="text-center text-gray-400 py-6">ยังไม่มีวิดีโอในระบบ</td> </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>