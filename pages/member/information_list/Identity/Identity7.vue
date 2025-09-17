<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-12 md:py-16 px-4 sm:px-6 lg:px-8"
  >
    <!-- ปุ่มกลับด้านบน -->
    <CommonButtonBack class="mb-6" />

    <div class="mx-auto w-full max-w-6xl space-y-10 md:space-y-12">
      <!-- หัวข้อหลัก -->
      <header class="text-center">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าลวดลายจากรูปลักษณ์ของข้าวของเครื่องใช้
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-objects"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายจากรูปลักษณ์ของข้าวของเครื่องใช้
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          คนโบราณมีจินตนาการสูง
          เห็นสิ่งของใกล้ตัวแล้วถ่ายทอดเป็นลวดลายผ้าได้อย่างหลากหลาย
          ข้าวของเครื่องใช้ในชีวิตประจำวันจึงถูกตีความเป็นลายบนผ้ามัดหมี่ เช่น
          <span class="font-medium">ลายเชี่ยนหมาก</span>,
          <span class="font-medium">ลายขันบายศรี</span>
          ตลอดจนชื่อที่แฝงอารมณ์ขันอย่าง
          <span class="font-medium">ลายประแจบ่ไข</span>
          (หมายถึงลูกกุญแจที่ไขไม่ได้)
          ปัจจุบันช่างทอยังคงออกแบบลายจากสิ่งของร่วมสมัย
          และพยายามเชื่อมโยงอัตลักษณ์ท้องถิ่นเข้าสู่ลวดลาย
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-objects-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ต้นกำเนิดลายจาก
            <span class="font-medium">ข้าวของเครื่องใช้ใกล้ตัว</span>
            และการสังเกตในชีวิตประจำวัน แปลงเป็นรูปทรงเชิงสัญลักษณ์บนผ้า
          </li>
          <li>
            ตัวอย่างลายดั้งเดิม:
            <span class="font-medium">ลายเชี่ยนหมาก, ลายขันบายศรี</span>
            และลายที่ตั้งชื่ออย่างมีอารมณ์ขัน เช่น
            <span class="font-medium">ลายประแจบ่ไข</span>
          </li>
          <li>
            ความร่วมสมัย: ยังคง
            <span class="font-medium">รูปลักษณ์คล้ายลายเดิม</span>
            แต่ตั้งชื่อ/ตีความใหม่ตามสิ่งแวดล้อมปัจจุบัน เช่น
            <span class="font-medium"
              >ลายยางล้อรถไถ, ลายอิฐบล็อก, ลายปลาหมึก, ลายการบินไทย</span
            >
          </li>
          <li>
            ใช้กระบวนการมัดหมี่ในการ
            <span class="font-medium">นับเส้น–จัดจังหวะ</span>
            เพื่อคงความสมดุลของลาย และให้จดจำได้ง่าย
          </li>
          <li>
            เปิดโอกาสให้ <span class="font-medium">สร้างสรรค์ต่อยอด</span>
            โดยคงแก่นเดิมและเพิ่มรายละเอียดหรือชื่อเรียกที่สะท้อนยุคสมัย
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-objects-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นหมวดลายที่ผู้บริโภค <span class="font-medium">เข้าถึงง่าย</span>
            เพราะมาจากสิ่งของคุ้นตา สื่อสารเรื่องราวได้ตรงไปตรงมา
          </li>
          <li>
            เหมาะกับการพัฒนาเป็น
            <span class="font-medium">สินค้าที่ระลึก/ของฝากชุมชน</span>
            งานเทศกาลท้องถิ่น และชุดร่วมสมัยที่ต้องการจุดเด่นด้านเรื่องเล่า
            (storytelling)
          </li>
          <li>
            ประยุกต์ใช้ได้กับ <span class="font-medium">ผ้าทอหลายชนิด</span>
            (เช่น ผ้ามัดหมี่ลายหลักหรือลายประกอบ) และขนาดผืนต่าง ๆ
            ตามวัตถุประสงค์การใช้งาน
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-objects-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าลวดลายจากข้าวของเครื่องใช้
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์สำคัญอยู่ที่การ
          <span class="font-medium">เชื่อมโยงวิถีชีวิตกับลวดลาย</span>:
          ใช้สิ่งของใกล้ตัวเป็นแรงบันดาลใจ
          คงเสน่ห์ชื่อเรียกแบบพื้นบ้านและอารมณ์ขัน
          พร้อมปรับชื่อ–ความหมายให้สอดคล้องกับ
          <span class="font-medium">สิ่งแวดล้อมร่วมสมัย</span>
          อีกทั้งยังสะท้อนความพยายามของชุมชนในการ
          <span class="font-medium">สื่ออัตลักษณ์ท้องถิ่น</span>
          ผ่านผ้าทอมือ
          ให้ผืนผ้าเป็นสื่อทางวัฒนธรรมที่มีชีวิตและเติบโตไปกับยุคสมัย
        </p>
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายฟันเลื่อย.jpg"
            alt="ผ้ามัดหมี่ลายฟันเลื่อย"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผ้ามัดหมี่ลายฟันเลื่อย
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายประแจบ่ไข.jpg"
            alt="ผ้ามัดหมี่ลายประแจบ่ไข"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 2 ผ้ามัดหมี่ลายประแจบ่ไข
            </p>
          </div>
        </div>
        <br />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายยางล้อ.jpg"
            alt="ผ้ามัดหมี่ลายยางล้อรถไถ"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 3 ผ้ามัดหมี่ลายยางล้อรถไถ
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายเชิงเทียน.jpg"
            alt="ผ้ามัดหมี่ลายเชิงเทียน"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 4 ผ้ามัดหมี่ลายเชิงเทียน
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
