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
    class="min-h-screen bg-gradient-to-br bg-[#ddcbe9] py-12 md:py-16 px-4 sm:px-6 lg:px-8"
  >
    <!-- ปุ่มกลับด้านบน -->
    <CommonButtonBack class="mb-6" />

    <div class="mx-auto w-full max-w-6xl space-y-10 md:space-y-12">
      <!-- หัวข้อหลัก -->
      <header class="text-center">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าหางกระรอก (กระเนียว และผ้ากะเนียว เสร็ย)
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อย่อย -->
        <h2
          id="intro"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าหางกระรอก
        </h2>

        <!-- บทนำ -->
        <p class="text-justify indent-8">
          ผ้าหางกระรอกเป็นเอกลักษณ์สำคัญของกลุ่มชาติพันธุ์เขมรบุรีรัมย์ โดยเฉพาะบ้านสนวนนอก อำเภอห้วยราช
          เทคนิคเด่นคือการพุ่งเส้นพิเศษควบเกลียว 2 เส้น 2 สี เกิดประกายคล้ายขนหางกระรอก
          สะท้อนภูมิปัญญาการทอผ้าพื้นบ้านที่ผสมผสานศิลปะและอัตลักษณ์ท้องถิ่น
          งานวิจัยนี้นำเสนอการออกแบบ 2 ลาย ได้แก่ “กระรอกสาว” และ “อัมพรภิรมย์”
        </p>

        <!-- วิดีโอ -->
        <figure class="mt-4">
          <video
            src="/assetts/css/video/IMG_3210-new.mp4"
            autoplay
            muted
            playsinline
            loop
            class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
          >
            เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
          </video>
          <figcaption class="text-center italic mt-2">ผ้าหางกระรอก</figcaption>
        </figure>

        <!-- ลายอัมพรภิรมย์ -->
        <p class="text-justify indent-8">
          <strong>ผ้าหางกระรอก ลายอัมพรภิรมย์</strong> ใช้เส้นยืนสีน้ำเงินอมม่วง (สีตุมปริง)
          ซึ่งเป็นสีโบราณที่ชาวเขมรนิยม และยังพบในเอกสารราชสำนักซึ่งเรียก “ผ้าม่วง”
          แรงบันดาลใจได้จากความสงบงามของท้องฟ้ายามค่ำคืนและคุณค่าแห่งผ้าหางกระรอก
          ครั้งนี้ทอเป็นตัวอย่าง 3 สี คือ กรมท่า ชมพูม่วง และแดงน้ำหมาก
        </p>

        <!-- แกลเลอรี -->
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img src="/assetts/css/image/หางกระรอก1.jpg" alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 1"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80" />
            <p class="italic mt-2">ภาพที่ 1 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
          <div class="text-center">
            <img src="/assetts/css/image/หางกระรอก2.jpg" alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 2"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80" />
            <p class="italic mt-2">ภาพที่ 2 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
          <div class="text-center">
            <img src="/assetts/css/image/หางกระรอก3.jpg" alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 3"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80" />
            <p class="italic mt-2">ภาพที่ 3 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
        </div>

        <!-- ลายเบญจลักษณ์นรี -->
        <p class="text-justify indent-8">
          <strong>ผ้ากระเนียวสรัย</strong> เป็นผ้าโบราณที่ใช้เส้นยืนสีน้ำเงินอมม่วง
          พุ่งด้วยเส้นควบ 5 คู่สี ได้แก่ เหลือง+แดง, เหลือง+เขียว, น้ำเงิน+แดง, เขียว+แดง และชมพู+ขาว
          โดยเฉพาะคู่ชมพู+ขาว ถือเป็นอัตลักษณ์เฉพาะของชุมชนและเชื่อมโยงกับศีลห้า
          นักวิจัยจึงตั้งชื่อใหม่ว่า <strong>“เบญจลักษณ์นรี”</strong> เพื่อสื่อถึงความงามและคุณค่าทางจารีต
        </p>

        <!-- แกลเลอรี: เบญจลักษณ์นรี -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img src="/assetts/css/image/หางกระรอก4.jpg" alt="ผ้าหางกระรอก ลายเบญจลักษณ์นรี"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]" />
            <p class="italic mt-2">ภาพที่ 6 ผ้าหางกระรอก ลายเบญจลักษณ์นรี</p>
          </div>
          <div class="text-center">
            <img src="/assetts/css/image/เบญจลักษณ์นรี.png" alt="เบญจลักษณ์นรี"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]" />
            <p class="italic mt-2">ภาพที่ 7 ผ้าหางกระรอก ลายเบญจลักษณ์นรี</p>
          </div>
        </div>

        <!-- การแต่งกาย -->
        <h2
          id="styling"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การแต่งกายด้วยผ้าหางกระรอก
        </h2>

        <p class="text-justify indent-8">
          เมื่อนำไปทดลองนุ่งห่มในระเบียบการนุ่งแบบไทยพื้นบ้าน
          เพื่อการประชาสัมพันธ์ผ้าตัวอย่าง ที่ศูนย์การค้าโรบินสันบุรีรัมย์
          เมื่อวันที่ 10 สิงหาคม ก็มีคุณค่าความงามที่ปรากกฎได้ดังต่อไปนี้
        </p>

        <div class="flex justify-center gap-8">
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก5.jpg"
              alt="การแต่งกายผู้หญิงด้วยผ้าหางกระรอก"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <p class="italic mt-2">
              ภาพที่ 4 การทดลองนุ่งผ้าหางกระรอก<br />ลายเบญลักษณ์นรีในรูปลักษณ์ของ<br />
              การแต่งกายแบบไทย
            </p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก6.jpg"
              alt="การแต่งกายผู้ชายด้วยผ้าหางกระรอก"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <p class="italic mt-2">
              ภาพที่ 5 การนุ่งผ้าหางกระรอกลาย<br />
              อัมพรภิรมย์ในรูปลักษณ์ <br />การแต่งกายแบบไทย
            </p>
          </div>
        </div>

        <!-- คุณลักษณะของผ้า -->
        <h2
          id="features"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          คุณลักษณะของผ้า
        </h2>

        <p class="text-justify indent-8">
          <strong>ผ้ากระเนียว</strong> หรือ
          <strong>ผ้าหางกระรอก</strong> เป็นผ้าพื้นที่มีเนื้อผ้าเนียนเรียบ
          มีความมันวาวสูง ทำได้โดยการพุ่งเส้นพุ่งด้วยไหมหรือด้ายควบเกลียว
          <strong>2–3 สี</strong> เส้นไหมจะกลม เรียบ เหนียว
          และมีประกายเหลือบมากขึ้น ทอโครงสร้างผ้าทอลายขัด
          <strong>2 ตะกอ</strong> ธรรมดา และมีการมัดหมี่ที่เส้นยืน
          โดยประยุกต์จากเทคนิคการมัดลาย ทั้งเส้นพุ่งและเส้นยืนของ
          <strong>ผ้าลายผกาสะปือ (ลายดอกมะเฟือง)</strong>
          ซึ่งเป็นผ้าชิ้นสำคัญของชาติพันธุ์เขมร
        </p>

        <p class="text-justify indent-8">
          ลวดลายจะถูกกำหนดให้อยู่ที่
          <strong>ริมผ้าทั้ง 2 ด้าน</strong> กว้างประมาณ
          <strong>5–6 นิ้ว</strong> เมื่อนุ่งเป็น <strong>ซิ่น</strong>,
          <strong>โสร่ง</strong>, หรือ
          <strong>โจงกระเบน</strong> ส่วนที่เป็นลายมัดหมี่ จะปรากฏที่
          <strong>ชายผ้า</strong>, <strong>ชายพก</strong> ,
          <strong>หน้านาง</strong> และ
          <strong>หางกระเบน</strong> หากนำไปตัดเป็นเสื้อผ้าทั่วไป
          ก็สามารถนำไปตกแต่งชุดให้มีความน่าสนใจได้เช่นกัน ทำให้
          <strong>ผ้ากระเนียวเขมร</strong> มีความโดดเด่นมากยิ่งขึ้น
          และสามารถใช้ได้หลากหลายรูปแบบ
        </p>

        <!-- แหล่งที่มา -->
        <div>
          <h2
            id="source"
            class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white flex items-center gap-2"
          >
            <MapPin
              class="w-6 h-6 md:w-7 md:h-7 text-gray-900 dark:text-white"
              aria-hidden="true"
            />
            แหล่งที่มาของผ้า
          </h2>
          <p
            class="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-2 ml-1"
          >
            บ้านสนวนนอก, บ้านหนองเพชร
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
