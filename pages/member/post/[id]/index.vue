<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const post = ref(null);
const loading = ref(true);

// ใช้ fileBase ถ้ามี; ถ้าไม่มีให้ตัด /api ออกจาก apiBase อัตโนมัติ
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// รองรับทั้ง array และ JSON string (จาก JSON_ARRAYAGG)
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

const fetchPost = async () => {
  loading.value = true;
  try {
    const res = await $axios.get(`/post/${route.params.id}`);
    if (res.status === 200) {
      const data = res.data.data;
      data.images = normalizeImages(data.images);
      post.value = data;
    }
  } catch (error) {
    console.error("โหลดโพสต์ล้มเหลว", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPost);
</script>

<template>
  <CommonButtonBack />
  <div class="max-w-3xl mx-auto py-12 px-6">
    <div v-if="!loading && post" class="bg-white p-6 shadow-md rounded-xl">
      <h1 class="text-2xl font-bold text-orange-600 mb-4">
        {{ post.post_name }}
      </h1>

      <!-- รูปปก (รูปแรก) -->
      <div v-if="post.images && post.images.length" class="mb-4">
        <img
          :src="getImageUrl(post.images[0].post_image_path)"
          alt="post cover"
          class="w-full h-72 object-cover rounded-lg border"
          loading="lazy"
        />
      </div>

      <p class="text-gray-700 mb-4 whitespace-pre-line">
        {{ post.post_description }}
      </p>
      <p class="text-sm text-gray-400">
        โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString() }}
      </p>

      <!-- แกลเลอรี (ถ้ามีหลายรูป) -->
      <div
        v-if="post.images && post.images.length > 1"
        class="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        <div
          v-for="img in post.images"
          :key="img.post_image_id || img.post_image_path"
          class="aspect-square rounded-lg overflow-hidden border"
        >
          <img
            :src="getImageUrl(img.post_image_path)"
            alt="post image"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- ไม่มีรูป -->
      <div
        v-else-if="!post.images || post.images.length === 0"
        class="mt-4 text-sm text-gray-500 italic"
      >
        ไม่มีรูปภาพ
      </div>
    </div>

    <div v-else class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
  </div>
</template>
