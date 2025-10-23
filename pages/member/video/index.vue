<script setup>
import { ref, onMounted } from "vue";
// ไม่ต้องใช้ useRoute เพราะเราจะแสดงผลทั้งหมด
// import { useRoute } from "vue-router"; 

definePageMeta({
  layout: "member",
});

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

// เปลี่ยนจาก post (Object) เป็น posts (Array)
const posts = ref([]); 
const loading = ref(true);
const error = ref("");

// ---- helpers ----
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

// ---- data fetching ----
// เปลี่ยนชื่อฟังก์ชันเป็น fetchVideoPosts
const fetchVideoPosts = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    // สมมติว่า endpoint ดึงวิดีโอทั้งหมดคือ /post/video
    // (หากเป็น /post ให้กรองเฉพาะ is_video เอาเอง)
    const res = await $axios.get(`/post/video`);
    posts.value = res.data?.data || []; // เก็บข้อมูลเป็น Array

  } catch (e) {
    console.error("โหลดโพสต์ล้มเหลว:", e);
    error.value = "ไม่สามารถโหลดข้อมูลโพสต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchVideoPosts);
</script>

<template>
  <div
    class="relative min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat md:bg-fixed pb-24 md:pb-28 lg:pb-32"
  >
    <CommonButtonBack />

    <div class="container mx-auto pt-16 pb-8">
      <div
        class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
          กำลังโหลดข้อมูล...
        </div>

        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <div v-else-if="posts.length === 0" class="text-center text-gray-500">
          ยังไม่มีโพสต์วิดีโอ
        </div>

        <div v-else class="space-y-10">
          
          <article 
            v-for="post in posts" 
            :key="post.post_id"
            class="border-b border-gray-300/50 pb-10 last:border-b-0 last:pb-0"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div class="md:col-span-1 space-y-4">
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white break-words">
                  {{ post.post_name }}
                  </h2>
                
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <span>โพสต์เมื่อ: </span>
                  <span>{{ new Date(post.post_timestamp).toLocaleString() }}</span>
                </div>

                <p class="text-lg text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words line-clamp-4">
                  {{ post.post_description }}
                </p>
              </div>

              <div class="md:col-span-2 space-y-4">
                
                <div class="aspect-video w-full">
                  <video
                    v-if="post.videos && post.videos.length > 0"
                    :src="getMediaUrl(post.videos[0].post_image_path)"
                    controls
                    preload="metadata"
                    muted
                    loop
                    playsinline
                    class="w-full h-full rounded-lg shadow-lg bg-black"
                  >
                    เบราว์เซอร์ของคุณไม่รองรับแท็กวิดีโอ
                  </video>
                  <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <p class="text-gray-500">ไม่มีไฟล์วิดีโอสำหรับแสดงผล</p>
                  </div>
                </div>
                
                <p 
                  v-if="post.videos && post.videos.length > 0 && post.videos[0].post_image_description"
                  class="text-base text-gray-700 dark:text-green-700 whitespace-pre-wrap break-words pt-2"
                >
                  {{ post.videos[0].post_image_description }}
                </p>
                
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  </div>
</template>