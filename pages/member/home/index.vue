<script setup>
definePageMeta({
  layout: "member",
});


import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { $axios } = useNuxtApp();

const products = ref([]);
const posts = ref([]);
const route = useRoute();
const userId = route.params.id;

const fetchProducts = async () => {
  try {
    const res = await $axios.get("/product");
    if (res.status === 200) {
      products.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลผ้าล้มเหลว", error);
  }
};

const fetchPosts = async () => {
  try {
    const res = await $axios.get(`/post/user/${userId}`); // <- เช่น /post/user/3
    if (res.status === 200) {
      posts.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", error);
  }
};

onMounted(() => {
  fetchProducts();
  fetchPosts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- BaseCard -->
      <card-basecard />

      <!-- ยินดีต้อนรับ -->
      <div class="text-center mt-10 mb-12">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ภูมิปัญญาผ้าทอ กลุ่มชาติพันธุ์เขมรจังหวัดบุรีรัมย์
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          ยินดีต้อนรับสู่ชุมชนของเรา! ที่นี่คุณจะได้พบกับข้อมูลผ้าทอและโพสต์ต่างๆ
          ที่เกี่ยวข้องกับภูมิปัญญาผ้าทอของกลุ่มชาติพันธุ์เขมรในจังหวัดบุรีรัมย์ 
          เราหวังว่าคุณจะสนุกกับการสำรวจและเรียนรู้เกี่ยวกับวัฒนธรรมผ้าทอของเรา
        </p>
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white tracking-tight">
         10 พื้นที่ ใน 7 อำเภอที่มีกลุ่มชาติพันธุ์เขมรอาศัยอยู่ได้แก่
        </p>
        
      </div>

      <!-- รายการข้อมูลผ้า -->
      <section class="mb-20">
        <h2
          class="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-800 to-pink-500 bg-clip-text text-transparent"
        >
          ชุมชนผ้าทอ
        </h2>
        <div
          v-if="products.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            v-for="item in products"
            :key="item.textile_id"
            class="bg-white/90 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700"
          >
            <NuxtLink
              :to="`/member/information_list/${item.textile_id}`"
              class="text-xl font-semibold text-purple-800 hover:text-pink-800 transition"
            >
              {{ item.textile_name }}
            </NuxtLink>

            <p class="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
              {{ item.textile_description }}
            </p>

            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              แหล่งที่มา: {{ item.textile_location }}
            </p>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 mt-12 text-lg">
          ไม่มีข้อมูลผ้าในขณะนี้
        </div>
      </section>

      <!-- รายการโพสต์ -->
      <section>
        <h2
          class="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          โพสต์ผ้าทอ
        </h2>

        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 md:grid-cols-1 gap-8"
        >
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="bg-white/90 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700"
          >
            <NuxtLink
              :to="`/member/post/${post.post_id}`"
              class="text-xl font-semibold text-pink-500 hover:text-purple-600 transition"
            >
              {{ post.post_name }}
            </NuxtLink>

            <p class="text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
              {{ post.post_description }}
            </p>

            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString()
              }}<br />
              โดย {{ post.user_name }} ({{ post.user_username }})
            </p>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-12 text-lg">
          ไม่มีโพสต์ที่เปิดใช้งาน
        </div>
      </section>
    </div>
  </div>
</template>
