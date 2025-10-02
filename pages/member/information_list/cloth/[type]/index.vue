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

<div
    v-if="type === 'cloth7'"
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
          ชาติพันธุ์เขมรบุรีรัมย์
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อย่อยหลัก -->
        <h2
          id="intro"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ชาติพันธุ์เขมรบุรีรัมย์
        </h2>

        <!-- คำจำกัดความและกรอบคิด -->
        <h4
          id="definitions"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          นิยาม “ชาติพันธุ์” และ “ชาติพันธุ์วิทยา”
        </h4>
        <p class="text-justify indent-8">
          “ชาติพันธุ์” (ethnos/ethnicity)
          คือกลุ่มคนที่ผูกพันกันทั้งทางสายเลือดและทางวัฒนธรรม มีภาษา ขนบ
          และความเชื่อร่วมกันจนเกิด “สำนึกทางชาติพันธุ์” (ethnic identity)
          ขณะที่ “ชาติพันธุ์วิทยา” (ethnology)
          คือศาสตร์ที่ศึกษาวัฒนธรรมของมนุษยชาติ
          ทั้งที่ดำรงอยู่และที่สูญหายไปในเชิงวิทยาศาสตร์
        </p>

        <h4
          id="culture-system"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          วัฒนธรรมในฐานะระบบร่วม
        </h4>
        <p class="text-justify indent-8">
          เมื่อสังคมขยายใหญ่ขึ้น มนุษย์ต้องตกลง “แบบแผนการอยู่ร่วม”
          ร่วมกัน—สิ่งนั้นเรียกว่า “วัฒนธรรม”
          การถ่ายทอดจากรุ่นสู่รุ่นทำให้เส้นแบ่งระหว่าง “ชีวภาพ/สายเลือด” กับ
          “วัฒนธรรม” ทับซ้อนกันและแยกยาก
        </p>

        <!-- หน่วยและพรมแดนชาติพันธุ์ -->
        <h4
          id="unit-boundary"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          หน่วยและพรมแดนทางชาติพันธุ์
        </h4>
        <p class="text-justify indent-8">
          การนิยาม “หน่วยชาติพันธุ์” และพรมแดนเป็นโจทย์สำคัญ
          นักวิชาการจึงเสนอเกณฑ์พิจารณา 6 ประการ ได้แก่
          การกระจายตัวของลักษณะสำคัญ ความใกล้ชิดทางอาณาเขต องค์กรการเมือง ภาษา
          การปรับตัวทางนิเวศ และโครงสร้างชุมชนท้องถิ่น อย่างไรก็ดี
          เกณฑ์เหล่านี้มีข้อจำกัด ตัวกำหนดอาจไม่สอดคล้องกันครบถ้วน
          หน่วยวัฒนธรรมจึงมีพลวัต ขึ้นกับกาละ–เทศะ
        </p>

        <h4
          id="otherness"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          พรมแดนที่นิยามผ่าน “ความเป็นอื่น”
        </h4>
        <p class="text-justify indent-8">
          ในภูมิภาคเอเชียอาคเนย์ที่มีกลุ่มหลากหลายอยู่ร่วมภูมิทัศน์เดียวกัน
          พรมแดนชาติพันธุ์จึงไม่แข็งทื่อ การชี้ “ใครคือสมาชิก/ไม่ใช่สมาชิก”
          หรือความรู้สึก “ความเป็นอื่น (Otherness)”
          มีบทบาทสำคัญต่อการกำหนดและธำรงพรมแดน
        </p>

        <!-- ขยายบริบทท้องถิ่น -->
        <h3
          id="buriram-context"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          บริบท “เขมรบุรีรัมย์” และภูมิศาสตร์วัฒนธรรม
        </h3>
        <p class="text-justify indent-8">
          กลุ่มชาติพันธุ์เขมรในจังหวัดบุรีรัมย์ตั้งถิ่นฐานกระจายใน 7 อำเภอ
          มีเครือญาติสัมพันธ์แน่นแฟ้น ใช้ภาษาถิ่นเขมร พิธีกรรมพื้นบ้าน
          และระบบความเชื่อดั้งเดิมร่วมกับพระพุทธศาสนา
          วิถีชีพสัมพันธ์กับนิเวศทุ่งนา ป่าโคก หนองน้ำ และพื้นที่ทำกิน จึงเกิด
          “ภูมิสารสนเทศวัฒนธรรม” ที่ผูกการผลิต การใช้ทรัพยากร
          และพิธีกรรมเข้าด้วยกัน
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            <span class="font-medium">การกระจายชุมชน:</span>
            พบในหลายบ้าน/หมู่บ้าน เช่น บ้านสนวนนอก บ้านหนองเพชร บ้านกระดึงทอง
            บ้านตะเคียน บ้านสวายเจริญ บ้านกระโดน บ้านไม้แดง บ้านหนองเต็ง
            บ้านตาฮ้อ บ้านห้วยสำราญ เป็นต้น
          </li>
          <li>
            <span class="font-medium">เครือข่ายระหว่างหมู่บ้าน:</span>
            เชื่อมกันด้วยการแต่งงาน เครือญาติ งานบุญ และการค้าขาย
          </li>
        </ul>

        <!-- ภาษาและอัตลักษณ์ -->
        <h3
          id="language-identity"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ภาษา อัตลักษณ์ และการสื่อสาร
        </h3>
        <p class="text-justify indent-8">
          ภาษาเขมรถิ่นไทยในบุรีรัมย์ทำหน้าที่ทั้ง “สื่อสาร” และ
          “สัญลักษณ์อัตลักษณ์” การใช้ภาษายืดหยุ่นตามบริบท—ในบ้าน/ชุมชนใช้เขมร
          ในราชการและการศึกษาใช้ไทย คนรุ่นใหม่จำนวนมากสามารถสลับรหัสภาษา
          (code-switch) ได้ ทำให้กลุ่มยังคงอัตลักษณ์
          ขณะเดียวกันก็ผสานตัวกับสังคมไทยร่วมสมัย
        </p>

        <!-- โครงสร้างเครือญาติและจารีต -->
        <h3
          id="kinship-custom"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          เครือญาติ จารีต และพิธีกรรมวงจรชีวิต
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">การเกิด:</span> หมอตำแยดูแล มีพิธี “ยกครู”
            ใช้ผ้าขาว ขันธ์ห้า และเงินตามจารีต
          </li>
          <li>
            <span class="font-medium">การแต่งงาน:</span> มีเครื่องบูชาบรรพชน
            “เกรืองสะมา” เครื่องแต่งกายเจ้าบ่าว–เจ้าสาว และการสมมาผู้ใหญ่
          </li>
          <li>
            <span class="font-medium">การศึกษา/เรียนรู้งาน:</span>
            ทำพิธีบูชาครูก่อนเรียนทอลายใหม่ ช่วยตั้งสติ–สมาธิและเป้าหมาย
          </li>
          <li>
            <span class="font-medium">การตาย:</span>
            มองว่าเป็นการไปสู่อีกภพหนึ่ง จัดปัจจัยสี่—โดยเฉพาะเสื้อผ้า มักใส่ผ้า
            4 ผืน เผื่อคู่ชีวิตในโลกหน้า
          </li>
        </ul>

        <!-- เศรษฐกิจ วัตถุดิบ และหัตถกรรม -->
        <h3
          id="economy-craft"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          เศรษฐกิจ วัตถุดิบ และหัตถกรรมผ้าทอ
        </h3>
        <p class="text-justify indent-8">
          ผ้าทอมือเป็นทั้งประโยชน์ใช้สอยและมูลค่าทางเศรษฐกิจ
          วัตถุดิบหลักคือฝ้ายและไหม ฝ้ายเหมาะงานกลางแจ้ง ซับเหงื่อ ระบายอากาศดี
          ส่วนไหมใยยาวละเอียด เงางาม เหมาะงานมงคล/พิธี
          สีธรรมชาติสะท้อนโลกทัศน์ท้องถิ่น
          กระบวนการผลิตประกอบด้วยการเตรียมเส้นใย กรอหลอด จัดเส้นยืน ตั้งฟืม
          เก็บตะกอ และทอตามเทคนิค (พื้น มัดหมี่ ยกดอก ยกขิด ฯลฯ)
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            <span class="font-medium">รูปแบบการนุ่ง:</span> นุ่งลอยชายใช้ทั่วไป
            / นุ่งโจงเมื่อต้องการคล่องตัว (เช่นทำเกษตร)
          </li>
          <li>
            <span class="font-medium">โอกาสใช้ผ้า:</span>
            ลายพื้น–ลายตารางใช้ประจำวัน /
            มัดหมี่–ยกดอก–ยกขิดใช้ในงานบุญและพิธีสำคัญ
          </li>
          <li>
            <span class="font-medium">คุณค่าเชิงสังคม:</span>
            ยกย่องผู้รู้/ปราชญ์ตามความยาก–ง่ายและองค์ความรู้ในการผลิต
          </li>
        </ul>

        <!-- ศิลปะ การแสดง และสุนทรียะ -->
        <h3
          id="arts-performance"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ศิลปะ การแสดง และสุนทรียภาพในวิถีเขมร
        </h3>
        <p class="text-justify indent-8">
          ผ้า เครื่องแต่งกาย ดนตรี และท่ารำพื้นบ้านช่วยตอกย้ำสัญลักษณ์ของกลุ่ม
          ลวดลาย สีสัน และการนุ่งห่มทำงานร่วมกับดนตรี–นาฏศิลป์ในงานบุญและฤดูกาล
          เกิด “ความงามที่ใช้งานได้” (functional aesthetics)
          ควบคู่กับสถานะและพิธีกรรม
        </p>

        <!-- ความสัมพันธ์ระหว่างกลุ่ม -->
        <h3
          id="interethnic-relations"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความสัมพันธ์ระหว่างชาติพันธุ์และพรมแดนยืดหยุ่น
        </h3>
        <p class="text-justify indent-8">
          พรมแดนอัตลักษณ์เขมรบุรีรัมย์ก่อรูปจากการพบปะค้าขาย แต่งงานข้ามกลุ่ม
          แลกเปลี่ยนพิธีกรรม และการร่วมมือในงานชุมชน จึงเกิดการนิยาม
          “พวกเรา–พวกเขา” ที่ยืดหยุ่นตามบริบท
          ขณะเดียวกันก็รักษาแกนกลางของอัตลักษณ์ไว้
        </p>

        <!-- สมัยใหม่ การศึกษา และดิจิทัล -->
        <h3
          id="modernity-digital"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          โลกสมัยใหม่: การศึกษา เมือง และดิจิทัล
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">การศึกษา:</span>
            เด็กและเยาวชนใช้ภาษาไทยในโรงเรียน ยังใช้เขมรในบ้าน–ชุมชน
            เพิ่มความสามารถสลับภาษา
          </li>
          <li>
            <span class="font-medium">แรงงาน–เมือง:</span>
            การย้ายถิ่นชั่วคราวทำให้อัตลักษณ์กระจายสู่เมือง
            เกิดชุมชนเครือญาติย่อย
          </li>
          <li>
            <span class="font-medium">ดิจิทัลและการตลาด:</span>
            โซเชียลมีเดียช่วยขยายตลาดผ้าทอและท่องเที่ยววัฒนธรรม
            เกิดผู้ประกอบการรุ่นใหม่
          </li>
        </ul>

        <!-- โจทย์ร่วมสมัยและการอนุรักษ์ -->
        <h3
          id="challenges-preservation"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          โจทย์ร่วมสมัยและการอนุรักษ์เชิงมีส่วนร่วม
        </h3>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ภาษาและการถ่ายทอด:</span>
            การลดลงของผู้พูดถิ่นเดิม/ช่างทออาวุโส
            จำเป็นต้องมีหลักสูตร–เวิร์กช็อปและคลังวิดีโอ
          </li>
          <li>
            <span class="font-medium">ช่างฝีมือรุ่นใหม่:</span>
            สร้างแรงจูงใจด้วยตลาดที่เป็นธรรม (fair price) และการออกแบบร่วมสมัย
          </li>
          <li>
            <span class="font-medium">ทรัพยากรธรรมชาติ:</span>
            ส่งเสริมการย้อมสีธรรมชาติที่ยั่งยืน
            การปลูกฝ้าย/หม่อน–เลี้ยงไหมในชุมชน
          </li>
          <li>
            <span class="font-medium">ข้อมูล–สิทธิ์ชุมชน:</span> ระบุแหล่งที่มา
            (provenance) ของลวดลาย/เรื่องเล่า ป้องกันการใช้โดยไม่ให้เครดิต
          </li>
        </ul>

        <!-- เชื่อมกับเนื้อหาผ้าทอ (สำหรับทั้งเว็บ) -->
        <h3
          id="textile-link"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          เชื่อมโยงสู่ “ผ้าทอมือ” และการใช้งานในชีวิต
        </h3>
        <p class="text-justify indent-8">
          ลวดลายผ้า สี และเนื้อผ้ากำหนดโอกาสใช้งาน—ลายง่ายใช้ทุกวัน
          ลายซับซ้อนใช้ในพิธีสำคัญ ผ้าฝ้ายเหมาะงานกลางแจ้ง ผ้าไหมเหมาะงานมงคล
          การนุ่งลอยชาย/นุ่งโจงสะท้อนการปรับตัวกับกิจกรรม ผ้าจึงเป็นทั้ง “ภาษา”
          และ “เครื่องมือทางสังคม” ที่สร้างเกียรติ ประเพณี และสุนทรียะ
        </p>

        <!-- สรุปภาพรวม -->
        <h2
          id="summary"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          สรุปภาพรวม
        </h2>
        <p class="text-justify indent-8">
          ชาติพันธุ์เขมรบุรีรัมย์เป็นตัวอย่างของการที่ภาษา พิธีกรรม เครือญาติ
          สิ่งแวดล้อม และหัตถกรรมผสานกันเป็น “ระบบวัฒนธรรมมีชีวิต”
          พรมแดนชาติพันธุ์ยืดหยุ่นตามบริบท แต่ยังรักษาแกนแกนของอัตลักษณ์ไว้ได้
          ผ่านการเรียนรู้ การผลิตผ้าทอ การทำบุญและพิธีกรรม ในโลกสมัยใหม่
          การศึกษาและดิจิทัลช่วยเปิดโอกาสใหม่ ๆ
          ให้ชุมชนทั้งด้านเศรษฐกิจและการสืบสาน
          หากบริหารจัดการความรู้อย่างมีส่วนร่วม ผ้าทอและภูมิปัญญาจะยังคงงอกงาม
          ควบคู่กับความเข้มแข็งของสังคมท้องถิ่น
        </p>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'cloth8'"
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
          วัฒนธรรมผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <!-- หัวข้อย่อยหลัก -->
        <h2
          id="intro"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          ผ้าทอมือ
        </h2>

        <!-- บริบทและความหมาย -->

        <p class="text-justify indent-8">
          เป็นวัฒนธรรมในหมวดหมู่ของกิจกรรมเพื่อการยังชีพภายใต้ความต้องการปัจจัยสี่เพื่อการดำรงชีวิตและสืบทอดเผ่าพันธุ์
          และเนื่องจากการทอผ้าเป็นวัฒนธรรมเพื่อการดำรงอยู่ของชีวิตมนุษย์
          ดังนั้นจึงเกี่ยวพันธุ์และมีมิติรอบด้านอย่างลึกซึ้ง
          เกี่ยวพันธุ์กับนิเวศวิทยาโดยเป็นส่วนหนึ่งของนิเวศวิทยาวัฒนธรรม
          เรียกนิเวศวิทยาวัฒนธรรมการทอผ้าซึ่งจะเกี่ยวข้องกับการนำนิเวศวิทยาด้านสิ่งแวดล้อมๆ
          มาสร้างเครื่องมือในการทอผ้า มาเป็นแรงบันดาลใจในการออกแบบลวดลายผ้า
          ออกแบบการใช้ผ้าให้เหมาะกับนิเวศของแต่ละพื้นที่
          การทำผ้าและกระบวนการทอผ้าเข้าไปใช้ในพิธีกรรมต่างๆ อย่างแยบยล เป็นต้น
          ดั้งนั้นผ้าทอมือจึงให้ความหมายมากกว่าการเป็นเครื่องนุ่งห่ม
        </p>

        <!-- การแต่งงาน -->
        <h3
          id="marriage"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการแต่งงาน
        </h3>
        <p class="text-justify indent-8">
          การแต่งงานในสังคมชนบทเป็นการสร้างครอบครัวใหม่ ดังนั้น
          พิธีกรรมตามวัฒนธรรมจึงล้วนแล้วแต่ให้ความหมายในด้านการสร้าง การเติบโต
          การเจริญรุ่งเรือง การให้กำลังใจ ให้ต้นทุนชีวิต
          และให้ความคาดหวังว่าจะต้องพบสิ่งที่ดีงามในอนาคต
          วัฒนธรรมการแต่งงานของชาติพันธุ์เขมรจะใช้ผ้าทอมือในกิจกรรมหลายๆ
          ส่วนด้วยกันคือ
        </p>
        <ol class="list-decimal list-inside indent-8 space-y-4 text-justify">
          <li>
            ในส่วนเครื่องเซ่นไหว้เพื่อบอกกล่าวบรรพบุรุษที่ล่วงลับ ผีบ้านผีเรือน
            จะใช้ผ้าผู้หญิง ผ้าผู้ชาย ประกอบด้วยผ้านุ่ง ผ้าสไบ ผ้าโสร่ง
            และผ้าขาวม้า พร้อม หมาก พลู ขันธ์ 5 ให้ความหมาย
          </li>
          <li>ในส่วนของผ้าไหว้ หรือเครื่องสมมา เขมรเรียก เกรืองสะมา</li>
          <li>ในส่วนของเครื่องแต่งกายของเจ้าบ่าว เจ้าสาว</li>
          <li>ในส่วนของเครื่องแต่งกายผู้ร่วมงาน</li>
        </ol>

        <!-- การเกิด -->
        <h3
          id="birth"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการเกิด
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการเกิด ในอดีตการคลอดอยู่ในการดูแลของหมอตำแย
          ครอบครัวจัดเครื่องไหว้ยกครูเพื่อความราบรื่น ประกอบด้วยผ้าขาว ขันธ์ห้า
          และเงินตามที่ครูสืบทอด (เดิมราวหกสลึง–หกบาท ปัจจุบันแล้วแต่เจ้าของไข้)
          พิธีนี้สะท้อนการใช้ผ้าที่ตนผลิตอย่างคุ้มค่าและเป็นส่วนหนึ่งของเครื่องบูชาประจำพิธี
        </p>
        <p class="text-justify indent-8">
          ผ้านุ่ง ผ้าโสร่ง หรือผ้าเก่าของแม่ยังใช้เป็นผ้าอ้อมได้ดี เพราะนุ่ม
          ซับน้ำได้มาก และสิ่งตกค้างจากแป้งหรือเส้นใยเล็กถูกซักออกจนหมด
          ลดการระคายผิวทารก อีกทั้งกลิ่นพ่อแม่ช่วยให้เด็กรู้สึกใกล้ชิด อบอุ่น
          และลดความกังวล
        </p>

        <!-- การศึกษาและการเรียนรู้ -->
        <h3
          id="learning"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          การศึกษาและการเรียนรู้
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการศึกษาและการเรียนรู้
          ชาวเขมรนับถือผีบรรพบุรุษแนบแน่น
          กิจกรรมสำคัญจึงมักมีการกรวดน้ำหรือบอกกล่าวเสมอ ก่อนเรียนรู้งานใหม่
          เช่น การทอลายใหม่ จะทำพิธีบูชาครูด้วยขันธ์ห้าและผ้าขาว
          พร้อมชุดผ้าหญิง–ชายครบ แม้ดูเรียบง่าย แต่ช่วยให้ผู้ทำมีสมาธิ สติ
          เป้าหมายชัด เกิดการวางแผนและทำงานอย่างเป็นขั้นตอน จนนำไปสู่ความสำเร็จ
        </p>

        <!-- การแต่งกายและการใช้ผ้า -->
        <h3
          id="dress"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          การแต่งกายและการใช้ผ้า
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวการแต่งกาย
          การนุ่งผ้าทอมือที่ผลิตเองสอดคล้องวิถีชีวิตและนิเวศการผลิต
          เคารพกาลเทศะและฐานะทางสังคม ใช้อย่างประหยัดและสร้างสรรค์
          โครงสร้างผ้าผืน 4–8 ศอก นุ่งได้หลายแบบ แบ่งใหญ่เป็น “นุ่งลอยชาย”
          สำหรับใช้ทั่วไป และ “นุ่งโจง” เมื่อต้องการคล่องตัว เช่น
          ทำเกษตรหรือปีนต้นไม้ ผ้าขนาดประมาณ 70×200 ซม. จะนุ่งโจงได้กระชับ
          ส่วนในโอกาสพิเศษ อาจนุ่งลอยชายรุ่มรามหรือโจงยาวเบาสบาย
          เติมสไบ/เครื่องประดับเพื่อยกระดับความงาม
        </p>

        <!-- วัสดุและเส้นใย -->
        <h3
          id="materials"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัสดุและเส้นใย
        </h3>
        <p class="text-justify indent-8">
          นอกเหนือจากรูปแบบการนุ่ง วัตถุดิบก็ชี้นำโอกาสใช้ผ้าเช่นกัน
          งานกลางแจ้งและงานบ้านนิยมฝ้าย เพราะซับเหงื่อ ระบายอากาศดี
          และเหนียวขึ้นเมื่อเปียก ส่วนงานพิเศษนิยมไหม เพราะใยยาว ละเอียด เงางาม
          ผิวเรียบ เหมาะกับงานที่ต้องการความประณีต
        </p>

        <!-- ลวดลายและความหมาย -->
        <h3
          id="patterns"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลวดลายและความหมาย
        </h3>
        <p class="text-justify indent-8">
          การออกแบบลวดลายพื้นบ้านผ่านการคิดวิเคราะห์ให้สอดคล้องวิถีและประเพณี
          ลายพื้น ลายทาง ลายตาราง เหมาะใช้ทั่วไป ขณะที่มัดหมี่ ยกดอก ยกขิด
          หรือเทคนิคซับซ้อน ใช้ในโอกาสสำคัญเพราะต้องใช้เวลาและองค์ความรู้มาก
          แบบแผนนี้ทำให้สังคมให้ “คุณค่า” ตามความยากง่ายของงานและภูมิปัญญา
          เคารพผู้รู้หรือ “ปราชญ์” (อาจารย์/กรู/หลูกกูร)
          บทบาทผ้าทอมือจึงเกินกว่าความเป็นเครื่องนุ่งห่ม
        </p>

        <!-- การตาย -->
        <h3
          id="death"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการตาย
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการตาย เชื่อว่าผู้ตายไปสู่อีกภพหนึ่ง
          จึงเตรียมปัจจัยสี่ โดยเฉพาะเสื้อผ้า นิยมใส่ผ้า 4 ผืนของหญิง–ชาย
          เผื่อคู่ผู้ตายในโลกหน้า บางท้องถิ่นถวายทำบุญกับพระ หรือใส่ลงโลง
          (กรณีฝังแบบโบราณ) ก่อนขุดกระดูกทำบุญภายหลัง
          ซึ่งสอดคล้องกับข้อมูลพื้นที่ป่าช้า
          และหลักฐานโบราณคดีที่พบเศษผ้ากับเครื่องประดับ
          ผ้าทอมือจึงผูกพันพิธีตายมาเนิ่นนาน
          เป็นสื่อแห่งความรักและเมตตาระหว่างคนกับสังคม
          เสริมพลังชุมชนด้วยภูมิปัญญาของตนเอง
        </p>

        <!-- สรุปภาพรวม -->
        <h2
          id="summary"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          สรุปภาพรวม
        </h2>
        <p class="text-justify indent-8">
          ผ้าทอมือนั้น เป็นเครื่องมือที่มีความหมาย ยิ่งต่อการพัฒนาศักยภาพของคน
          พัฒนาความสุขและความเข้มแข็งของสังคมชุมชน
          พัฒนารายได้เข้าครอบครัวอย่างสม่ำเสมอและเป็นอิสระยิ่ง
          ไม่ต้องเป็นลูกจ้างใคร ตราบเท่าที่คนทอผ้าจะพัฒนาตนเองเองได้
          ยิ่งพัฒนาตัวเองได้มากเท่าไหร่ รายได้ก็เพิ่มมากขึ้นเท่านั้น
          โดยเฉพาะในยุค 4.0 นี้ การตลาดอยู่ในโลกออนไลน์
          ที่มีผู้คนนับไม่ถ้วนที่เห็นสินค้าผ้าทอมือของเรา หากบริหารจัดการความรู้
          ความสามารถ และเวลาได้อย่างเหมาะสมแล้ว
          ศักยภาพในการค้าขายผ้าทอมือก็จะสมบูรณ์ยิ่งขึ้นอย่างน่าสนใจ
        </p>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'cloth9'"
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
          การออกแบบลวดลายผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="design-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การออกแบบลวดลายผ้าทอมือ
        </h2>

        <!-- ความสำคัญในยุคไทยแลนด์ 4.0 -->
        <h3
          id="design-importance"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความสำคัญของการออกแบบ (บริบทไทยแลนด์ 4.0)
        </h3>
        <ol class="list-decimal list-inside indent-8 space-y-3 text-justify">
          <li>
            <span class="font-semibold">ผ้าทอมือเป็นสินค้าแฟชั่น</span> — ต้องตอบสนองความพึงพอใจและความสุขของผู้บริโภค จึงต้องมีทั้ง “คุณค่า” และ “ความงาม” ความรู้ในการออกแบบคือเครื่องมือสร้างคุณค่าและความงามให้ผลิตภัณฑ์ผ้า
          </li>
          <li>
            <span class="font-semibold">ผ้าทอมือสะท้อนวิถี คน และวัฒนธรรม</span> — การออกแบบต้องมี “อัตลักษณ์” ของชุมชนอย่างชัดเจน
          </li>
          <li>
            <span class="font-semibold">การออกแบบคือศิลปะของศิลปินพื้นบ้าน</span> — จำเป็นต้องศึกษาและอธิบายอัตลักษณ์/ตัวตนท้องถิ่นให้ชัด มิฉะนั้นจะ “ทำลายตัวตนชุมชน” มากกว่าส่งเสริมศักยภาพ เมื่อใดชุมชนหมดอัตลักษณ์ เมื่อนั้นชุมชนและชาติพันธุ์ย่อมอ่อนแรง; ในทางกลับกัน หากคงอัตลักษณ์ได้ ไม่ว่ารูปแบบใด ชุมชนและชาติพันธุ์ย่อมยั่งยืน (เทียบกรณีชาติพันธุ์มอญในไทย—สายสัมพันธ์ใกล้ชิดกับเขมร บางครั้งเรียก “มอญ–เขมร”—แม้ไม่มีประเทศมอญ แต่ยังเป็นที่รู้จักผ่านวัฒนธรรมและตัวตนของตนเอง) การคงอัตลักษณ์ช่วยส่งเสริม “การยอมรับความหลากหลาย” และการอยู่ร่วมกันอย่างเป็นสุขของสังคม
          </li>
        </ol>

        <!-- กรอบความรู้ -->
        <h3
          id="jarunee-framework"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          กรอบการออกแบบตาม จารุณี ชัยโชติอนันต์ (2558)
        </h3>
        <p class="text-justify indent-8">
          “การออกแบบผ้า” คือการวางแผนล่วงหน้าว่าจะผลิตผ้าออกมาอย่างไร ใช้ในโอกาสไหน ใครเป็นผู้ใช้ และใช้อย่างไร โดยควรพิจารณาองค์ประกอบหลักดังต่อไปนี้:
        </p>

        <!-- 1. การออกแบบเนื้อผ้า -->
        <h4
          id="fabric-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          1) การออกแบบเนื้อผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>เบอร์ (ขนาด) ของเส้นยืนและเส้นพุ่ง</li>
          <li>เบอร์ฟันหวี / ความถี่–ความหนาของฟันหวี</li>
          <li>ความกว้างของหน้าผ้า</li>
        </ol>

        <!-- 2. การออกแบบลายผ้า -->
        <h4
          id="pattern-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2) การออกแบบลายผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ประโยชน์ใช้สอย — เช่น ผ้านุ่ง ผ้าเมตร ผ้าพันคอ ผ้าคลุมไหล่ ผ้าทอหมอน ฯลฯ</li>
          <li>การให้สี — สีเส้นยืน–สีเส้นพุ่ง เมื่อนำมาทอรวมกันแล้วเกิดอารมณ์ภาพรวมอย่างไร</li>
          <li>ความสวยงามเชิงองค์ประกอบ — ช่องว่าง (negative space) และความสมดุล</li>
        </ol>

        <!-- 3. การออกแบบกระบวนการผลิตและการทอ -->
        <h4
          id="process-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3) การออกแบบกระบวนการผลิตและการทอ
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ขั้นตอนการผลิตและเครื่องมือ — แต่ละขั้นตอนใช้เครื่องมือชนิดใด</li>
          <li>ชนิดของกี่ทอผ้า — เลือกชนิดกี่ให้เหมาะกับลาย/เทคนิค</li>
          <li>การเก็บและเหยียบตะกอ — วิธีจัดตะกอและลำดับเหยียบเพื่อให้เกิดลายตามต้องการ</li>
          <li>วิธีการทอ — จังหวะทอ เทคนิคเฉพาะ และการควบคุมคุณภาพ</li>
        </ol>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'cloth10'"
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
          เทคนิคการผลิตผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="design-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การผลิตผ้าทอมือ
        </h2>

        <p class="text-justify indent-8">
          การผลิตผ้าทอมือ ช่างทออาศัยองค์ความรู้ตั้งแต่การเตรียมเส้นใย
          การกำหนดเบอร์เส้นด้าย การคำนวณฟันหวี–เส้นยืน ตลอดจนการฟอกและย้อมเส้นใย
          เพื่อให้ได้ผืนผ้าที่มีคุณภาพ ลวดลาย สีสัน และคุณสมบัติตามต้องการ
        </p>

        <!-- การเตรียมเส้นใยและระบบเบอร์ -->
        <h3
          id="fiber-prep"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          1) การเตรียมเส้นใย และระบบเบอร์เส้นด้าย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยที่ใช้เป็นเส้นยืน–เส้นพุ่งอาจผลิตเองหรือซื้อสำเร็จรูป
          โดยเส้นใยที่ซื้อจะระบุ “เบอร์” ชัดเจน ซึ่งมีระบบหลักดังนี้:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ระบบดีเนียร์ (Denier; D)</span> —
            ใช้กับเส้นไหม นิยาม: 1 ดีเนียร์ = เส้นยาว 9,000 เมตร หนัก 1 กรัม
            (เบอร์ยิ่งสูง เส้นยิ่ง “ใหญ่–หนัก”
            ในมวลเท่ากันเส้นจะสั้นกว่าเบอร์ต่ำ)
          </li>
          <li>
            <span class="font-medium">ระบบเท็กซ์ (Tex; T)</span> —
            ใช้กับฝ้าย/เส้นใยสังเคราะห์ นิยาม: 1 เท็กซ์ = เส้นยาว 1,000 เมตร
            หนัก 1 กรัม (ยิ่งเลข Tex สูง เส้นยิ่ง “ใหญ่–หนัก”)
          </li>
        </ul>
        <p class="text-justify indent-8">
          ตัวอย่างการแสดงสเปกเส้นด้าย: ไหมจุล “4 เส้น ขนาด 25/30 เกลียว 170 รอบ”
          หมายถึงรวม ~4×27.5D ≈ 110D ตีเกลียว 170 รอบ/นิ้ว
          เหมาะทำเส้นพุ่งให้ผ้าเนื้อหนา; สเปกฝ้ายแบบอุตสาหกรรม เช่น
          <span class="whitespace-nowrap">20/1, 40/2, 60/2, 180/2</span>
          อ่านว่าเบอร์–จำนวนเส้นควบ ตัวอย่าง:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            <span class="font-medium">20/1</span> เส้นใหญ่ปานกลาง เหนียวน้อย
            เหมาะเส้นพุ่ง
          </li>
          <li>
            <span class="font-medium">40/2</span> เส้นกลาง เหนียวกว่า 20/1
            ใช้ได้ทั้งยืน–พุ่ง
          </li>
          <li>
            <span class="font-medium">60/2</span> เส้นเล็ก เหนียว
            ใช้เย็บทั่วไป/เส้นยืนผ้าฝ้ายเนื้อละเอียด
          </li>
          <li>
            <span class="font-medium">180/2</span> เส้นเล็กมาก
            เหมาะเย็บผ้าเนื้อบาง/เส้นยืน–พุ่งผ้าบาง
          </li>
        </ul>

        <!-- วิธีคำนวณ -->
        <h3
          id="calc"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          2) วิธีคำนวณที่จำเป็น
        </h3>

        <h4
          id="calc-reed"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.1 การหาจำนวนช่องฟันหวี (ฟืม/รีด)
        </h4>
        <p class="text-justify indent-8">
          วิธีชุมชนพื้นบ้านนิยม “นับเป็นหลบ” (1 หลบ = 40 ช่องฟันหวี)
          และหน่วยย่อย “ควม” (1 ควม = 4 ช่อง) ตัวอย่าง:
          <span class="whitespace-nowrap">ฟืม 21 หลบ 2 ควม</span>
          = (40×21) + (4×2) = 848 ช่องฟันหวี
        </p>
        <p class="text-justify indent-8">
          แบบอุตสาหกรรมจะใช้:
          <span class="font-medium">เบอร์ฟันหวี × หน้าผ้า (นิ้ว)</span>
          ตัวอย่าง ฟันหวีเบอร์ 50, หน้าผ้า 40 นิ้ว ⇒ 50×40 = 2,000 ช่อง
        </p>

        <h4
          id="calc-warp"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.2 การคำนวณจำนวนเส้นยืน / ความยาว / น้ำหนักเส้นไหม
        </h4>
        <p class="text-justify indent-8">
          ต้องทราบ (ก) จำนวนช่องฟันหวี (ข) ความยาวผ้า (ค) จำนวนเส้นต่อ 1 ช่อง
          (ง) เบอร์เส้นด้าย ตัวอย่างโจทย์:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            ฟันหวี = 2,000 ช่อง; เพิ่มความหนาริมด้านละ 10 ช่อง ⇒ รวมริม 20 ช่อง
          </li>
          <li>จำนวนเส้นต่อ 1 ช่อง = 2 เส้น</li>
          <li>เส้นไหม 20 ดีเนียร์</li>
          <li>หน้าผ้า 40 นิ้ว (กรณีคำนวณได้ 2,000 ช่องตามตัวอย่างข้างบน)</li>
          <li>
            ความยาวผ้าสำหรับคำนวณ
            <span class="font-medium">สมมุติ 20 เมตร</span> (หมายเหตุ:
            หากต้องการคำนวณที่ 16 เมตร ให้แทนค่าตามจริงได้)
          </li>
        </ul>

        <div >
          <p class="font-semibold">
            ตารางที่ 2.1 วิธีคำนวณหาจำนวนเส้นยืน (ตัวอย่าง)
          </p>
          <ol class="list-decimal list-inside mt-2 space-y-2 text-justify">
            <li>
              <span class="font-medium">จำนวนเส้นยืนทั้งหมด</span><br />
              = (จำนวนเส้น/ช่อง) × (จำนวนช่องทั้งหมด) + (ช่องริมทั้งสองด้าน)<br />
              = (2 × 2000) + 20 = <span class="font-medium">4,020 เส้น</span>
            </li>
            <li>
              <span class="font-medium">ความยาวเส้นยืนรวม</span><br />
              = จำนวนเส้นยืนทั้งหมด × ความยาวผ้า<br />
              = 4,020 × 20 m = <span class="font-medium">80,400 m</span>
            </li>
            <li>
              <span class="font-medium">น้ำหนักไหมที่ต้องใช้ (ดีเนียร์)</span
              ><br />
              = (ดีเนียร์ × ความยาว (m)) ÷ 9,000<br />
              = (20 × 80,400) ÷ 9,000 ≈
              <span class="font-medium">178.7 g</span> (≈ 0.179 kg)
            </li>
          </ol>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            หมายเหตุ: หากใช้ความยาว 16 m ให้แทนค่าเป็น 4,020 × 16 = 64,320 m ⇒
            น้ำหนัก ≈ 142.9 g
          </p>
        </div>

        <h4
          id="calc-warp-rounds"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.3 การหาจำนวนรอบ “เดินเส้นยืน”
        </h4>
        <p class="text-justify indent-8">
          ขึ้นกับความยาวหลักผือ/ม้าเดินเส้น และจำนวนหลอด (อัก) ที่ใช้:
          หลักผือยาว–หลอดมาก ⇒ เดินรอบน้อย; หลักผือสั้น–หลอดน้อย ⇒
          ต้องเดินรอบมาก
        </p>

        <!-- ฟอก/ย้อมเส้นใย -->
        <h3
          id="scour-dye"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          3) การฟอกและการย้อมเส้นใย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยดิบ (ฝ้าย/ไหม) ต้องฟอก–ย้อมก่อนทอ ด้วยเหตุผลหลัก (1)
          ทำให้เส้นใยนุ่มพร้อมทอ (2) สร้างสีสันตอบโจทย์การออกแบบลวดลาย
          ขั้นตอนแบ่งตามชนิดเส้นใย ดังนี้
        </p>

        <h4
          id="degumming-cottonclean"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3.1 การลอกกาวไหม และการทำความสะอาดเส้นฝ้าย
        </h4>
        <p class="text-justify indent-8">
          เส้นไหมเป็นใยโปรตีนธรรมชาติที่ได้จากรังไหม ประกอบไปด้วยส่วนเส้นใย
          และส่วนของกาวไหมเคลือบเส้นใย ซึ่งจะมีอยู่ประมาณ 25 % ของน้ำหนักไหมดิบ
          กาวไหมจะมีสิ่งเจือปน เช่น ขี้ผึ้ง ไขมัน
          ซึ่งสามารถละลายได้ในสบู่ร้อนและด่าง
          ส่วนเส้นใยฝ้ายก็มีน้ำมันและสิ่งสกปรก
          ที่เกิดจากการทำเส้นใยเจือปนอยู่เช่นกัน
          การลอกกาวไหมและการทำความสะอาดเส้นฝ้าย
          ทำเพื่อให้เหลือส่วนที่เป็นเฉพาะเส้นใยที่มีความนุ่มละเอียด
          โดยเฉพาะไหมจะมีความมันวาวสูงขึ้น
          โดยมีขั้นตอนการลอกกาวและการทำความสะอาดดังต่อไปนี้คือ
        </p>
        <ul class=" list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">1) ชั่งน้ำหนักเพื่อหาอัตราส่วนน้ำ</span> —
            เส้นไหมดิบ/ฝ้ายดิบ 1 ส่วน : น้ำ ~30 ส่วน (ขึ้นกับปริมาณกาว/สิ่งสกปรก
            เช่น ไหม 1 กก. ใช้น้ำ ~20–30 กก.)
          </li>
          <li>
            <span class="font-medium">2) อัตราส่วนสารเคมี</span><br />
            <p class="text-justify indent-12">• ไหม: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส (alkali) 1 g/L</p>
            <p class="text-justify indent-12">• ฝ้าย: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส 0.1 g/L</p>
          </li>
          <li>
            <span class="font-medium">3) ต้มลอกกาวและทำความสะอาดเส้นใยฝ้ายดังต่อไปนี้ ตามกระบวนการดังนี้
                </span>
          </li>
        </ul>
        <p class="text-justify indent-8">
            ตารางที่ 1 การลอกกาวเส้นไหมและการทำสะอาดเส้นฝ้าย
        </p>
        <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง1.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
      </section>
    </div>
  </div>

<div
    v-else-if="type === 'cloth11'"
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

  <div
    v-else-if="type === 'cloth12'"
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
          การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
        </h1>
      </header>

      <section
  class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
>
  <h2
    id="yarn-finishing"
    class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
  >
    การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
  </h2>

  <p class="text-justify indent-8">
    การตกแต่งเส้นด้ายยืนหรือเส้นด้ายพุ่ง “ควรทำหรือไม่” ขึ้นอยู่กับการใช้งานและลักษณะทางกายภาพของเส้นไหม/เส้นด้าย
    จุดมุ่งหมายหลักมีสองแบบคือ (ก) ให้เส้นเรียบ อยู่ตัว และลื่น เพื่อทอได้ไหลลื่นบนฟันหวี–ตะกอ และ (ข) ให้สัมผัสนุ่มลื่น
    ทั้งนี้ช่างทอใช้ดุลยพินิจและทักษะในการเลือกสูตรที่เหมาะสม
  </p>

  <h3
    id="finishing-goals"
    class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
  >
    วัตถุประสงค์และแนวทางเลือกสารตกแต่ง
  </h3>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>
      <span class="font-medium">ต้องการให้ “เรียบ–อยู่ตัว–ลื่น”</span>:
      ผสมน้ำยาอัดกลีบลงในน้ำแป้งที่ใช้เคลือบเส้น (สูตรแม่บ้าน/ชุมชน) อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">ต้องการให้ “นุ่ม–ลื่น”</span>:
      แช่เส้นด้ายในน้ำยาปรับผ้านุ่ม อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">กรณีใช้ “ไหมเปลือกนอก” เป็นเส้นพุ่ง (ไม่ตีเกลียว)</span>:
      ควรแช่ในน้ำยารีดผ้าเรียบ อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span> เพื่อลดการแตกฟูและช่วยให้ไหลลื่นขณะพุ่ง.
    </li>
  </ul>
  <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ไหมเปลือนอก.jpg"
            alt="ไหมเปลือกนอก"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ไหมเปลือกนอก
        </p>
  <h4
    id="finishing-steps"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    ขั้นตอนแนะนำแบบสั้น
  </h4>
  <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
    <li>ผสมสารตามอัตราส่วนที่เลือกในน้ำสะอาด คนให้เข้ากัน</li>
    <li>แช่เส้นด้ายให้ชุ่ม ทิ้งไว้ 5–15 นาที (ขึ้นกับขนาดเส้น/ความหนา)</li>
    <li>ยกขึ้นบีบหมาด จัดเส้นให้เรียงไม่พันกัน</li>
    <li>ผึ่งในที่ร่ม อากาศถ่ายเท จนแห้งพอดี (ไม่ตากแดดจัดเพื่อลดการกรอบ)</li>
  </ol>

  <h4
    id="finishing-notes"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    หมายเหตุการใช้งาน
  </h4>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>ทดสอบกับเส้นปริมาณเล็กน้อยก่อนผลิตจริง เพื่อดูผลความลื่น ความอยู่ตัว และการเข้ากันของสี</li>
    <li>อย่าใส่สารตกแต่งมากเกินไป เพราะอาจเกิดคราบสะสม ทำให้ฟันหวี–ตะกอเหนียว และเส้นขาดง่าย</li>
    <li>เลือกสูตรต่างกันระหว่าง “เส้นยืน” (เน้นความทน–อยู่ตัว–ลื่นผ่านตะกอ) กับ “เส้นพุ่ง” (เน้นไหลลื่นและผิวสัมผัส)</li>
    <li>หากจะย้อมสีหลังตกแต่ง ควรล้างออกให้เหมาะสมเพื่อลดผลกระทบต่อการติดสี</li>
  </ul>
</section>

    </div>
  </div>

  <div
    v-else-if="type === 'cloth13'"
    class="min-h-screen bg-gradient-to-br bg-[#ddcbe9] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-[#b14614] dark:text-white tracking-tight"
        >
          กระบวนการทอผ้าเขมรบุรีรัมย์
        </h2>
      </div>
      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white">
          เทคโนโลยีและนวัตกรรมในการทอผ้า
        </p>

        <p class="mb-4 text-justify indent-8">
          กระบวนการทอผ้าเขมรบุรีรัมย์
          เทคโนโลยีและนวัตกรรมเป็นสิ่งที่เกิดขึ้นพร้อมกับกระบวนการทอผ้า
          และการเรียนรู้เรื่องการทอผ้า เป็นเทคโนโลยีที่เหมาะสมกับพื้นที่
          สิ่งแวดล้อม
          และพฤติกรรมการใช้ของผู้คนแต่ละพื้นที่มีเทคโนโลยีที่แตกต่างกันไปตามความถนัด
          ในจังหวัดบุรีรัมย์ถ้าพูดถึงแค่ประเภทของกี่ทอผ้ามีอยู่ถึง
          <span class="font-bold">3 ชนิด</span>
          ไม่รวมรายละเอียดย่อย เช่น ขนาดโครงสร้าง วัสดุที่ใช้ผลิต
          และศิลปะในการสร้างกี่ เป็นต้น
          แต่ละขั้นตอนในการทอผ้ามีเทคโนโลยีและนวัตกรรมที่จัดหมวดหมู่ได้คือ
          <span class="font-bold"
            >กระบวนการผลิตเส้นใย การฟอกย้อมเส้นใย และการทอผ้า</span
          >
          มีรายละเอียด ดังนี้
        </p>
        <!-- หัวข้อย่อย: ผลิตเส้นใย -->
        <p class="text-xl font-semibold text-purple-700 mt-6">
          เทคโนโลยีและนวัตกรรมในกระบวนการผลิตเส้นใย
        </p>

        <p class="mb-4 text-justify indent-8 leading-relaxed">
          เป็นกระบวนการต้นน้ำ ชาวบ้านในจังหวัดบุรีรัมย์จะปลูกหม่อน
          เลี้ยงไหมซึ่งเป็นความรู้ที่ตกทอดกันมานานมากตั้งแต่บรรพบุรุษ
          เทคโนโลยีในการปลูกหม่อนเลี้ยงไหมเป็นเทคโนโลยีที่ไม่ซับซ้อน
          ใช้การสังเกตพฤติกรรม การใช้งานสร้างเทคโนโลยีขึ้นมา เช่น
          รังไหมสำหรับให้หนอนไหมชักใย ชาวบ้านจะนำกิ่งไม้ที่มีกิ่งก้านเล็ก ๆ
          ละเอียดมารวบหัวท้ายเข้าด้วยกัน
          มีไม้เป็นตะขอไว้เกาะกับราวเพื่อห้อยรังสำหรับให้หนอนไหมซักใย
          ก่อนนำไปให้หนอนไหมชักใย ต้องใช้ไม้ปั่นเส้นใยเล็ก ๆ ที่ติดอยู่ให้สะอาด
          นำไปผึ่งแดดจัดเพื่อฆ่าเชื้อโรค จึงนำมาให้หนอนไหมทำรังไหมได้
          ชาวบ้านจะระวังเรื่องความสะอาดอย่างมาก
          เนื่องจากหนอนไหมเป็นสัตว์ที่อ่อนแอมาก ชาวบ้านเรียกหนอนไหมว่า
          <span class="font-bold">“โกนเนียง”</span>
          <span class="font-bold">“โกน”</span> หมายถึง ลูก
          <span class="font-bold">“เนียง”</span> เป็นชื่อเรียกผู้หญิงอย่างสุภาพ
          หรือน่าเอ็นดู น่าทะนุถนอม “โกนเนียง” จะแปลว่า
          <span class="italic">“ลูกสาวที่ควรค่าแก่การทนุถนอม”</span>
          คือการปลูกหม่อนเลี้ยงไหมต้องใช้เทคโนโลยีหรือนวัตกรรมการเลี้ยงที่ประณีต
          น่ารัก และน่าทะนุถนอม
        </p>

        <br />
        <!-- บรรทัดอ้างถึงภาพ เก็บเป็นข้อความตามต้นฉบับ -->
        <div class="flex justify-center gap-4">
          <div class="sm:col-span-3 text-center">
            <img
              src="/assetts/css/image/สวนหม่อนข้างบ้าน.jpg"
              alt="Home Illustration"
              class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
            />
            <p class="italic">ภาพที่ 1 สวนหม่อนข้างบ้าน</p>
          </div>
          <div class="sm:col-span-3 text-center">
            <img
              src="/assetts/css/image/หนอนไหม.jpg"
              alt="Home Illustration"
              class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
            />
            <p class="italic">ภาพที่ 2 หนอนไหมพันธุ์นางน้อย</p>
          </div>
          <div class="sm:col-span-3 text-center">
            <img
              src="/assetts/css/image/อาหารหนอนไหม.jpg"
              alt="Home Illustration"
              class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
            />
            <p class="italic">ภาพที่ 3 การให้อาหารหนอนไหม</p>
          </div>
        </div>
        <br />
        <p class="mb-4 text-justify indent-8">
          หลังจากเตรียมรังสำหรับหนอนไหมสะอาดเรียบร้อยแล้วจะโรยหนอนไหมที่สุกแล้วกระจายให้ทั่วถึง
          หนอนจะเลือกเกาะเกี่ยวกับกิ่งไม้ที่เหมาะ
          และจึงเริ่มชักใยจากด้านนอกเข้าหาตัวเองอย่างมีความสุขเป็นรังไหม
          เพื่อลอกคราบเปลี่ยนตัวเองเป็นผีเสื้อเพื่อผสมพันธุ์ ออกไข่เป็นหนอน
          กินใบไม้จนตัวเองแก่สุก ทำรังห่อหุ้มตัวเอง
          เพื่อกลายร่างเป็นผีเสื้อเป็นวัฏจักร
          นอกจากเทคโนโลยีเพื่อให้ได้มาซึ่งรังไหมสำหรับการสาวไหมก็เข้าสู่กระบวนการสาวเป็นเส้นไหม
          เทคโนโลยีและเครื่องมือที่ใช้ในการสาวไหมเป็นเครื่องมือที่ใช้ในกระบวนการต่อไปนี้คือ
        </p>

        <!-- ลิสต์ตามต้นฉบับ -->
        <div class="space-y-4">
          <div>
            <p class="font-semibold">1.ส่วนของการเตรียมรังไหม มีดังนี้</p>
            <ol class="list-decimal ml-6 space-y-1">
              <li>ตากรังไหมให้เส้นใยฟู</li>
              <div class="mt-4 flex justify-center gap-4">
                <img
                  src="/assetts/css/image/ตากรังไหม.png"
                  alt="Home Illustration"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                />
              </div>
              <p class="justify-center text-center italic">
                ภาพที่ 4 ตากรังไหมให้เส้นใยฟู
              </p>
              <li>ดึงสิ่งสกปรกออกจากรังไหมพักรอไว้</li>
            </ol>
            <div class="mt-4 flex justify-center gap-4">
              <img
                src="/assetts/css/image/ดึงสิ่งสกปรกออกจากรังไหม.jpg"
                alt="Home Illustration"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="justify-center text-center italic">
              ภาพที่ 5 การดึงสิ่งสกปรกออกจากรังไหม
            </p>
          </div>

          <div>
            <p class="font-semibold">2. ส่วนเครื่องมือและอุปกรณ์</p>
            <ol class="list-decimal ml-6 space-y-1">
              <li>เตาฟืนหรือเตาถ่าน</li>
              <li>ใส่น้ำสะอาดในหม้อทรงสูงปากบานสำหรับนึ่งข้าว ยกขึ้นตั้งไฟ</li>
              <li>ประกอบอุปกรณ์การสาวเส้นใยไหม ยึดให้แข็งแรง</li>
              <li>
                รอน้ำร้อนเป็นไอ (ไม่เดือด) ประมาณ 70 องศาเซลเซียส
                ชาวบ้านเรียกว่าประมาณน้ำลวกไก่ร้อน ๆ
              </li>
              <li>
                ใส่รังไหมลงไปประมาณ 40–50 รัง
                ใช้ไม้ที่มีปลายผ่าเป็นร่องสองร่องเพื่อให้เส้นใยลอดผ่าน
                กดรังไหมให้ท่วมน้ำเล็กน้อย
              </li>
              <li>
                มือซ้ายดึงเส้นใยขึ้นบางส่วน
                มือขวาใช้ไม้สาวไหมกดรังไหมส่ายไปมาเล็กน้อย
                เพื่อให้ใยไหมหลุดออกจากรังง่ายขึ้น
              </li>
              <li>
                นำเส้นใยพันรอบวงล้อพันเกลียว 5–10 รอบ ผ่าไปทีละวงล้อ
                เครื่องมือดั้งเดิมจะมีวงล้อเดียว ปัจจุบันมี 3 วงล้อ
                เป็นการพัฒนาเครื่องมือเพื่อให้สาวเส้นใยได้กลมเรียบขึ้น
                สม่ำเสมอขึ้น ลดขั้นตอนการตีเกลียว
              </li>
              <li class="space-y-2">
                <div>ดึงเส้นใยทิ้งลงตะกร้าเป็นชั้น ๆ</div>
                <figure class="mt-4">
                  <img
                    src="/assetts/css/image/สาวเส้นใยใส่ตะกร้า.jpg"
                    alt="การดึงสิ่งสกปรกออกจากรังไหม"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                  />
                  <figcaption class="text-center italic mt-2">
                    ภาพที่ 6 สาวเส้นใยใส่ตะกร้า
                  </figcaption>
                </figure>
              </li>

              <li class="space-y-2">
                <div>
                  กวักเส้นใยขึ้นกงจัดเรียงเส้นใยเป็นรูปตาข่าย เขมรจะนับเส้น
                  กวักได้ 4 รอบนับเป็น 1 หน่วย กวักทั้งหมด 100 หน่วย เรียกไหม
                  100 จะพุ่งเส้นพุ่งได้ผ้าหนึ่งผืน ยาว 7 ศอก ปัจจุบันใช้กะเอา
                  โดยมีน้ำหนักเฉลี่ยประมาณ 70–100 กรัม
                  เนื่องจากกงกวักไหมมีขนาดเล็กลง
                </div>
                <figure class="mt-4">
                  <video
                    src="/assetts/css/video/IMG_1560-new.mp4"
                    autoplay
                    muted
                    playsinline
                    loop
                    class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
                  >
                    เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                  </video>
                  <figcaption class="text-center italic mt-2">
                    กวักเส้นใยขึ้นกงจัดเรียงเส้นใยเป็นรูป
                  </figcaption>
                </figure>
              </li>
              <li class="space-y-2">
                <div>ตากให้แห้ง เก็บเป็นใจสำหรับใช้ทอผ้าต่อไป</div>
                <div class="mt-4 flex justify-center gap-6">
                  <figure class="w-1/2">
                    <img
                      src="/assetts/css/image/เส้นใยไปผึ่งแดดให้แห้งสนิท.jpg"
                      alt="การดึงสิ่งสกปรกออกจากรังไหม"
                      class="rounded-2xl shadow-lg object-cover w-full h-auto"
                    />
                    <figcaption class="text-center italic mt-2">
                      ภาพที่ 7 การนำเส้นใยไปผึ่งแดดให้แห้งสนิท
                    </figcaption>
                  </figure>
                  <figure class="w-1/2">
                    <img
                      src="/assetts/css/image/ไหมพันธุ์พื้นบ้าน.jpg"
                      alt="การดึงสิ่งสกปรกออกจากรังไหม"
                      class="rounded-2xl shadow-lg object-cover w-full h-auto"
                    />
                    <figcaption class="text-center italic mt-2">
                      ภาพที่ 8 ไหมพันธุ์พื้นบ้านชื่อ “นางน้อย”
                    </figcaption>
                  </figure>
                </div>
              </li>
            </ol>
          </div>
        </div>
        
     </div> 
    </div>
  </div>

  <div
    v-else-if="type === 'cloth14'"
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
      <!-- หัวข้อหลัก -->
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          กระบวนการทอผ้ามีเครื่องมือและอุปกรณ์ที่สำคัญ
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          เครื่องมือและอุปกรณ์ที่สำคัญในการทอผ้า
        </p>

        <p class="mb-6">
          ในกระบวนการทอผ้ายังมีเครื่องมือและอุปกรณ์ที่สำคัญดังต่อไปนี้ คือ
        </p>

        <p class="font-semibold">เครื่องมือและอุปกรณ์ในการเตรียมเส้นยืน</p>
            <p class="mt-2">
              ได้แก่ ไน ระวิง ม้าเดินด้าย หลอดด้าย ฟันหวี เครื่องหวีด้าย
              ไม้เรียว ไม้คนัด ด้ายเก็บตะกอ และเครื่องมือเบ็ดเตล็ดอื่น ๆ
              เครื่องมือแต่ละชนิดจะมีหน้าที่แตกต่างกัน ดังนี้
            </p>
        <ol class=" ml-6 space-y-4">
          <li>

            <!-- ระดับที่ 1 (เลขอัตโนมัติ) -->
            <ol class="list-decimal ml-6 mt-4 space-y-6">
              <li>
                <p class="font-medium">ระวิง และอัก (ใช้คู่กัน)</p>
                <p class="mt-1">
                  ทำหน้าที่นำและจัดเรียงเส้นไหมออกจากใจไหม เพื่อนำไปค้นเส้นยืน
                  ค้นเส้นพุ่งสำหรับมัดหมี่ หรือกรอเข้ากระสวยเส้นพุ่งต่อไป
                </p>
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/ระวิง.jpg"
                    alt="ระวิงและอักสำหรับกวักเส้นไหม"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-[100%] h-[100%]"
                  />
                </div>
                <p class="text-center italic mt-2">
                  ภาพที่ 1 ระวิงและอักสำหรับกวักเส้นไหม
                </p>
              </li>

              <li>
                <p class="font-medium">
                  ม้าเดินด้าย
                  (ใช้คู่กับราวตั้งหลอดด้าย/อักกวักด้าย/หลอดกรอขนาดใหญ่)
                </p>
                <p class="mt-1">
                  อุปกรณ์ที่ใช้ร่วมกันขึ้นกับความชำนาญและความถนัด
                  หลักการคือหลอดหรืออักหรือราวตั้งหลอดต้องวางได้ในแนวตั้ง
                  เพื่อดึงเส้นด้ายออกมาได้จำนวนมาก (อาจตั้งเฉียง ~15°
                  ได้ตามสภาพพื้นที่) แล้วดึงเส้นด้ายผ่านราวอีกครั้ง
                </p>
              </li>

              <li>
                <p class="font-medium">ฟันหวี และหัวม้วนเส้นยืน</p>
                <p class="mt-1">
                  ใช้เรียงเส้นด้ายเข้าฟันหวีตามลำดับ และคัดแยกเส้นยืนออกเป็น 2
                  ตับ เพื่อให้เกิดช่องเปิดตะกอสำหรับให้เส้นพุ่งวิ่งผ่าน
                  แต่ละชุมชนเลือกใช้เครื่องมือที่ถนัดแตกต่างกัน
                  โดยยังให้ผลการทอผ้าที่ไม่ต่างกันนัก
                </p>
                <div class="mt-4 flex justify-center">
                  <img
                    src="/assetts/css/image/ร้อยฟันหวี หวีเส้นยืน.jpg"
                    alt="ร้อยฟันหวี หวีเส้นยืน และม้วนหัวม้วนเส้นยืน"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-300 h-auto"
                  />
                </div>
                <p class="text-center italic mt-2">
                  ภาพที่ 2 ร้อยฟันหวี หวีเส้นยืน และม้วนหัวม้วนเส้นยืน
                </p>
              </li>

              <li>
                <p class="font-medium">อุปกรณ์ในการทอผ้า</p>
                <p class="mt-1">
                  อุปกรณ์หลักที่จำเป็นคือ “กี่” และ “กระสวย”
                  ส่วนอุปกรณ์อื่นจะใช้ร่วมกับกิจกรรมช่วงอื่น เช่น
                  การกรอด้ายพุ่งใช้ชุดกรอด้าย เป็นต้น
                  ในจังหวัดบุรีรัมย์มีกี่ทอมือหลายแบบ เช่น กี่มือแบบโบราณ กี่มือ
                  และกี่กระตุก
                </p>

                <!-- รูปเรียงแนวตั้ง -->
                <div class="grid grid-cols-1 gap-6 place-items-center">
                  <div class="text-center">
                    <img
                      src="/assetts/css/image/กี่มือ1.jpg"
                      alt="กี่มือแบบโบราณ"
                      class="rounded-2xl shadow-lg object-cover max-w-md w-300 h-auto"
                    />
                    <p class="italic mt-2">ภาพที่ 3 กี่มือแบบโบราณ</p>
                  </div>
                  <div class="text-center">
                    <img
                      src="/assetts/css/image/กี่มือ.jpg"
                      alt="กี่มือ"
                      class="rounded-2xl shadow-lg object-cover max-w-md w-300 h-auto"
                    />
                    <p class="italic mt-2">ภาพที่ 4 กี่มือ</p>
                  </div>
                  <div class="text-center">
                    <img
                      src="/assetts/css/image/กี่กระตุก.jpg"
                      alt="กี่กระตุก"
                      class="rounded-2xl shadow-lg object-cover max-w-md w-300 h-auto"
                    />
                    <p class="italic mt-2">ภาพที่ 5 กี่กระตุก</p>
                  </div>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  </div>


  
</template>
