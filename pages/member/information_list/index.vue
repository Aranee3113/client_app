<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const products = ref([]);

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const apiBase = config?.public?.apiBase || "";
  const fileBase =
    config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");

  // กันกรณี path ไม่มี / นำหน้า
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${fileBase}${path}`;
};

const normalizeImages = (raw) => {
  // รองรับทั้ง array และ JSON string จาก MySQL JSON_ARRAYAGG
  if (Array.isArray(raw)) return raw;
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const fetchProducts = async () => {
  try {
    const res = await $axios.get("/product");
    if (res.status === 200) {
      const rows = res.data.data || [];
      products.value = rows.map((p) => ({
        ...p,
        images: normalizeImages(p.images),
      }));
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
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-12 px-6"
  >
    <div class="max-w-6xl mx-auto">
      <h2
        class="text-3xl font-bold text-center mb-8 bg-gradient-to-r bg-purple-800 bg-clip-text text-transparent"
      >
        รายการข้อมูลผ้า
      </h2>

      <div v-if="products.length > 0" class="space-y-6 ">
        <div
          v-for="item in products"
          :key="item.textile_id"
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
        >
          <!-- ชื่อผ้า -->
          <NuxtLink
            :to="`/member/information_list/${item.textile_id}`"
            class="text-xl font-semibold text-orange-700 hover:underline"
          >
            {{ item.textile_name }}
          </NuxtLink>

          <!-- คำอธิบาย -->
          <p class="text-gray-700 mt-1 line-clamp-3">
            {{ item.textile_description }}
          </p>

          <!-- แหล่งที่มา -->
          <p class="text-sm text-gray-500 mt-2">
            แหล่งที่มา: {{ item.textile_location }}
          </p>

          <!-- (รูปแรก) -->
          <div
            v-if="item.images && item.images.length > 0"
            class="mt-4"
          >
            <img
              :src="getImageUrl(item.images[0].textile_image_path)"
              :alt="`${item.textile_name} - cover`"
              class="w-full h-64 object-cover rounded-lg shadow"
              loading="lazy"
            />
          </div>

          <!-- แกลเลอรี (ทุกรูป) -->
          <div
            v-if="item.images && item.images.length > 1"
            class="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            <div
              v-for="img in item.images"
              :key="img.textile_image_id"
              class="aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                :src="getImageUrl(img.textile_image_path)"
                :alt="`${item.textile_name} - image ${img.textile_image_id}`"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div
            v-else-if="!item.images || item.images.length === 0"
            class="mt-4 text-sm text-gray-500 italic"
          >
            ไม่มีรูปภาพ
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-12 text-lg">
        ไม่มีข้อมูลผ้าในขณะนี้
      </div>
    </div>
  </div>
</template>
