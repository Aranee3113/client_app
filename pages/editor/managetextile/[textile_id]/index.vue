<script setup>
import { onMounted, ref } from "vue";
const { $axios } = useNuxtApp();
const route = useRoute();

const textileId = route.params.textile_id;
const textile_name = ref("");
const loading = ref(true);
const error = ref("");

const getProductById = async () => {
  try {
    const response = await $axios.get(`/product/${textileId}`);
    if (response.status === 200 && response.data.data) {
      textile_name.value = response.data.data;
    } else {
      error.value = "ไม่พบข้อมูลผ้านี้";
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    error.value = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProductById();
});
</script>

<template>
  <NavbarBasenavbar />

  <div class="min-h-screen bg-slate-50 py-12 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <div v-if="loading" class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>

      <div v-else-if="error" class="text-center text-red-500 font-semibold">
        {{ error }}
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold text-green-800 mb-4">
          {{ textile_name.textile_name }}
        </h1>
        <p class="text-gray-700 text-base mb-4">
          🧵 รายละเอียด: {{ textile_description.textile_description }}
        </p>
        <p class="text-gray-500 text-sm">
          🏭 สถานที่: {{ textile_location.textile_location }}
        </p>
      </div>
    </div>
  </div>

  <FooterBasefooter />
</template>
