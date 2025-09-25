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


    <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />

    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2 class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          ผ้าโสร่ง
        </h2>
      </div>

      <!-- เนื้อหา -->
      <section
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <!-- บทนำ -->
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">ผ้าโสร่ง</h3>
        <p class="mb-4 text-justify indent-8">
          ปัจจุบันการนุ่งโสร่งแพร่หลายเป็นสากล ชาวตะวันตกค้นพบว่าให้ความเป็นอิสระมากกว่ากางเกง
          ผืนเดียวใช้ได้หลากหลาย พกพาง่าย ไม่เปลืองเนื้อที่ ฝั่งตะวันออกใช้งานสืบทอดมานับพันปี
          จะเห็นจากชุดสงฆ์ที่ใช้เพียง 3 ชิ้น: สบง (ผ้านุ่ง/โสร่ง), อังสะ (คลุม/พาดไหล่),
          และจีวร (ห่ม/ห่อหุ้ม) สะท้อนภูมิปัญญาการออกแบบที่ได้ทั้งประโยชน์ ประหยัด และประยุกต์ใช้ได้เสรี
          งานนี้พัฒนาตัวอย่างผ้าโสร่ง 2 ผืน: โทนแดง–เขียว (ลุคสนุกสนานแบบเขมรบุรีรัมย์)
          และโทนกรมท่า (ลุคเท่ สุขุม นุ่มลึก) เพื่อตอบโจทย์ตลาดใหม่ที่หลากหลายรสนิยม
        </p>

        <!-- แบบที่ 1: โสร่งมัดหมี่มีเจือย (แดง–เขียว) -->
        <ol class="list-decimal list-inside indent-8 space-y-4 text-justify">
          <li>
            <span class="font-semibold">ผ้าโสร่งมัดหมี่มีเจือย สีแดง–เขียว (Pattern มี 2 ส่วน)</span>:
            ส่วนผืนผ้าโสร่ง และส่วนชายผ้าโสร่ง (เจือย)
            <ol class="list-decimal list-inside indent-8 space-y-4 mt-4">
              <li>
                แพทเทิร์นส่วนผืนผ้าโสร่ง
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/ส่วนตัวผ้าโสร่ง.jpg"
                    alt="ส่วนตัวผ้าโสร่ง"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                  />
                </div>
                <p class="text-center italic mt-2">ภาพที่ 1 แพทเทิร์น ส่วนตัวผ้าโสร่ง</p>
              </li>
              <li>
                แพทเทิร์นส่วนเจือยโสร่ง
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/ส่วนเจือยโสร่ง.jpg"
                    alt="ส่วนเจือยโสร่ง"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                  />
                </div>
                <p class="text-center italic mt-2">ภาพที่ 2 แพทเทิร์น ส่วนเจือยโสร่ง</p>
              </li>
            </ol>

            <!-- แผนการผลิต (แดง–เขียว) -->
            <p class="mt-6"><strong>แผนการผลิตผ้าต้นแบบ</strong></p>
            <ol class="list-decimal list-inside indent-8 space-y-3">
              <li>
                <span class="font-semibold">เส้นยืน:</span> ฟันหวี 1,760 ฟัน หน้ากว้าง 102 ซม.
                ไหม 20–22 ดีเนียร์ ควบ 4 ย้อมแดงเลือดหมูและเขียวขี้ม้า
                ช่องลายใหญ่แดง/เขียวกว้าง 121 ช่องฟันหวี จัดให้สีแดงอยู่ริมทั้งสองด้าน
                เพื่อให้ชายผ้าขณะนุ่งเป็นสีแดงตามนิยมบุรีรัมย์
                ซับโสร่ง (sub) เดินลายเหมือนกัน: กรมท่า 2, ขาว 2, เหลือง 8, ขาว 2, กรมท่า 2 (หน่วย=ช่องฟัน)
              </li>
              <li>
                <span class="font-semibold">เส้นพุ่ง:</span> มัดหมี่ 4 หัว 4 ลาย (ตัวผ้า 2, เจือย 2)
                ใช้ไหมควบ 6 ไซส์ LL ใหญ่กว่าเส้นยืนเล็กน้อยเพื่อโชว์ลายชัด
                การทอกำหนดระเบียบแยกส่วนเจือยและตัวผ้าตามแบบ
              </li>
            </ol>

            <!-- ภาพกระบวนการ -->
            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/การทอ.png"
                alt="การทอผ้า"
                class="shadow-lg w-full max-w-4xl h-auto object-contain"
              />
            </div>

            <!-- ผลการผลิต (แดง–เขียว) -->
            <p class="mt-6">
              <strong>ผลการผลิตผ้าตัวอย่าง:</strong>
              ช่างทอทำผืนแรกยังไม่ชำนาญ ลายยังไม่เป๊ะตามแพทเทิร์นบางช่วง
              (เป็นความท้าทายฝั่งช่างมัดหมี่ที่ต้องมัดให้ลงช่องที่กำหนด)
              อย่างไรก็ดี กระบวนการทอไม่ซับซ้อนเท่าผ้ามัดหมี่ทั่วไป คาดว่ารอบถัดไปจะได้ลายตรงแบบมากขึ้น
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าโสร่ง.jpg"
                alt="ผ้าโสร่งไหมมัดหมี่ลายสาวแก้มเรื่อ"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 3 ผ้าโสร่งไหมมัดหมี่ลายสาวแก้มเรื่อ</p>

            <p class="mt-4">
              เนื้อผ้าละเอียด เรียบ เนียน ตามอัตลักษณ์ไหมคะแมร์บุรีรัมย์
              ขนาด 100×200 ซม. สามารถม้วนเก็บได้ในกำมือเดียว ซึ่งเป็นคุณลักษณะเด่นของไหมกลุ่มนี้
            </p>
          </li>

          <!-- แบบที่ 2: โสร่งมัดหมี่มีเจือย (กรมท่า) -->
          <li>
            <span class="font-semibold">โสร่งมัดหมี่มีเจือย สีกรมท่า (Pattern มี 2 ส่วน)</span>:
            ส่วนผืนผ้าโสร่ง และส่วนเจือย (หลักการเหมือนแบบสีแดง ต่างที่จังหวะตารางและลายมัดหมี่)
            <ol class="list-decimal list-inside indent-8 space-y-4 mt-4">
              <li>
                แพทเทิร์นส่วนผืนผ้า
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/แพทเทริน์ส่วนผืนผ้า.jpg"
                    alt="แพทเทิร์นส่วนผืนผ้า"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                  />
                </div>
                <p class="text-center italic mt-2">ภาพที่ 4 แพทเทิร์น ส่วนผืนผ้า</p>
              </li>
              <li>
                แพทเทิร์นส่วนเจือยโสร่ง
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/แพทเทริน์ส่วนเจือยผ้า.jpg"
                    alt="แพทเทิร์นส่วนเจือยโสร่ง"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                  />
                </div>
                <p class="text-center italic mt-2">ภาพที่ 5 แพทเทิร์น ส่วนเจือยโสร่ง</p>
              </li>
            </ol>

            <!-- แผนการผลิต (กรมท่า) -->
            <p class="mt-6"><strong>แผนการผลิตผ้าต้นแบบ</strong></p>
            <ol class="list-decimal list-inside indent-8 space-y-3">
              <li>
                <span class="font-semibold">เส้นยืน:</span> ฟันหวี 1,760 ฟัน หน้ากว้าง 102 ซม.
                ไหม 20–22 ดีเนียร์ ควบ 4 ช่องลายใหญ่ “กรมท่า” กว้าง 100 ช่องฟันหวี
                จัดซับโสร่งไว้ริมทั้งสองข้างเพื่อให้ชายผ้าเป็นริ้วเล็กเมื่อสวม
                ซับโสร่งแต่ละชุด: ขาว 2, เทา 4, ขาว 2, เขียวไข่กา 4, ขาว 2, เทา 4, ขาว 2 (หน่วย=ช่องฟัน)
              </li>
              <li>
                <span class="font-semibold">เส้นพุ่ง:</span> มัดหมี่ 4 หัว 4 ลาย (ตัวผ้า 2, เจือย 2)
                ใช้ไหมควบ 6 ไซส์ LL ระเบียบการทอแบ่งส่วนเจือย/ตัวผ้าชัดเจน
              </li>
            </ol>

            <!-- ผลการผลิต (กรมท่า) -->
            <p class="mt-6">
              <strong>ผลการผลิตผ้าตัวอย่าง:</strong>
              เป็นองค์ความรู้ใหม่ที่ผสม “ตารางโครงสร้างผ้า” กับ “มัดหมี่เส้นพุ่ง”
              ความท้าทายคล้ายแบบสีแดง แต่ได้รับความสนใจสูงเมื่อสวมใส่ในที่สาธารณะ
              ผู้คนสอบถาม/จับดูเนื้อและลาย บ่งชี้ศักยภาพเชิงการตลาดที่ดี
            </p>

            <div class="mt-4 flex justify-center gap-8">
              <figure class="text-center">
                <img
                  src="/assetts/css/image/ดินก็มีข้าวเขียว.jpg"
                  alt="ผ้าโสร่งมัดหมี่ลาย บนดินก็มีข้าวเขียว"
                  class="rounded-2xl shadow-lg object-cover w-full h-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 6 ผ้าโสร่งมัดหมี่ลาย “บนดินก็มีข้าวเขียว”
                </figcaption>
              </figure>
              <figure class="text-center">
                <img
                  src="/assetts/css/image/Dressสตรี.jpg"
                  alt="การนำผ้าโสร่งไปตัดเดรสสตรี"
                  class="rounded-2xl shadow-lg object-cover w-full h-auto"
                />
                <figcaption class="text-center italic mt-2">
                  ภาพที่ 7 การนำผ้าโสร่งไปตัด Dress สตรี
                </figcaption>
              </figure>
            </div>
          </li>
        </ol>

        <!-- แรงบันดาลใจการออกแบบ -->
        <h4 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          แรงบันดาลใจในการออกแบบ
        </h4>
        <p class="text-justify indent-8">
          มาจาก (1) ความประทับใจในอาชีพเกษตรของชาวเขมรบุรีรัมย์ที่พึ่งพานาข้าว และ
          (2) บทเพลงที่ชาวบุรีรัมย์คุ้นหู “บุรีรัมย์ เดี๋ยวนี้เลิกตำน้ำกิน ท้องฟ้าก็มีนกบิน
          บนดินก็มีข้าวเขียว สาวๆ แก้มเรื่อ … อีสานเป็นสีเขียว …”
          ลายมัดหมี่ในตารางสะท้อนความอุดมสมบูรณ์ของท้องทุ่ง และจังหวะตารางสี่เหลี่ยมแทนขอบเขตไร่นา
          จึงตั้งชื่อว่า <strong>“สาวๆ แก้มเรื่อ”</strong> และ <strong>“บนดินก็มีข้าวเขียว”</strong>
        </p>

        <!-- คุณลักษณะของผ้า -->
        <h4 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          คุณลักษณะของผ้า
        </h4>
        <p class="mb-4 text-justify indent-8">
          <strong>อัตลักษณ์ผ้าโสร่ง:</strong> ลายตารางใหญ่ ใช้สีตัดกัน พุ่งเส้นควบเกลียว 2 ชุด
          และเพิ่มเส้นสีอีก 2–3 สี จึงเกิดความหลากหลายทางสีสัน
          “ซับโสร่ง” หรือ “เบิกพะเนค (เปิดตาโสร่ง)” คือเส้นเล็กสีอ่อนที่แบ่งพื้นที่
          ช่วยลดความแรงของสีและแสดงตัวตนของแต่ละกลุ่มชนผ่านจังหวะ “ตารางใหญ่–ตารางเล็ก”
        </p>
        <p class="mb-0 text-justify indent-8">
          <strong>เทคนิคกระเนียว (ไหมควบต่างสี):</strong> กลุ่มเขมรบุรีรัมย์นิยมควบไหม <strong>สองสี</strong>
          (เช่น เขียว–แดง, เขียว–เหลือง, น้ำเงิน–แดง) เกิดเงาสะท้อนหลายระดับ
          จากเส้นไหมที่ “กลม–เหนียว–เงา” และเมื่อสลับกระสวยให้ลายคลื่น ผ้าจะยิ่งเงางามและทนทาน
          นับเป็นเทคโนโลยีงานทอชั้นเลิศที่ผสานความงามกับความคงทน
        </p>

        <!-- แหล่งที่มา -->
        <h4
          class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-2 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </h4>
        <p class="text-lg text-gray-500 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านตะเคียน, บ้านสวายเจริญ, บ้านไม้แดง, บ้านหนองเต็ง
        </p>
      </section>
    </div>
  </div>


</template>
