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
</template>

