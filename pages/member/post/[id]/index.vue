<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { $axios } = useNuxtApp();
const route = useRoute();
const post = ref(null);

const fetchPost = async () => {
  try {
    const res = await $axios.get(`/post/${route.params.id}`);
    if (res.status === 200) {
      post.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดโพสต์ล้มเหลว", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <CommonButtonBack />
  <div class="max-w-3xl mx-auto py-12 px-6">
    <div v-if="post" class="bg-white p-6 shadow-md rounded-xl">
      <h1 class="text-2xl font-bold text-orange-600 mb-4">{{ post.post_name }}</h1>
      <p class="text-gray-700 mb-4 whitespace-pre-line">{{ post.post_description }}</p>
      <p class="text-sm text-gray-400">
        โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString() }}
      </p>
    </div>
    <div v-else class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
  </div>
</template>
