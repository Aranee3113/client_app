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
        <h2 class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          ผ้าผ้ายกดอกและผ้าสไบยกดอก
        </h2>
      </div>

      <!-- เนื้อหา -->
      <section
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ผ้ายกดอกและผ้าสไบยกดอก
        </h3>

        <!-- บทนำ (คงข้อมูลเดิม แต่เกลาให้อ่านง่าย) -->
        <p class="mb-4 text-justify indent-8">
          ผ้ายกดอก (ห่มตัวที่ชาวบ้านเรียก <strong>“สไบ”</strong>) นิยมทอเป็นผ้าพื้นสีขาวแล้วจึง
          <strong>ย้อมทั้งผืน</strong> โดยเฉพาะ <strong>ย้อมมะเกลือ</strong> ให้สีดำ ช่วยพรางรอยเปื้อน
          ลดการดูดฝุ่น เพิ่มน้ำหนัก–ความเหนียว และให้กลิ่นเฉพาะ เพราะสไบมักติดกาย ใช้พันตัว เช็ดเหงื่อ–น้ำหมาก
          ลวดลายออกแบบให้ไม่ซับซ้อน ใช้ตะกอไม่เกิน <strong>7 ตะกอ</strong> และทำ <strong>ขอบลายสองด้าน</strong>
          เพื่อกำหนดขอบเขตและเพิ่มความน่าสนใจ ผู้เชี่ยวชาญคัด <strong>5 ลาย</strong> จาก 25 ลาย
          และผลิตต้นแบบจากลำดับ <strong>อันดับ 1</strong> และ <strong>อันดับ 2</strong> ดังนี้
        </p>

        <!-- ลายต้นแบบ -->
        <ol class="list-decimal list-inside indent-8 space-y-8 text-justify">
          <!-- ลายที่ 1 -->
          <li>
            <span class="font-semibold">ลายที่ 1 (ลำดับ 21):</span>
            เก็บลาย <strong>4 ตะกอ</strong> <span class="whitespace-nowrap">สอดไส้ดอกกลาง</span>
            ด้วยไหมต่างสีหรือเส้นใยโลหะ เพิ่มความหนาลายด้วยการสอดเส้นได้
            <strong>ตะกอละ 2–8 เส้น</strong> รายละเอียดการทอที่ใช้ในต้นแบบ:
            <ol class="list-decimal list-inside indent-8 space-y-2 mt-3">
              <li>หน้าผ้า <strong>102 ซม.</strong> ฟันหวี <strong>1,980 ช่อง</strong></li>
              <li>เส้นยืน ไหม <strong>20/22 ดีเนียร์ ควบ 4</strong></li>
              <li>เส้นพุ่ง ไหม <strong>ขนาด LL ควบ 6</strong> (ใหญ่กว่าเส้นยืนเล็กน้อย)</li>
              <li>การใช้: นุ่ง–โจง–งานเอนกประสงค์ทั่วไป</li>
            </ol>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/แพทเทริน์ลายผ้ายกดอก.png"
                alt="แพทเทิร์นลายผ้ายกดอกลำดับที่ 1"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 1 แพทเทิร์นลายผ้ายกดอก ลำดับที่ 1</p>

            <!-- แรงบันดาลใจ (ลายที่ 1) -->
            <p class="mt-4 indent-8">
              <strong>แรงบันดาลใจ:</strong>
              (1) <strong>ผ้ายกดอกชาวเขมร เกาะดัจ กรุงพนมเปญ</strong> ที่ผู้วิจัยลงพื้นที่มากกว่า
              <strong>5 ครั้งใน 10 ปี</strong> ต้องการอนุรักษ์กระบวนการผลิตซึ่งกำลังจางหาย
              (ในบริบทที่บุรีรัมย์มีเขมรสูง–คะแมร์ลือ และวัฒนธรรมอาเซียนร่วมกัน)
              (2) <strong>ระเบียบการใช้ผ้า</strong> ของเขมรบุรีรัมย์ที่กำหนด “ผ้ายกดอก” เป็นผ้าพิเศษใช้ในโอกาสพิเศษ
              สอดคล้องกับภาพรวมสังคมไทย—จึงจัดอยู่ในกลุ่ม <strong>สินค้าพรีเมี่ยม</strong>
              ผืนนี้ตั้งชื่อว่า <strong>“ดอกกันเกรา” (ดอกมันปู)</strong>
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าผ้ายกดอก1.jpg"
                alt="ผ้ายกดอกลาย ดอกกันเกรา"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 2 ผ้ายกดอกลาย ดอกกันเกรา</p>
          </li>

          <!-- ลายที่ 2 -->
          <li>
            <span class="font-semibold">ลายที่ 2 (ลำดับ 11):</span>
            เก็บลาย <strong>6 ตะกอ</strong> ตั้งชื่อว่า <strong>“ดอกแก้วกาหลง”</strong>
            รายละเอียดการทอของต้นแบบ:
            <ol class="list-decimal list-inside indent-8 space-y-2 mt-3">
              <li>หน้าผ้า <strong>65 ซม.</strong> ฟันหวี <strong>1,000 ช่อง</strong></li>
              <li>เส้นยืน ไหม <strong>20/22 ดีเนียร์ ควบ 4</strong></li>
              <li>เส้นพุ่ง ไหม <strong>ขนาด LL ควบ 6</strong></li>
            </ol>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/แพทเทริน์ลายผ้ายก.png"
                alt="แพทเทิร์นลายผ้ายกดอกลำดับที่ 2"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 3 แพทเทิร์นลายผ้ายกดอก ลำดับที่ 2</p>

            <p class="mt-4 indent-8">เมื่อทอเป็นผืนผ้า รูปลักษณ์ปรากฏดังภาพต่อไปนี้</p>
            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าผ้ายกดอก2.jpg"
                alt="ผ้าสไบยกดอกลาย ดอกแก้วกาหลง"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 4 ผ้าสไบยกดอกลาย ดอกแก้วกาหลง</p>
          </li>
        </ol>

        <!-- คุณลักษณะของผ้า (คงเนื้อหาเดิม) -->
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          คุณลักษณะของผ้า
        </h3>
        <p class="mb-4 text-justify indent-8">
          <strong>ผ้ายกดอก/สไบ</strong> มักทอพื้นขาวแล้ว
          <strong>ย้อมมะเกลือเป็นสีดำ</strong> เหมาะกับการใช้งานติดตัวบ่อย
          ช่วยพรางคราบ ลดฝุ่น เพิ่มน้ำหนัก–ความเหนียว และกลิ่นเฉพาะ
          ลวดลายใช้ตะกอไม่เกิน 7 ตะกอ และมีขอบลายสองด้านเพื่อความงามและระบุขอบเขตผืนผ้า
        </p>

        <!-- การแต่งกาย -->
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          การแต่งกายด้วยผ้ายกดอกและสไบยกดอก
        </h3>
        <p class="mb-4 text-justify indent-8">
          ทดลองนุ่งห่มในแบบไทยพื้นบ้านเพื่อประชาสัมพันธ์ ณ ศูนย์การค้าโรบินสันบุรีรัมย์
          <span class="whitespace-nowrap">เมื่อวันที่ 10 สิงหาคม</span> พบคุณค่าและความงามปรากฏชัดดังภาพ
        </p>

        <div class="flex justify-center gap-8">
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก3.jpg"
              alt="การนุ่งผ้ายกดอกลาย ดอกกันเกรา"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 5 การนุ่งผ้ายกดอกลาย ดอกกันเกรา (ลุคไทย)
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ดอกกันเกรา.jpg"
              alt="ดอกกันเกรา"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 6 การนุ่งผ้ายกดอกลาย ดอกกันเกรา (ลุคไทย)
            </figcaption>
          </figure>
        </div>

        <!-- แหล่งที่มา -->
        <h3
          class="mt-12 text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </h3>
        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านสวายเจริญ, บ้านไม้แดง, บ้านตะเคียน
        </p>
      </section>
    </div>
  </div>
</template>

