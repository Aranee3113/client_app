<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const product = ref(null);
const loading = ref(true);

const normalizeImages = (raw) => {
  // รองรับทั้ง array และ JSON string ที่มาจาก JSON_ARRAYAGG
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const apiBase = config?.public?.apiBase || "";
  const fileBase =
    config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");

  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${fileBase}${path}`;
};

const fetchProduct = async () => {
  loading.value = true;
  try {
    const res = await $axios.get(`/product/${route.params.id}`);
    if (res.status === 200) {
      const data = res.data?.data || null;
      if (data) data.images = normalizeImages(data.images);
      product.value = data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลไม่สำเร็จ", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);
</script>

<template>
  <CommonButtonBack />
  <div class="max-w-3xl mx-auto py-12 px-6">
    <div
      v-if="!loading && product"
      class="bg-white/90 p-6 shadow-md rounded-xl border border-white/30"
    >
      <h1 class="text-2xl font-bold text-orange-600 mb-4">
        {{ product.textile_name }}
      </h1>

      <!-- รูปปก (รูปแรก) -->
      <div v-if="product.images && product.images.length" class="mb-4">
        <img
          :src="getImageUrl(product.images[0].textile_image_path)"
          :alt="`${product.textile_name} - cover`"
          class="w-full h-72 object-cover rounded-lg border"
          loading="lazy"
        />
      </div>

      <!-- คำอธิบาย / แหล่งที่มา -->
      <p class="text-gray-700 mb-4 whitespace-pre-line">
        {{ product.textile_description }}
      </p>
      <p class="text-sm text-gray-500">
        แหล่งที่มา: {{ product.textile_location }}
      </p>

      <!-- แกลเลอรี (ทุกรูป) -->
      <div
        v-if="product.images && product.images.length > 1"
        class="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        <div
          v-for="img in product.images"
          :key="img.textile_image_id"
          class="aspect-square rounded-lg overflow-hidden border"
        >
          <img
            :src="getImageUrl(img.textile_image_path)"
            :alt="`${product.textile_name} - ${img.textile_image_id}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- กรณีไม่มีรูป -->
      <div v-else-if="!product.images || product.images.length === 0" class="mt-4 text-sm text-gray-500 italic">
        ไม่มีรูปภาพ
      </div>
    </div>

    <div v-else class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
  </div>
</template>
