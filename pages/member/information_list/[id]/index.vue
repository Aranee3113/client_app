<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { $axios } = useNuxtApp();

const route = useRoute();
const product = ref(null);

const fetchProduct = async () => {
  try {
    const res = await $axios.get(`/product/${route.params.id}`);
    if (res.status === 200) {
      product.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ", error);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <CommonButtonBack />
  <div class="max-w-3xl mx-auto py-12 px-6">
    <div v-if="product" class="bg-white/90 p-6 shadow-md rounded-xl border border-white/30">
      <h1 class="text-2xl font-bold text-orange-600 mb-4">
        {{ product.textile_name }}
      </h1>
      <p class="text-gray-700 mb-4 whitespace-pre-line">
        {{ product.textile_description }}
      </p>
      <p class="text-sm text-gray-500">
        แหล่งที่มา: {{ product.textile_location }}
      </p>
    </div>

    <div v-else class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
  </div>
</template>
