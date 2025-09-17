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
          ผ้าลวดลายรูปคนและสัตว์
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-figures-animals"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายรูปคนและสัตว์
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          ลายสัตว์บนผืนผ้าของชาวบุรีรัมย์มีทั้งสัตว์ในจินตนาการและสัตว์ที่เคารพนับถือ
          เช่น
          <span class="font-medium">ลายนาค</span>
          รวมถึงสัตว์พาหนะอย่างช้างและม้า สัตว์เลี้ยงใกล้ตัวอย่างไก่
          และสัตว์ที่งดงามประทับใจ เช่น กวาง นกยูง เป็นต้น
          สำหรับการถ่ายทอดรูปลักษณ์บนผืนผ้า มีทั้งแบบอยู่ในกรอบเรขาคณิต
          แบบเชิงจินตนาการ และแบบภาพเสมือนจริง
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-figures-animals-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            กลุ่มลายสัตว์หลัก:
            <span class="font-medium">สัตว์ในจินตนาการ/เคารพนับถือ</span> (เช่น
            นาค), <span class="font-medium">สัตว์พาหนะ</span> (ช้าง ม้า),
            <span class="font-medium">สัตว์เลี้ยง</span> (ไก่), และ
            <span class="font-medium">สัตว์งดงาม</span> ที่สร้างความประทับใจ
            (กวาง นกยูง)
          </li>
          <li>
            ลายรูปคนอาจปรากฏร่วมฉากกับสัตว์ พิธีกรรม หรือการละเล่น
            ในเชิงสัญลักษณ์ของวิถีชุมชน
          </li>
          <li>
            รูปแบบการถ่ายทอดมี <span class="font-medium">3 ลักษณะ</span>:
            <span class="font-medium">ในกรอบเรขาคณิต</span>,
            <span class="font-medium">ตามจินตนาการ (สไตลิสต์)</span>, และ
            <span class="font-medium">ภาพเสมือนจริง</span>
          </li>
          <li>
            โครงสร้างลายอาศัยการ
            <span class="font-medium">นับเส้น–จัดจังหวะ–ทำซ้ำ</span>
            เพื่อให้รูปคน/สัตว์อ่านออกชัดเจน และกลมกลืนกับจังหวะของผืนผ้า
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-figures-animals-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นหมวดลายที่ผู้คน <span class="font-medium">เข้าถึงง่าย</span>
            เพราะอ้างอิงสิ่งมีชีวิตที่คุ้นเคยและมีความหมายในท้องถิ่น
          </li>
          <li>
            เหมาะกับการเล่าเรื่อง (storytelling) บนผืนผ้า ใช้ได้ทั้งเป็น
            <span class="font-medium">ลายหลัก</span> หรือ
            <span class="font-medium">ลายประกอบ</span>
            เพื่อเพิ่มมิติให้ภาพรวมของผืน
          </li>
          <li>
            การเลือกโทนสีและจังหวะลายสามารถสะท้อน
            <span class="font-medium">บรรยากาศพิธีกรรม–วิถีชีวิต</span>
            และความรู้สึกที่ต้องการสื่อ
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-figures-animals-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ลวดลายรูปคนและสัตว์
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์เด่นคือการผสาน
          <span class="font-medium">ความเชื่อท้องถิ่น</span> (เช่น สัญลักษณ์
          <span class="font-medium">นาค</span>) เข้ากับ
          <span class="font-medium">วิถีชีวิตจริง</span> ผ่านรูปคนและสัตว์
          พร้อมปรับรูปแบบตั้งแต่กรอบเรขาคณิตไปจนถึงภาพเสมือนจริง
          ทำให้ผืนผ้าทั้งคงเสน่ห์แบบดั้งเดิมและเปิดพื้นที่ให้ความคิดสร้างสรรค์ร่วมสมัย
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายนกยูง.jpg"
            alt="ผ้ามัดหมี่ลายนกยูง"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้ามัดหมี่ลายนกยูง
        </p>
      </section>
    </div>
  </div>
</template>
