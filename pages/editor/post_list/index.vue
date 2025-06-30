<script setup>
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();

const posts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await $axios.get("/post"); // เรียก API backend
    if (response.status === 200 && response.data.data) {
      posts.value = response.data.data;
      console.log("Posts:", posts.value);
    } else {
      console.warn("ไม่มีข้อมูลโพสต์");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <NavbarBasenavbar />

  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-indigo-700">
        รายการโพสต์ทั้งหมด
      </h1>

      <div v-if="posts.length === 0" class="text-center text-gray-500">
        ไม่มีโพสต์ในระบบ
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in posts"
          :key="post.post_id"
          :to="`/editor/post_list_detail_id/${post.post_id}`"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition block"
        >
          <h2 class="text-xl font-bold text-purple-700 mb-2">
            {{ post.post_name }}
          </h2>
          <p class="text-gray-700 mb-4">{{ post.post_description }}</p>
          <p class="text-sm text-gray-500">
            🕒 {{ new Date(post.post_timestamp).toLocaleString() }}
          </p>
          <p class="text-sm text-gray-400 mt-1">
            👤 ผู้ใช้ ID: {{ post.user_id }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>

  <FooterBasefooter />
</template>
