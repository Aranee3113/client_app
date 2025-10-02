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
          ผ้าลายจากพืชพรรณธรรมชาติ
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-botany"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายจากพืชพรรณธรรมชาติ
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          พืชพรรณธรรมชาติเป็นสิ่งแวดล้อมรอบตัวของผู้คนในวัฒนธรรมเกษตร
          นอกจากสื่อถึงความอุดมสมบูรณ์แล้ว ยังสะท้อนฝีมือชั้นเลิศของช่างทอ
          ลวดลายบนผืนผ้าบางครั้งเป็นรูปลักษณ์ของดอกไม้ บางครั้งเป็นต้นไม้
          และบางครั้งเป็นการให้สีสันในอารมณ์ของสวนดอกไม้ ตัวอย่างเช่น
          <span class="font-medium">ลายกอไคร้</span>,
          <span class="font-medium">ลายดอกแก้ว</span>,
          <span class="font-medium">ลายดอกพิกุล</span>,
          <span class="font-medium">ลายกระถางดอกไม้</span> เป็นต้น
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-botany-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            แรงบันดาลใจจาก
            <span class="font-medium">พืชพรรณรอบตัวในวิถีเกษตร</span>
            ทั้งดอกไม้ ต้นไม้ และบรรยากาศสวนดอกไม้
          </li>
          <li>
            สื่อความหมาย <span class="font-medium">ความอุดมสมบูรณ์</span> และ
            <span class="font-medium">ฝีมือชั้นเลิศ</span>
            ของช่างทอผ่านการจัดจังหวะลายและสี
          </li>
          <li>
            รูปแบบลายมีทั้งเชิงแทนรูป (ดอก/ต้นโดยตรง) และเชิงอารมณ์
            (โทนสี–บรรยากาศสวน)
          </li>
          <li>ตัวอย่างลาย: กอไคร้, ดอกแก้ว, ดอกพิกุล, กระถางดอกไม้</li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-botany-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นลวดลายที่ผู้คน <span class="font-medium">เข้าถึงง่าย</span>
            เพราะอ้างอิงธรรมชาติที่คุ้นเคยในชีวิตเกษตร
          </li>
          <li>
            เหมาะกับงานที่ต้องการ
            <span class="font-medium">ความอ่อนหวาน–อ่อนช้อย</span>
            และการสื่ออารมณ์ “สวนดอกไม้” ผ่านโทนสีและจังหวะลาย
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-botany-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ลวดลายพืชพรรณธรรมชาติ
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์อยู่ที่การ
          <span class="font-medium">เชื่อมโยงธรรมชาติ–วิถีเกษตร</span>
          เข้ากับการออกแบบลายผ้า ให้ผืนผ้าเป็นสื่อของความอุดมสมบูรณ์
          และความประณีตของฝีมือช่าง ผ่านทั้งรูปลักษณ์ของพืชโดยตรง
          และการใช้สีสันที่ถ่ายทอดอารมณ์ของสวนดอกไม้บนผืนผ้า
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผีเสื้อ.jpg"
            alt="ผ้ามัดหมี่ลายต้นไม้ ดอกไม้ ผีเสื้อ "
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผ้ามัดหมี่ลายต้นไม้ ดอกไม้ ผีเสื้อ 
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/ดอกไม้.jpg"
            alt="ผ้ามัดหมี่ลาย กระถางต้นไม้ ดอกไม้ และผีเสื้อ"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 2 ผ้ามัดหมี่ลาย กระถางต้นไม้ ดอกไม้ และผีเสื้อ
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
