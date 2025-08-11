<script setup>
definePageMeta({ layout: "member" });

import { ref, onMounted } from "vue";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const posts = ref([]);
const loading = ref(true);
const error = ref("");

// ---- helpers ----
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const base = getFileBase();
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${base}${path}`;
};

// รองรับทั้ง array และ JSON string จาก JSON_ARRAYAGG
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

// ---- load posts (view only) ----
const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post"); // backend คืนเฉพาะ is_active = 1
    const rows = res.data?.data || [];
    posts.value = rows.map((p) => ({
      ...p,
      images: normalizeImages(p.images),
    }));
  } catch (e) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดโพสต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-700 to-red-500 bg-clip-text text-transparent">
        รายการโพสต์
      </h2>

      <div v-if="loading" class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

      <div v-else>
        <div v-if="posts.length > 0" class="space-y-6">
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
          >
            <!-- รูปปก (รูปแรก ถ้ามี) -->
            <div v-if="post.images && post.images.length" class="mb-4">
              <img
                :src="getImageUrl(post.images[0].post_image_path)"
                alt="post cover"
                class="w-full h-56 object-cover rounded-lg shadow"
                loading="lazy"
              />
            </div>

            <!-- ชื่อโพสต์ (ลิงก์ไปหน้ารายละเอียด/อ่านอย่างเดียว) -->
            <NuxtLink
              :to="`/member/post/${post.post_id}`"
              class="text-xl font-semibold text-blue-600 hover:underline"
            >
              {{ post.post_name }}
            </NuxtLink>

            <!-- รายละเอียดย่อ -->
            <p class="text-gray-700 mt-2 line-clamp-2">
              {{ post.post_description }}
            </p>

            <!-- เมตา -->
            <p class="text-sm text-gray-400 mt-1">
              โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString() }}<br />
              โดย {{ post.user_name }} ({{ post.user_username }})
            </p>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-12 text-lg">
          ไม่มีโพสต์ที่เปิดใช้งาน
        </div>
      </div>
    </div>
  </div>
</template>
