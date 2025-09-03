<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const products = ref([]);

// ---- Helpers ----
// base สำหรับไฟล์ภาพ (รองรับกรณี apiBase ลงท้าย /api)
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

// สร้าง URL รูปให้ถูกต้อง
const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// รองรับทั้ง array และ JSON string จาก JSON_ARRAYAGG
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

const fetchProducts = async () => {
  try {
    const res = await $axios.get("/product");
    if (res.status === 200) {
      const rows = res.data?.data || [];
      products.value = rows.map((p) => ({
        ...p,
        images: normalizeImages(p.images),
      }));
    }
  } catch (error) {
    console.error("โหลดข้อมูลผ้าไม่สำเร็จ", error);
  }
};

onMounted(fetchProducts);

watch(products, () => {
  console.log(
    "loaded image path:",
    products.value.map((p) => p.images?.[0]?.textile_image_path)
  );
});
</script>

<template>
  <CommonButtonBack />
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad]">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-purple-800">
          รายการข้อมูลผ้า
        </h2>
        <div class="flex flex-col items-end space-y-2 ">
          <NuxtLink
            to="/admin/information/add"
            class="inline-flex items-center px-5 py-2  bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all "
          >
            + เพิ่มข้อมูลผ้า
          </NuxtLink>
          <NuxtLink
            to="/admin/dashboard"
            class="px-6 py-2 rounded-lg text-white font-medium  bg-purple-400 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 text-center font-semibold">ID</th>
              <th class="py-3 px-4 font-semibold">ชื่อ</th>
              <th class="py-3 px-4 font-semibold">สถานที่</th>
              <th class="py-3 px-4 font-semibold">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.textile_id" class="hover:bg-gray-50 transition">
              <td class="py-3 px-4 text-center">{{ product.textile_id }}</td>
              <td class="py-3 px-4">{{ product.textile_name }}</td>
              <td class="py-3 px-4">{{ product.textile_location }}</td>

              <td class="py-3 px-4 text-center">
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="getImageUrl(product.images[0].textile_image_path)"
                  alt="รูปผ้า"
                  class="w-20 h-20 object-cover rounded-lg mx-auto border"
                  loading="lazy"
                />
                <span v-else class="text-gray-400 italic text-sm">ไม่มีรูป</span>
              </td>

              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/information"
                    :params="product.textile_id"
                  />
                  <CommonButtonDeletebutton
                    type="product"
                    :params="product.textile_id"
                    @deleted="fetchProducts"
                    path="product"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="products.length === 0">
              <td colspan="5" class="text-center text-gray-400 py-6">ไม่มีข้อมูลผ้าในระบบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
