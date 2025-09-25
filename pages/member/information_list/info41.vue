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
          การย้อมสี
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="dyeing-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การย้อมสี
        </h2>

        <p class="text-justify indent-8">
          การย้อมสีทำให้ผ้าและเส้นใยมีความน่าสนใจและมีชีวิต เส้นไหม เส้นฝ้าย
          และด้ายประดิษฐ์ สามารถย้อมได้ แต่แต่ละชนิดต้องใช้
          “ชนิดสี–สารช่วย–อุณหภูมิ–เวลา” ที่ต่างกัน โดยหลักการควบคุมคุณภาพย้อมมี
          4 ข้อสำคัญ ได้แก่
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>ใช้ “ชนิดสี” ให้ตรงกับ “ชนิดเส้นใย”</li>
          <li>ควบคุมอุณหภูมิให้เหมาะสม</li>
          <li>ทำ “กระบวนการ” ให้ครบถ้วน (เตรียม–ย้อม–ล้าง/ผนึก–ทำให้แห้ง)</li>
          <li>รักษา “เวลา” ให้อยู่ในช่วงที่กำหนด</li>
        </ul>

        <!-- 1) ย้อมไหม -->
        <h3
          id="dye-silk"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          1) การย้อมสีเส้นไหม (Silk)
        </h3>
        <p class="text-justify indent-8">
          ส่วนประกอบหลัก: น้ำ ความร้อน สี และสารช่วยย้อม โดยทั่วไป “ไหม”
          เหมาะกับ
          <span class="font-medium">สีแอซิด (Acid dye)</span>
          ใช้กรดน้ำส้มเป็นสารช่วยย้อมเพื่อเพิ่มการติดสี
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อเส้นไหม 1 กก.</span> น้ำ 20–30
            ลิตร; สี 0.1–40 กรัม (ตามความเข้ม); กรดน้ำส้ม 10–40 กรัม
            ตามความเข้มของสี สีอ่อนใส่น้อย สีเข้มใส่มาก
            โดยมีกระบวนการย้อมสีดังนี้
          </li>
        </ul>
        <p class="text-justify indent-8">
          ตารางที่ 1 การย้อมเส้นไหมด้วยสีแอซิค
        </p>
        <div class="mt-4 flex justify-center">
          <img
            src="/assetts/css/image/ตาราง2.png"
            alt="table1"
            loading="lazy"
            decoding="async"
            class="shadow-lg object-contain max-w-full h-auto"
          />
        </div>

        <!-- 2) ย้อมฝ้าย -->
        <h3
          id="dye-cotton"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          2) การย้อมสีเส้นฝ้าย (Cotton)
        </h3>
        <p class="text-justify indent-8">
          ส่วนประกอบหลัก: น้ำ ความร้อน สี และสารช่วยย้อม “ฝ้าย” เหมาะกับ
          <span class="font-medium">สีรีแอคทีฟ (Reactive dye)</span> ใช้ด่าง
          (โซดาแอช) และเกลือช่วยย้อม/ช่วยติด
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อฝ้าย 1 กก.</span> น้ำ 20–30
            ลิตร; สี 0.1–40 กรัม; เกลือ 10–40 กรัม; ด่าง 10–40 กรัม
            ตามความเข้มของสี สีอ่อนใส่น้อย สีเข้มใส่มาก
            โดยมีกระบวนการย้อมสีดังต่อไปนี้
          </li>
          <p class="text-justify indent-8">
            ตารางที่ 2 การย้อมเส้นฝ้ายด้วยสีรีแอคทีฟ
          </p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง3.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
        </ul>

        <!-- 3) ย้อมด้ายประดิษฐ์ -->
        <h3
          id="dye-manmade"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          3) การย้อมสีด้ายประดิษฐ์ (Man-made Fibres)
        </h3>
        <p class="text-justify indent-8">
          ด้ายประดิษฐ์ครอบคลุมทั้งเส้นใยเซลลูโลสที่ผลิตขึ้น (เช่น เรยอน)
          และเส้นใยสังเคราะห์ (ไนลอน/โพลีเอสเตอร์ ฯลฯ) ควรใช้
          <span class="font-medium">สีย้อมเฉพาะของเส้นใยนั้น</span> (เช่น
          เรยอนใช้สีรีแอคทีฟหรือไดเร็กต์, ไนลอนใช้สีแอซิด,
          โพลีเอสเตอร์ใช้สีดิส์เพิร์ส)
          ข้อความต่อไปนี้เป็นสัดส่วนอ่างย้อมแบบกรดอ่อนซึ่งใช้ได้กับกลุ่มที่ตอบสนองต่อกรด:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อเส้นด้าย 1 กก.</span> น้ำ
            20–30 ลิตร; สี 0.1–40 กรัม; กรดน้ำส้ม 10–40 กรัม ตามความเข้มของสี
            สีอ่อนใส่น้อย สีเข้มใส่มาก โดยมีกระบวนการย้อมสีดังต่อไปนี้
          </li>
          <p class="text-justify indent-8">ตารางที่ 3 การย้อมสีด้ายประดิษฐ์</p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง4.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
        </ul>

        <!-- 4) ย้อมสีธรรมชาติ -->
        <h3
          id="dye-natural"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          4) การย้อมสีจากวัสดุธรรมชาติ
        </h3>
        <p class="text-justify indent-8">
          สีย้อมธรรมชาติได้จากสัตว์ พืชพรรณ และแร่ธาตุ เช่น
          ต้น–ใบ–เปลือก–เมล็ด–ราก–แก่น, โคลน/ดิน, ครั่ง ฯลฯ ใช้กับ “ไหม” และ
          “ฝ้าย” เป็นหลัก กระบวนการแบ่งเป็น 3 ส่วน:
          <span class="font-medium">การเตรียมน้ำสี</span> →
          <span class="font-medium">การย้อม</span> →
          <span class="font-medium">การผนึกสี</span>
        </p>
        <ul class="list-disc list-inside indent-8 space-y-3 text-justify">
          <li>
            <span class="font-semibold"
              >อัตราส่วนอ่างย้อม (ต่อเส้นใย 1 กก.)</span
            >: น้ำ 20–30 ลิตร; ปริมาณ “น้ำสี” ตามการสกัด; สารช่วย
            (เกลือ/ด่าง/กรด) 10–40 กรัม ตามเฉดและวัสดุให้สี
          </li>
          <p class="font-semibold">
            4.1 การสกัดสีธรรมชาติ
          </p>
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">สกัดร้อน</span> (ใช้ได้กับเปลือก ใบ
                ดอก ผล แก่น)
                <ol class="list-decimal list-inside indent-22 space-y-1">
                  <li>ตำ/บดวัสดุให้ละเอียด</li>
                  <li>หมัก ~1 ชั่วโมง</li>
                  <li>ต้มที่ ~90°C แล้ว “พัก” 12–24 ชม. ก่อนกรองเอาแต่น้ำสี</li>
                </ol>
                <p class="indent-8">
                  หมายเหตุ: วัสดุเดียวกันสามารถสกัดซ้ำได้จนสีจาง
                  แล้วจึงเปลี่ยนใหม่/เติมวัสดุเพิ่ม
                </p>
              </li>
              <li>
                <span class="font-medium">สกัดเย็น</span>
                (มักใช้กับผล/เปลือก/แก่นบางชนิด)
                <ol class="list-decimal list-inside indent-22 space-y-1">
                  <li>ตำ/บดให้ละเอียด</li>
                  <li>
                    เติมน้ำ หมักอย่างน้อย 1 ชั่วโมง (หรือมากกว่านั้นตามชนิด)
                  </li>
                </ol>
              </li>
            </ul>
          
          <p class="font-semibold">
            4.2 การย้อมสีธรรมชาติ
          </p>
          
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">ย้อมร้อน</span>: ต้มน้ำสี 80–90°C ย้อม
                ~1 ชั่วโมง หากต้องการเข้ม/ทน ให้อุ่นไว้ 45–50°C ต่ออีก 12–24
                ชั่วโมง (ยิ่งเวลานาน สีมักยิ่งเข้มและทน)
              </li>
              <li>
                <span class="font-medium">ย้อมเย็น</span>: จุ่ม–ขยำในน้ำสี
                (โดยเฉพาะสีที่สกัดเย็น) ~30 นาทีขึ้นไป บางสีต้อง “ตากแดดคั่น”
                แล้วจุ่มซ้ำหลายรอบ สีจะเข้มขึ้นตามจำนวนรอบ (เช่น คราม/มะเกลือ)
                บางชนิดแช่ค้างคืน (เช่น เปลือกมังคุด)
              </li>
            </ul>
          
          <p class="font-semibold">
            4.3 การใช้สารช่วยติด (Mordant/Assist)
          </p>
            
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">ก่อนย้อม</span>: เช่น
                แช่ฝ้ายในน้ำถั่วเหลืองให้โปรตีนแทรกเส้นใยเซลลูโลส
                ช่วยเพิ่มการติดสี
              </li>
              <li>
                <span class="font-medium">ขณะย้อม</span>: ใส่เกลือเมื่อ ~60°C
                หรือต้มไป ~10 นาที และ/หรือเติมด่างช่วงท้าย ~15 นาที
                (ขึ้นกับสูตร/วัสดุให้สี)
              </li>
              <li>
                <span class="font-medium">หลังย้อม</span>: คลุกขี้เถ้า/หมักโคลน
                (กรณีมะเกลือ) หรือจุ่มน้ำด่างสำหรับสีกลุ่มเปลือกไม้ เป็นต้น
              </li>
            </ul>
            <p class="indent-8">
              บางวัสดุทำหน้าที่ได้ทั้ง “ให้สี–ช่วยย้อม–ช่วยติด” พร้อมกัน (เช่น
              กลุ่มที่มีรสฝาด/กรดอ่อนอย่างใบมะขามแก่ในสูตรย้อมครั่งดั้งเดิม)
            </p>
          
        </ul>
        <p class="text-justify indent-8">
          การใช้สารช่วยติดทั้ง 3 ลักษณะ เลือกใช้ได้ตามความเหมาะสม ทักษะ ความถนัด
          และวัสดุที่หาได้ในท้องถิ่น
          การย้อมสีธรรมชาติมีความหลากหลายไม่น้อยไปกว่า
          การย้อมเส้นไหมด้วยสีสังเคราะห์ แม้การให้สีอาจแตกต่างกัน
          แต่คุณภาพและความงามไม่น้อยกว่ากัน
          สีสังเคราะห์โดดเด่นเรื่องความสม่ำเสมอ ควบคุมได้ง่าย
          ส่วนสีธรรมชาติโดดเด่นเรื่อง “ความต่างและเอกลักษณ์”
          จึงเหมาะกับงานหัตถกรรมพื้นบ้าน
          และสามารถสร้างมูลค่าเพิ่มจากความต่างนี้ได้
          เมื่อทุกคนเข้าใจคุณค่าเดียวกัน
        </p>
        <p class="text-justify indent-8">
          จังหวัดบุรีรัมย์มีทรัพยากรพืชให้สีจำนวนมาก จากการทดลองนำผู้นำชาวบ้าน
          ตำบลบัวทอง อำเภอเมือง จังหวัดบุรีรัมย์
          และนักศึกษาสาขาวิทยาศาสตร์สิ่งทอ มหาวิทยาลัยราชภัฏบุรีรัมย์
          เข้าสำรวจป่าติดที่ทำการองค์การบริหารส่วนตำบลบัวทอง เมื่อเดือนกรกฎาคม
          2555 บริเวณประมาณ 200 ตารางเมตร ใช้เวลา 1 ชั่วโมง พบพืชให้สีมากกว่า 20
          ชนิด แสดงให้เห็นว่าพืชให้สีมีอยู่ทั่วไป และหาได้ไม่ยาก โดยแสดงเป็นตัวอย่างดังต่อไปนี้
        </p>
        <p class="text-justify indent-8">ตารางที่ 4 การสกัดและการย้อมสีธรรมชาติ</p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง5.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain w-full max-w-3xl"
            />
          </div>
      </section>
    </div>
  </div>
</template>
