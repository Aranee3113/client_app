<script setup lang="ts">
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const token = useCookie<string | null>("token");

const products = ref<any[]>([]);
const posts = ref<any[]>([]);
const route = useRoute();
const loading = ref(true);
const error = ref("");
const userId = route.params.id;

/* ---------- fetch product ---------- */
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

/* ---------- helper images ---------- */
const normalizeImages = (raw: any) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* ---------- fetch post ---------- */
const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post");
    const rows = res.data?.data || [];
    posts.value = rows.map((p: any) => ({
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
</template>
