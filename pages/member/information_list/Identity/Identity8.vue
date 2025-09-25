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
          ผ้าลวดลายจากงานสถาปัตยกรรม
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-architecture"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายจากงานสถาปัตยกรรม
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          งานสถาปัตยกรรมเป็นหนึ่งในแรงบันดาลใจสำคัญของการทำลวดลายผ้า ว่ากันว่า
          “ลวดลายในผืนผ้า” เป็นสื่อสัมพันธภาพระหว่างหญิงชายในสังคม:
          ชายเป็นผู้สร้างงานสถาปัตยกรรม (บ้านเรือน วัด โบราณสถาน)
          ส่วนหญิงนำลวดลายจากสถาปัตยกรรมเหล่านั้นมาออกแบบบนผืนผ้าอย่างวิจิตร
          และตั้งชื่อเรียกตามรูปลักษณ์หรือแรงบันดาลใจ เช่น
          <span class="font-medium">ลายหลังคาโบสถ์</span>,
          <span class="font-medium">ลายปราสาท</span> โดยเฉพาะ
          <span class="font-medium">ลายนาค</span> ปรากฏอยู่บนผืนผ้ามาก
          เนื่องด้วยภูมินิเวศวัฒนธรรม “ข้าวและน้ำ”
          ที่ให้ความเคารพต่อข้าวและสัตว์น้ำ
          จึงพบลายนาคและลวดลายที่ทำให้เกิดความรู้สึกเป็น “สายน้ำ”
          อยู่ในหลากหลายส่วนของวัฒนธรรมไทยบุรีรัมย์
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-architecture-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            แรงบันดาลใจจาก
            <span class="font-medium">องค์ประกอบสถาปัตยกรรม</span>
            เช่น บ้านเรือน วัด โบราณสถาน ถูกถ่ายทอดเป็นลวดลายผ้าอย่างวิจิตร
          </li>
          <li>
            บทบาทสัมพันธ์หญิง–ชาย: ชายสร้างสถาปัตยกรรม หญิง
            <span class="font-medium">ตีความ–ออกแบบ</span>
            ลายผ้าจากสิ่งปลูกสร้างเหล่านั้น
          </li>
          <li>
            การตั้งชื่อสะท้อนรูปลักษณ์/แรงบันดาลใจตรงไปตรงมา เช่น
            <span class="font-medium">ลายหลังคาโบสถ์</span>,
            <span class="font-medium">ลายปราสาท</span>
          </li>
          <li>
            <span class="font-medium">ลายนาค</span> และลวดลายเชิง “สายน้ำ”
            ปรากฏบ่อยตามวิถีภูมินิเวศข้าวและน้ำของท้องถิ่น
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-architecture-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ใช้เป็น <span class="font-medium">แรงบันดาลใจหลัก</span>
            ในการออกแบบลวดลายผ้าทอให้มีความวิจิตร
            สื่อความหมายเชิงสัญลักษณ์จากสิ่งปลูกสร้าง
          </li>
          <li>
            การตั้งชื่อผ้าตามองค์ประกอบสถาปัตยกรรมช่วยให้
            <span class="font-medium">จดจำง่าย</span>
            และสื่อสารที่มา/เรื่องราวของลวดลายได้ชัดเจน
          </li>
          <li>
            ลายนาคและสายน้ำปรากฏแพร่หลายบนผืนผ้า สอดคล้องกับวิถีวัฒนธรรม
            “ข้าวและน้ำ” ของไทยบุรีรัมย์
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-architecture-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าลวดลายจากงานสถาปัตยกรรม
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์เด่นคือการเชื่อมโยง
          <span class="font-medium">ภูมิปัญญาการก่อสร้างของชาย</span> กับ
          <span class="font-medium">ภูมิปัญญาการทอ–ออกแบบของหญิง</span>
          ให้กลายเป็นลายผ้าที่ถ่ายทอด “จิตวิญญาณแห่งข้าวและน้ำ”
          ผ่านสัญลักษณ์สำคัญอย่าง
          <span class="font-medium">นาค</span> และลวดลายเชิงสายน้ำ
          พร้อมชื่อเรียกที่ผูกกับสถาปัตยกรรมเฉพาะถิ่น เช่น หลังคาโบสถ์และปราสาท
          สะท้อนรากวัฒนธรรมไทยบุรีรัมย์บนผืนผ้าอย่างมีเรื่องราว
        </p>
        <div
          class="grid grid-cols-3 gap-8 items-start"
        >
          <!-- ภาพ 1 -->
          <div class="text-center">
            <img
              src="/assetts/css/image/มัดหมี่ลวดลาย.jpg"
              alt="ผ้ามัดหมี่ลวดลาย"
              loading="lazy"
              decoding="async"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผ้ามัดหมี่ลวดลาย
            </p>
          </div>

          <!-- ภาพ 2 -->
          <div class="text-center">
            <img
              src="/assetts/css/image/กระแปะดินเผา.jpg"
              alt="กระแปะดินเผา"
              loading="lazy"
              decoding="async"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <p class="italic mt-2">
              ภาพที่ 2 ผ้ามัดหมี่ กระแปะดินเผา
            </p>
          </div>

          <!-- ภาพ 3 -->
          <div class="text-center">
            <img
              src="/assetts/css/image/ประตูปราสาท.jpg"
              alt="ผ้ามัดหมี่ลายขอผักกูด"
              loading="lazy"
              decoding="async"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <p class="italic mt-2">
              ภาพที่ 3 ผ้ามัดหมี่ลายขอผักกูด<br />ลายจากภาพจำหลัก <br>ประตูปราสาท
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
