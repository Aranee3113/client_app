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

const type = route.params.type;

onMounted(() => {
  fetchProducts();
  fetchPosts();
});
</script>

<template>
  <div
    v-if="type === 'cloth1'"
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
          ผ้าหางกระรอกเป็นเอกลักษณ์สำคัญของกลุ่มชาติพันธุ์เขมรบุรีรัมย์
          โดยเฉพาะบ้านสนวนนอก อำเภอห้วยราช
          เทคนิคเด่นคือการพุ่งเส้นพิเศษควบเกลียว 2 เส้น 2 สี
          เกิดประกายคล้ายขนหางกระรอก
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
          <strong>ผ้าหางกระรอก ลายอัมพรภิรมย์</strong> ใช้เส้นยืนสีน้ำเงินอมม่วง
          (สีตุมปริง) ซึ่งเป็นสีโบราณที่ชาวเขมรนิยม
          และยังพบในเอกสารราชสำนักซึ่งเรียก “ผ้าม่วง”
          แรงบันดาลใจได้จากความสงบงามของท้องฟ้ายามค่ำคืนและคุณค่าแห่งผ้าหางกระรอก
          ครั้งนี้ทอเป็นตัวอย่าง 3 สี คือ กรมท่า ชมพูม่วง และแดงน้ำหมาก
        </p>

        <!-- แกลเลอรี -->
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก1.jpg"
              alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 1"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
            />
            <p class="italic mt-2">ภาพที่ 1 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก2.jpg"
              alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 2"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
            />
            <p class="italic mt-2">ภาพที่ 2 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก3.jpg"
              alt="ผ้าหางกระรอก อัมพรภิรมย์ - ภาพที่ 3"
              class="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-72 lg:h-80"
            />
            <p class="italic mt-2">ภาพที่ 3 ผ้าหางกระรอก อัมพรภิรมย์</p>
          </div>
        </div>

        <!-- ลายเบญจลักษณ์นรี -->
        <p class="text-justify indent-8">
          <strong>ผ้ากระเนียวสรัย</strong>
          เป็นผ้าโบราณที่ใช้เส้นยืนสีน้ำเงินอมม่วง พุ่งด้วยเส้นควบ 5 คู่สี
          ได้แก่ เหลือง+แดง, เหลือง+เขียว, น้ำเงิน+แดง, เขียว+แดง และชมพู+ขาว
          โดยเฉพาะคู่ชมพู+ขาว ถือเป็นอัตลักษณ์เฉพาะของชุมชนและเชื่อมโยงกับศีลห้า
          นักวิจัยจึงตั้งชื่อใหม่ว่า
          <strong>“เบญจลักษณ์นรี”</strong> เพื่อสื่อถึงความงามและคุณค่าทางจารีต
        </p>

        <!-- แกลเลอรี: เบญจลักษณ์นรี -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/หางกระรอก4.jpg"
              alt="ผ้าหางกระรอก ลายเบญจลักษณ์นรี"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
            <p class="italic mt-2">ภาพที่ 6 ผ้าหางกระรอก ลายเบญจลักษณ์นรี</p>
          </div>
          <div class="text-center">
            <img
              src="/assetts/css/image/เบญจลักษณ์นรี.png"
              alt="เบญจลักษณ์นรี"
              class="rounded-2xl shadow-lg object-cover w-full h-[320px]"
            />
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
    v-if="type === 'cloth2'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />

    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าโสร่ง
        </h2>
      </div>

      <!-- เนื้อหา -->
      <section
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <!-- บทนำ -->
        <h3
          class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4"
        >
          ผ้าโสร่ง
        </h3>
        <p class="mb-4 text-justify indent-8">
          ปัจจุบันการนุ่งโสร่งแพร่หลายเป็นสากล
          ชาวตะวันตกค้นพบว่าให้ความเป็นอิสระมากกว่ากางเกง ผืนเดียวใช้ได้หลากหลาย
          พกพาง่าย ไม่เปลืองเนื้อที่ ฝั่งตะวันออกใช้งานสืบทอดมานับพันปี
          จะเห็นจากชุดสงฆ์ที่ใช้เพียง 3 ชิ้น: สบง (ผ้านุ่ง/โสร่ง), อังสะ
          (คลุม/พาดไหล่), และจีวร (ห่ม/ห่อหุ้ม)
          สะท้อนภูมิปัญญาการออกแบบที่ได้ทั้งประโยชน์ ประหยัด
          และประยุกต์ใช้ได้เสรี งานนี้พัฒนาตัวอย่างผ้าโสร่ง 2 ผืน: โทนแดง–เขียว
          (ลุคสนุกสนานแบบเขมรบุรีรัมย์) และโทนกรมท่า (ลุคเท่ สุขุม นุ่มลึก)
          เพื่อตอบโจทย์ตลาดใหม่ที่หลากหลายรสนิยม
        </p>

        <!-- แบบที่ 1: โสร่งมัดหมี่มีเจือย (แดง–เขียว) -->
        <ol class="list-decimal list-inside indent-8 space-y-4 text-justify">
          <li>
            <span class="font-semibold"
              >ผ้าโสร่งมัดหมี่มีเจือย สีแดง–เขียว (Pattern มี 2 ส่วน)</span
            >: ส่วนผืนผ้าโสร่ง และส่วนชายผ้าโสร่ง (เจือย)
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
                <p class="text-center italic mt-2">
                  ภาพที่ 1 แพทเทิร์น ส่วนตัวผ้าโสร่ง
                </p>
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
                <p class="text-center italic mt-2">
                  ภาพที่ 2 แพทเทิร์น ส่วนเจือยโสร่ง
                </p>
              </li>
            </ol>

            <!-- แผนการผลิต (แดง–เขียว) -->
            <p class="mt-6"><strong>แผนการผลิตผ้าต้นแบบ</strong></p>
            <ol class="list-decimal list-inside indent-8 space-y-3">
              <li>
                <span class="font-semibold">เส้นยืน:</span> ฟันหวี 1,760 ฟัน
                หน้ากว้าง 102 ซม. ไหม 20–22 ดีเนียร์ ควบ 4
                ย้อมแดงเลือดหมูและเขียวขี้ม้า ช่องลายใหญ่แดง/เขียวกว้าง 121
                ช่องฟันหวี จัดให้สีแดงอยู่ริมทั้งสองด้าน
                เพื่อให้ชายผ้าขณะนุ่งเป็นสีแดงตามนิยมบุรีรัมย์ ซับโสร่ง (sub)
                เดินลายเหมือนกัน: กรมท่า 2, ขาว 2, เหลือง 8, ขาว 2, กรมท่า 2
                (หน่วย=ช่องฟัน)
              </li>
              <li>
                <span class="font-semibold">เส้นพุ่ง:</span> มัดหมี่ 4 หัว 4 ลาย
                (ตัวผ้า 2, เจือย 2) ใช้ไหมควบ 6 ไซส์ LL
                ใหญ่กว่าเส้นยืนเล็กน้อยเพื่อโชว์ลายชัด
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
              อย่างไรก็ดี กระบวนการทอไม่ซับซ้อนเท่าผ้ามัดหมี่ทั่วไป
              คาดว่ารอบถัดไปจะได้ลายตรงแบบมากขึ้น
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าโสร่ง.jpg"
                alt="ผ้าโสร่งไหมมัดหมี่ลายสาวแก้มเรื่อ"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">
              ภาพที่ 3 ผ้าโสร่งไหมมัดหมี่ลายสาวแก้มเรื่อ
            </p>

            <p class="mt-4">
              เนื้อผ้าละเอียด เรียบ เนียน ตามอัตลักษณ์ไหมคะแมร์บุรีรัมย์ ขนาด
              100×200 ซม. สามารถม้วนเก็บได้ในกำมือเดียว
              ซึ่งเป็นคุณลักษณะเด่นของไหมกลุ่มนี้
            </p>
          </li>

          <!-- แบบที่ 2: โสร่งมัดหมี่มีเจือย (กรมท่า) -->
          <li>
            <span class="font-semibold"
              >โสร่งมัดหมี่มีเจือย สีกรมท่า (Pattern มี 2 ส่วน)</span
            >: ส่วนผืนผ้าโสร่ง และส่วนเจือย (หลักการเหมือนแบบสีแดง
            ต่างที่จังหวะตารางและลายมัดหมี่)
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
                <p class="text-center italic mt-2">
                  ภาพที่ 4 แพทเทิร์น ส่วนผืนผ้า
                </p>
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
                <p class="text-center italic mt-2">
                  ภาพที่ 5 แพทเทิร์น ส่วนเจือยโสร่ง
                </p>
              </li>
            </ol>

            <!-- แผนการผลิต (กรมท่า) -->
            <p class="mt-6"><strong>แผนการผลิตผ้าต้นแบบ</strong></p>
            <ol class="list-decimal list-inside indent-8 space-y-3">
              <li>
                <span class="font-semibold">เส้นยืน:</span> ฟันหวี 1,760 ฟัน
                หน้ากว้าง 102 ซม. ไหม 20–22 ดีเนียร์ ควบ 4 ช่องลายใหญ่ “กรมท่า”
                กว้าง 100 ช่องฟันหวี
                จัดซับโสร่งไว้ริมทั้งสองข้างเพื่อให้ชายผ้าเป็นริ้วเล็กเมื่อสวม
                ซับโสร่งแต่ละชุด: ขาว 2, เทา 4, ขาว 2, เขียวไข่กา 4, ขาว 2, เทา
                4, ขาว 2 (หน่วย=ช่องฟัน)
              </li>
              <li>
                <span class="font-semibold">เส้นพุ่ง:</span> มัดหมี่ 4 หัว 4 ลาย
                (ตัวผ้า 2, เจือย 2) ใช้ไหมควบ 6 ไซส์ LL
                ระเบียบการทอแบ่งส่วนเจือย/ตัวผ้าชัดเจน
              </li>
            </ol>

            <!-- ผลการผลิต (กรมท่า) -->
            <p class="mt-6">
              <strong>ผลการผลิตผ้าตัวอย่าง:</strong>
              เป็นองค์ความรู้ใหม่ที่ผสม “ตารางโครงสร้างผ้า” กับ
              “มัดหมี่เส้นพุ่ง” ความท้าทายคล้ายแบบสีแดง
              แต่ได้รับความสนใจสูงเมื่อสวมใส่ในที่สาธารณะ
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
        <h4
          class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4"
        >
          แรงบันดาลใจในการออกแบบ
        </h4>
        <p class="text-justify indent-8">
          มาจาก (1) ความประทับใจในอาชีพเกษตรของชาวเขมรบุรีรัมย์ที่พึ่งพานาข้าว
          และ (2) บทเพลงที่ชาวบุรีรัมย์คุ้นหู “บุรีรัมย์ เดี๋ยวนี้เลิกตำน้ำกิน
          ท้องฟ้าก็มีนกบิน บนดินก็มีข้าวเขียว สาวๆ แก้มเรื่อ … อีสานเป็นสีเขียว
          …” ลายมัดหมี่ในตารางสะท้อนความอุดมสมบูรณ์ของท้องทุ่ง
          และจังหวะตารางสี่เหลี่ยมแทนขอบเขตไร่นา จึงตั้งชื่อว่า
          <strong>“สาวๆ แก้มเรื่อ”</strong> และ
          <strong>“บนดินก็มีข้าวเขียว”</strong>
        </p>

        <!-- คุณลักษณะของผ้า -->
        <h4
          class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4"
        >
          คุณลักษณะของผ้า
        </h4>
        <p class="mb-4 text-justify indent-8">
          <strong>อัตลักษณ์ผ้าโสร่ง:</strong> ลายตารางใหญ่ ใช้สีตัดกัน
          พุ่งเส้นควบเกลียว 2 ชุด และเพิ่มเส้นสีอีก 2–3 สี
          จึงเกิดความหลากหลายทางสีสัน “ซับโสร่ง” หรือ “เบิกพะเนค (เปิดตาโสร่ง)”
          คือเส้นเล็กสีอ่อนที่แบ่งพื้นที่
          ช่วยลดความแรงของสีและแสดงตัวตนของแต่ละกลุ่มชนผ่านจังหวะ
          “ตารางใหญ่–ตารางเล็ก”
        </p>
        <p class="mb-0 text-justify indent-8">
          <strong>เทคนิคกระเนียว (ไหมควบต่างสี):</strong>
          กลุ่มเขมรบุรีรัมย์นิยมควบไหม <strong>สองสี</strong>
          (เช่น เขียว–แดง, เขียว–เหลือง, น้ำเงิน–แดง) เกิดเงาสะท้อนหลายระดับ
          จากเส้นไหมที่ “กลม–เหนียว–เงา” และเมื่อสลับกระสวยให้ลายคลื่น
          ผ้าจะยิ่งเงางามและทนทาน
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
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านตะเคียน, บ้านสวายเจริญ, บ้านไม้แดง,
          บ้านหนองเต็ง
        </p>
      </section>
    </div>
  </div>

  <div
    v-if="type === 'cloth3'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าซิ่นหมี่
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ผ้าซิ่นหมี่
        </p>
        <p class="mb-4 text-justify indent-8">
          ซิ่นหมี่เป็นผ้าที่ใช้มากอีกประเภทหนึ่ง บางครั้งเรียกรวม ๆ ว่า
          <strong>“ซำปั๊วดโฮล”</strong> เขมรต่ำ (สาธารณรัฐกัมพูชา)
          เรียกผ้าลายทุกชนิดว่า <strong>“ซำปั๊วดโฮล”</strong> เขมรสูง บุรีรัมย์
          ดั้งเดิมรุ่นคุณย่าคุณยาย เรียกผ้าลายมัดหมี่
          <strong>“ซำปั๊วดโฮล”</strong>บ้าง<strong>“ซิ่นหมี่”</strong>บ้าง
          ถ้าสื่อสารกับคนภายนอกจะเรียก
          <strong>“ซิ่นหมี่”</strong>ตามผู้อื่นเพื่อให้ง่ายต่อการสื่อสาร
          ชาติพันธุ์เขมรชมชอบลวดลายมัดหมี่ตาเล็กๆ ละเอียดๆ สีขรึม ๆ ครั้งนี้
          ผู้เชี่ยวชาญได้เลือกไว้จำนวน 7 ลาย จากจำนวน 25 ลาย มีลายตัวซิ่นหมี่ 3
          ลาย และลายตีนซิ่นหมี่ ที่4 ลาย โดยถ้าทำเป็นซิ่นหมี่ จะได้ผ้าลายหมี่ผสม
          1 ชุด แต่เมื่อทำเป็นตีนซิ่นหมี่ เพื่อนำไปต่อตีนซิ่นหางกระรอก โสร่ง
          และกระเนียวสรัย จะได้ทั้งสิ้น 4 ชุด และเนื่องจากการทำผ้ามัดหมี่
          สามารถใช้เส้นยืนสีเดียวกันได้ ผ้าต้นแบบ ทั้งหมด 4
          ชุดด้วยกันดังต่อไปนี้
        </p>
        <p class="mb-4 text-justify indent-12">
          ลายที่ 1 ได้รับคะแนนการเลือกสูงสุด
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายปะกากรองสะนัน.png"
            alt="แพทเทริน์ลายมัดหมี่ลายปะกากรองสะนัน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 แพทเทริน์ลายมัดหมี่ ลายปะกากรองสะนัน
        </p>
        <br />
        <p class="mb-4 text-justify indent-12">
          แรงบันดาลใจในการออกแบบลายผ้ามัดหมี่ ลาย<strong>ปะกากรองสะนัน</strong>
          ได้มาจากสามส่วนคือ ส่วนที่ 1.คือ
          ระเบียบการขึ้นลายมัดหมี่ของชาติพันธ์เขมรบุรีรัมย์สำหรับคนหัดทำลวดลาย
          หรือ การมัดลวดลายหลักของการทำลายมัดหมี่
          ที่จะต้องขึ้นโครงลายหลักเป็นเส้นเป็นสาย เรียกว่า
          <strong>เทอกระแซ</strong> แปลว่า
          <strong>การทำเส้นเป็นสาย</strong>จากนั้นจึงจะลงลายประกอบอื่นๆ
          ลงสีอื่นๆตามไป
          ตามจำนวนสีและจำนวนครั้งในการมัดโอบลายและสีเก็บไว้ก่อนจะมัดและย้อมลายใหม่สีใหม่ต่อไป
          ความสำคัญในการทำเส้นสายที่สอดคล้องกับการออกแบบลาย ออกแบบสี
          และออกแบบการย้อมไว้ให้คนรุ่นหลังได้เข้าใจจึงนำมาเป็นแรงบันดาลใจ
          และเรื่องราวของผ้ามัดหมี่<strong>ลายปะกากรองสะนัน</strong>ในครั้งนี้ด้วย
        </p>
        <p class="mb-4 text-justify indent-12">
          แรงบันดาลในในส่วนที่ 2 คือ ส่วนที่ 1. คิตนิยมในการเรียกชื่อลายผ้า
          กับความงามของผู้หญิง ชาติพันธุ์เขมรมักตั้งชื่อลายผ้าเป็นชื่อดอกไม้
          ไม่เว้นแม้แต่ดอกพืชผักสวนครัว อาจเป็นเพราะว่า ผ้า
          นั้นเกี่ยวข้องหรือผูกพันกับสตรีเป็นส่วนใหญ่ และอาจเป็นเพราะ
          สตรีคือความงาม ความหอม ของดอกไม้ หรืออาจเป็นเพราะ
          ดอกไม้ก็เหมือสตรีที่มีความงามและคุณค่าที่แตกต่างกันออกไป
          เช่นลายดอกพิกุน ลายดอกแก้ว ลายดอกมะเฟือง ลายดอกพริก ลายดอกมะเขือ
          เป็นต้น จึงตั้งชื่อลายมัดหมี่นี้ ว่า ลาย
          <strong>ปะกากรองสะนัน</strong>
          สะท้อนให้เห็นระเบียบวิธีสอนลูกหลานและคุณค่าและความงามของสตรีชาติพันธุ์เขมรบุรีรัมย์
          เพื่อให้คนรุ่นหลังได้เล่าความต่อๆ กันไป เรื่องราวเหล่านี้มีความเฉพาะ
          มีความน่าสนใจ และมีคุณค่าที่ควรแก่การอนุรักษ์
          จึงเห็นว่าเหมาะกับการเป็นสินค้าพรีเมี่ยม(Premium)
          ที่ให้มากกว่าความงามและความประณีต
          ซึ่งต้องมีอยู่ในผืนผ้าทุกผืนของกลุ่มชาติพันธุ์เขมรบุรีรัมย์อยู่แล้ว
          โดยเมื่อผลิตมาเป็นผืนผ้าแล้ว มีรูปลักษณ์ดังนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าซิ่นหมี่1.jpg"
            alt="ผืนผ้ามัดหมี่ลายปะกากรองสะนัน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 ผืนผ้ามัดหมี่ลาย ปะกากรองสะนัน
        </p>
        <br />

        <p class="mb-4 text-justify indent-12">
          ลายที่ 2 ได้รับคะแนนการเลือกเป็นอันดับ 2
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ปะกากะยอม.png"
            alt="แพทเทริน์ผ้ามัดหมี่ลายลายปะกากะยอม"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 3 แพทเทริน์ ผ้ามัดหมี่ลายลายปะกากะยอม
        </p>
        <br />
        <p class="mb-4 text-justify indent-12">
          <strong>แรงบันดาลใจในการออกแบบลวดลายผ้ามัดหมี่ ลายปะกากะยอม</strong>
          ผู้วิจัยได้แรงบันดาลใจจากความงามของดอกพะยอมกลางทุ่งนา
          ที่มีลักษณะเป็นพวงแน่นๆ ละเอียดๆ สีกระจ่างใจ และกลิ่นหอมชื่นใจ
          จึงออกแบบผ้าให้มีลักษณะเป็ลวดลายแน่นๆ เป็นพุ่มๆ มีสีกระจ่างเป็นจุดๆ
          ให้สีพื้นเป็นสีทึบเช่นเดียวกันลำต้นของดอกพะยอม ที่มีสี มืด ดำ คล้ำ
          หนัก ในลวดลายหมี่ละเอียด เล็ก และกระจ่าง
          ส่วนของตีนซิ่นมีลักษณะเป็นพวงระย้าเช่นเดียกันกับพวงดอกพะยอม
          โดยแสดงผืนผ้าได้ดังนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าซิ่นหมี่2.jpg"
            alt="ผ้ามัดหมี่ลายปะกากะยอม"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 4 ผ้ามัดหมี่ลาย ปะกากะยอม
        </p>
        <br />
        <p class="mb-4 text-justify indent-12">
          ลายที่ 3 ได้รับคะแนนการเลือกเป็นอันดับ 3
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/พวงเพชรพริ้งพราย.png"
            alt="แพทเทริน์ลายซิ่นหมี่พวงเพชรพริ้งพราย"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 5 แพทเทริน์ลายซิ่นหมี่ พวงเพชรพริ้งพราย
        </p>
        <br />
        <p class="mb-4 text-justify indent-12">
          แรงบันดาลใจในการออกแบบผ้ามัดหมี่ ลาย พวงเพชรพริ้งพราย มีมาจาก 2
          ส่วนด้วยกันคือ ส่วนที่
          1.คำนิยมในการตั้งชื่อลูกของกลุ่มชาติพันธ์เขมรบุรีรัมย์
          ที่มักตั้งชื่อชายเป็นคำโดดๆ ว่า
          <strong>“เพชร”</strong> และตั้งชื่อลูกสาวว่า
          <strong>“พวงเพชร”</strong> โดยเห็นว่า
          <strong>“เพชร”</strong> อัญมณีที่มีค่า แข็ง สวยงาม
          เมื่อนำมาจัดเรียงร้อยกันจะยิ่งเพิ่มคุณค่าและความสวยงามยิ่งขึ้นไปอีก
          ส่วนที่ 2. คือเครื่องประดับของนางอัปสรา
          นางฟ้าภาพจำหลักที่อยู่ในปราสาทในวัฒนาธรรมขอม คุณค่าและความงามดังกล่าว
          มีความเป็นอัตลักษณ์ของเขมรบุรีรัมย์อย่างชัดเจน
          นักวิจัยจึงนำลายผ้าโบราณประเภทลาย
          <strong>“โคม”</strong> มาเปรียบให้เป็นเพชรน้อยใหญ่
          ประกอบกันในรูปลักษณ์ของเครื่องประดับของนางอัปสรา เรียกชื่อลายนี้ว่า
          <strong>พวงเพชรพริ้งพราย</strong>
          ให้ความหมายถึงคนเขมรบุรีรัมย์ที่มีคุณค่าและความงามดั่งเช่นอัญมณีที่ประดับบนเรือนร่างของนางอัปสรา
          เมื่อนำมาทำเป็นผืนผ้า จึงมีคุณค่าและความงามปรากฏให้เห็นดังนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/มัดหมี่ลาย.png"
            alt="ผ้ามัดหมี่ลายพวงเพชรพริ้งพราว"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 6 ผ้ามัดหมี่ ลาย พวงเพชรพริ้งพราว
        </p>

        <p class="mb-4 text-justify indent-12">
          ลาย ที่ 4 ได้รับคะแนนการเลือกจากลายตีนซิ่น (ประโบล) ลำดับที่ 1-4
          โดยจัดเรียงลายไว้ให้มัดลายได้ในหน้าผ้าเดียว
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ตีนซิ่น.png"
            alt="แพทเทริน์ลาย ตีนซิ่นลำดับที่ 1-4"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 7 แพทเทริน์ลาย ตีนซิ่นลำดับที่ 1-4
        </p>
        <br />
        <p class="mb-4 text-center indent-12">
          เมื่อเรียงลายแล้วจะได้แพทเทริน์ ที่พร้อมนำไปมัดในลักษณะนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/รวมแพเทริน์.jpg"
            alt="ภาพการรวมแพเทริน์ลายให้ได้ 37 ลำเท่ากัน"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 8 ภาพการรวมแพเทริน์ลายให้ได้ 37 ลำเท่ากัน
        </p>
        <p class="mb-4 text-justify indent-12">
          แรงบันดาลใจในการออกแบบลวดลายผ้ามัดหมี่ ประโบล ครั้งนี้ มาจาก
          ความประทับใจในตีนซิ่นของกลุ่มชาติพันธ์กูยบุรีรัมย์
          ที่อยู่ร่วมกันกับกลุ่มชาติพันธ์ลาวและเขมรบุรีรัมย์อย่างแนบแน่น
          จนเป็นเนื้อเดียวกัน ผ้ามัดหมี่ตีนแดง ผ้าประจำจังหวัดบุรีรัมย์
          เป็นสิ่งที่ยืนยันความเหนียวแน่นกลมเกลียวของกลุ่มชาติพันธุ์ ลาว กูย
          และเขมร โดยแพทเทริน์ผ้าตีนแดง
          จะมีโครงสร้างลายมัดหมี่ที่ท้องผ้าในรูปลักษณ์ของผ้าลาว
          มีการให้สีสันในรูปลักษณ์ของผ้าเขมร และมีหัวแดงตีนแดงเหมือนผ้าส่วย
          เป็นความลงตัวที่ต่างยอมรับซึ่งความงามที่เป็นเอกลักษณ์ดังกล่าวนี้
          จึงต่อยอดการออกแบบในรูปแบบของการย้อนความ
          ออกแบบให้ประโบลของกลุ่มชาติพันธุ์กูยบุรีรัมย์
          อยู่ในรูปลักษณ์และกลิ่นอายของผ้าเขมรบุรีรัมย์ ให้ชื่อลวดลายว่า
          <strong>รักร้อยรวมใจ</strong>ให้ความหมายถึง
          ความรักที่ร้อยใจทุกชาติพันธุ์ไทยบุรีรัมย์ให้อยู่ร่วมกันอย่างมีความสุข
          เมื่อทำเป็นผืนผ้าแล้ว มีความงามงามปรากฏได้ดังต่อไปนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/รักร้อยรวมใจ.jpg"
            alt="ผ้ามัดหมี่ ลาย  รักร้อยรวมใจ"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 9 ผ้ามัดหมี่ ลาย  รักร้อยรวมใจ
        </p>
        <br />
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ลักษณะของผ้า
        </p>

        <p class="mb-4 text-justify indent-8">
          <strong>ซิ่นหมี่</strong> เป็นผ้าที่ใช้มากอีกประเภทหนึ่ง
          บางครั้งเรียกรวม ๆ ว่า <strong>“ซำปั๊วดโฮล”</strong> เขมรต่ำ
          (<strong>สาธารณรัฐกัมพูชา</strong>) เรียกผ้าลายทุกชนิดว่า
          <strong>“ซำปั๊วดโฮล”</strong>
          ส่วนเขมรสูงบุรีรัมย์ดั้งเดิมรุ่นคุณย่าคุณยาย เรียกผ้าลายมัดหมี่ว่า
          <strong>“ซำปั๊วดโฮล”</strong> บ้าง <strong>“ซิ่นหมี่”</strong> บ้าง
          แต่ถ้าสื่อสารกับคนภายนอก มักเรียกว่า
          <strong>“ซิ่นหมี่”</strong> ตามผู้อื่นเพื่อให้ง่ายต่อการสื่อสาร
          ชาติพันธุ์เขมรนิยมลวดลาย
          <strong>มัดหมี่ตาเล็ก ๆ</strong> ที่มีความละเอียดและใช้
          <strong>สีโทนขรึม</strong>
        </p>

        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าซิ่นหมี่
        </p>
        <p class="mb-4 text-justify indent-8">
          เมื่อนำไปทดลองนุ่งห่มในระเบียบการนุ่งแบบไทยพื้นบ้าน
          เพื่อการประชาสัมพันธ์ผ้าตัวอย่าง ที่ศูนย์การค้าโรบินสันบุรีรัมย์
          เมื่อวันที่ 10 สิงหาคม ก็มีคุณค่าและความงามที่ปรากกฎได้ดังต่อไปนี้
        </p>
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่4.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 10 การนุ่งผ้ามัดหมี่ลายปะกากรองสะนัน ในรูปลักษณ์<br />การแต่งกายแบบไทย
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่5.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 11 การนุ่งผ้ามัดหมี่ ลายปะกากะยอมในรูปลักษณ์<br />การแต่งกายแบบไทย
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/รูปลัก.png"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 12 การนุ่งผ้ามัดหมี่ ลาย รักร้อยรวมใจในรูปลัก <br>ของการแต่งกายแบบไทย
            </p>
          </div>
        </div>

        <br />
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </p>

        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านตะเคียน, บ้านสวายเจริญ, บ้านไม้แดง
        </p>
      </div>
    </div>
  </div>

  <div
    v-if="type === 'cloth4'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2 class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          ผ้าผ้ายกดอกและผ้าสไบยกดอก
        </h2>
      </div>

      <!-- เนื้อหา -->
      <section
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ผ้ายกดอกและผ้าสไบยกดอก
        </h3>

        <!-- บทนำ (คงข้อมูลเดิม แต่เกลาให้อ่านง่าย) -->
        <p class="mb-4 text-justify indent-8">
          ผ้ายกดอก (ห่มตัวที่ชาวบ้านเรียก <strong>“สไบ”</strong>) นิยมทอเป็นผ้าพื้นสีขาวแล้วจึง
          <strong>ย้อมทั้งผืน</strong> โดยเฉพาะ <strong>ย้อมมะเกลือ</strong> ให้สีดำ ช่วยพรางรอยเปื้อน
          ลดการดูดฝุ่น เพิ่มน้ำหนัก–ความเหนียว และให้กลิ่นเฉพาะ เพราะสไบมักติดกาย ใช้พันตัว เช็ดเหงื่อ–น้ำหมาก
          ลวดลายออกแบบให้ไม่ซับซ้อน ใช้ตะกอไม่เกิน <strong>7 ตะกอ</strong> และทำ <strong>ขอบลายสองด้าน</strong>
          เพื่อกำหนดขอบเขตและเพิ่มความน่าสนใจ ผู้เชี่ยวชาญคัด <strong>5 ลาย</strong> จาก 25 ลาย
          และผลิตต้นแบบจากลำดับ <strong>อันดับ 1</strong> และ <strong>อันดับ 2</strong> ดังนี้
        </p>

        <!-- ลายต้นแบบ -->
        <ol class="list-decimal list-inside indent-8 space-y-8 text-justify">
          <!-- ลายที่ 1 -->
          <li>
            <span class="font-semibold">ลายที่ 1 (ลำดับ 21):</span>
            เก็บลาย <strong>4 ตะกอ</strong> <span class="whitespace-nowrap">สอดไส้ดอกกลาง</span>
            ด้วยไหมต่างสีหรือเส้นใยโลหะ เพิ่มความหนาลายด้วยการสอดเส้นได้
            <strong>ตะกอละ 2–8 เส้น</strong> รายละเอียดการทอที่ใช้ในต้นแบบ:
            <ol class="list-decimal list-inside indent-8 space-y-2 mt-3">
              <li>หน้าผ้า <strong>102 ซม.</strong> ฟันหวี <strong>1,980 ช่อง</strong></li>
              <li>เส้นยืน ไหม <strong>20/22 ดีเนียร์ ควบ 4</strong></li>
              <li>เส้นพุ่ง ไหม <strong>ขนาด LL ควบ 6</strong> (ใหญ่กว่าเส้นยืนเล็กน้อย)</li>
              <li>การใช้: นุ่ง–โจง–งานเอนกประสงค์ทั่วไป</li>
            </ol>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/แพทเทริน์ลายผ้ายกดอก.png"
                alt="แพทเทิร์นลายผ้ายกดอกลำดับที่ 1"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 1 แพทเทิร์นลายผ้ายกดอก ลำดับที่ 1</p>

            <!-- แรงบันดาลใจ (ลายที่ 1) -->
            <p class="mt-4 indent-8">
              <strong>แรงบันดาลใจ:</strong>
              (1) <strong>ผ้ายกดอกชาวเขมร เกาะดัจ กรุงพนมเปญ</strong> ที่ผู้วิจัยลงพื้นที่มากกว่า
              <strong>5 ครั้งใน 10 ปี</strong> ต้องการอนุรักษ์กระบวนการผลิตซึ่งกำลังจางหาย
              (ในบริบทที่บุรีรัมย์มีเขมรสูง–คะแมร์ลือ และวัฒนธรรมอาเซียนร่วมกัน)
              (2) <strong>ระเบียบการใช้ผ้า</strong> ของเขมรบุรีรัมย์ที่กำหนด “ผ้ายกดอก” เป็นผ้าพิเศษใช้ในโอกาสพิเศษ
              สอดคล้องกับภาพรวมสังคมไทย—จึงจัดอยู่ในกลุ่ม <strong>สินค้าพรีเมี่ยม</strong>
              ผืนนี้ตั้งชื่อว่า <strong>“ดอกกันเกรา” (ดอกมันปู)</strong>
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าผ้ายกดอก1.jpg"
                alt="ผ้ายกดอกลาย ดอกกันเกรา"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 2 ผ้ายกดอกลาย ดอกกันเกรา</p>
          </li>

          <!-- ลายที่ 2 -->
          <li>
            <span class="font-semibold">ลายที่ 2 (ลำดับ 11):</span>
            เก็บลาย <strong>6 ตะกอ</strong> ตั้งชื่อว่า <strong>“ดอกแก้วกาหลง”</strong>
            รายละเอียดการทอของต้นแบบ:
            <ol class="list-decimal list-inside indent-8 space-y-2 mt-3">
              <li>หน้าผ้า <strong>65 ซม.</strong> ฟันหวี <strong>1,000 ช่อง</strong></li>
              <li>เส้นยืน ไหม <strong>20/22 ดีเนียร์ ควบ 4</strong></li>
              <li>เส้นพุ่ง ไหม <strong>ขนาด LL ควบ 6</strong></li>
            </ol>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/แพทเทริน์ลายผ้ายก.png"
                alt="แพทเทิร์นลายผ้ายกดอกลำดับที่ 2"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 3 แพทเทิร์นลายผ้ายกดอก ลำดับที่ 2</p>

            <p class="mt-4 indent-8">เมื่อทอเป็นผืนผ้า รูปลักษณ์ปรากฏดังภาพต่อไปนี้</p>
            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/ผ้าผ้ายกดอก2.jpg"
                alt="ผ้าสไบยกดอกลาย ดอกแก้วกาหลง"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="text-center italic mt-2">ภาพที่ 4 ผ้าสไบยกดอกลาย ดอกแก้วกาหลง</p>
          </li>
        </ol>

        <!-- คุณลักษณะของผ้า (คงเนื้อหาเดิม) -->
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          คุณลักษณะของผ้า
        </h3>
        <p class="mb-4 text-justify indent-8">
          <strong>ผ้ายกดอก/สไบ</strong> มักทอพื้นขาวแล้ว
          <strong>ย้อมมะเกลือเป็นสีดำ</strong> เหมาะกับการใช้งานติดตัวบ่อย
          ช่วยพรางคราบ ลดฝุ่น เพิ่มน้ำหนัก–ความเหนียว และกลิ่นเฉพาะ
          ลวดลายใช้ตะกอไม่เกิน 7 ตะกอ และมีขอบลายสองด้านเพื่อความงามและระบุขอบเขตผืนผ้า
        </p>

        <!-- การแต่งกาย -->
        <h3 class="text-2xl font-extrabold text-purple-800 dark:text-white mt-10 mb-4">
          การแต่งกายด้วยผ้ายกดอกและสไบยกดอก
        </h3>
        <p class="mb-4 text-justify indent-8">
          ทดลองนุ่งห่มในแบบไทยพื้นบ้านเพื่อประชาสัมพันธ์ ณ ศูนย์การค้าโรบินสันบุรีรัมย์
          <span class="whitespace-nowrap">เมื่อวันที่ 10 สิงหาคม</span> พบคุณค่าและความงามปรากฏชัดดังภาพ
        </p>

        <div class="flex justify-center gap-8">
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าผ้ายกดอก3.jpg"
              alt="การนุ่งผ้ายกดอกลาย ดอกกันเกรา"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 5 การนุ่งผ้ายกดอกลาย ดอกกันเกรา (ลุคไทย)
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ดอกกันเกรา.jpg"
              alt="ดอกกันเกรา"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px] max-w-md"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 6 การนุ่งผ้ายกดอกลาย ดอกกันเกรา (ลุคไทย)
            </figcaption>
          </figure>
        </div>

        <!-- แหล่งที่มา -->
        <h3
          class="mt-12 text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </h3>
        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านสวายเจริญ, บ้านไม้แดง, บ้านตะเคียน
        </p>
      </section>
    </div>
  </div>

  <div
    v-if="type === 'cloth5'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <header class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าขาวม้ายกขิด ผ้าสไบยกขิด
        </h2>
      </header>

      <!-- เนื้อหา -->
      <section
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <h3
          class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4"
        >
          ผ้าขาวม้ายกขิด
        </h3>

        <p class="mb-4 indent-8">
          เป็นผ้าที่ผู้รักผ้าไทยนิยมสะสมอีกชิ้นหนึ่ง ราคาขายมีตั้งแต่ 850 – 4500
          บาท ขึ้นอยู่กับลวดลาย เนื้อผ้า และเรื่องราวของผ้าผืนนั้น
          ผู้วิจัยสอบถามพ่อค้าออนไลน์ นายกฤษกร แก้วโบราณ ได้ใจความว่า
          ผ้าขาวม้ายกขิดเป็นผ้าที่ขายดีที่สุดของเขา
          ผู้ซื้อส่วนใหญ่จะเป็นผู้ชายที่รักการแต่งกายและการอนุรักษ์ผ้าไทยที่ยอมซื้อผ้าราคาสูงจากความแปลกใหม่ของสีสัน
          เรื่องราว และความมั่นใจว่าพ่อค้าทำเองกับมือ หรือควบคุมการทอเองกับมือ
          ผู้วิจัยจึงตั้งใจจะทำผ้าชุดนี้ให้มีลายที่ค่อนข้างหรูใน 2 ลักษณะคือ
          ลักษณะที่เป็นผ้าขาวม้า และในลักษณะของการเป็นผ้าสไบ
          ทั้งนี้เพื่อให้ได้ลูกค้าที่หลากหลายขึ้นได้แก่
        </p>

        <p>
          ลายที่ 1. ลายลำดับที่ 1 สำหรับทอผ้าขาวม้ายกขิด ขนาดฟันหวี 1200
          ช่องฟันหวี หน้าผ้ากว้าง 75 เซนติเมตร ให้ผู้ชายตัวสูงนุ่งได้พอดี
          ใช้ไหมเส้นยืนควบ 4 20/22 ดีเนียร์ เกรด A พุ่งด้วยเส้นไหม ควบ 6 ไซส์ LL
          เดินเส้นยืนเป็นลายทาง สีเขียว แดง พุ่งเส้นพุ่งด้วยเส้นควบลายโกนจะดอ
          เรียก สไบโกนจะดอ (ลายเกล็ดปลาชะโด) แบ่งช่องลายด้วยสีขาว สีเหลือง
          และสีน้ำเงิน ครบ 5 สีตามแบบดั้งเดิม
        </p>

        <figure class="mt-4">
          <img
            src="/assetts/css/image/ผ้าขาวม้ายก.png"
            alt="แพทเทรินลายผ้าขาวม้ายกชายขิด"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
          />
          <figcaption class="text-center italic mt-2">
            ภาพที่ 1 แพทเทรินลายผ้าขาวม้ายกชายขิด
          </figcaption>
        </figure>

        <p class="mt-6 indent-8">
          เมื่อนำมาทอเป็นผืนผ้า จะได้รูปลักษณ์ผ้าดังต่อไปนี้
        </p>

        <figure class="mt-4">
          <img
            src="/assetts/css/image/ครึ่งลาย.png"
            alt="ลายม้าทั้งแบบครึ่งลายและแบบเต็มลาย"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
          />
          <figcaption class="text-center italic mt-2">
            ภาพที่ 2 ผ้าขาวม้ายกขิดลายดอกแก้ว และลายม้า ทั้งแบบครึ่งลาย
            และแบบเต็มลาย
          </figcaption>
        </figure>

        <p class="mt-8 indent-8">
          ลายที่ 2 สำหรับทอสไบยกขิด เปิดโอกาสให้ผู้หญิงใช้ผ้าห่มตัวงามๆ
          ไว้อวดกัน นักวิจัยเลือก ขนาดฟันหวี 880 ช่องฟันหวี หน้าผ้ากว้าง 65
          เซนติเมตร ให้ผู้หญิงใช้ถือใช้ห่มคลุมไหล่ได้พอดี โดยใช้ไหมเส้นยืนควบ 4
          20/22 ดีเนียร์ เกรด A พุ่งด้วยเส้นไหม ควบ 6 ไซส์ LL ให้สีเส้นยืนสีทอง
          และพุ่งด้วยเส้นพุ่งสีพาสเทล หลากหลายสี เพื่อให้ผู้หญิงดูอ่อนหวาน
          น่ารัก ตามคำแนะนำของผู้เชี่ยวชาญ ให้ผสมผสานลายใหม่ให้มีความหรูหราขึ้น
          ผู้วิจัยจึงปรับเปลี่ยนลายใหม่ โดยใช้ลายกรวยเชิงดอกคูณ
        </p>

        <figure class="mt-4">
          <img
            src="/assetts/css/image/สไบยกขิด.png"
            alt="แพทเทรินลายสไบยกขิด"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
          />
          <figcaption class="text-center italic mt-2">
            ภาพที่ 3 แพทเทรินลายสไบยกขิด
          </figcaption>
        </figure>

        <p class="mt-6 indent-8">
          เมื่อนำไปทอเป็นผืนผ้าจะมีรูปลักษณ์ดังต่อไปนี้
        </p>

        <figure class="mt-4">
          <img
            src="/assetts/css/image/กรวยเชิง.png"
            alt="ผ้าสไบยกขิดลายกรวยเชิงดอกคูณ"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
          />
          <figcaption class="text-center italic mt-2">
            ภาพที่ 4 ผ้าสไบยกขิดลายกรวยเชิงดอกคูณ
          </figcaption>
        </figure>

        <h3
          class="mt-10 text-2xl font-extrabold text-purple-800 dark:text-white mb-4"
        >
          คุณลักษณะของผ้า
        </h3>

        <p class="mb-4 indent-8">
          เป็นผ้าที่ผู้รัก<strong>ผ้าไทย</strong>นิยมสะสมอีกชิ้นหนึ่ง
          ราคาขายมีตั้งแต่ 850 – 4500 บาท ขึ้นอยู่กับ <strong>ลวดลาย</strong>,
          <strong>เนื้อผ้า</strong> และ
          <strong>เรื่องราวของผ้าผืนนั้น</strong> สอบถามพ่อค้าออนไลน์
          <strong>นายกฤษกร แก้วโบราณ</strong> ได้ใจความว่า
          <strong>ผ้าขาวม้ายกขิด</strong> เป็นผ้าที่ขายดีที่สุดของเขา
          ผู้ซื้อส่วนใหญ่จะเป็น
          <strong>ผู้ชายที่รักการแต่งกายและการอนุรักษ์ผ้าไทย</strong>
          ที่ยอมซื้อผ้าราคาสูงจากความ <strong>แปลกใหม่ของสีสัน</strong>,
          <strong>เรื่องราว</strong> และความมั่นใจว่า
          <strong>พ่อค้าทำเองกับมือ</strong> หรือ
          <strong>ควบคุมการทอเองกับมือ</strong>
        </p>

        <h3
          class="mt-10 text-2xl font-extrabold text-purple-800 dark:text-white mb-4"
        >
          การแต่งกายด้วยผ้าขาวม้ายกขิด ผ้าสไบยกขิด
        </h3>

        <p class="mb-4 indent-8">
          เมื่อนำไปทดลองนุ่งห่มในระเบียบการนุ่งแบบไทยพื้นบ้าน เพื่อการประชาสัมพันธ์ผ้าตัวอย่าง ที่ศูนย์การค้าโรบินสันบุรีรัมย์ เมื่อวันที่ 10 สิงหาคม ก็เห็นคุณค่าและความงามที่ปรากกฎได้ดังต่อไปนี้
        </p>

        <!-- ทำให้ responsive: 1 คอลัมน์บนมือถือ, 3 คอลัมน์บนจอใหญ่ -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด3.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 5 การห่มผูก และพันผ้าขาวม้ายกขิด ในรูปแบบต่างๆ
              ในการแต่งกายบุรุษและสตรี
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด4.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 6 การห่มผูก และพันผ้าขาวม้ายกขิด ในรูปแบบต่างๆ
              ในการแต่งกายบุรุษและสตรี
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าขาวม้ายกขิด5.jpg"
              alt="ผ้าขาวม้ายกขิด"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 7 การห่มสไบยกขิดลาย กรวยเชิงดอกคูณ
              ในรูปลักษณ์การแต่งกายแบบไทย
            </figcaption>
          </figure>
        </div>

        <h3
          class="mt-10 text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </h3>

        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านไม้แดง, บ้านตะเคียน, บ้านสวายเจริญ
        </p>
      </section>
    </div>
  </div>

  <div
    v-if="type === 'cloth6'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าโฮลเปราะห์
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ผ้าโฮลเปราะห์
        </p>
        <p class="mb-4 text-justify indent-8">
          กลุ่มชาติพันธุ์เขมรบุรีรัมย์จำนวนหนึ่ง ทอผ้า โฮลเปราะห์ (ผ้าปูมเขมร)
          สำหรับใช้ในงาบวชพระของลูกชาย ผ้าจะแบ่งออกเป็น 2 ส่วน คือส่วนท้องผ้า
          และส่วน เจือย (ชายผ้า) มีความยาวประมาณ 4 หลา เท่ากับ 2 เท่าของซิ่นหมี่
          ใช้นุ่งโจง หรือนุ่งหน้านางลอยชาย ส่วนใหญ่จะใช้ร่วมกันกับผ้าขาวม้ายกขิด
          ออกแบบลวดลายส่วนท้องผ้าให้ผู้เชี่ยวชาญได้เลือกพิจารณาไว้ 4 ลาย
          แต่ส่วนของเจือย ออกแบบไว้เพียงลายเดียว
          เนื่องจากได้กับลายท้องผ้าได้ทุกลาย
          ผู้เชี่ยวชาญได้เลือกลายผ้าโฮลเปราะห์ ลายดังนี้คือ
        </p>
        <p class="mb-4 text-justify indent-8">
          วัตถุดิบในการทำผ้าต้นแบบใช้เส้นใยไหมยืนควบ 4 20/22 ดีเนียร์
          ของบริษัทจุลไหมไทย สีกรมท่าเข้ม (Navy Blue) เส้นพุ่งใช้ไหมควบ 6 ไซด์
          LL เลือกใช้ไหมเส้นเล็ก เนื่องจากลวดลายที่ออกแบบมีความละเอียดมาก
          ถ้าใช้ไหมเส้นใหญ่จะไม่สามารถมัดลายได้ละเอียดตามความต้องการ นอกจากนี้
          นักวิจัยยังได้เพิ่มเทคนิคการจกดาวที่เชิงผ้าทั้งสองด้าน
          เพื่อเพิ่มความหรูหรา เพื่อให้ผ้าชิ้นนี้เป็นผ้าชิ้นเอก
          โดยจะแสดงได้หลังจากที่ทำผ้าตัวอย่างเสร็จสิ้นแล้ว
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 1 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/โฮลเปราะห์.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 1"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 1
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 2 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ท้องผ้า.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 2"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 2
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 3 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่3.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 3"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 3 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 3
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 4 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่4.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 4"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 4 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 4
        </p>
        <p class="mb-4 text-justify indent-8">
          ลายที่ 4 เจือย (ชายผ้า) สำหรับผ้าโฮลเปราะห์
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่5.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 5"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 5 แพทเทรินเจือยสำหรับผ้าโฮลเปราะห์
        </p>
        <br />
        <p class="mb-4 text-justify indent-8">
          แรงบันดาลใจในการทำผ้าโฮลเปราะห์
          มาจากวิถีการอยู่ร่วมกันของกลุ่มชาติพันธ์ไทยบุรีรัมย์ ได้แก่ ไทยเดิ้ง
          เขมร กูย และลาว กลุ่มชาติพันธุ์ดังกล่าวอยู่ร่วมกันอย่างแนบแน่น ลายผ้า
          ของใครงามก็ชื่นชม หยิบยืมไปใส่ในผืนผ้าของตัวเอง ไม่มีใครหวง
          ประสบการณ์ที่พูดคุยกับชาวบ้านกลุ่มทอผ้าหลากหลายชาติพันธุ์ไทยบุรีรัมย์
          ทำให้สัมผัสได้ แม่ใหญ่ฮวด ช่างทอผ้าบ้านดอนกลาง อำเภอนาโพธิ์
          เป็นชาวบ้านกลุ่มชาติพันธุ์ลาว ภูมิใจในผ้ามัดหมี่หัวแดงตีนแดง
          แต่เธอทำผ้ามัดหมี่ได้ทุกประเภท
          ชมชอบใส่สีเขียวแบบเขมรลงในลายหมี่ของเธอโดยไม่รู้ตัว แม่แอ็ด
          ช่างทอผ้าบ้านกระโดน อำเภอกระสัง เป็นช่างทอกลุ่มชาติพันธุ์เขมร
          นุ่งผ้าเนื้อเนียนพลิ้วแบบเขมรแต่เธอชื่นชมความสามารถในการมัดหมี่ของชาติพันธ์ลาว
          แถบพุทไธสงและนาโพธิ์ด้วยความจริงใจ และมักบอกกับตลอดเวลาว่า
          ถ้าเรื่องมัดหมี่ต้องยกให้พุทไธงและนาโพธิ์เลยสถานการณ์ดังกล่าวเป็นแรงบันดาลใจ
          อันสำคัญที่จะทำผ้าผืนพิเศษสุดให้สามารถรวบรวมจุดเด่น
          และความงามของผ้าของกลุ่มชาติพันธุ์ทั้งสี่เผ่าพันธุ์ให้ออกมาเป็นผ้าทอของไทยบุรีรัมย์
        </p>
        
        <figure class="mt-4">
                  <video
                    src="/assetts/css/video/IMG_3198-new.mp4"
                    autoplay
                    muted
                    playsinline
                    loop
                    class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
                  >
                    เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                  </video>
                  <figcaption class="text-center italic mt-2">
                    ผ้าโฮลเปราะห์
                  </figcaption>
                </figure>


        <p class="mb-4 text-justify indent-8">
          ดังนั้น การทำตัวอย่างผ้าโฮลเปราะห์ในครั้งนี้
          เลือกที่จะใส่เทคนิคการจกดาวสองชั้นไว้ที่เชิงผ้า เนื่องจาก
          การจกดาวที่ชายผ้านั้น ถือเป็นอัตลักษณ์ร่วมของผ้าตีนแดงบุรีรัมย์
          ซึ่งเป็นผ้าที่จังหวัดสนับสนุนให้คนในจังหวัดบุรีรัมย์ได้ใช้ทั่วกัน
          ต้องการให้ผ้าเขมรบุรีรัมย์มีส่วนในการคงอัตลักษณ์ร่วมไว้
          ทั้งนี้เพื่อให้ผู้คนหลายๆ
          ภาคส่วนยอมรับความเป็นเขมรบุรีรัมย์อย่างชื่นชม ผ้าชิ้นนี้
          ถือเป็นผ้าที่เป็นตัวเอก
          เพราะนอกเหนือจากการเหลือกลุ่มที่ทำผ้าชนิดนี้ที่บ้านหนองเพชร
          เพียงหมู่บ้านเดียว แล้ว การจกดาว ก็มีช่างทอทำได้เพียงไม่กี่คน
          เพราะใช้เวลานาน ต้องใช้ทักษะในการทอหลายอย่าง ดังนั้นในครั้งนี้
          เลือกสีสัน โครงสร้างลาย
          และเนื้อผ้าที่นุ่มพลิ้วแบบชาติพันธุ์เขมรไว้ในผืนเดียวกัน
          <strong
            >ให้ความหมายถึง ไทยบุรีรัมย์ที่อยู่ร่วมกันอย่างมีคุณค่า คุณประโยชน์
            งดงาม และสันติสุข</strong
          >
          ดอกดาวเรืองให้ความหมายถึงความเจริญรุ่งเรือง ผ่องใส ก้าวหน้า มีความหวัง
          จึงเลือกลายท้องผ้า ทำได้เพียง 2 ลาย
          และทอเสร็จการประชาสัมพันธ์เผยแพร่ตัวอย่างผ้าเพียงลายเดียว
          คือลายดอกจามจุรี แพทเทริน์ลายที่ 3
          โดยเมื่อผลิตเป็นผืนผ้าจะมีรูปลักษณ์ดังต่อไปนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าซิ่นหมี่3.jpg"
            alt="ผืนผ้าโฮลเปราะห์จกขิดดาว ลายดอกดาวเรือง"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 6 ผืนผ้าโฮลเปราะห์จกขิดดาว ลายดอกดาวเรือง
        </p>
        <br />
        <p class="mb-4 text-justify indent-8">
          ในการทำผ้าต้นแบบทั้งหมด กลุ่มชาติพันธุ์เขมรบุรีรัมย์
          กระจายออกไปจำนวน 12 กี่ 4 หมู่บ้าน ทั้งนี้
          เนื่องจากการทอผ้าเป็นงานศิลปะ อย่างหนึ่งเรียกงานศิลปหัตถกรรม
          จึงแสดงออกมาตามอัตลักษณ์ของตนเอง
          มาจากจิตวิญญาณและความชอบของตนเอง ผ้าจึงมีบุคลิกที่แตกต่างกัน
          แม้ว่าจะทำลวดลายเดียวกันก็ตาม เช่นเดียวกันกับผ้ามัดหมี่ทอมือของชาวบ้าน
          จะมีบุคลิกที่แตกต่างกันจากผ้าพิมพ์ลายมัดหมี่จากโรงงาน
          แม้ว่าผ้าพิมพ์ลายมัดหมี่จากโรงงาน จะให้รูปลักษณ์ที่คมชัด
          สีสันที่สวยงาม และเนื้อผ้าที่เรียบสม่ำเสมอ ก็ตาม
          หรืออาจเปรียบความงามของหญิงสาวแท้ๆ กับความงามของหญิงสาวดัดแปลง
          แม้หญิงสาวดัดแปลงจะสวยงามสมบูรณ์เพียงใดก็ตาม นี่คือความสำคัญ
          และความแตกต่างของอัตลักษณ์ อัตลักษณ์จึงเป็นความงามจากตัวตนที่แตกต่าง
          เป็นความงามที่เสน่ห์เฉพาะ
          เป็นความงามที่เป็นหนึ่งซึ่งใครก็ลอกเลียนแบบไม่ได้
        </p>

        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          คุณลักษณะของผ้า
        </p>

        <p class="mb-0 text-justify indent-8">
          กลุ่มชาติพันธุ์เขมรบุรีรัมย์จำนวนหนึ่งยังทอ
          <strong>ผ้าโฮลเปราะห์ (ผ้าปูมเขมร)</strong>
          สำหรับใช้ในงาน
          <strong>บวชพระของลูกชาย</strong> ผ้าประเภทนี้แบ่งออกเป็น 2 ส่วน คือ
          <strong>ส่วนท้องผ้า</strong> และ
          <strong>ส่วนเจือย (ชายผ้า)</strong> โดยมีความยาวประมาณ
          <strong>4 หลา</strong> ซึ่งเท่ากับ 2 เท่าของซิ่นหมี่ ใช้นุ่ง
          <strong>โจงกระเบน</strong> หรือนุ่ง
          <strong>หน้านางลอยชาย</strong> และมักใช้ร่วมกับ
          <strong>ผ้าขาวม้ายกขิด</strong>
        </p>
        <br />
        
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าโฮลเปราะห์
        </p>
        <p class="mb-4 text-justify indent-8">
          เมื่อนำไปทดลองนุ่งห่มในระเบียบการนุ่งแบบไทยพื้นบ้าน
          เพื่อการประชาสัมพันธ์ผ้าตัวอย่าง ที่ศูนย์การค้าโรบินสันบุรีรัมย์
          เมื่อวันที่ 10 สิงหาคม ก็เห็นคุณค่าและความงามที่ปรากกฎได้ดังต่อไปนี้
        </p>
        <div class="flex justify-center gap-8">
          <div class="text-center">
            <img
              src="/assetts/css/image/นุ่งห่ม.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 7 การนุ่งผ้าโฮลเปราะห์จกขิดดาว ลาย <br>ดอกดาวเรือง ในรูปลักษณ์ <br>การนุ่งห่มแบบไทย
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่6.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 8 การนุ่งผ้าโฮลเปราะห์จกขิดดาว ลาย <br>ดอกดาวเรือง ในรูปลักษณ์ <br>การนุ่งห่มแบบไทย
            </p>
          </div>
        </div>

        <br />
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4 flex items-center gap-2"
        >
          <MapPin class="w-7 h-7 text-gray-900 dark:text-white" />
          แหล่งที่มาของผ้า
        </p>

        <p class="text-lg text-gray-500 mt-2 ml-1">
          บ้านสนวนนอก, บ้านหนองเพชร, บ้านตะเคียน, บ้านสวายเจริญ, บ้านไม้แดง
        </p>
      </div>
    </div>
  </div>

</template>
