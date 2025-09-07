<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const comments = ref([]);
const loading = ref(true);
const error = ref("");

// ---- helpers ----
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path) => {
  if (!path || typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const fetchComments = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/comment"); // คืนทั้งหมด (ทั้งอนุมัติ/ยังไม่อนุมัติ)
    comments.value = Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (e) {
    console.error("โหลดคอมเมนต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดคอมเมนต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchComments);
</script>

<template>
  <CommonButtonBack />

  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad]">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-800">จัดการความคิดเห็น</h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/comment/add"
            class="inline-flex items-center px-5 py-2 bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มความคิดเห็น
          </NuxtLink>
          <NuxtLink
            to="/admin/dashboard"
            class="px-6 py-2 rounded-lg text-white font-medium bg-purple-400 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 font-semibold text-center">ID</th>
              <th class="py-3 px-4 font-semibold">ผู้ใช้</th>
              <th class="py-3 px-4 font-semibold">ข้อความ</th>
              <th class="py-3 px-4 font-semibold text-center">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold">เวลา</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="py-6 text-center text-gray-500">กำลังโหลดข้อมูล...</td>
            </tr>

            <tr v-else-if="error">
              <td colspan="7" class="py-6 text-center text-red-500">{{ error }}</td>
            </tr>

            <tr
              v-else
              v-for="c in comments"
              :key="c.comment_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ c.comment_id }}</td>

              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <div class="font-medium">{{ c.user_name || 'ไม่ทราบชื่อ' }}</div>
                </div>
              </td>

              <td class="py-3 px-4 max-w-[22rem]">
                <div class="line-clamp-2 text-gray-700">
                  {{ c.comment_text }}
                </div>
              </td>

              <td class="py-3 px-4">
                <div class="flex justify-center">
                  <img
                    v-if="c.comment_image_path"
                    :src="getImageUrl(c.comment_image_path)"
                    alt="comment image"
                    class="w-16 h-16 object-cover rounded-lg shadow-md border"
                    loading="lazy"
                  />
                  <span v-else class="text-gray-400">ไม่มีรูปภาพ</span>
                </div>
              </td>

              <td class="py-3 px-4 whitespace-nowrap">
                {{ new Date(c.comment_timestamp).toLocaleString() }}
              </td>

              <!-- จัดการ -->
              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <!-- ปุ่มแก้ไข (เส้นทางในแอดมิน) -->
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/comment"
                    :params="c.comment_id"
                  />

                  <!-- ปุ่มลบ เรียก API /comment/:id -->
                  <CommonButtonDeletebutton
                    type="comment"
                    path="comment"
                    :params="c.comment_id"
                    @deleted="fetchComments"
                  />

                </div>
              </td>
            </tr>

            <tr v-if="!loading && !error && comments.length === 0">
              <td colspan="7" class="text-center text-gray-400 py-6">ยังไม่มีคอมเมนต์ในระบบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
