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
          ผ้าลายตาราง
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="checked-fabric"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าลายตาราง (Checked Fabric)
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          ผ้าลายตารางเป็นผ้าที่กำหนดลวดลายในโครงสร้างผ้า ทั้งเส้นยืนและเส้นพุ่ง
          ผ่านการวางจังหวะลายและสีสันที่แตกต่างกัน
          ทำให้เกิดลวดลายไม่ซ้ำกันในแต่ละผืน โดยชาวจังหวัดบุรีรัมย์นิยมทอเป็น
          <span class="font-medium">ผ้าโสร่ง</span> และ
          <span class="font-medium">ผ้าขาวม้า</span>
          มากกว่าการทอเป็นผ้าชิ้นเดี่ยว
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="checked-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ใช้สีหลัก <span class="font-medium">5 สี</span>: แดง เขียว น้ำเงิน
            ขาว และเหลือง โดยเน้นการ
            <span class="font-medium">จับคู่สีตรงข้าม</span>
            เช่น เขียว–แดง, แดง–น้ำเงิน, เหลือง–เขียว เพื่อสร้างความสดใสและสมดุล
          </li>
          <li>
            การพุ่งเส้นพุ่งมีทั้งแบบเส้นเดียว และ
            <span class="font-medium">เส้นพุ่งควบเกลียว 2 สี</span>
            ทำให้เกิดความหลากหลายมากขึ้น บางผืนมีสีสันมากถึง 9 สี
          </li>
          <li>
            ความแตกต่างของเนื้อผ้า:
            <ul class="list-disc list-inside ml-6 space-y-1">
              <li>
                กลุ่มชาติพันธุ์ไทยเดิ้ง–เขมร–กูย:
                <span class="font-medium">ไหมเส้นเล็ก เนื้อแน่น พลิ้ว</span>
              </li>
              <li>
                กลุ่มชาติพันธุ์ลาว:
                <span class="font-medium">ไหมเส้นใหญ่ เนื้อหนา นุ่ม</span>
              </li>
            </ul>
          </li>
          <li>
            ลายมักมี
            <span class="font-medium">ลูกเล่นด้วยตาเล็ก ๆ หรือริ้วเล็ก</span>
            ที่สะท้อนความเป็นเอกลักษณ์ของแต่ละท้องถิ่น
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="checked-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-6 text-justify">
          <li>
            <span class="font-medium">ผ้าโสร่ง</span>: ลวดลายสดใส สนุกสนาน
            ครบทั้ง 5 สี ใช้ในชีวิตประจำวัน พบได้ในทุกกลุ่มชาติพันธุ์
            มีทั้งแบบพุ่งเส้นเดียวและพุ่งเส้นควบเกลียว 2 สี
            <figure class="mt-4">
              <img
                src="/assetts/css/image/คะแมร์บุรีรัมย์.jpg"
                alt="โสร่งหางกระรอกคะแมร์บุรีรัมย์"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
              />
              <figcaption class="text-center italic mt-2">
                ภาพที่ 1 โสร่งหางกระรอก คะแมร์บุรีรัมย์
              </figcaption>
            </figure>
          </li>

          <li>
            <span class="font-medium">ผ้าขาวม้า</span>: ผ้าเอนกประสงค์
            ใช้ได้ทั้งในครัวเรือนและพิธีกรรม ทอด้วยฝ้ายและไหม เส้นแน่น (ทอลายขัด
            2 ตะกอ) มีทั้งลายริ้วแนวขวางและลายตารางกลางผืน
            ส่วนชายผ้ามักเป็นลายริ้วแนวดิ่ง
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-4">
              <figure class="text-center">
                <img
                  src="/assetts/css/image/ผ้าขาวม้าห้าสี.png"
                  alt="ผ้าขาวม้าห้าสี"
                  class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
                />
                <figcaption class="italic mt-2">ภาพที่ 2 ผ้าขาวม้าห้าสี</figcaption>
              </figure>
              <figure class="text-center">
                <img
                  src="/assetts/css/image/เลิกเจือย2.png"
                  alt="ภาพผ้าขาวม้ายกชายขิด"
                  class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
                />
                <figcaption class="italic mt-2">
                  ภาพที่ 3 ผ้าขาวม้ายกชายขิด (สไบเลิกเจือย)
                </figcaption>
              </figure>
            </div>
          </li>

          <li>
            ความงามของผ้าขาวม้าบุรีรัมย์อยู่ที่
            <span class="font-medium">ผ้าขาวม้ายกลายขิด</span> หรือ
            “สไบเลิกเจียย” มีลายยกขิดที่ชายผ้า เช่น ลายม้า ลายช้าง ลายสิงห์
            เป็นงานทอที่แสดงฝีมือสตรีชั้นสูง ก่อนออกเรือน
          </li>
          <li>
            สีสันสดใส เช่น เหลือง น้ำเงิน เขียว ชมพู
            ช่วยให้เหมาะกับทั้งการใช้งานจริงและการเป็นของฝากที่มีคุณค่า
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="checked-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าลายตารางบุรีรัมย์
        </h3>
        <p class="text-justify indent-8">
          ผ้าลายตารางบุรีรัมย์สะท้อนความเป็น “พื้นบ้านที่งดงาม” ผ่านการใช้สีหลัก
          5 สีครบถ้วน และการจับคู่สีตรงข้าม ที่มีความสมดุลและโดดเด่น
          ลวดลายเกิดจากการนับเส้นและการจัดจังหวะที่ไม่ซ้ำกัน
          โดยเฉพาะผ้าขาวม้ายกลายขิดที่ใช้ลายยกขิด
          ซึ่งมีความหมายทางวัฒนธรรมและพิธีกรรม
          พร้อมสื่อถึงความสามารถของสตรีผู้ทอ
          ทำให้ผ้าลายตารางบุรีรัมย์เป็นผ้าที่เรียบง่าย
          แต่แฝงด้วยคุณค่าทางสังคมและวัฒนธรรม
        </p>
        <figure class="mt-4">
          <video
            src="/assetts/css/video/IMG_3204-new.mp4"
            autoplay
            muted
            playsinline
            loop
            class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
          >
            เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
          </video>
          <figcaption class="text-center italic mt-2">ผ้าลายตาราง</figcaption>
        </figure>
      </section>
    </div>
  </div>
</template>

