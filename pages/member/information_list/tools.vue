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

