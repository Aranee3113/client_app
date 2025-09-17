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
          เทคนิคการผลิตผ้าทอมือ
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
          การผลิตผ้าทอมือ
        </h2>

        <p class="text-justify indent-8">
          การผลิตผ้าทอมือ ช่างทออาศัยองค์ความรู้ตั้งแต่การเตรียมเส้นใย
          การกำหนดเบอร์เส้นด้าย การคำนวณฟันหวี–เส้นยืน ตลอดจนการฟอกและย้อมเส้นใย
          เพื่อให้ได้ผืนผ้าที่มีคุณภาพ ลวดลาย สีสัน และคุณสมบัติตามต้องการ
        </p>

        <!-- การเตรียมเส้นใยและระบบเบอร์ -->
        <h3
          id="fiber-prep"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          1) การเตรียมเส้นใย และระบบเบอร์เส้นด้าย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยที่ใช้เป็นเส้นยืน–เส้นพุ่งอาจผลิตเองหรือซื้อสำเร็จรูป
          โดยเส้นใยที่ซื้อจะระบุ “เบอร์” ชัดเจน ซึ่งมีระบบหลักดังนี้:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ระบบดีเนียร์ (Denier; D)</span> —
            ใช้กับเส้นไหม นิยาม: 1 ดีเนียร์ = เส้นยาว 9,000 เมตร หนัก 1 กรัม
            (เบอร์ยิ่งสูง เส้นยิ่ง “ใหญ่–หนัก”
            ในมวลเท่ากันเส้นจะสั้นกว่าเบอร์ต่ำ)
          </li>
          <li>
            <span class="font-medium">ระบบเท็กซ์ (Tex; T)</span> —
            ใช้กับฝ้าย/เส้นใยสังเคราะห์ นิยาม: 1 เท็กซ์ = เส้นยาว 1,000 เมตร
            หนัก 1 กรัม (ยิ่งเลข Tex สูง เส้นยิ่ง “ใหญ่–หนัก”)
          </li>
        </ul>
        <p class="text-justify indent-8">
          ตัวอย่างการแสดงสเปกเส้นด้าย: ไหมจุล “4 เส้น ขนาด 25/30 เกลียว 170 รอบ”
          หมายถึงรวม ~4×27.5D ≈ 110D ตีเกลียว 170 รอบ/นิ้ว
          เหมาะทำเส้นพุ่งให้ผ้าเนื้อหนา; สเปกฝ้ายแบบอุตสาหกรรม เช่น
          <span class="whitespace-nowrap">20/1, 40/2, 60/2, 180/2</span>
          อ่านว่าเบอร์–จำนวนเส้นควบ ตัวอย่าง:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            <span class="font-medium">20/1</span> เส้นใหญ่ปานกลาง เหนียวน้อย
            เหมาะเส้นพุ่ง
          </li>
          <li>
            <span class="font-medium">40/2</span> เส้นกลาง เหนียวกว่า 20/1
            ใช้ได้ทั้งยืน–พุ่ง
          </li>
          <li>
            <span class="font-medium">60/2</span> เส้นเล็ก เหนียว
            ใช้เย็บทั่วไป/เส้นยืนผ้าฝ้ายเนื้อละเอียด
          </li>
          <li>
            <span class="font-medium">180/2</span> เส้นเล็กมาก
            เหมาะเย็บผ้าเนื้อบาง/เส้นยืน–พุ่งผ้าบาง
          </li>
        </ul>

        <!-- วิธีคำนวณ -->
        <h3
          id="calc"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          2) วิธีคำนวณที่จำเป็น
        </h3>

        <h4
          id="calc-reed"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.1 การหาจำนวนช่องฟันหวี (ฟืม/รีด)
        </h4>
        <p class="text-justify indent-8">
          วิธีชุมชนพื้นบ้านนิยม “นับเป็นหลบ” (1 หลบ = 40 ช่องฟันหวี)
          และหน่วยย่อย “ควม” (1 ควม = 4 ช่อง) ตัวอย่าง:
          <span class="whitespace-nowrap">ฟืม 21 หลบ 2 ควม</span>
          = (40×21) + (4×2) = 848 ช่องฟันหวี
        </p>
        <p class="text-justify indent-8">
          แบบอุตสาหกรรมจะใช้:
          <span class="font-medium">เบอร์ฟันหวี × หน้าผ้า (นิ้ว)</span>
          ตัวอย่าง ฟันหวีเบอร์ 50, หน้าผ้า 40 นิ้ว ⇒ 50×40 = 2,000 ช่อง
        </p>

        <h4
          id="calc-warp"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.2 การคำนวณจำนวนเส้นยืน / ความยาว / น้ำหนักเส้นไหม
        </h4>
        <p class="text-justify indent-8">
          ต้องทราบ (ก) จำนวนช่องฟันหวี (ข) ความยาวผ้า (ค) จำนวนเส้นต่อ 1 ช่อง
          (ง) เบอร์เส้นด้าย ตัวอย่างโจทย์:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            ฟันหวี = 2,000 ช่อง; เพิ่มความหนาริมด้านละ 10 ช่อง ⇒ รวมริม 20 ช่อง
          </li>
          <li>จำนวนเส้นต่อ 1 ช่อง = 2 เส้น</li>
          <li>เส้นไหม 20 ดีเนียร์</li>
          <li>หน้าผ้า 40 นิ้ว (กรณีคำนวณได้ 2,000 ช่องตามตัวอย่างข้างบน)</li>
          <li>
            ความยาวผ้าสำหรับคำนวณ
            <span class="font-medium">สมมุติ 20 เมตร</span> (หมายเหตุ:
            หากต้องการคำนวณที่ 16 เมตร ให้แทนค่าตามจริงได้)
          </li>
        </ul>

        <div >
          <p class="font-semibold">
            ตารางที่ 2.1 วิธีคำนวณหาจำนวนเส้นยืน (ตัวอย่าง)
          </p>
          <ol class="list-decimal list-inside mt-2 space-y-2 text-justify">
            <li>
              <span class="font-medium">จำนวนเส้นยืนทั้งหมด</span><br />
              = (จำนวนเส้น/ช่อง) × (จำนวนช่องทั้งหมด) + (ช่องริมทั้งสองด้าน)<br />
              = (2 × 2000) + 20 = <span class="font-medium">4,020 เส้น</span>
            </li>
            <li>
              <span class="font-medium">ความยาวเส้นยืนรวม</span><br />
              = จำนวนเส้นยืนทั้งหมด × ความยาวผ้า<br />
              = 4,020 × 20 m = <span class="font-medium">80,400 m</span>
            </li>
            <li>
              <span class="font-medium">น้ำหนักไหมที่ต้องใช้ (ดีเนียร์)</span
              ><br />
              = (ดีเนียร์ × ความยาว (m)) ÷ 9,000<br />
              = (20 × 80,400) ÷ 9,000 ≈
              <span class="font-medium">178.7 g</span> (≈ 0.179 kg)
            </li>
          </ol>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            หมายเหตุ: หากใช้ความยาว 16 m ให้แทนค่าเป็น 4,020 × 16 = 64,320 m ⇒
            น้ำหนัก ≈ 142.9 g
          </p>
        </div>

        <h4
          id="calc-warp-rounds"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.3 การหาจำนวนรอบ “เดินเส้นยืน”
        </h4>
        <p class="text-justify indent-8">
          ขึ้นกับความยาวหลักผือ/ม้าเดินเส้น และจำนวนหลอด (อัก) ที่ใช้:
          หลักผือยาว–หลอดมาก ⇒ เดินรอบน้อย; หลักผือสั้น–หลอดน้อย ⇒
          ต้องเดินรอบมาก
        </p>

        <!-- ฟอก/ย้อมเส้นใย -->
        <h3
          id="scour-dye"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          3) การฟอกและการย้อมเส้นใย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยดิบ (ฝ้าย/ไหม) ต้องฟอก–ย้อมก่อนทอ ด้วยเหตุผลหลัก (1)
          ทำให้เส้นใยนุ่มพร้อมทอ (2) สร้างสีสันตอบโจทย์การออกแบบลวดลาย
          ขั้นตอนแบ่งตามชนิดเส้นใย ดังนี้
        </p>

        <h4
          id="degumming-cottonclean"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3.1 การลอกกาวไหม และการทำความสะอาดเส้นฝ้าย
        </h4>
        <p class="text-justify indent-8">
          เส้นไหมเป็นใยโปรตีนธรรมชาติที่ได้จากรังไหม ประกอบไปด้วยส่วนเส้นใย
          และส่วนของกาวไหมเคลือบเส้นใย ซึ่งจะมีอยู่ประมาณ 25 % ของน้ำหนักไหมดิบ
          กาวไหมจะมีสิ่งเจือปน เช่น ขี้ผึ้ง ไขมัน
          ซึ่งสามารถละลายได้ในสบู่ร้อนและด่าง
          ส่วนเส้นใยฝ้ายก็มีน้ำมันและสิ่งสกปรก
          ที่เกิดจากการทำเส้นใยเจือปนอยู่เช่นกัน
          การลอกกาวไหมและการทำความสะอาดเส้นฝ้าย
          ทำเพื่อให้เหลือส่วนที่เป็นเฉพาะเส้นใยที่มีความนุ่มละเอียด
          โดยเฉพาะไหมจะมีความมันวาวสูงขึ้น
          โดยมีขั้นตอนการลอกกาวและการทำความสะอาดดังต่อไปนี้คือ
        </p>
        <ul class=" list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">1) ชั่งน้ำหนักเพื่อหาอัตราส่วนน้ำ</span> —
            เส้นไหมดิบ/ฝ้ายดิบ 1 ส่วน : น้ำ ~30 ส่วน (ขึ้นกับปริมาณกาว/สิ่งสกปรก
            เช่น ไหม 1 กก. ใช้น้ำ ~20–30 กก.)
          </li>
          <li>
            <span class="font-medium">2) อัตราส่วนสารเคมี</span><br />
            <p class="text-justify indent-12">• ไหม: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส (alkali) 1 g/L</p>
            <p class="text-justify indent-12">• ฝ้าย: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส 0.1 g/L</p>
          </li>
          <li>
            <span class="font-medium">3) ต้มลอกกาวและทำความสะอาดเส้นใยฝ้ายดังต่อไปนี้ ตามกระบวนการดังนี้
                </span>
          </li>
        </ul>
        <p class="text-justify indent-8">
            ตารางที่ 1 การลอกกาวเส้นไหมและการทำสะอาดเส้นฝ้าย
        </p>
        <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง1.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
      </section>
    </div>
  </div>
</template>
