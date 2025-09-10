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
      <div class="mb-8 text-center">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ผ้าซิ่นหมี่ และโฮลเปราะห์
        </h2>
      </div>
      

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          คุณลักษณะของผ้า
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
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่1.jpg"
              alt="ผืนผ้ามัดหมี่ลายปะกากรองสะนัน"
              class="rounded-2xl shadow-lg object-cover w-full h-[300px]"
            />
            <p class="italic mt-2">ภาพที่ 1 ผืนผ้ามัดหมี่ลายปะกากรองสะนัน</p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่2.jpg"
              alt="ผ้ามัดหมี่ลายปะกากะยอม"
              class="rounded-2xl shadow-lg object-cover w-full h-[300px]"
            />
            <p class="italic mt-2">ภาพที่ 2 ผ้ามัดหมี่ลายปะกากะยอม</p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่3.jpg"
              alt="ผ้าโฮลเปราะห์จกขิดดาว ลายดอกดาวเรือง"
              class="rounded-2xl shadow-lg object-cover w-full h-[300px]"
            />
            <p class="italic mt-2">
              ภาพที่ 3 ผืนผ้าโฮลเปราะห์จกขิดดาว<br />ลายดอกดาวเรือง
            </p>
          </div>
        </div>
        <br />
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าซิ่นหมี่ และโฮลเปราะห์
        </p>
        <div class="grid grid-cols-3 gap-8 items-start">
          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่4.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 4 การแต่งกายผู้หญิง<br />ด้วยผ้าซิ่นหมี่และโฮลเปราะห์
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่5.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 5 การแต่งกายผู้หญิง<br />ด้วยผ้าซิ่นหมี่และโฮลเปราะห์
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่6.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 6 การแต่งกายผู้หญิง<br />ด้วยผ้าซิ่นหมี่และโฮลเปราะห์
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
