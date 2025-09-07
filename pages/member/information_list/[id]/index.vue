<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Star } from "lucide-vue-next";       
import { useCookie } from "#app";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const product = ref(null);
const loading = ref(true);

// ---------- รูปภาพสินค้า ----------
const allImages = computed(() =>
  product.value?.images ? product.value.images : []
);
const collageImages = computed(() => allImages.value.slice(0, 5));
const moreCount = computed(() => Math.max(allImages.value.length - 5, 0));

const normalizeImages = (raw) => {
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
  const fileBase = config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${fileBase}${path}`;
};

// ---------- ดึงข้อมูลผ้า ----------
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

// ---------- ⭐ Rating สำหรับผ้าทอ ----------
const tokenCookie = useCookie("token");
const itemId = computed(() => Number(route.params.id));

// ถ้ามี endpoint สำหรับ textile rating ให้ตั้งใน runtimeConfig.public.textileRatingPath
// เช่น "/textile-rating" ไม่งั้น fallback ใช้ "/rating"
const ratingPath = config?.public?.textileRatingPath || "/rating";

const myRating = ref(null); // คะแนนของฉัน (1..5 หรือ null)
const ratingSummary = ref({ avg: 0, count: 0 });
const ratingLoading = ref(false);

// โหลดสรุปและคะแนนของฉัน
const loadTextileRating = async () => {
  try {
    // summary
    const sumRes = await $axios.get(`${ratingPath}/${itemId.value}/summary`);
    const sum = sumRes?.data?.data ?? { avg: 0, count: 0 };
    ratingSummary.value = {
      avg: Number(sum?.avg ?? 0),
      count: Number(sum?.count ?? 0),
    };

    // my rating (ต้องมี token)
    const token = tokenCookie.value || "";
    if (!token) {
      myRating.value = null;
      return;
    }
    const myRes = await $axios.get(`${ratingPath}/${itemId.value}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mine = myRes?.data?.data;
    myRating.value = mine?.stars ?? null;
  } catch (err) {
    console.error("loadTextileRating error:", err);
  }
};

// ให้คะแนน/แก้คะแนน
const setTextileRating = async (stars) => {
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนให้คะแนน");
      return;
    }
    ratingLoading.value = true;
    await $axios.post(
      `${ratingPath}/${itemId.value}`,
      { stars },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await loadTextileRating();
  } catch (err) {
    console.error("setTextileRating error:", err);
    alert("ให้คะแนนไม่สำเร็จ");
  } finally {
    ratingLoading.value = false;
  }
};

// ลบคะแนนของฉัน
const removeTextileRating = async () => {
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    ratingLoading.value = true;
    await $axios.delete(`${ratingPath}/${itemId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadTextileRating();
  } catch (err) {
    console.error("removeTextileRating error:", err);
    alert("ลบคะแนนไม่สำเร็จ");
  } finally {
    ratingLoading.value = false;
  }
};

// ---------- เริ่มโหลด ----------
onMounted(async () => {
  await fetchProduct();
  await loadTextileRating();
});
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
            <span class="text-lg font-medium">{{ product.textile_location }}</span>
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
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
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
                    <span class="text-white text-3xl sm:text-4xl font-bold">+{{ moreCount }}</span>
                  </div>

                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
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
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-inner">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
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
            <p class="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {{ product.textile_description }}
            </p>
          </div>
        </div>

        <!-- ⭐ Rating Section (ต่อจากรายละเอียด) -->
        <div class="px-8 pb-8 pt-4">
          <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between flex-wrap gap-4">
              <h3 class="text-xl font-semibold text-gray-800">ให้คะแนน</h3>

              <div class="flex items-center gap-3">
                <!-- ปุ่มกดดาว 1..5 -->
                <div class="flex items-center">
                  <button
                    v-for="s in 5"
                    :key="s"
                    class="p-1"
                    :title="`ให้ ${s} ดาว`"
                    :disabled="ratingLoading"
                    @click="setTextileRating(s)"
                  >
                    <Star
                      class="w-7 h-7 transition-transform hover:scale-110"
                      :class="[(myRating ?? 0) >= s ? 'text-yellow-400' : 'text-gray-300']"
                      :fill="(myRating ?? 0) >= s ? 'currentColor' : 'none'"
                    />
                  </button>
                </div>

                <!-- ค่าเฉลี่ย / จำนวนโหวต -->
                <div class="text-sm text-gray-700">
                  ⭐ {{ ratingSummary.avg.toFixed(2) }}
                  <span class="text-gray-500">({{ ratingSummary.count }} โหวต)</span>
                </div>

                <!-- ปุ่มลบดาวของฉัน -->
                <button
                  v-if="myRating != null"
                  class="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  :disabled="ratingLoading"
                  @click="removeTextileRating()"
                >
                  🗑 ลบดาว
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200/50">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="text-right text-sm text-gray-500">
              อัพเดทล่าสุด: {{ new Date().toLocaleDateString("th-TH") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex flex-col items-center justify-center min-h-[400px]">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p class="mt-4 text-xl text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
        <p class="text-gray-500">โปรดรอสักครู่</p>
      </div>
    </div>
  </div>
</template>

