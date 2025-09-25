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
          ผ้าพื้น
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="plain-silk"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าพื้น (Plain Fabric)
        </h2>

        <p class="text-justify indent-8">
          “ผ้าพื้น” คือผ้าที่มีสีเดียวทั้งผืน ลวดลายจึงเกิดจาก
          <span class="font-medium">โครงสร้างทอ</span> และ
          <span class="font-medium">ผิวสัมผัสของเส้นไหม/เส้นด้าย</span>
          มากกว่าลายพิมพ์หรือมัดย้อม
          ผ้าพื้นบุรีรัมย์โดดเด่นด้วยเส้นไหมที่ช่างทอปลูกหม่อนเลี้ยงไหมและสาวเอง
          ฟอก–ย้อมด้วยสีธรรมชาติ แล้วทอด้วยกี่มือ
          ทำให้ได้ผิวสัมผัสหลากหลายและมีเสน่ห์เฉพาะถิ่น พบได้ทั่วทั้งจังหวัด
          เช่น บ้านหนองเพชร บ้านตะเคียน อำเภอเมือง จังหวัดบุรีรัมย์
        </p>

        <h3
          id="plain-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ความงามอยู่ที่
            <span class="font-medium">ผิวสัมผัส ฝีมือการทอ และสีสัน</span>
            มากกว่าลวดลายพิมพ์
          </li>
          <li>
            ผิวผ้ามักเห็น
            <span class="font-medium"
              >ปุ่ม ปม หรือเส้นนูนคล้ายลูกฟูกเล็ก ๆ</span
            >
            จากเส้นไหมพื้นบ้านและโครงสร้างทอ ทำให้ไม่ยับง่ายและดูมีมิติ
          </li>
          <li>
            ความมันวาวของผ้าเกิดจากการ
            <span class="font-medium"
              >จับคู่ไหมเส้นยืน–เส้นพุ่งต่างขนาด/ต่างคุณสมบัติ</span
            >
            มากกว่าความเงาของตัวเส้นไหมเพียงอย่างเดียว
          </li>
        </ul>

        <h3
          id="plain-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            จากการสำรวจตลาด ผ้าพื้นเป็นหมวดที่
            <span class="font-medium">ผู้บริโภคต้องการมาก</span>
            และมีส่วนแบ่งตลาดสูง เหมาะกับการตัดเย็บเสื้อผ้าสมัยนิยมหลากสไตล์
          </li>
          <li>
            ผ้าไหมพื้นบุรีรัมย์หลายชนิดเป็น
            <span class="font-medium">เนื้อหนา ไม่มันวาวจัด</span>
            จากไหมพันธุ์พื้นบ้าน เส้นใยขนาดใหญ่ ให้ลุคเรียบหรู ใช้ได้หลายโอกาส
          </li>
          <li>
            <span class="font-medium">ดูแลง่าย</span>—ซักรีดคล้ายผ้าฝ้าย
            สวมใส่สบายในชีวิตประจำวัน
          </li>
        </ul>

        <h3
          id="plain-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าพื้นบุรีรัมย์
        </h3>
        <p class="text-justify indent-8">
          แก่นของอัตลักษณ์อยู่ที่ความเป็น “พื้นบ้านแต่งดงาม”:
          เสน่ห์ของเนื้อผ้าและผิวสัมผัสที่ต่างจากแหล่งอื่นอย่างชัดเจน
          เกิดจากเส้นไหมพื้นบ้าน การย้อมสีธรรมชาติ และการทอด้วยกี่มือ
          จนได้ผืนผ้าที่เรียบแต่มีบุคลิก—เป็นเอกลักษณ์ของผ้าพื้นบุรีรัมย์อย่างแท้จริง
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าไหมพื้น.jpg"
            alt="ผ้าไหมพื้น"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้าไหมพื้น ที่มีผิวสัมผัสหยาบมีปุ่มปม
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าไหมพื้น1.jpg"
            alt="ผ้าไหมพื้นที่มีผิวสัมผัสเรียบมัน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 ผ้าไหมพื้นที่มีผิวสัมผัสเรียบมัน
        </p>

      </section>
    </div>
  </div>
</template>
