<script setup>
definePageMeta({ layout: "admin" });

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

const getImageUrl = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// images อาจเป็น array หรือ JSON string จาก JSON_ARRAYAGG
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

const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post");
    if (res.status === 200) {
      const rows = res.data?.data || [];
      posts.value = rows.map((p) => ({
        ...p,
        images: normalizeImages(p.images),
      }));
    } else {
      posts.value = [];
    }
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
  <CommonButtonBack />

  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          รายการโพสต์
        </h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/post/add"
            class="inline-flex items-center px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มโพสต์
          </NuxtLink>
          <NuxtLink
            to="/admin/dashboard"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 font-semibold text-center">Post ID</th>
              <th class="py-3 px-4 font-semibold">ชื่อโพสต์</th>
              <th class="py-3 px-4 font-semibold text-center">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="py-6 text-center text-gray-500">กำลังโหลดข้อมูล...</td>
            </tr>
            <tr v-else-if="error">
              <td colspan="4" class="py-6 text-center text-red-500">{{ error }}</td>
            </tr>

            <tr
              v-else
              v-for="post in posts"
              :key="post.post_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ post.post_id }}</td>
              <td class="py-3 px-4">{{ post.post_name }}</td>
              <td class="py-3 px-4">
                <div class="flex justify-center">
                  <img
                    v-if="post.images && post.images.length > 0"
                    :src="getImageUrl(post.images[0].post_image_path)"
                    alt="Post Image"
                    class="w-16 h-16 object-cover rounded-lg shadow-md border"
                    loading="lazy"
                  />
                  <span v-else class="text-gray-400">ไม่มีรูปภาพ</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/post"
                    :params="post.post_id"
                  />
                  <CommonButtonDeletebutton
                    type="post"
                    path="post"
                    :params="post.post_id"
                    @deleted="fetchPosts"
                  />
                  <CommonButtonApprovebutton
                    :text="post.is_active == 1 ? 'อนุมัติ' : 'ยังไม่อนุมัติ'"
                    :color="['text-white', post.is_active == 1 ? 'bg-green-600' : 'bg-red-500']"
                    path="/admin/post"
                    :params="post.post_id"
                    @fetchOn="fetchPosts"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && !error && posts.length === 0">
              <td colspan="4" class="text-center text-gray-400 py-6">ไม่มีโพสต์ในระบบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
