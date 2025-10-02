<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { decodeJwt } from "jose";
import CardDashboard from "~/components/card/dashboard.vue";

const router = useRouter();
const { $axios } = useNuxtApp();

const posts = ref([]);
const users = ref([]);
const comments = ref([]);

const id = ref<string>("");
const token = useCookie("token").value;

if (token) {
  const decoded: any = decodeJwt(token);
  id.value = String(decoded.user_id);
}

const fetchAllData = async () => {
  try {
    const [postRes, userRes, commentRes] = await Promise.all([
      $axios.get("/post"),
      $axios.get("/user"),
      $axios.get("/comment"),
    ]);
    console.log("Post Response:", postRes);
    console.log("User Response:", userRes);
    console.log("Comment Response:", commentRes);

    if (postRes.status === 200) posts.value = postRes.data.data;
    if (userRes.status === 200) users.value = userRes.data.data;
    if (commentRes.status === 200) comments.value = commentRes.data.data || [];
  } catch (err) {
    console.error("โหลดข้อมูลไม่สำเร็จ", err);
  }
};

onMounted(() => {
  fetchAllData();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad]"
  >
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10"
      ></div>
      <div class="relative p-8 max-w-7xl mx-auto">
        <!-- Top Navigation -->
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-800 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
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
              <h1 class="text-4xl font-bold text-center mb-2 text-purple-800">
                ระบบจัดการแอดมิน
              </h1>
              <p class="text-gray-600">ภาพรวมข้อมูลทั้งหมดในระบบ</p>
            </div>
          </div>
        </div>

        <div class="text-center mb-12">
          <h2
            class="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-900 via-amber-700 to-amber-900 bg-clip-text text-transparent mb-4"
          >
            ระบบสารสนเทศภูมิปัญญาผ้าทอกลุ่มชาติพันธุ์เขมรจังหวัดบุรีรัมย์
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"
          ></div>
        </div>
      </div>
    </div>

    <div class="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <card-dashboard
        :data="{ count: posts.length || 0 }"
        color="bg-gradient-to-r from-red-600 to-rose-300"
        text="text-white"
        :link="`/admin/post`"
        title="รายการโพสต์ทั้งหมด"
      />
      <card-dashboard
        :data="{ count: comments.length || 0 }"
        color="bg-gradient-to-r from-pink-600 to-purple-300"
        text="text-white"
        :link="`/admin/comment`"
        title="รายการความคิดเห็นทั้งหมด"
      />
      <card-dashboard
        :data="{ count: users.length || 0 }"
        color="bg-gradient-to-r from-orange-600 to-amber-300"
        text="text-white"
        :link="`/admin/user`"
        title="รายการผู้ใช้ทั้งหมด"
      />
    </div>
  </div>
</template>
