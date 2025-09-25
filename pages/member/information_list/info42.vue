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
          การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
        </h1>
      </header>

      <section
  class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
>
  <h2
    id="yarn-finishing"
    class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
  >
    การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
  </h2>

  <p class="text-justify indent-8">
    การตกแต่งเส้นด้ายยืนหรือเส้นด้ายพุ่ง “ควรทำหรือไม่” ขึ้นอยู่กับการใช้งานและลักษณะทางกายภาพของเส้นไหม/เส้นด้าย
    จุดมุ่งหมายหลักมีสองแบบคือ (ก) ให้เส้นเรียบ อยู่ตัว และลื่น เพื่อทอได้ไหลลื่นบนฟันหวี–ตะกอ และ (ข) ให้สัมผัสนุ่มลื่น
    ทั้งนี้ช่างทอใช้ดุลยพินิจและทักษะในการเลือกสูตรที่เหมาะสม
  </p>

  <h3
    id="finishing-goals"
    class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
  >
    วัตถุประสงค์และแนวทางเลือกสารตกแต่ง
  </h3>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>
      <span class="font-medium">ต้องการให้ “เรียบ–อยู่ตัว–ลื่น”</span>:
      ผสมน้ำยาอัดกลีบลงในน้ำแป้งที่ใช้เคลือบเส้น (สูตรแม่บ้าน/ชุมชน) อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">ต้องการให้ “นุ่ม–ลื่น”</span>:
      แช่เส้นด้ายในน้ำยาปรับผ้านุ่ม อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">กรณีใช้ “ไหมเปลือกนอก” เป็นเส้นพุ่ง (ไม่ตีเกลียว)</span>:
      ควรแช่ในน้ำยารีดผ้าเรียบ อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span> เพื่อลดการแตกฟูและช่วยให้ไหลลื่นขณะพุ่ง.
    </li>
  </ul>
  <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ไหมเปลือนอก.jpg"
            alt="ไหมเปลือกนอก"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ไหมเปลือกนอก
        </p>
  <h4
    id="finishing-steps"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    ขั้นตอนแนะนำแบบสั้น
  </h4>
  <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
    <li>ผสมสารตามอัตราส่วนที่เลือกในน้ำสะอาด คนให้เข้ากัน</li>
    <li>แช่เส้นด้ายให้ชุ่ม ทิ้งไว้ 5–15 นาที (ขึ้นกับขนาดเส้น/ความหนา)</li>
    <li>ยกขึ้นบีบหมาด จัดเส้นให้เรียงไม่พันกัน</li>
    <li>ผึ่งในที่ร่ม อากาศถ่ายเท จนแห้งพอดี (ไม่ตากแดดจัดเพื่อลดการกรอบ)</li>
  </ol>

  <h4
    id="finishing-notes"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    หมายเหตุการใช้งาน
  </h4>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>ทดสอบกับเส้นปริมาณเล็กน้อยก่อนผลิตจริง เพื่อดูผลความลื่น ความอยู่ตัว และการเข้ากันของสี</li>
    <li>อย่าใส่สารตกแต่งมากเกินไป เพราะอาจเกิดคราบสะสม ทำให้ฟันหวี–ตะกอเหนียว และเส้นขาดง่าย</li>
    <li>เลือกสูตรต่างกันระหว่าง “เส้นยืน” (เน้นความทน–อยู่ตัว–ลื่นผ่านตะกอ) กับ “เส้นพุ่ง” (เน้นไหลลื่นและผิวสัมผัส)</li>
    <li>หากจะย้อมสีหลังตกแต่ง ควรล้างออกให้เหมาะสมเพื่อลดผลกระทบต่อการติดสี</li>
  </ul>
</section>

    </div>
  </div>
</template>
