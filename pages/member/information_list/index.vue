<script setup>
definePageMeta({
  layout: "member",
});
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await $axios.get("/product"); 
    if (res.status === 200) {
      products.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ", error);
  }
};

onMounted(() => {
  fetchProducts();
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
        รายการข้อมูลผ้า
      </h2>

      <div v-if="products.length > 0" class="space-y-6">
        <div
          v-for="item in products"
          :key="item.textile_id"
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
        >
          <NuxtLink
            :to="`/member/information_list/${item.textile_id}`"
            class="text-xl font-semibold text-orange-700 hover:underline" 
          >
            {{ item.textile_name }}
          </NuxtLink>
  
          <p class="text-gray-700 mt-1 line-clamp-3">
            {{ item.textile_description }}
          </p>

          <p class="text-sm text-gray-500 mt-2">
            แหล่งที่มา: {{ item.textile_location }}
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-12 text-lg">
        ไม่มีข้อมูลผ้าในขณะนี้
      </div>
    </div>
  </div>
</template>
