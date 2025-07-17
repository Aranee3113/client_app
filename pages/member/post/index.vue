<script setup>
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const posts = ref([]);

const fetchPosts = async () => {
  try {
    const res = await $axios.get("/post"); // เฉพาะโพสต์ที่เปิดใช้งาน
    if (res.status === 200) {
      posts.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6"
  >
    <div class="max-w-6xl mx-auto">
      <h2
        class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
      >
        รายการโพสต์
      </h2>

      <div v-if="posts.length > 0" class="space-y-6">
        <div
          v-for="post in posts"
          :key="post.post_id"
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
        >
          <NuxtLink
            :to="`/member/post/${post.post_id}`"
            class="text-xl font-semibold text-blue-600 hover:underline"
          >
            {{ post.post_name }}
          </NuxtLink>
          <p class="text-gray-700 mt-2 line-clamp-2">
            {{ post.post_description }}
          </p>
          <p class="text-sm text-gray-400 mt-1">
            โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString()
            }}<br />
            โดย {{ post.user_name }} ({{ post.user_username }})
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-12 text-lg">
        ไม่มีโพสต์ที่เปิดใช้งาน
      </div>
    </div>
  </div>
</template>
