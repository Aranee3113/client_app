<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { MapPin } from "lucide-vue-next";

const { $axios } = useNuxtApp();

const posts = ref([]);
const loading = ref(true);
const error = ref("");

// แปลง images ให้เป็นอาร์เรย์
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
  fetchPosts();
});
</script>

<template>
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

