<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MapPin } from "lucide-vue-next";

const { $axios } = useNuxtApp();

const posts = ref([]);
const route = useRoute();
const loading = ref(true);
const error = ref("");

/** ฟังก์ชัน normalize รูปภาพ */
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

/** โหลดโพสต์จาก API */
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

const type = route.params.type;

onMounted(() => {
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
          ผ้าลายริ้ว
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-6"
      >
        <h2
          id="striped-fabric"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าลายริ้ว (สมปักริ้ว)
        </h2>

        <!-- ภูมิหลังและความหมาย -->
        <h3
          id="history-meaning"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ภูมิหลัง & ความหมายทางวัฒนธรรม
        </h3>
        <p class="text-justify indent-8">
          ผ้าลายริ้วสร้างลวดลายจาก
          <span class="font-medium">เส้นพุ่งต่างสี/เส้นพุ่งพิเศษ</span>
          ให้เกิดจังหวะริ้วต่อเนื่องทั้งผืน ในประวัติศาสตร์ไทย “<span
            class="font-medium"
            >ผ้าสมปักริ้ว</span
          >” เคยใช้เป็น <span class="font-medium">เบี้ยหวัด</span>
          แก่ข้าราชบริพารตั้งแต่สมัยกรุงศรีอยุธยา ก่อนยกเลิกในรัชกาลที่ 5
          (เพราะเขมรใช้นุ่งทั่วไป)
          สอดคล้องกับบริบทจังหวัดบุรีรัมย์ที่ตั้งอยู่บนเส้นทางอารยธรรมขอม
          และมีกลุ่มชาติพันธุ์เขมรกระจายอยู่มาก
          จึงมีการทอผ้าลายริ้วเพื่อใช้และส่งเข้าราชสำนักมาตั้งแต่อดีต
        </p>

        <!-- สมปัก: โครงสร้าง/การนุ่ง -->
        <h3
          id="som-pak"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          “สมปัก” คืออะไร? (โครงสร้าง & วิธีนุ่งแบบย่อ)
        </h3>
        <p class="text-justify indent-8">
          “ผ้าสองปัก/สมปัก” เป็นผ้าไหมหน้าแคบที่ต้อง
          <span class="font-medium">เพลาะ</span> (ต่อ 2 ผืน) ให้กว้างราว ~160
          ซม. และยาวกว่าผ้านุ่งธรรมดา ใช้เข้าเฝ้าหรือเต็มยศ ระดับสูงสุดคือ
          <span class="font-medium">สมปักปูม</span> (ลายดอกเป็นตา ๆ)
          ชั้นธรรมดาคือ <span class="font-medium">สมปักริ้ว</span>
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>แบ่งผ้า “ข้างสั้น–ข้างยาว”; เหน็บชายพกของข้างสั้น</li>
          <li>
            ทบข้างยาวให้เท่าข้างสั้น สอดชายบนเข้าใต้พก (“ชักพก”) ให้เกิดชาย
            “ปากช้าง”
          </li>
          <li>
            รวมชายซ้าย–ขวาเป็นชายกระเบน ลอดใต้หว่างขา เหน็บดังนุ่งโจงกระเบน
          </li>
        </ul>

        <!-- ศัพท์/ชื่อเรียก -->
        <h3
          id="local-terms"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ศัพท์ท้องถิ่น & ชื่อเรียก
        </h3>
        <p class="text-justify indent-8">
          “สมปัก” สันนิษฐานจากคำว่า
          <span class="font-medium">สัมป๊วด</span> (ผ้าผืน/ผ้านุ่ง)
          ในสำเนียงไทย–เขมรบุรีรัมย์/กัมพูชา ผ้าลายริ้วในบุรีรัมย์ยังเรียก
          <span class="font-medium">อันลูยซีม</span>,
          <span class="font-medium">จ๊ะปันชัวร์</span>,
          <span class="font-medium">ซิ่นคั่นควบ</span> เป็นต้น
        </p>

        <!-- ไทม์ไลน์ผ้าประจำจังหวัด -->
        <h3
          id="timeline"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ผ้าลายริ้ว: ผ้าประจำจังหวัดบุรีรัมย์ (ไทม์ไลน์)
        </h3>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/หลักฐาน.png"
            alt="หลักฐาน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 หลักฐาน การนุ่งผ้าลายริ้วของขุนนาง <br>และข้าราชบริพารจากภาพวาดฝา
        </p>

        <p class="font-semibold">พ.ศ. 2545 — “ผ้าหางกระรอกคู่”</p>
        <p class="indent-8 text-justify">
          วางจังหวะพุ่งแบบ <span class="font-medium">หางกระรอก 2 เส้น</span>
          <span class="font-medium">สลับ</span> พุ่งสีพื้น 4 เส้น และสีอื่น ๆ
          อีก 2 เส้น (รูปแบบจังหวะ <span class="font-medium">2–4–2</span> วนซ้ำ)
          เกิดริ้วสม่ำเสมอมีน้ำหนักสีงามตา
        </p>
        <p class="font-semibold">พ.ศ. 2547 — “อันลูยซีมทรายชมพู”</p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            เนื้อผ้า
            <span class="font-medium">ลายตารางเล็ก (เม็ดทราย)</span>
            ด้วยเทคนิคทอสองหน้า
          </li>
          <li>
            พุ่งควบ <span class="font-medium">เหลือง–แดง</span> และ
            <span class="font-medium">ม่วง–ขาว</span> (อ้างอิงสีจังหวัด)
          </li>
          <li>
            โทนรวม “<span class="font-medium">สีหินทรายชมพู</span>”
            อ้างอิงปราสาทพนมรุ้ง
          </li>
        </ul>
        <p class="font-semibold">พ.ศ. 2555–2556 — “ผ้าหางกระรอกคู่ตีนแดง”</p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            เพิ่ม
            <span class="font-medium">หัวซิ่น–ตีนซิ่นสีแดงขนาดใหญ่</span>
            สื่อพหุชาติพันธุ์
          </li>
          <li>
            รวมอัตลักษณ์ 4 กลุ่ม: ไทยเดิ้ง (หางกระรอก), เขมร (ริ้ว), ลาว
            (ซิ่นมีตีน), กูย (ตีนซิ่นมัดหมี่)
          </li>
          <li>
            มี 2 แบบ: <span class="font-medium">ตีนแดงลายริ้ว</span> และ
            <span class="font-medium">ตีนแดงลายดอกสุพรรณนิการ์</span>
          </li>
        </ul>

        <!-- องค์ความรู้เชิงช่าง: การออกแบบริ้ว -->
        <h3
          id="design-knowledge"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          คู่มือออกแบบ “ริ้ว” สำหรับช่างทอ
        </h3>

        <h4
          id="stripe-taxonomy"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          1) ประเภทริ้ว (จังหวะ & สี)
        </h4>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ริ้วสมดุล (Balanced)</span> —
            จังหวะสีซ้าย–ขวาเท่ากัน ภาพรวมสงบ เรียบหรู
          </li>
          <li>
            <span class="font-medium">ริ้วเด่น (Dominant)</span> —
            มีเส้นเอกสีเข้ม/สว่างคั่นช่วงริ้ว ช่วยกำหนดแกนสายตา
          </li>
          <li>
            <span class="font-medium">ริ้วละเอียด (Pinstripe)</span> —
            เส้นริ้วแคบถี่ เหมาะเครื่องแต่งกายทางการ
          </li>
          <li>
            <span class="font-medium">ริ้วชายธง/ริ้วขอบ</span> —
            เสริมเส้นกรอบหนาใกล้ริมผ้า กันย้วยและเพิ่มมิติ
          </li>
        </ul>

        <h4
          id="color-order"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2) การกำหนด “ลำดับสี” (Color Order)
        </h4>
        <p class="text-justify indent-8">
          เขียนเป็นสัญลักษณ์สี A–B–C–D พร้อมจำนวน “พิก (picks)” ต่อสี เช่น
          <span class="font-mono">[A×2 | C×4 | D×2]</span> ทำซ้ำ = รูปแบบ
          “2–4–2” (สูตรผ้าหางกระรอกคู่)
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">รายงาน (Rapport)</span> = 1
            ชุดลำดับสีที่วนซ้ำครบจังหวะ
          </li>
          <li>
            ปรับ “น้ำหนักสี” ด้วยการเพิ่ม/ลดจำนวนพิกต่อสี โดยคงสัดส่วนรวมเดิม
          </li>
          <li>
            ต้องการให้ริ้วอ่านชัดขึ้น: เพิ่ม “เส้นแบ่ง” สีเข้ม 1–2 พิก
            คั่นระหว่างช่วงใหญ่
          </li>
        </ul>

        <h4
          id="palette"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3) จานสีแนะนำ (เชื่อมโยงอัตลักษณ์บุรีรัมย์)
        </h4>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">โทนหินทรายชมพู–พนมรุ้ง</span> : ชมพูทราย,
            ส้มอิฐ, น้ำตาลกาแล็คซี, ม่วงพนมรุ้ง
          </li>
          <li>
            <span class="font-medium">ชุดสีจังหวัด</span> : ส้ม–ม่วง
            (คู่พุ่งควบ) ผสม เหลือง–แดง, ม่วง–ขาว (อ้างอิงปี 2547)
          </li>
          <li>
            <span class="font-medium">โทนธรรมชาติ</span> : คราม, เขียวนาข้าว,
            เหลืองขมิ้น, แดงครั่ง — เหมาะย้อมธรรมชาติ
          </li>
        </ul>

        <h4
          id="structure"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          4) โครงสร้างทอ & เทคนิคให้ริ้วสวย
        </h4>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">โครงสร้าง</span>: Plain (สีชัด), Twill
            (มิติทแยง), Double (เม็ดทรายสองหน้า)
          </li>
          <li>
            <span class="font-medium">พุ่งควบเกลียว</span>: ใช้ 2
            เส้นควบสร้างประกาย (เทคนิคหางกระรอก)
          </li>
          <li>
            <span class="font-medium">แรงตีฟืมคงที่</span>: ให้เส้นริ้ว “ตรง”
            ตลอดผืน โดยเฉพาะจุดเปลี่ยนสี
          </li>
          <li>
            <span class="font-medium">ริมผ้า</span>: เพิ่มริมหนา 6–12 เส้นยืน
            หรือใช้สีเข้มเป็นกรอบกันย้วย
          </li>
        </ul>

        <h4
          id="spec"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          5) ตัวอย่างสเปก (แนวปฏิบัติ)
        </h4>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">เส้นยืน</span>: ไหม 20–40D หรือฝ้าย 40/2 —
            ตั้งตามหน้าผ้า/ความหนาแน่น
          </li>
          <li>
            <span class="font-medium">เส้นพุ่ง</span>: ไหมควบ 2 เส้น (หางกระรอก)
            + สีพื้น 1 เส้น ตามจังหวะ 2–4–2
          </li>
          <li>
            <span class="font-medium">ความหนาแน่น</span>: EPI/PPI คงที่
            เพื่อความคมชัดของริ้ว
          </li>
        </ul>

        <!-- สี & การดูแล -->
        <h3
          id="dye-care"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          สี & การดูแลรักษา
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">สีย้อมธรรมชาติ</span>: ครั่ง (แดง), คราม
            (น้ำเงิน), มะเกลือ (ดำ), เปลือกประดู่ (น้ำตาลแดง) ฯลฯ
          </li>
          <li>
            <span class="font-medium">ทดสอบความคงทนสี</span>: แช่น้ำสบู่อุ่น
            10–15 นาที, ซับอ่อน ๆ, ผึ่งร่ม
          </li>
          <li>
            <span class="font-medium">ซักรีด</span>: กลับด้านซักมือ,
            ใช้น้ำสบู่อ่อน, รีดไฟอุ่นผ่านผ้ารอง
          </li>
        </ul>

        <!-- การใช้งานร่วมสมัย -->
        <h3
          id="contemporary-use"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          การใช้งานร่วมสมัย & การต่อยอด
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ตัดเย็บเป็น
            <span class="font-medium">ซิ่น/โจง/ชุดสมัยนิยม</span> ผ้าคลุมไหล่
            เนคไท กระเป๋า ผ้าพันคอ
          </li>
          <li>
            พัฒนาผ้า
            <span class="font-medium">สองหน้า</span> ให้มีลายเม็ดทรายในเนื้อ
            เพิ่มความพิเศษและทนทาน
          </li>
          <li>
            ใช้ <span class="font-medium">จานสีจังหวัด</span> และโทนหินทรายชมพู
            สื่อมรดก “พนมรุ้ง” ให้ชัดเจน
          </li>
        </ul>

        <!-- คุณค่าทางสังคม -->
        <h3
          id="social-value"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          คุณค่าทางสังคม & อัตลักษณ์
        </h3>
        <p class="text-justify indent-8">
          ผ้าลายริ้วของบุรีรัมย์คือ “ความเหมือนในความต่าง” ของ 4 กลุ่มชาติพันธุ์
          (ไทยเดิ้ง–ลาว–เขมร–กูย) ที่หลอมรวมอยู่บนผืนเดียวกัน ผ่านริ้วสี จังหวะ
          และเทคนิคทอ จึงเป็นทั้งเครื่องใช้ เครื่องแต่งกาย
          และสื่อสัญลักษณ์ที่เล่าเรื่องชุมชนได้อย่างร่วมสมัย
        </p>

        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าลายริ้ว.png"
            alt="ผ้าลายริ้ว"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 ผ้าลายริ้วสีสันสดใสและลวดลายที่ใช้ในปัจจุบัน
        </p>
      </section>
    </div>
  </div>
</template>
