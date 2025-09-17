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
          การออกแบบลวดลายผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="design-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การออกแบบลวดลายผ้าทอมือ
        </h2>

        <!-- ความสำคัญในยุคไทยแลนด์ 4.0 -->
        <h3
          id="design-importance"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความสำคัญของการออกแบบ (บริบทไทยแลนด์ 4.0)
        </h3>
        <ol class="list-decimal list-inside indent-8 space-y-3 text-justify">
          <li>
            <span class="font-semibold">ผ้าทอมือเป็นสินค้าแฟชั่น</span> — ต้องตอบสนองความพึงพอใจและความสุขของผู้บริโภค จึงต้องมีทั้ง “คุณค่า” และ “ความงาม” ความรู้ในการออกแบบคือเครื่องมือสร้างคุณค่าและความงามให้ผลิตภัณฑ์ผ้า
          </li>
          <li>
            <span class="font-semibold">ผ้าทอมือสะท้อนวิถี คน และวัฒนธรรม</span> — การออกแบบต้องมี “อัตลักษณ์” ของชุมชนอย่างชัดเจน
          </li>
          <li>
            <span class="font-semibold">การออกแบบคือศิลปะของศิลปินพื้นบ้าน</span> — จำเป็นต้องศึกษาและอธิบายอัตลักษณ์/ตัวตนท้องถิ่นให้ชัด มิฉะนั้นจะ “ทำลายตัวตนชุมชน” มากกว่าส่งเสริมศักยภาพ เมื่อใดชุมชนหมดอัตลักษณ์ เมื่อนั้นชุมชนและชาติพันธุ์ย่อมอ่อนแรง; ในทางกลับกัน หากคงอัตลักษณ์ได้ ไม่ว่ารูปแบบใด ชุมชนและชาติพันธุ์ย่อมยั่งยืน (เทียบกรณีชาติพันธุ์มอญในไทย—สายสัมพันธ์ใกล้ชิดกับเขมร บางครั้งเรียก “มอญ–เขมร”—แม้ไม่มีประเทศมอญ แต่ยังเป็นที่รู้จักผ่านวัฒนธรรมและตัวตนของตนเอง) การคงอัตลักษณ์ช่วยส่งเสริม “การยอมรับความหลากหลาย” และการอยู่ร่วมกันอย่างเป็นสุขของสังคม
          </li>
        </ol>

        <!-- กรอบความรู้ -->
        <h3
          id="jarunee-framework"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          กรอบการออกแบบตาม จารุณี ชัยโชติอนันต์ (2558)
        </h3>
        <p class="text-justify indent-8">
          “การออกแบบผ้า” คือการวางแผนล่วงหน้าว่าจะผลิตผ้าออกมาอย่างไร ใช้ในโอกาสไหน ใครเป็นผู้ใช้ และใช้อย่างไร โดยควรพิจารณาองค์ประกอบหลักดังต่อไปนี้:
        </p>

        <!-- 1. การออกแบบเนื้อผ้า -->
        <h4
          id="fabric-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          1) การออกแบบเนื้อผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>เบอร์ (ขนาด) ของเส้นยืนและเส้นพุ่ง</li>
          <li>เบอร์ฟันหวี / ความถี่–ความหนาของฟันหวี</li>
          <li>ความกว้างของหน้าผ้า</li>
        </ol>

        <!-- 2. การออกแบบลายผ้า -->
        <h4
          id="pattern-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2) การออกแบบลายผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ประโยชน์ใช้สอย — เช่น ผ้านุ่ง ผ้าเมตร ผ้าพันคอ ผ้าคลุมไหล่ ผ้าทอหมอน ฯลฯ</li>
          <li>การให้สี — สีเส้นยืน–สีเส้นพุ่ง เมื่อนำมาทอรวมกันแล้วเกิดอารมณ์ภาพรวมอย่างไร</li>
          <li>ความสวยงามเชิงองค์ประกอบ — ช่องว่าง (negative space) และความสมดุล</li>
        </ol>

        <!-- 3. การออกแบบกระบวนการผลิตและการทอ -->
        <h4
          id="process-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3) การออกแบบกระบวนการผลิตและการทอ
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ขั้นตอนการผลิตและเครื่องมือ — แต่ละขั้นตอนใช้เครื่องมือชนิดใด</li>
          <li>ชนิดของกี่ทอผ้า — เลือกชนิดกี่ให้เหมาะกับลาย/เทคนิค</li>
          <li>การเก็บและเหยียบตะกอ — วิธีจัดตะกอและลำดับเหยียบเพื่อให้เกิดลายตามต้องการ</li>
          <li>วิธีการทอ — จังหวะทอ เทคนิคเฉพาะ และการควบคุมคุณภาพ</li>
        </ol>
      </section>
    </div>
  </div>
</template>

