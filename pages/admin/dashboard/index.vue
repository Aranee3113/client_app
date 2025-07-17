<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CardDashboard from "~/components/card/dashboard.vue";

const router = useRouter();
const { $axios } = useNuxtApp();
const products = ref([]);
const posts = ref([]);
const users = ref([]);
const fetchAllData = async () => {
  try {
    const [productRes, postRes, userRes] = await Promise.all([
      $axios.get("/product"),
      $axios.get("/post"),
      $axios.get("/user"),
    ]);
    if (productRes.status === 200) products.value = productRes.data.data;
    if (postRes.status === 200) posts.value = postRes.data.data;
    if (userRes.status === 200) users.value = userRes.data.data;
  } catch (err) {
    console.error("โหลดข้อมูลไม่สำเร็จ", err);
  }
};
const goToPostPage = () => {
  router.push("/admin/post");
};
onMounted(() => {
  fetchAllData();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
  >
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10"
      ></div>
      <div class="relative p-8 max-w-7xl mx-auto">
        <!-- Top Navigation -->
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1
                class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                ระบบจัดการแอดมิน
              </h1>
              <p class="text-gray-600 text-sm">Dashboard Control Panel</p>
            </div>
          </div>
          <button
            @click="goToPostPage"
            class="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span class="relative z-10 flex items-center space-x-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>จัดการโพสต์</span>
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>

        <!-- Main Title -->
        <div class="text-center mb-12">
          <h2
            class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4"
          >
            ระบบจัดการ
          </h2>
          <p class="text-gray-600 text-lg">ภาพรวมข้อมูลทั้งหมดในระบบ</p>
          <div
            class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"
          ></div>
        </div>
      </div>
    </div>

    <div class="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <card-dashboard
        :data="{ count: products.length || 0 }"
        color="bg-green-500"
        text="text-white"
        link="/admin/information"
        title="รายการผ้าทั้งหมด"
      />
      <card-dashboard
        :data="{ count: posts.length || 0 }"
        color="bg-red-500"
        text="text-white"
        link="/admin/post"
        title="รายการโพสต์ทั้งหมด"
      />
      <card-dashboard
        :data="{ count: users.length || 0 }"
        color="bg-yellow-500"
        text="text-white"
        link="/admin/user"
        title="รายการผู้ใช้ทั้งหมด"
      />
    </div>
  </div>
</template>
