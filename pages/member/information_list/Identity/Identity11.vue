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
          ผ้าลวดลายที่แสดงวิถีชีวิต
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-lifestyle"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายที่แสดงวิถีชีวิต
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          วิถีชีวิตของชาวบุรีรัมย์เป็นวิถีในวัฒนธรรมการเกษตร
          ความสุขในการดำรงชีวิตในวิถีเกษตรที่เกี่ยวพันกับบุญประเพณี การละเล่น
          และจารีตของผู้คน ถูกถ่ายทอดออกมาเป็นลวดลายผ้าเช่นกัน
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-lifestyle-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            แรงบันดาลใจจาก
            <span class="font-medium"
              >วิถีเกษตร–บุญประเพณี–การละเล่น–จารีต</span
            >
            ถ่ายทอดเป็นลายผ้าทั้งเชิงรูปลักษณ์และเชิงนามธรรม
          </li>
          <li>
            โครงสร้างลายเกิดจากการ
            <span class="font-medium">นับเส้น–จัดจังหวะ–ทำซ้ำ</span>
            เพื่อให้เล่าเรื่องราวได้ต่อเนื่องบนทั้งผืน
          </li>
          <li>
            ใช้ได้ทั้งเป็น <span class="font-medium">ลายหลัก</span> ของผืนผ้า
            หรือเป็น
            <span class="font-medium">ลายประกอบ</span>
            เพื่อเติมเต็มช่องว่างและจังหวะภาพรวม
          </li>
          <li>
            โทนสีสะท้อน
            <span class="font-medium">บรรยากาศวิถีชีวิตและพิธีกรรม</span>
            ให้ความรู้สึกอบอุ่น คุ้นเคย และเป็นกันเอง
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-lifestyle-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นหมวดลายที่ผู้คน
            <span class="font-medium">เข้าถึงง่ายและผูกพัน</span>
            เพราะสะท้อนชีวิตจริงของชุมชน
          </li>
          <li>
            เหมาะกับการพัฒนาเป็น
            <span class="font-medium">ของที่ระลึก/ผ้าประจำชุมชน</span>
            และงานเครื่องแต่งกายร่วมสมัยที่ต้องการ
            <span class="font-medium">เรื่องเล่า (storytelling)</span>
          </li>
          <li>
            ประยุกต์ใช้ได้กับ
            <span class="font-medium">ผ้าทอหลายชนิดและหลายขนาดผืน</span>
            ตามวัตถุประสงค์การใช้งาน ทั้งในชีวิตประจำวันและโอกาสพิเศษ
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-lifestyle-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ลวดลายที่แสดงวิถีชีวิต
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์ของลายกลุ่มนี้อยู่ที่การเชื่อมโยง
          <span class="font-medium">วิถีเกษตร–บุญประเพณี–การละเล่น–จารีต</span>
          เข้ากับงานออกแบบผืนผ้า ทำให้ผ้าเป็นสื่อที่บันทึกความทรงจำของชุมชน
          และถ่ายทอด “ความสุขแบบบ้าน ๆ” ของชาวบุรีรัมย์อย่างมีชีวิตชีวา
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/เทศน์มหาชาติ.jpg"
            alt="ผ้ามัดหมี่ลายบุญเดือนสิบ เทศน์มหาชาติ"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้ามัดหมี่ลายบุญเดือนสิบ เทศน์มหาชาติ
        </p>
      </section>
    </div>
  </div>
</template>
