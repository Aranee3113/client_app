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
</template>
