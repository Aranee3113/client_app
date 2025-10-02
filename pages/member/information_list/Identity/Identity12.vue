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
          ผ้าลายจากการประยุกต์ประสมประสาน
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-fusion"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลายจากการประยุกต์ประสมประสาน
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          จังหวัดบุรีรัมย์เป็นพื้นที่ที่มีความเชี่ยวชาญในการประยุกต์ลายผ้ามัดหมี่ได้อย่างงดงามและหลากหลาย
          ครอบคลุมทั้งแนวคิดเชิงทฤษฎีและการปฏิบัติจริง จนมีคำกล่าวว่า
          หากต้องการผ้ามัดหมี่ลายประยุกต์แบบใหม่ ๆ
          <span class="font-medium">ต้องมาที่จังหวัดบุรีรัมย์</span>
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-fusion-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">1) ประยุกต์ด้วยเทคนิควิธีในการทอ</span> —
            เช่น การมัดหมี่สองทางทั้งทางเส้นพุ่งและเส้นยืน
            เพื่อให้ได้ลวดลายที่แปลกใหม่และเพิ่มความน่าสนใจของผืนผ้า
          </li>
          <li>
            <span class="font-medium"
              >2) ประยุกต์ด้วยการให้สีสันที่มีความหมาย</span
            >
            — ให้สีสะท้อนอัตลักษณ์จังหวัดบุรีรัมย์ เข้ากับเทรนด์แฟชั่น
            หรือสร้างมิติ/ความแตกต่างของผืนผ้า
          </li>
          <li>
            <span class="font-medium"
              >3) ประยุกต์ด้วยการวางโครงสร้างลายใหม่</span
            >
            — เปลี่ยนระเบียบการวางลายจากแบบเดิมที่ซ้ำทั้งผืน
            เป็นวิธีจัดจังหวะ–จัดวางแบบใหม่ที่ผ้าดั้งเดิมไม่เคยทอ
          </li>
          <li>
            <span class="font-medium"
              >4) ประยุกต์ด้วยการออกแบบลาย–เทคนิค–สีสันใหม่</span
            >
            — เพื่อให้ได้ผ้าที่เหมาะสมกับสถานการณ์และบริบทปัจจุบัน
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-fusion-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ตอบโจทย์ทั้ง <span class="font-medium">อัตลักษณ์ท้องถิ่น</span> และ
            <span class="font-medium">ความร่วมสมัย</span>
            ผ่านการเลือกเทคนิค สี และโครงสร้างลายที่หลากหลาย
          </li>
          <li>
            เหมาะสำหรับงานออกแบบที่ต้องการ
            <span class="font-medium">ลายใหม่</span> ให้สอดคล้องกับ
            <span class="font-medium">เทรนด์และสถานการณ์ปัจจุบัน</span>
          </li>
          <li>
            รองรับการผลิตทั้งผืนลายหลักและผืนลายประกอบ
            ปรับใช้ได้กับขนาดผืนและวัตถุประสงค์การใช้งานที่แตกต่างกัน
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-fusion-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ลายประยุกต์ประสมประสาน
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์ของลายประยุกต์ในบุรีรัมย์อยู่ที่
          <span class="font-medium"
            >ความชำนาญในการผสานเทคนิค–สีสัน–โครงสร้างลาย</span
          >
          เข้าด้วยกันอย่างมีระบบและสร้างสรรค์ ตั้งแต่การมัดหมี่สองทาง
          การให้สีที่มีความหมาย
          ไปจนถึงการรื้อ–วางโครงสร้างลายใหม่และออกแบบลาย/เทคนิค/สีสันให้ร่วมสมัย
          ทำให้ผ้ามัดหมี่ “ประยุกต์ประสมประสาน”
          มีบุคลิกเฉพาะและโดดเด่นในระดับพื้นที่
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/เทคนิคการแต้มสี.png"
            alt="ผ้ามัดหมี่ลวดลายประยุกต์"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้ามัดหมี่ลวดลายประยุกต์ <br>ด้วยเทคนิคการมัดหมี่เส้นยืน เส้นพุ่ง<br> และเทคนิคการแต้มสี
        </p>
      </section>
    </div>
  </div>
</template>
