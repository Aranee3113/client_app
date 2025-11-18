<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "member",
});

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const posts = ref([]);
const loading = ref(true);
const error = ref("");

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
const fetchVideoPosts = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    const res = await $axios.get(`/post/video`);
    posts.value = res.data?.data || [];

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
            <div class="flex flex-col md:flex-row md:items-start gap-8">
              
              <div class="w-full md:w-2/3 order-1 md:order-2">
                <div class="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                  <video
                    v-if="post.videos && post.videos.length > 0"
                    :src="getMediaUrl(post.videos[0].post_image_path)"
                    controls
                    preload="metadata"
                    muted
                    loop
                    playsinline
                    class="w-full h-full object-cover"
                  >
                    เบราว์เซอร์ของคุณไม่รองรับแท็กวิดีโอ
                  </video>
                  <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <p class="text-gray-500">ไม่มีไฟล์วิดีโอสำหรับแสดงผล</p>
                  </div>
                </div>
              </div>

              <div class="w-full md:w-1/3 order-2 md:order-1 flex flex-col">
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white break-words">
                  {{ post.post_name }}
                </h2>
                
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>โพสต์เมื่อ: </span>
                  <span>{{ new Date(post.post_timestamp).toLocaleString() }}</span>
                </div>

                <div
                  class="mt-4 max-h-[40vh] md:max-h-[60vh] overflow-y-auto rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-inner p-4"
                >
                  <p
                    class="text-lg text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed"
                  >
                    {{ post.post_description }}
                  </p>
                </div>

                </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
div.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 4px;
}
div.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.5);
}
div.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
</style>