<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const users = ref([]);
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

const fetchUsers = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/user");
    if (res.status === 200) {
      users.value = res.data?.data || [];
    } else {
      users.value = [];
    }
  } catch (e) {
    console.error("โหลดข้อมูลผู้ใช้ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดข้อมูลผู้ใช้ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <CommonButtonBack />
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad]">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-800">
          รายชื่อผู้ใช้
        </h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/user/add"
            class="inline-flex items-center px-5 py-2 bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มข้อมูลผู้ใช้
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
          <thead class="bg-gradient-to-r from-purple-100 to-indigo-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 font-semibold text-center">User ID</th>
              <th class="py-3 px-4 font-semibold">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold">Username</th>
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

            <tr v-else v-for="user in users" :key="user.user_id" class="hover:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ user.user_id }}</td>

              <td class="py-3 px-4">
                <img
                  v-if="user.user_image_path"
                  :src="getImageUrl(user.user_image_path)"
                  alt="user image"
                  class="w-12 h-12 rounded-full object-cover border bg-white"
                  loading="lazy"
                />
                <span v-else class="text-gray-400">ไม่มีรูป</span>
              </td>

              <td class="py-3 px-4">{{ user.user_username }}</td>

              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/user"
                    :params="user.user_id"
                  />
                  <CommonButtonDeletebutton
                    type="delete"
                    :params="user.user_id"
                    @deleted="fetchUsers"
                    path="user"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && !error && users.length === 0">
              <td colspan="4" class="text-center text-gray-400 py-6">ไม่มีข้อมูลผู้ใช้ในระบบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
