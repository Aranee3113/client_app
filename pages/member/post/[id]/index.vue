<script setup>
definePageMeta({ layout: "member" });

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const post = ref(null);
const loading = ref(true);

// 🔹 NEW: state สำหรับคอมเมนต์
const comments = ref([]);
const loadingComments = ref(true);

// ใช้ fileBase ถ้ามี; ถ้าไม่มีให้ตัด /api ออกจาก apiBase อัตโนมัติ
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

const fetchComments = async () => {
  loadingComments.value = true;
  try {
    const res = await $axios.get(`/comment`);
    if (res.status === 200) {
      const all = Array.isArray(res.data.data) ? res.data.data : [];
      const pid = Number(route.params.id);
      comments.value = all.filter((c) => Number(c.post_id) === pid);
    }
  } catch (e) {
    console.error("โหลดคอมเมนต์ล้มเหลว", e);
    comments.value = [];
  } finally {
    loadingComments.value = false;
  }
};

onMounted(async () => {
  await Promise.all([fetchPost(), fetchComments()]);
});
</script>

<template>
  <div
    class="relative min-h-screen
           bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat
           md:bg-fixed
           pb-24 md:pb-28 lg:pb-32"
  >
    <CommonButtonBack />
    <div class="max-w-3xl mx-auto py-12 px-6">
      <div v-if="!loading && post" class="bg-white p-6 shadow-md rounded-xl ">
        <h1 class="text-2xl font-bold text-orange-600 mb-4">
          {{ post.post_name }}
        </h1>
        <p class="text-gray-700 mb-4 whitespace-pre-line">
          {{ post.post_description }}
        </p>
        <p class="text-lg text-gray-400">
          โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString() }}
        </p>

        <!-- รูปภาพของโพสต์ -->
        <div
          v-if="post.images && post.images.length > 0"
          class="mt-5 space-y-3"
        >
          <div
            v-for="img in post.images.slice(0)"
            :key="img.post_image_id || img.post_image_path"
            class="rounded-lg overflow-hidden "
          >
            <img
              :src="getImageUrl(img.post_image_path)"
              alt="post image"
              class="w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div
          v-else-if="!post.images || post.images.length === 0"
          class="mt-4 text-sm text-gray-500 italic"
        >
          ไม่มีรูปภาพ
        </div>

        <!-- ส่วนคอมเมนต์ -->
        <div class="mt-8 pt-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              คอมเมนต์
            </h2>
            <span
              class="text-sm px-2 py-1 rounded-full bg-orange-100 text-orange-700"
              v-if="!loadingComments"
            >
              {{ comments.length }} รายการ
            </span>
          </div>

          <!-- กำลังโหลดคอมเมนต์ -->
          <div v-if="loadingComments" class="text-gray-500">
            กำลังโหลดคอมเมนต์...
          </div>

          <!-- ไม่มีคอมเมนต์ -->
          <div
            v-else-if="comments.length === 0"
            class="text-gray-500 italic"
          >
            ยังไม่มีคอมเมนต์
          </div>

          <!-- รายการคอมเมนต์ -->
          <ul v-else class="space-y-4">
            <li
              v-for="c in comments"
              :key="c.comment_id"
              class="p-4 rounded-xl bg-gray-100"
            >
              <div class="flex items-start gap-3">
                <!-- Avatar ชั่วคราว (อักษรแรกชื่อ) -->
                <div
                  class="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-900 shrink-0"
                  :title="c.user_name || 'ผู้ใช้'"
                >
                  {{ (c.user_name || 'U').slice(0,1).toUpperCase() }}
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">
                      {{ c.user_name || 'ผู้ใช้' }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ new Date(c.comment_timestamp).toLocaleString() }}
                    </p>
                  </div>

                  <p class="mt-1 text-gray-700 whitespace-pre-line">
                    {{ c.comment_text }}
                  </p>

                  <!-- รูปคอมเมนต์ถ้ามี -->
                  <div v-if="c.comment_image_path" class="mt-3">
                    <img
                      :src="getImageUrl(c.comment_image_path)"
                      alt="comment image"
                      class="max-h-64 w-auto rounded-lg border object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
      </div>

      <div v-else class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
    </div>
  </div>
</template>
