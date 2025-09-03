<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const product = ref(null);
const loading = ref(true);

// รูปทั้งหมดที่ได้จาก API
const allImages = computed(() => (product.value?.images ? product.value.images : []));
// เอามาแสดง 5 รูปแรกแบบคอลลาจ
const collageImages = computed(() => allImages.value.slice(0, 5));
// จำนวนที่เหลือเอาไว้โชว์เป็น +N
const moreCount = computed(() => Math.max(allImages.value.length - 5, 0));

// ฟังก์ชันแปลงข้อมูลรูปภาพให้เป็น array
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
// ฟังก์ชันแปลง path ของรูปให้เป็น URL เต็ม
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const apiBase = config?.public?.apiBase || "";
  const fileBase = config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${fileBase}${path}`;
};
// ดึงข้อมูลสผ้า
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
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-8 px-4 lg:px-8"
  >
    <CommonButtonBack />

    <div class="max-w-7xl mx-auto">
      <div
        v-if="!loading && product"
        class="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/40 overflow-hidden"
      >
        <!-- Header Section -->
        <div
          class="bg-gradient-to-r from-purple-100 to-orange-100 px-8 py-6 border-b border-gray-200/50"
        >
          <h1 class="text-4xl font-bold text-gray-800 mb-2">
            {{ product.textile_name }}
          </h1>
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-lg font-medium">{{
              product.textile_location
            }}</span>
          </div>
        </div>

        <!-- Image Gallery Section - ด้านบน -->
        <div class="p-8 pb-6">
          <div v-if="allImages.length">
            <!-- คอลลาจ 2 รูปใหญ่ด้านบน + 3 รูปเล็กด้านล่าง -->
            <div class="grid grid-cols-1 sm:grid-cols-6 gap-3">
              <!-- รูป 0 และ 1: ใหญ่ (กิน 3 คอลัมน์) -->
              <template v-for="i in [0, 1]" :key="'big-' + i">
                <div
                  v-if="collageImages[i]"
                  class="relative rounded-xl overflow-hidden shadow bg-gray-100 sm:col-span-3 aspect-[4/3] group"
                >
                  <img
                    :src="getImageUrl(collageImages[i].textile_image_path)"
                    :alt="`${product.textile_name} - ${i + 1}`"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
                  ></div>
                </div>
              </template>

              <!-- รูป 2,3,4: เล็ก (กิน 2 คอลัมน์/ช่อง) -->
              <template v-for="i in [2, 3, 4]" :key="'small-' + i">
                <div
                  v-if="collageImages[i]"
                  class="relative rounded-xl overflow-hidden shadow bg-gray-100 sm:col-span-2 aspect-square group"
                >
                  <img
                    :src="getImageUrl(collageImages[i].textile_image_path)"
                    :alt="`${product.textile_name} - ${i + 1}`"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  <!-- ถ้าเป็นช่องสุดท้าย และยังมีรูปเหลือ แสดง +N -->
                  <div
                    v-if="i === 4 && moreCount > 0"
                    class="absolute inset-0 flex items-center justify-center bg-black/40"
                  >
                    <span class="text-white text-3xl sm:text-4xl font-bold"
                      >+{{ moreCount }}</span
                    >
                  </div>

                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
                  ></div>
                </div>
              </template>
            </div>
          </div>

          <!-- กรณีไม่มีรูป -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
          >
            <svg
              class="w-20 h-20 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p class="text-xl font-medium">ไม่มีรูปภาพ</p>
            <p class="text-sm">รอการอัพโหลดรูปภาพ</p>
          </div>
        </div>
        <!-- Description Section - ด้านล่าง -->
        <div class="px-8 pb-8 border-t border-gray-200/50 pt-6">
          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-inner"
          >
            <h2
              class="text-2xl font-semibold text-gray-800 mb-6 flex items-center"
            >
              <svg
                class="w-7 h-7 mr-3 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              รายละเอียด
            </h2>
            <p
              class="text-gray-700 leading-relaxed whitespace-pre-line text-lg"
            >
              {{ product.textile_description }}
            </p>
          </div>
        </div>
        <!-- Footer Info -->
        <div
          class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200/50"
        >
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="text-right text-sm text-gray-500">
              อัพเดทล่าสุด: {{ new Date().toLocaleDateString("th-TH") }}
            </div>
          </div>
        </div>
      </div>
      <!-- Loading State -->
      <div
        v-else
        class="flex flex-col items-center justify-center min-h-[400px]"
      >
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"
          ></div>
        </div>
        <p class="mt-4 text-xl text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
        <p class="text-gray-500">โปรดรอสักครู่</p>
      </div>
    </div>
  </div>
</template>
