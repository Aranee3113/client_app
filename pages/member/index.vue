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
const showTail = ref(false);

// state สำหรับบังคับรีเฟรช CommentList รายโพสต์
const listKeys = ref({});
const bumpListKey = (postId) => {
  listKeys.value[postId] = (listKeys.value[postId] || 0) + 1;
};

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  // ถ้ามี fileBase ให้ใช้ก่อน, ถ้าไม่มีให้ตัด /api ออกจาก apiBase อัตโนมัติ
  const apiBase = $config?.public?.apiBase || "";
  const fileBase =
    $config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");

  return `${fileBase}${path}`;
};

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
    const res = await $axios.get("/post"); // backend คืนเฉพาะ is_active = 1
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
    <div class="max-w-6xl mx-auto">
      <!-- BaseCard -->
      <card-basecard />

      <!-- ยินดีต้อนรับ -->
      <div class="text-center mt-10 mb-12">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ภูมิปัญญาผ้าทอ กลุ่มชาติพันธุ์เขมรจังหวัดบุรีรัมย์
        </h2>
      </div>
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white tracking-tight"
        >
          ความรู้ผ้าทอมือของเขมรบุรีรัมย์
        </p>
        <p class="mb-4">
          ผ้าทอมือของเขมรบุรีรัมย์มีหลายชิ้น โดยมีผ้าที่ทอไว้เป็นเครื่องใช้
          (ที่นอน หมอน ผ้าห่ม) เครื่องนุ่ง (ใช้กับร่างกายท่อนล่างจากเอวลงไป)
          ผ้าที่เป็นเครื่องห่ม (ใช้กับร่างกายท่อนบน จากเอวขึ้นมา) ผ้านุ่ง
          และผ้าเอนกประสงค์สำหรับใช้ตัดชุดหญิงชาย หรืออื่นๆ
          ผ้าทอมือของชาวเขมรบุรีรัมย์ในวัฒนธรรมดั้งเดิมจะมีชื่อเรียกเฉพาะ เช่น
          <span class="font-bold">สำป๊วดกะเนียว (ผ้าหางกระรอก)</span>,
          <span class="font-bold">สำป็วดโฮล (ผ้าลาย)</span>,
          <span class="font-bold">สมอ</span>,
          <span class="font-bold">อัปปรม</span>,
          <span class="font-bold">ละเบิก</span>
          เป็นต้น
        </p>
        <p>
          ในปัจจุบันชาวบ้านรับความรู้เรื่องการทอผ้าจากภายนอกชุมชน
          หรือจากวัฒนธรรมอื่น ผ้าบางชิ้นอาจเรียกทับศัพท์ภาษาไทย
          หรือภาษาลาวสำเนียงเขมร เช่น
          <span class="font-bold">“ซินมี”</span>
          หมายถึง “ผ้าซิ่นลายมัดหมี่” ในภาษาไทยและลาว
          เนื้อผ้าทอมือของชาวเขมรบุรีรัมย์ สังเกตง่าย โดยมักเป็นผ้าเนื้อเรียบ
          แน่น ไม่หนามาก เมื่อถามถึงเหตุผลเรื่องความหนา บางของเนื้อผ้า พบว่า
          ผ้าเนื้อหนาปานกลางเวลานุ่งทิ้งตัวสวยงาม และเป็นความชอบของเขาเอง
          ชอบจนเป็นอัตลักษณ์ของตนเอง
          ถ้าวิเคราะห์ลักษณะของเนื้อผ้ากับการนุ่งผ้าของ
          <span class="font-bold">นางอัปสรา</span>
          ที่เป็นตัวแทนของชาวเขมรที่มีอายุนับพันปี พบว่า
          <span class="font-bold"
            >นางอัปสรานุ่งผ้าเนื้อบาง พลิ้วไหว แนบเนื้อ</span
          >
          มองเห็นรูปร่างของผู้สวมใส่ค่อนข้างชัดเจน ความชอบเนื้อผ้าลักษณะนี้
          เป็นสัญลักษณ์ที่แสดงตัวตนของชนชาติ
          เป็นความหมายทางมานุษยวิทยาที่พบได้แม้ในปัจจุบัน
        </p>
        <div class="mt-4 flex justify-center">
          <img
            src="/assetts/css/image/Apsaraskirt.jpg"
            alt="Home Illustration"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p
          class="mt-4 text-xl md:text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
        >
          ผ้านุ่งอัปสรา
        </p>
        <p class="m-4">
          สีสันของผ้า
          เป็นสื่อที่แสดงความตัวตนด้านมานุษยวิทยาของชาวเขมรบุรีรัมย์ได้อย่างชัดเจนกว่าเรื่องของเนื้อผ้า
          เพราะสีสันเป็นเรื่องที่มองได้ด้วยตา
          และรับรู้ได้ด้วยอารมณ์และความรู้สึก ถ้าใครมาจังหวัดบุรีรัมย์
          จะได้ยินคำพูดล้อเลียนการเลือกสีสันของเสื้อผ้าว่า
          <span class="font-bold">“เขียวสวายจีก”</span> ซึ่งหมายถึง สีเขียว
          สวายจีก คือชื่อหมู่บ้านที่เขมรบุรีรัมย์อาศัยอยู่
          ตั้งชื่อหมู่บ้านตามมะม่วงพันธุ์พื้นบ้าน แต่
          <span class="font-bold">“เขียว สวายจีก”</span>
          คือสีของเสื้อผ้าหรือสิ่งของที่มีสีเขียวในระดับที่ให้อารมณ์ความเป็นเขมรบุรีรัมย์อย่างชัดเจน
          โดยให้บ้านสวายจีก เป็นตัวแทนของความเป็นเขมรบุรีรัมย์
          เป็นคำพูดล้อเลียนในกลุ่มชนคนบุรีรัมย์โดยทั่วไป
          ในขณะเดียวกันก็ทำให้รู้ว่าสีสันบ่งบอกความเป็นกลุ่มชาติพันธุ์ทางมานุษยวิทยาได้จริง
          ว่ากันว่า คนเขมรบุรีรัมย์ชอบใช้สีเขียว เหมือนคนจีนชอบใช้สีชมพู
          ชาวไทยทรงดำหรือลาวโซ่งของชาวกูยชอบใช้เสื้อผ้าสีดำ เป็นต้น
          ในการออกแบบสีสันในลวดลายผ้าเขมรบุรีรัมย์ จะเลือกใช้สีเอกณรงค์ ประมาณ 5
          สี คือ เหลืองเข เขียวขี้ม้า แดงน้ำหมาก น้ำเงินสด และดำ
          โดยใช้สีขาวสำหรับจัดจังหวะลายบ้างพองาม
        </p>
        <div class="mt-4 flex justify-center">
          <img
            src="/assetts/css/image/Naga.jpg"
            alt="Home Illustration"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p
          class="mt-4 text-xl md:text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
        >
          การให้สีสันผ้าทอมือ ในประเพณีบวชนาคชาวเขมรบุรีรัมย์
        </p>
        <p class="m-4">
          นอกจากเรื่องของสีสันแล้ว การให้น้ำหนักสีในลวดลายผ้า
          ยังเป็นประเด็นหนึ่งที่แสดงออกถึงความเป็นตัวตนของกลุ่มชาติพันธุ์ได้สังเกตเห็นว่า
          ชาวเขมรบุรีรัมย์ที่อำเภอห้วยราช และอำเภอกระสัง จังหวัดบุรีรัมย์
          มีรสนิยมในการให้สีสันผ้าเป็นแบบเดียวกัน
          กล่าวถึงในกรณีการทำเส้นไหมควบเพื่อทอผ้าหางกระรอก
          สีสันของเส้นไหมทั้งสอง หรือสามเส้นจะต้องมีน้ำหนักสีที่ใกล้เคียงกัน
          ชาวบ้านเรียก <span class="font-bold">“สีต้องเข้มได้ขนาดกัน”</span>
          มิเช่นนั้นแล้ว เส้นไหมนั้นจะไม่ขึ้นเงาวับอย่างที่อยากได้ พบว่า
          ผ้าหางกระรอกบ้านสนวน อำเภอห้วยราช จังหวัดบุรีรัมย์
          เป็นผ้าหางกระรอกที่สวยงามที่สุด
          มันวาวที่สุดเท่าที่เคยเห็นผ้าประเภทนี้มากว่า 50 ปี
          และเมื่อพิจารณากระบวนการผลิตอย่างละเอียดแล้วพบว่า

          <!-- ลิงก์อ่านเพิ่มเติมต่อท้ายย่อหน้า -->
          <span
            @click="showTail = !showTail"
            class="ml-2 align-baseline text-red-800 cursor-pointer font-semibold hover:underline"
            role="button"
            :aria-expanded="showTail.toString()"
          >
            {{ showTail ? "ซ่อนเนื้อหา" : "อ่านเพิ่มเติม" }}
          </span>
        </p>
        <!-- ช่วงท้ายที่ต้องการซ่อน-แสดง -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div v-if="showTail">
            <p class="m-4">
              กระบวนการทอผ้าหางกระรอกของชาวเขมรบ้านสนวน
              นั้นให้ความประณีตในการทำไหมควบเพื่อทำเส้นพุ่งทุกขั้นตอนตั้งแต่ 1)
              การเลือกเส้นไหมน้อย พันธุ์นางน้อย เส้นเล็กสม่ำเสมอ ตีเกลียวหลวม ๆ
              ก่อนครั้งหนึ่งให้เส้นไหมเรียบ กลม ตลอดเส้น 2)
              การทำความสะอาดเส้นไหมให้สะอาด นิ่ม
              และเริ่มเห็นความเงางามของเส้นไหมอย่างเด่นชัด 3)
              การย้อมสีที่ให้น้ำหนักสีที่เหมาะสมอย่างชำนาญการ 4)
              การเลือกคู่สีที่ตัดกันอย่างเหมาะสม เช่น เขียวแดง เหลืองเขียว
              เหลืองแดง น้ำเงินแดง 5) การควบเกลียวเส้นไหมอย่างประณีต สม่ำเสมอ
              โดยมีระยะเกลียว ประมาณ 14-16 รอบเกลียว ต่อความยาว 1 นิ้ว …
              (คงข้อความเดิมทั้งหมด)
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/Sbrijjer.jpg"
                alt="Home Illustration"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>

            <p
              class="mt-4 text-xl md:text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
            >
              ลวดลายและสีสันของผ้าสไบรือเจียร์ บ้านสนวน
            </p>
            <p class="m-4">
              ลวดลายผ้าและสีสันของผ้ามักใช้ด้วยกัน
              ชาวเขมรบุรีรัมย์มีการทำลวดลายผ้าในโครงสร้างผ้าเป็นส่วนใหญ่โดยมีลวดลายที่เกิดจากการให้สีเส้นยืนและเส้นพุ่งที่แตกต่างกัน
              ซึ่งจะพบในผ้าโสร่ง ผ้าขาวม้า ผ้าสมอ และผ้าลายอื่น ๆ
              การยกตะกอเพื่อให้เส้นยืนและเส้นพุ่งเก้าข้ามกันในลักษณะพิเศษ เช่น
              ผ้ายกดอก ผ้าฉนูดเลิก ผ้าราชวัตร เป็นต้น
              การยกตะกอลายพิเศษกับการให้สีเส้นยืนและเส้นพุ่งพิเศษ เรียกผ้าละเบิก
              และการมัดย้อมสีเส้นพุ่งให้เกิดลวดลาย เรียกผ้าโฮล
              และผ้ามัดหมี่เป็นต้น
              แม้ว่าลวดลายเหล่านี้จะอยู่บนพื้นฐานการขัดกันของเส้นยืนและเส้นพุ่ง
              แต่การวางจังหวะลายและการให้สีสัน
              จะเป็นตัวบ่งบอกความเป็นอัตลักษณ์ของกลุ่มชาติพันธุ์ได้
              ดังนั้นผ้าทอมือจึงเป็นผลิตภัณฑ์อย่างหนึ่งที่สื่อแสดงถึงความเป็นตัวตนของกลุ่มชาติพันธุ์ได้อย่างชัดเจน
              เป็นเครื่องมือที่นักมานุษยวิทยาใช้แบ่งแยกหรือเชื่อมโยงความเป็นชนชาติของมนุษย์ได้ทั่วโลก
            </p>
          </div>
        </transition>
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white tracking-tight"
        >
          กระบวนการทอผ้าเขมรบุรีรัมย์
        </p>
        <p class="m-4">
          เทคโนโลยีและนวัตกรรมเป็นสิ่งที่เกิดขึ้นพร้อมกับกระบวนการทอผ้า
          และการเรียนรู้เรื่องการทอผ้า เป็นเทคโนโลยีที่เหมาะสมกับพื้นที่
          สิ่งแวดล้อม
          และพฤติกรรมการใช้ของผู้คนแต่ละพื้นที่มีเทคโนโลยีที่แตกต่างกันไปตามความถนัด
          ในจังหวัดบุรีรัมย์ถ้าพูดถึงแค่ประเภทของกี่ทอผ้ามีอยู่ถึง 3 ชนิด
          ไม่รวมรายละเอียดย่อย เช่น ขนาดโครงสร้าง วัสดุที่ใช้ผลิต
          และศิลปะในการสร้างกี่ เป็นต้น
          แต่ละขั้นตอนในการทอผ้ามีเทคโนโลยีและนวัตกรรมที่จัดหมวดหมู่ได้คือ
          กระบวนการผลิตเส้นใย การฟอกย้อมเส้นใย และการทอผ้า มีรายละเอียด ดังนี้

          <!-- ลิงก์อ่านเพิ่มเติมต่อท้ายย่อหน้า -->
          <span
            @click="showTail = !showTail"
            class="ml-2 align-baseline text-red-800 cursor-pointer font-semibold hover:underline"
            role="button"
            :aria-expanded="showTail.toString()"
          >
            {{ showTail ? "ซ่อนเนื้อหา" : "อ่านเพิ่มเติม" }}
          </span>
        </p>
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div v-if="showTail">
            <p class="m-4">
              1. เทคโนโลยีและนวัตกรรมในกระบวนการผลิตเส้นใย เป็นกระบวนการต้นน้ำ
              ชาวบ้านในจังหวัดบุรีรัมย์จะปลูกหม่อน เลี้ยงไหม
              ซึ่งเป็นความรู้ที่ตกทอดกันมานานมาก ตั้งแต่บรรพบุรุษ 1.
              เทคโนโลยีในการปลูกหม่อนเลี้ยงไหมเป็นเทคโนโลยีที่ไม่ซับซ้อน
              ใช้การสังเกตพฤติกรรม การใช้งานสร้างเทคโนโลยีขึ้นมา เช่น
              รังไหมสำหรับให้หนอนไหมชักใย ชาวบ้านจะนำกิ่งไม้ที่มีกิ่งก้านเล็ก ๆ
              ละเอียดมารวบหัวท้ายเข้าด้วยกันมีไม้เป็นตะขอไว้เกาะกับราวเพื่อห้อยรังสำหรับให้หนอนไหมซักใย
              ก่อนนำไปให้หนอนไหมชักใยต้องใช้ไม้ปั่นเส้นใยเล็ก ๆ
              ที่ติดอยู่ให้สะอาด นำไปผึ่งแดดจัดเพื่อฆ่าเชื้อโรค
              จึงนำมาให้หนอนไหมทำรังไหมได้ ชาวบ้านจะระวังเรื่องความสะอาดอย่างมาก
              เนื่องจากหนอนไหมเป็นสัตว์ที่อ่อนแอมาก ชาวบ้านเรียกหนอนไหมว่า
              <span class="font-bold">“โกนเนียง”</span>
              <span class="font-bold">“โกน”</span> หมายถึง ลูก
              <span class="font-bold">“เนียง”</span>
              เป็นชื่อเรียกผู้หญิงอย่างสุภาพ หรือน่าเอ็นดู น่าทะนุถนอม
              <span class="font-bold">“โกนเนียง”</span> จะแปลว่า
              <span class="font-bold">“ลูกสาวที่ควรค่าแก่การทนุถนอม”</span> คือ
              การปลูกหม่อนเลี้ยงไหม ต้องใช้เทคโนโลยี
              หรือสร้างนวัตกรรมการเลี้ยงที่ประณีต น่ารัก น่าทะนุถนอม
            </p>
            <div
              class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              <img
                src="/assetts/css/image/สวนหม่อนข้างบ้าน.jpg"
                alt="สวนหม่อนข้างบ้าน"
                class="rounded-2xl shadow-lg object-cover w-full h-64"
              />
              <img
                src="/assetts/css/image/หนอนไหม.jpg"
                alt="หนอนไหม"
                class="rounded-2xl shadow-lg object-cover w-full h-64"
              />
              <img
                src="/assetts/css/image/อาหารหนอนไหม.jpg"
                alt="อาหารหนอนไหม"
                class="rounded-2xl shadow-lg object-cover w-full h-64"
              />
            </div>
            <p class="m-4">
              หลังจากเตรียมรังสำหรับหนอนไหมสะอาดเรียบร้อยแล้วจะโรยหนอนไหมที่สุกแล้วกระจายให้ทั่วถึง
              หนอนจะเลือกเกาะเกี่ยวกับกิ่งไม้ที่เหมาะ
              และจึงเริ่มชักใยจากด้านนอกเข้าหาตัวเองอย่างมีความสุขเป็นรังไหมเพื่อลอกคราบเปลี่ยนตัวเองเป็นผีเสื้อเพื่อผสมพันธุ์
              ออกไข่เป็นหนอน กินใบไม้จนตัวเองแก่สุก ทำรังห่อหุ้มตัวเอง
              เพื่อกลายร่างเป็นผีเสื้อเป็นวัฏจักร
              นอกจากเทคโนโลยีเพื่อให้ได้มาซึ่งรังไหมสำหรับการสาวไหมก็เข้าสู่กระบวนการสาวเป็นเส้นไหม
              เทคโนโลยีและเครื่องมือที่ใช้ในการสาวไหมเป็นเครื่องมือที่ใช้ในกระบวนการต่อไปนี้คือ
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
