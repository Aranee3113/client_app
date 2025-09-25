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
    v-if="type === 'Identity1'"
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

  <div
    v-else-if="type === 'Identity2'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          อัตลักษณ์ผ้าเขมรในยุคนี้
        </h2>
      </div>

      <!-- เนื้อหา (ข้อความล้วน ไม่มีภาพ) -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ลักษณะที่ผู้เชี่ยวชาญเลือกใช้ในลวดลายผ้าเขมร
        </p>

        <p class="mb-4">
          ลวดลายที่ช่างทอชาติพันธุ์เขมรผู้เชี่ยวชาญเลือกใช้ มักมีลักษณะดังนี้
        </p>
        <ol class="list-decimal ml-6 space-y-2">
          <li>โครงสร้างลวดลายละเอียด เล็ก</li>
          <li>ใช้สีเหลืองเข้ม แดงเข้ม เขียวเข้ม และมีสีขาวประปราย</li>
          <li>เนื้อผ้าเรียบเนียน มันวาว</li>
        </ol>

        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white mt-8 mb-4"
        >
          อัตลักษณ์ผ้าเขมรในยุคนี้
        </p>
        <p class="mb-4">
          จากลักษณะข้างต้น สามารถสรุปอัตลักษณ์ผ้าเขมรในยุคนี้ได้ว่า
        </p>
        <ol class="list-decimal ml-6 space-y-3">
          <li>ให้สีสันตัดกันและมักใช้ตั้งแต่ 3 สีขึ้นไป</li>
          <li>สีสันโดยรวมของผ้ามองเห็นเป็นสีทองอร่าม</li>
          <li>มีความเงางาม</li>
          <li>ใช้เส้นใยไหมสำหรับผ้าพิเศษมากกว่าเส้นใยชนิดอื่น</li>
          <li>
            ทอผ้าสำหรับใช้เป็นผ้านุ่ง ผ้าตัดชุดทำงานทั้งหญิงชาย
            และผ้าเอนกประสงค์ ขนาดประมาณ 40–75 × 200–250 เซนติเมตร เพื่อใช้พันคอ
            คลุมไหล่ ห่มสไบ หรือผูกเอวมากขึ้น เนื่องจากขายง่าย ทำได้เร็ว
            และใช้ได้หลากหลาย
          </li>
        </ol>
        <div class="mb-6 text-center">
         
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <figure class="text-center">
            <img
              src="/assetts/css/image/สไบเลือกเจือยย.jpg"
                alt="สไบเลือกเจือยย"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 1 สไบเลือกเจือยย
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/การ.jpg"
                alt="การสีสันแบบสีตรงกันข้าม มีสีขาวประปรายในผ้าโสร่งและสไบเลือกเจือยย"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 2 สีตรงกันข้ามมีสีขาว<br />
                ประปรายในผ้าโสร่งและสไบเลือกเจือยย
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ซิ่นหมีลายตีนตุ๊กแก.jpg"
                alt="ซิ่นหมีลายตีนตุ๊กแก"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 3 ซิ่นหมีลายตีนตุ๊กแก
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าโฮลลายโฮลตะหลบ.jpg"
                alt="ผ้าโฮล ลายโฮลตะหลบ"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 4 ผ้าโฮล ลายโฮลตะหลบ
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายซะมอ.jpg"
                alt="ผ้าลายซะมอ"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 5 ผ้าลายซะมอ
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายอัมปรม.jpg"
                alt="ผ้าลายอัมปรม"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 6 ผ้าลายอัมปรม
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายซะคู.jpg"
                alt="ผ้าลายซะคู"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 7 ผ้าลายซะคู
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/เส้นยืนเส้นพุ่งต่างสีกัน.jpg"
                alt="ผ้าพื้นที่ใช้เส้นยืนเส้นพุ่งต่างสีกัน"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 8 ผ้าพื้นที่ใช้เส้นยืนเส้นพุ่งต่างสีกัน
            </figcaption>
          </figure>
        </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="type === 'Identity3'"
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
          ผ้าพื้น
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="plain-silk"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าพื้น (Plain Fabric)
        </h2>

        <p class="text-justify indent-8">
          “ผ้าพื้น” คือผ้าที่มีสีเดียวทั้งผืน ลวดลายจึงเกิดจาก
          <span class="font-medium">โครงสร้างทอ</span> และ
          <span class="font-medium">ผิวสัมผัสของเส้นไหม/เส้นด้าย</span>
          มากกว่าลายพิมพ์หรือมัดย้อม
          ผ้าพื้นบุรีรัมย์โดดเด่นด้วยเส้นไหมที่ช่างทอปลูกหม่อนเลี้ยงไหมและสาวเอง
          ฟอก–ย้อมด้วยสีธรรมชาติ แล้วทอด้วยกี่มือ
          ทำให้ได้ผิวสัมผัสหลากหลายและมีเสน่ห์เฉพาะถิ่น พบได้ทั่วทั้งจังหวัด
          เช่น บ้านหนองเพชร บ้านตะเคียน อำเภอเมือง จังหวัดบุรีรัมย์
        </p>

        <h3
          id="plain-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ความงามอยู่ที่
            <span class="font-medium">ผิวสัมผัส ฝีมือการทอ และสีสัน</span>
            มากกว่าลวดลายพิมพ์
          </li>
          <li>
            ผิวผ้ามักเห็น
            <span class="font-medium"
              >ปุ่ม ปม หรือเส้นนูนคล้ายลูกฟูกเล็ก ๆ</span
            >
            จากเส้นไหมพื้นบ้านและโครงสร้างทอ ทำให้ไม่ยับง่ายและดูมีมิติ
          </li>
          <li>
            ความมันวาวของผ้าเกิดจากการ
            <span class="font-medium"
              >จับคู่ไหมเส้นยืน–เส้นพุ่งต่างขนาด/ต่างคุณสมบัติ</span
            >
            มากกว่าความเงาของตัวเส้นไหมเพียงอย่างเดียว
          </li>
        </ul>

        <h3
          id="plain-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            จากการสำรวจตลาด ผ้าพื้นเป็นหมวดที่
            <span class="font-medium">ผู้บริโภคต้องการมาก</span>
            และมีส่วนแบ่งตลาดสูง เหมาะกับการตัดเย็บเสื้อผ้าสมัยนิยมหลากสไตล์
          </li>
          <li>
            ผ้าไหมพื้นบุรีรัมย์หลายชนิดเป็น
            <span class="font-medium">เนื้อหนา ไม่มันวาวจัด</span>
            จากไหมพันธุ์พื้นบ้าน เส้นใยขนาดใหญ่ ให้ลุคเรียบหรู ใช้ได้หลายโอกาส
          </li>
          <li>
            <span class="font-medium">ดูแลง่าย</span>—ซักรีดคล้ายผ้าฝ้าย
            สวมใส่สบายในชีวิตประจำวัน
          </li>
        </ul>

        <h3
          id="plain-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าพื้นบุรีรัมย์
        </h3>
        <p class="text-justify indent-8">
          แก่นของอัตลักษณ์อยู่ที่ความเป็น “พื้นบ้านแต่งดงาม”:
          เสน่ห์ของเนื้อผ้าและผิวสัมผัสที่ต่างจากแหล่งอื่นอย่างชัดเจน
          เกิดจากเส้นไหมพื้นบ้าน การย้อมสีธรรมชาติ และการทอด้วยกี่มือ
          จนได้ผืนผ้าที่เรียบแต่มีบุคลิก—เป็นเอกลักษณ์ของผ้าพื้นบุรีรัมย์อย่างแท้จริง
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าไหมพื้น.jpg"
            alt="ผ้าไหมพื้น"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้าไหมพื้น ที่มีผิวสัมผัสหยาบมีปุ่มปม
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าไหมพื้น1.jpg"
            alt="ผ้าไหมพื้นที่มีผิวสัมผัสเรียบมัน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 ผ้าไหมพื้นที่มีผิวสัมผัสเรียบมัน
        </p>

      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'Identity4'"
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

  <div
    v-else-if="type === 'Identity5'"
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

  <div
    v-else-if="type === 'Identity6'"
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
          ผ้ามัดหมี่
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-silk"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่ (Mudmee / Ikat)
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          ผ้ามัดหมี่ของจังหวัดบุรีรัมย์เป็นผ้าที่มีความงดงามและมีชื่อเสียงเป็นที่รู้จัก
          มีลักษณะเนื้อผ้าใหญ่ ๆ 2 แบบ ได้แก่
          <span class="font-medium">แบบเนื้อหนาคล้ายผ้าฝ้าย</span> และ
          <span class="font-medium">แบบเนื้อแน่นนุ่มเนียนพลิ้วคล้ายผ้าซาติน</span>
          ซึ่งแตกต่างกันตามชนิดเส้นไหม วิธีการทอ และกลุ่มชาติพันธุ์ผู้ผลิต
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-4 text-justify">
          <li>
            <span class="font-medium">ลักษณะที่ 1: เนื้อหนาคล้ายผ้าฝ้าย</span>
            — ใช้ไหมเส้นใหญ่ ทอ 2 ตะกอ ลวดลายมัดหมี่มีสีสันนุ่มนวล ไม่ชัดเจนนัก
            เมื่อขยับผ้าจะเห็นสีสันเหลือบลาย มักพบในผ้าของกลุ่มชาติพันธุ์ลาว
            <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                ถ้าใช้ <span class="font-medium">ไหมหัว</span>: ผิวสัมผัสขรุขระ
                ไม่ลื่นมือ ไม่ค่อยมันวาว แต่นุ่ม
              </li>
              <li>
                ถ้าใช้ <span class="font-medium">ไหมน้อย</span>: ผิวสัมผัสเรียบ
                ลื่นมือ ทิ้งตัวดี และมีความมันวาวมากกว่า
              </li>
            </ul>
          </li>

          <li>
            <span class="font-medium">
              ลักษณะที่ 2: เนื้อแน่นนุ่มเนียนพลิ้วคล้ายซาติน
            </span>
            — ใช้ไหมเส้นเล็ก ทอเป็นลายต่วน 3 ตะกอ หรือ ลายลูกแก้ว 3–4 ตะกอ
            ส่วนใหญ่เป็นผ้าของกลุ่มชาติพันธุ์เขมร ลวดลายมัดหมี่เด่นชัด กระจ่างตา
            มักทอด้วยไหมน้อยจึงมันวาวมาก ส่วนไหมหัวนิยมใช้ทอเป็นผ้าพื้น
          </li>

          <li>
            <span class="font-medium">ประเภทลวดลายหลัก 6 ประเภท</span>
            ของผ้ามัดหมี่ชาวบุรีรัมย์:
            <ol class="list-decimal list-inside ml-6 mt-2 space-y-1">
              <li>ลายลักษณะรูปทรงเรขาคณิต</li>
              <li>ลายลักษณะรูปสัตว์</li>
              <li>ลายจากรูปลักษณ์ของข้าวของเครื่องใช้</li>
              <li>ลายจากรูปลักษณ์ของงานสถาปัตยกรรม</li>
              <li>ลายจากรูปลักษณ์ของพืชพรรณธรรมชาติ</li>
              <li>ลายประยุกต์ผสมผสานจากจินตนาการและอื่น ๆ</li>
            </ol>
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นผ้าที่มีความงดงามและมีชื่อเสียงเป็นที่รู้จักในจังหวัดบุรีรัมย์
            โดดเด่นทั้งด้านเนื้อผ้าและเทคนิคการทอ
          </li>
          <li>
            เนื้อหนาคล้ายฝ้าย (ทอ 2 ตะกอ) ให้ลุคอบอุ่น สีสันนุ่มนวล
            เหมาะกับลวดลายที่มีเอฟเฟกต์เหลือบสี
          </li>
          <li>
            เนื้อแน่นนุ่มเนียนพลิ้วคล้ายซาติน (ลายต่วน/ลูกแก้ว 3–4 ตะกอ)
            ให้ความมันวาวและลายที่กระจ่างตา
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ผ้ามัดหมี่บุรีรัมย์
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์สำคัญอยู่ที่ความสัมพันธ์ระหว่างชนิดเส้นไหม วิธีการทอ
          และกลุ่มชาติพันธุ์: กลุ่มลาวนิยมไหมเส้นใหญ่ ทอ 2 ตะกอ
          ให้สีสันนุ่มนวลและเอฟเฟกต์เหลือบลาย ขณะที่กลุ่มเขมรนิยมไหมเส้นเล็ก
          ทอเป็นลายต่วน/ลูกแก้ว 3–4 ตะกอ
          ให้เนื้อผ้านุ่มเนียนคล้ายซาตินและลวดลายที่เด่นชัด
          อีกทั้งยังมีระบบแบบแผนลวดลาย 6 ประเภทชัดเจน
          โดยเฉพาะหมวดเรขาคณิตที่เป็นพื้นฐานของการมัดหมี่และทำซ้ำได้ทั้งผืน
        </p>

        <!-- รายละเอียดลายมัดหมี่ (เรขาคณิต) -->
        <h3
          id="mudmee-geometric"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          รายละเอียด “ผ้ามัดหมี่ลายลักษณะรูปทรงเรขาคณิต”
        </h3>

        <!-- ใช้ลำดับรายการที่ถูกต้องตามโครงสร้าง -->
        <ol class="list-decimal list-inside indent-8 space-y-6 text-justify">
          <li>
            <div>
              <p class="indent-8">
                ลายโคม รูปทรงขนมเปียกปูน ทั้งแนวตั้งและแนวนอน มีชื่อเรียกเช่น
                ลายโคมห้า ลายโคมเจ็ด ลายโคมเก้า เป็นต้น
                มักทำเป็นลายหลักและเสริมด้วยลายประกอบ
                ในกลุ่มชาติพันธุ์เขมรจะมัดเส้นเฉียงตัดกันเป็นรูปขนมเปียกปูนไว้ก่อน
                เรียกว่า “เทอกระแซ” แล้วจึงตกแต่งด้วยลายอื่น ๆ
                มีทั้งแบบลายโคมทั้งผืน และลายโคมที่ตกแต่งลูกเล่น
              </p>
              <figure class="mt-4">
                <img
                  src="/assetts/css/image/ผ้ามัดหมี่1.jpg"
                  alt="ผ้ามัดหมี่รูปทรงเรขาคณิต"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 1 ผ้ามัดหมี่รูปทรงเรขาคณิต
                </figcaption>
              </figure>
            </div>
          </li>

          <li>
            <div>
              <p class="indent-8">
                ลายขอ รูปตะขอ ออกแบบได้ทั้งแนวตั้งและแนวนอน เกิดจากการแตกลายโคม 2
                ลายแล้วตัดบางส่วนออก มักใช้เป็นลายประกอบ และเมื่อทำเป็นลายหลัก
                นิยมแทรกไหมสีต่าง ๆ คั่นเป็นช่วง ๆ ที่พบมากคือ “หมี่ขอคั่นควบ”
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mt-4">
                <figure class="text-center">
                  <img
                    src="/assetts/css/image/ลายโคม.png"
                    alt="แพทเทริน์ลายโคม"
                    class="rounded-2xl shadow-lg object-cover w-full h-auto"
                  />
                  <figcaption class="italic mt-2">ภาพที่ 2 แพทเทริน์ลายโคม</figcaption>
                </figure>

                <figure class="text-center">
                  <img
                    src="/assetts/css/image/ลายขอ.png"
                    alt="แพทเทริน์ลายขอ"
                    class="rounded-2xl shadow-lg object-cover w-full h-auto"
                  />
                  <figcaption class="italic mt-2">ภาพที่ 3 แพทเทริน์ลายขอ</figcaption>
                </figure>
              </div>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/หมี่ลายขอ.jpg"
                  alt="ผ้ามัดหมี่ลายขอ"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 4 ผ้ามัดหมี่ลายขอ
                </figcaption>
              </figure>
            </div>
          </li>

          <li>
            <div>
              <p class="indent-8">
                ลายหมากจับ เส้นคู่กัน 3 หรือ 5 เส้น เส้นกลางยาว
                เส้นข้างสั้นลดหลั่น เรียกชื่อตามขนาด เช่น “หมากจับน้อย” (3–5 เส้น)
                หรือ “หมากจับใหญ่” ใช้ได้ทั้งลายหลักและลายประกอบ
                เติมเต็มช่องว่างให้สมบูรณ์เหมือนการจัดองค์ประกอบศิลป์
              </p>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/หมากจับ.png"
                  alt="กลุ่มลวดลายประเภทหมากจับ"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 5 กลุ่มลวดลายประเภทหมากจับ
                </figcaption>
              </figure>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/ลายหมากจับ.jpg"
                  alt="ผ้ามัดหมี่ประเภทลายหมากจับ"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 6 ผ้ามัดหมี่ประเภทลายหมากจับ วางลายเป็นเส้นตรง
                </figcaption>
              </figure>
            </div>
          </li>

          <li>
            <div>
              <p class="indent-8">
                ลายขาเปีย เส้นไขว้แนวเฉียงเป็นรูปตัว X ทำได้ทั้งแนวตั้งและแนวนอน
                นิยมใช้เป็นลายประกอบร่วมกับลายโคม ลายขอ ในผ้ามัดหมี่ขอคั่น
                เพื่อเสริมให้ลวดลายสมบูรณ์สวยงาม
              </p>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/ขาเปีย.png"
                  alt="แพทเทริน์ลายมัดหมี่กลุ่มลายขาเปีย"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 7 แพทเทริน์ลายมัดหมี่กลุ่มลายขาเปีย
                </figcaption>
              </figure>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/ลายขาเปีย.jpg"
                  alt="ผ้ามัดหมี่กลุ่มลายขาเปีย"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 8 ผ้ามัดหมี่กลุ่มลายขาเปีย
                </figcaption>
              </figure>
            </div>
          </li>

          <li>
            <div>
              <p class="indent-8">
                ลายนาค พบบ่อยเพราะสวยงามและมีความหมายเชิงสัญลักษณ์
                เชื่อมกับวัฒนธรรมและภูมินิเวศอุษาคเนย์
                มีทั้งแบบเห็นรูปลักษณ์ทั้งลำตัว และเห็นเฉพาะหัวนาค
                ใช้ได้ทั้งลายหลักและลายประกอบ
              </p>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/ลายนาค.jpg"
                  alt="ผ้ามัดหมี่กลุ่มลายนาค"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 9 ผ้ามัดหมี่กลุ่มลายนาค
                </figcaption>
              </figure>

              <figure class="mt-4">
                <img
                  src="/assetts/css/image/หมี่ลายนาค.jpg"
                  alt="ผ้ามัดหมี่ลายนาคในอีกรูปลักษณ์หนึ่ง"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 10 ผ้ามัดหมี่ลายนาคในอีกรูปลักษณ์หนึ่ง
                </figcaption>
              </figure>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'Identity7'"
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
          ผ้าลวดลายจากรูปลักษณ์ของข้าวของเครื่องใช้
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-objects"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายจากรูปลักษณ์ของข้าวของเครื่องใช้
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          คนโบราณมีจินตนาการสูง
          เห็นสิ่งของใกล้ตัวแล้วถ่ายทอดเป็นลวดลายผ้าได้อย่างหลากหลาย
          ข้าวของเครื่องใช้ในชีวิตประจำวันจึงถูกตีความเป็นลายบนผ้ามัดหมี่ เช่น
          <span class="font-medium">ลายเชี่ยนหมาก</span>,
          <span class="font-medium">ลายขันบายศรี</span>
          ตลอดจนชื่อที่แฝงอารมณ์ขันอย่าง
          <span class="font-medium">ลายประแจบ่ไข</span>
          (หมายถึงลูกกุญแจที่ไขไม่ได้)
          ปัจจุบันช่างทอยังคงออกแบบลายจากสิ่งของร่วมสมัย
          และพยายามเชื่อมโยงอัตลักษณ์ท้องถิ่นเข้าสู่ลวดลาย
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-objects-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            ต้นกำเนิดลายจาก
            <span class="font-medium">ข้าวของเครื่องใช้ใกล้ตัว</span>
            และการสังเกตในชีวิตประจำวัน แปลงเป็นรูปทรงเชิงสัญลักษณ์บนผ้า
          </li>
          <li>
            ตัวอย่างลายดั้งเดิม:
            <span class="font-medium">ลายเชี่ยนหมาก, ลายขันบายศรี</span>
            และลายที่ตั้งชื่ออย่างมีอารมณ์ขัน เช่น
            <span class="font-medium">ลายประแจบ่ไข</span>
          </li>
          <li>
            ความร่วมสมัย: ยังคง
            <span class="font-medium">รูปลักษณ์คล้ายลายเดิม</span>
            แต่ตั้งชื่อ/ตีความใหม่ตามสิ่งแวดล้อมปัจจุบัน เช่น
            <span class="font-medium"
              >ลายยางล้อรถไถ, ลายอิฐบล็อก, ลายปลาหมึก, ลายการบินไทย</span
            >
          </li>
          <li>
            ใช้กระบวนการมัดหมี่ในการ
            <span class="font-medium">นับเส้น–จัดจังหวะ</span>
            เพื่อคงความสมดุลของลาย และให้จดจำได้ง่าย
          </li>
          <li>
            เปิดโอกาสให้ <span class="font-medium">สร้างสรรค์ต่อยอด</span>
            โดยคงแก่นเดิมและเพิ่มรายละเอียดหรือชื่อเรียกที่สะท้อนยุคสมัย
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-objects-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นหมวดลายที่ผู้บริโภค <span class="font-medium">เข้าถึงง่าย</span>
            เพราะมาจากสิ่งของคุ้นตา สื่อสารเรื่องราวได้ตรงไปตรงมา
          </li>
          <li>
            เหมาะกับการพัฒนาเป็น
            <span class="font-medium">สินค้าที่ระลึก/ของฝากชุมชน</span>
            งานเทศกาลท้องถิ่น และชุดร่วมสมัยที่ต้องการจุดเด่นด้านเรื่องเล่า
            (storytelling)
          </li>
          <li>
            ประยุกต์ใช้ได้กับ <span class="font-medium">ผ้าทอหลายชนิด</span>
            (เช่น ผ้ามัดหมี่ลายหลักหรือลายประกอบ) และขนาดผืนต่าง ๆ
            ตามวัตถุประสงค์การใช้งาน
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-objects-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ผ้าลวดลายจากข้าวของเครื่องใช้
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์สำคัญอยู่ที่การ
          <span class="font-medium">เชื่อมโยงวิถีชีวิตกับลวดลาย</span>:
          ใช้สิ่งของใกล้ตัวเป็นแรงบันดาลใจ
          คงเสน่ห์ชื่อเรียกแบบพื้นบ้านและอารมณ์ขัน
          พร้อมปรับชื่อ–ความหมายให้สอดคล้องกับ
          <span class="font-medium">สิ่งแวดล้อมร่วมสมัย</span>
          อีกทั้งยังสะท้อนความพยายามของชุมชนในการ
          <span class="font-medium">สื่ออัตลักษณ์ท้องถิ่น</span>
          ผ่านผ้าทอมือ
          ให้ผืนผ้าเป็นสื่อทางวัฒนธรรมที่มีชีวิตและเติบโตไปกับยุคสมัย
        </p>
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายฟันเลื่อย.jpg"
            alt="ผ้ามัดหมี่ลายฟันเลื่อย"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 1 ผ้ามัดหมี่ลายฟันเลื่อย
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายประแจบ่ไข.jpg"
            alt="ผ้ามัดหมี่ลายประแจบ่ไข"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 2 ผ้ามัดหมี่ลายประแจบ่ไข
            </p>
          </div>
        </div>
        <br />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายยางล้อ.jpg"
            alt="ผ้ามัดหมี่ลายยางล้อรถไถ"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 3 ผ้ามัดหมี่ลายยางล้อรถไถ
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/ลายเชิงเทียน.jpg"
            alt="ผ้ามัดหมี่ลายเชิงเทียน"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">
              ภาพที่ 4 ผ้ามัดหมี่ลายเชิงเทียน
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'Identity8'"
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

  <div
    v-else-if="type === 'Identity9'"
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

  <div
    v-else-if="type === 'Identity10'"
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
          ผ้าลวดลายรูปคนและสัตว์
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อหลัก -->
        <h2
          id="mudmee-figures-animals"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้ามัดหมี่: ลวดลายรูปคนและสัตว์
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          ลายสัตว์บนผืนผ้าของชาวบุรีรัมย์มีทั้งสัตว์ในจินตนาการและสัตว์ที่เคารพนับถือ
          เช่น
          <span class="font-medium">ลายนาค</span>
          รวมถึงสัตว์พาหนะอย่างช้างและม้า สัตว์เลี้ยงใกล้ตัวอย่างไก่
          และสัตว์ที่งดงามประทับใจ เช่น กวาง นกยูง เป็นต้น
          สำหรับการถ่ายทอดรูปลักษณ์บนผืนผ้า มีทั้งแบบอยู่ในกรอบเรขาคณิต
          แบบเชิงจินตนาการ และแบบภาพเสมือนจริง
        </p>

        <!-- ลักษณะสำคัญ -->
        <h3
          id="mudmee-figures-animals-key-features"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลักษณะสำคัญ
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            กลุ่มลายสัตว์หลัก:
            <span class="font-medium">สัตว์ในจินตนาการ/เคารพนับถือ</span> (เช่น
            นาค), <span class="font-medium">สัตว์พาหนะ</span> (ช้าง ม้า),
            <span class="font-medium">สัตว์เลี้ยง</span> (ไก่), และ
            <span class="font-medium">สัตว์งดงาม</span> ที่สร้างความประทับใจ
            (กวาง นกยูง)
          </li>
          <li>
            ลายรูปคนอาจปรากฏร่วมฉากกับสัตว์ พิธีกรรม หรือการละเล่น
            ในเชิงสัญลักษณ์ของวิถีชุมชน
          </li>
          <li>
            รูปแบบการถ่ายทอดมี <span class="font-medium">3 ลักษณะ</span>:
            <span class="font-medium">ในกรอบเรขาคณิต</span>,
            <span class="font-medium">ตามจินตนาการ (สไตลิสต์)</span>, และ
            <span class="font-medium">ภาพเสมือนจริง</span>
          </li>
          <li>
            โครงสร้างลายอาศัยการ
            <span class="font-medium">นับเส้น–จัดจังหวะ–ทำซ้ำ</span>
            เพื่อให้รูปคน/สัตว์อ่านออกชัดเจน และกลมกลืนกับจังหวะของผืนผ้า
          </li>
        </ul>

        <!-- ความนิยมและการใช้งาน -->
        <h3
          id="mudmee-figures-animals-market"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความนิยมและการใช้งาน
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            เป็นหมวดลายที่ผู้คน <span class="font-medium">เข้าถึงง่าย</span>
            เพราะอ้างอิงสิ่งมีชีวิตที่คุ้นเคยและมีความหมายในท้องถิ่น
          </li>
          <li>
            เหมาะกับการเล่าเรื่อง (storytelling) บนผืนผ้า ใช้ได้ทั้งเป็น
            <span class="font-medium">ลายหลัก</span> หรือ
            <span class="font-medium">ลายประกอบ</span>
            เพื่อเพิ่มมิติให้ภาพรวมของผืน
          </li>
          <li>
            การเลือกโทนสีและจังหวะลายสามารถสะท้อน
            <span class="font-medium">บรรยากาศพิธีกรรม–วิถีชีวิต</span>
            และความรู้สึกที่ต้องการสื่อ
          </li>
        </ul>

        <!-- อัตลักษณ์ -->
        <h3
          id="mudmee-figures-animals-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          อัตลักษณ์ลวดลายรูปคนและสัตว์
        </h3>
        <p class="text-justify indent-8">
          อัตลักษณ์เด่นคือการผสาน
          <span class="font-medium">ความเชื่อท้องถิ่น</span> (เช่น สัญลักษณ์
          <span class="font-medium">นาค</span>) เข้ากับ
          <span class="font-medium">วิถีชีวิตจริง</span> ผ่านรูปคนและสัตว์
          พร้อมปรับรูปแบบตั้งแต่กรอบเรขาคณิตไปจนถึงภาพเสมือนจริง
          ทำให้ผืนผ้าทั้งคงเสน่ห์แบบดั้งเดิมและเปิดพื้นที่ให้ความคิดสร้างสรรค์ร่วมสมัย
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายนกยูง.jpg"
            alt="ผ้ามัดหมี่ลายนกยูง"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ผ้ามัดหมี่ลายนกยูง
        </p>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'Identity11'"
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

  <div
    v-else-if="type === 'Identity12'"
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
