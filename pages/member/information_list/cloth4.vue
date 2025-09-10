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
          ผ้าผ้ายกดอก และผ้าสไบยกดอก
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <!-- คุณลักษณะของผ้า -->
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          คุณลักษณะของผ้า
        </p>
        <p class="mb-4 text-justify indent-8">
          <strong>ผ้ายกดอก</strong> เป็นห่มตัว ชาวบ้านเรียก
          <strong>“สไบ”</strong> เป็นผ้าที่นิยมใช้อีกชิ้นหนึ่ง ดั้งเดิมมักทอเป็น
          <strong>ผ้ายกดอก</strong> มากกว่าผ้าลาย ทอเป็นผ้าพื้นสีขาว
          เมื่อต้องการให้เป็นสีอื่นจึงนำไปย้อมทั้งผืน ที่นิยมมากคือการ
          <strong>ย้อมมะเกลือ</strong> ให้เป็นสีดำ สังเกตว่า
          <strong>ผ้าห่มตัวหรือผ้าสไบ</strong> นี้มักใช้ติดตัวประจำ
          และไม่ใคร่ได้ซัก ใช้พันรอบตัว เช็ดเหงื่อ เช็ดน้ำหมาก
          ดังนั้นการย้อมด้วยมะเกลือให้เป็นสีดำ
          จึงช่วยไม่ให้ผ้าดูดฝุ่นและรอยเปื้อนได้ง่าย นอกจากการเพิ่ม
          <strong>น้ำหนักผ้า</strong> เพิ่ม <strong>ความเหนียว</strong> และเพิ่ม
          <strong>กลิ่นเฉพาะของมะเกลือ</strong>
        </p>

        <p class="mb-0 text-justify indent-8">
          <strong>แรงบันดาลใจในการออกแบบลายผ้ายกดอก</strong>
          มาจากหลายส่วนด้วยกัน คือ ส่วนที่ 1 ได้มาจาก
          <strong
            >ผ้ายกดอกของชาวเขมรที่เกาะดัจ กรุงพนมเปญ สาธารณรัฐกัมพูชา</strong
          >
          ที่ผู้วิจัยได้เคยไปเก็บข้อมูลและเยี่ยมเยียน มามากกว่า
          <strong>5 ครั้ง</strong> ในระหว่าง
          <strong>10 ปีที่ผ่านมา</strong> ผู้วิจัยจึงอยากอนุรักษ์
          <strong>กระบวนการผลิตผ้ายกดอก</strong>
          ที่กำลังจางหายไปจากสาธารณรัฐกัมพูชา ในฐานะที่
          <strong>บุรีรัมย์</strong> ก็มี <strong>เขมรสูง คะแมร์ลือ</strong>
          อยู่ในทุกพื้นที่ของจังหวัด และในฐานะที่มี
          <strong>วัฒนธรรมอาเซียนร่วมกัน</strong>
        </p>

        <!-- ภาพผ้ายกดอก -->
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก1.jpg"
              alt="ผ้าผ้ายกดอก1"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผืนผ้ายกดอกลาย ดอกกันเกรา
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก2.jpg"
              alt="ผ้าผ้ายกดอก2"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 2 ผ้าผืนสไบผ้ายกดอกลาย<br />ดอกแก้วกาหลง
            </p>
          </div>
        </div>

        <!-- การแต่งกาย -->
        <p class="mt-12 text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าผ้ายกดอก และผ้าสไบยกดอก
        </p>

        <div class="flex justify-center gap-8">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก3.jpg"
              alt="การแต่งกายด้วยผ้าผ้ายกดอกและผ้าสไบยกดอก"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <p class="italic mt-2">
              ภาพที่ 3 การแต่งกายผู้หญิง<br />ด้วยผ้าผ้ายกดอก
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก4.jpg"
              alt="การแต่งกายด้วยผ้าผ้ายกดอกและผ้าสไบยกดอก"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <p class="italic mt-2">
              ภาพที่ 4 การแต่งกายผู้หญิง<br />ด้วยผ้าสไบยกดอก
            </p>
          </div>
        </div>
        <!-- แหล่งที่มา -->
        <p
          class="mt-12 text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </p>
        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านสวายเจริญ, บ้านไม้แดง, บ้านตะเคียน
        </p>
      </div>
    </div>
  </div>
</template>

