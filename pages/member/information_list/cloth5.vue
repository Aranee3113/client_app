<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MapPin } from "lucide-vue-next";

const { $axios, $config } = useNuxtApp();

const products = ref([]);
const posts = ref([]);
const route = useRoute();
const loading = ref(true);
const error = ref("");
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

const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post");
    const rows = res.data?.data || [];
    posts.value = rows.map((p) => ({
      ...p,
      images: normalizeImages(p.images),
    }));
  } catch (e) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดโพสต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
  fetchPosts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าขาวม้ายกขิด ผ้าสไบยกขิด
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          คุณลักษณะของผ้า
        </p>
        <p class="mb-4 text-justify indent-8">
          เป็นผ้าที่ผู้รัก<strong>ผ้าไทย</strong>นิยมสะสมอีกชิ้นหนึ่ง
          ราคาขายมีตั้งแต่ <strong>850 – 4500 บาท</strong> ขึ้นอยู่กับ
          <strong>ลวดลาย</strong>, <strong>เนื้อผ้า</strong> และ
          <strong>เรื่องราวของผ้าผืนนั้น</strong> ผู้วิจัยสอบถามพ่อค้าออนไลน์
          <strong>นายกฤษกร แก้วโบราณ</strong> ได้ใจความว่า
          <strong>ผ้าขาวม้ายกขิด</strong>
          เป็นผ้าที่ขายดีที่สุดของเขา ผู้ซื้อส่วนใหญ่จะเป็น
          <strong>ผู้ชายที่รักการแต่งกายและการอนุรักษ์ผ้าไทย</strong>
          ที่ยอมซื้อผ้าราคาสูงจากความ <strong>แปลกใหม่ของสีสัน</strong>,
          <strong>เรื่องราว</strong> และความมั่นใจว่า
          <strong>พ่อค้าทำเองกับมือ</strong> หรือ
          <strong>ควบคุมการทอเองกับมือ</strong>
        </p>
        <div class="mt-8 flex justify-center">
          <div class="text-center w-full max-w-2xl">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด2.jpg"
              alt="ลายม้าทั้งแบบครึ่งลาย"
              class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผ้าขาวม้ายกขิดลายดอกแก้ว
              <br />และลายม้าทั้งแบบครึ่งลายและแบบเต็มลาย
            </p>
          </div>
        </div>

        <br />
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าขาวม้ายกขิด ผ้าสไบยกขิด
        </p>
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด3.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 2 การแต่งกายด้วย<br />ผ้าขาวม้ายกขิดผ้าสไบยกขิด
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด4.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 3 การแต่งกายด้วย<br />ผ้าขาวม้ายกขิดผ้าสไบยกขิด
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด5.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 4 การแต่งกายด้วย<br />ผ้าขาวม้ายกขิดผ้าสไบยกขิด
            </p>
          </div>
        </div>

        <br />
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </p>

        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านไม้แดง, บ้านตะเคียน, บ้านสวายเจริญ
        </p>
      </div>
    </div>
  </div>
</template>
