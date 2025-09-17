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
          อัตลักษณ์ผ้าบุรีรัมย์
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="buriram-identity"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ความรู้เกี่ยวกับอัตลักษณ์ผ้าบุรีรัมย์
        </h2>

        <p class="text-justify indent-8">
          อ้างถึงแนวคิดของ
          <span class="font-medium">จารุณี ชัยโชติอนันต์ (2555)</span> ในหนังสือ
          <span class="italic">สืบสานตำนาไหมบุรีรัมย์</span>
          การทอผ้าทอมือสัมพันธ์แนบแน่นกับ “ความเป็นชุมชน” และ “วัฒนธรรมชุมชน”
          ลวดลาย–กระบวนการทอคือองค์ความรู้ที่สืบทอดยาวนาน
          ผ้ามีบทบาทเฉพาะในสังคม: เป็นเครื่องนุ่งห่ม,
          องค์ประกอบพิธีกรรมเกิด–แก่–เจ็บ–ตาย, ชุดพิเศษยามรื่นเริง, ตลอดจนเป็น
          “เครื่องวัดความพร้อม” ของคนในบางบริบท
          ลวดลาย–สีสันจึงสื่อความหมายต่างกันตามวัตถุประสงค์การใช้และวิธีคิดของสังคม
        </p>

        <h3
          id="identity-dynamics"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลวดลาย: ความเปลี่ยนแปลง–ความคงทน
        </h3>
        <p class="text-justify indent-8">
          ลายผ้าทอมือ “เปลี่ยนไปตามสังคมและวิถีชีวิต” บางลายเป็นแฟชั่น
          (มา–ไปตามกาลเวลา) แต่อีกหลายลาย “คงอยู่” เนิ่นนานร้อย–พันปี
          เพราะทำหน้าที่เป็นสัญลักษณ์ทางสังคม
          และบรรจุเรื่องเล่าของชุมชนไว้ในโครงสร้างผ้า สี และองค์ประกอบ
        </p>

        <h3
          id="shared-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          เหมือนในความต่าง: 4 กลุ่มชาติพันธุ์ในบุรีรัมย์
        </h3>
        <p class="text-justify indent-8">
          ผ้าทอมือบุรีรัมย์จาก
          <span class="font-medium">ไทยเดิ้ง, ลาว, เขมร, กูย</span> มี
          “อัตลักษณ์ร่วม” จำนวนมาก จนกล่าวได้ว่า
          <span class="font-semibold">ความเหมือนในความแตกต่าง</span> —
          เปรียบดังการจัดดอกไม้ต่างสี แต่ลงตัวสวยงาม ลวดลาย/สีสันของ
          “ลาวบุรีรัมย์” อาจต่างจากลาวพื้นที่ไกล แต่คล้ายคลึงกับลาวพื้นที่ใกล้
          แม้ข้ามเขตจังหวัด แสดงให้เห็นว่า
          <span class="font-medium">พรมแดนการปกครอง</span> ไม่ทับซ้อนกับ
          <span class="font-medium">พรมแดนทางวัฒนธรรม</span> เสมอไป
          ผ้าทอมือจึงทำหน้าที่เป็น “สื่อสัญลักษณ์” สะท้อนสังคมแต่ละห้วงเวลา
          ผ่านลาย สี เนื้อ และรูปลักษณ์
        </p>

        <h3
          id="symbolic-reading"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อ่านลายผ้าเพื่ออ่านสังคม
        </h3>
        <p class="text-justify indent-8">
          การเรียนรู้ “สัญลักษณ์บนผืนผ้า”
          ช่วยให้เข้าใจวิถีชีวิต–อุปนิสัยของผู้คน เกิดการยอมรับ
          “ความเหมือนที่แตกต่าง” และเห็นคุณค่าความงามที่หลากหลาย
          ผ้าทอมือจึงเป็นเครื่องมือสร้างสังคมสงบสุข—เมื่อเรามองเห็นคุณค่าความงามของผ้าแต่ละชิ้น
          เราก็พร้อมเห็นคุณค่าความงามของ “ผู้คน” ที่อยู่ร่วมกัน
        </p>

        <h3
          id="identity-patterns"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ประเภทลวดลายอัตลักษณ์ร่วม (กลุ่มไทยในบุรีรัมย์)
        </h3>
        <p class="text-justify indent-8">
          ลวดลายอัตลักษณ์ที่พบร่วมกันโดยสังเขป (ตัวอย่าง
          <span class="font-medium">8 ประเภทหลัก</span>):
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ผ้าพื้น</span> — เน้นผิว–สี–ความเรียบง่าย
            ใช้ได้อเนกประสงค์
          </li>
          <li>
            <span class="font-medium">ผ้าลายริ้ว</span> — ริ้วขวาง/ริ้วตามยืน
            สร้างจังหวะและน้ำหนักสี
          </li>
          <li>
            <span class="font-medium">ผ้าลายตาราง</span> — สมดุล–เป็นทางการ
            เหมาะทั้งใช้สอยและพิธีการ
          </li>
          <li>
            <span class="font-medium">ลายเรขาคณิต</span> — เช่น ลายโคม, ลายขอ,
            ลายนาค, ลายหมากจับ, ลายขาเปีย ฯลฯ (สื่อความเชื่อ ความศักดิ์สิทธิ์
            ความคุ้มครอง)
          </li>
          <li>
            <span class="font-medium">ลายจากข้าวของเครื่องใช้</span> —
            หยิบรูปทรงชีวิตประจำวันมาสร้างความหมายใหม่
          </li>
          <li>
            <span class="font-medium">ลายจากงานสถาปัตยกรรม</span> —
            รับอิทธิพลลวดลายศิลป์–ศาสนสถานในถิ่น
          </li>
          <li>
            <span class="font-medium">ลายจากพืชพรรณธรรมชาติ</span> — ดอก ใบ เถา
            เฉดสีจากภูมิทัศน์ท้องถิ่น
          </li>
          <li>
            <span class="font-medium">ลายประยุกต์–ประสมประสาน</span> —
            ผสานเทคนิค/แรงบันดาลใจร่วมสมัยและดั้งเดิม
          </li>
        </ul>
        <p class="text-justify indent-8">
          ทั้ง 4 กลุ่มชาติพันธุ์ทอได้ครบหมวดหมู่ข้างต้น สีสัน “หลากหลาย”
          แต่ระดับความเข้ม น้ำหนักสี และการจัดองค์ประกอบแตกต่างไปตาม
          “รสนิยมชุมชน” และ “บริบทการใช้” (เช่น งานพิธี–งานประจำวัน)
        </p>
      </section>
    </div>
  </div>
</template>
