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
          อัตลักษณ์ผ้าเขมรในยุคนี้
        </h2>
      </div>

      <!-- เนื้อหา (ข้อความล้วน ไม่มีภาพ) -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ลักษณะที่ผู้เชี่ยวชาญเลือกใช้ในลวดลายผ้าเขมร
        </p>

        <p class="mb-4">
          ลวดลายที่ช่างทอชาติพันธุ์เขมรผู้เชี่ยวชาญเลือกใช้ มักมีลักษณะดังนี้
        </p>
        <ol class="list-decimal ml-6 space-y-2">
          <li>โครงสร้างลวดลายละเอียด เล็ก</li>
          <li>ใช้สีเหลืองเข้ม แดงเข้ม เขียวเข้ม และมีสีขาวประปราย</li>
          <li>เนื้อผ้าเรียบเนียน มันวาว</li>
        </ol>

        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white mt-8 mb-4"
        >
          อัตลักษณ์ผ้าเขมรในยุคนี้
        </p>
        <p class="mb-4">
          จากลักษณะข้างต้น สามารถสรุปอัตลักษณ์ผ้าเขมรในยุคนี้ได้ว่า
        </p>
        <ol class="list-decimal ml-6 space-y-3">
          <li>ให้สีสันตัดกันและมักใช้ตั้งแต่ 3 สีขึ้นไป</li>
          <li>สีสันโดยรวมของผ้ามองเห็นเป็นสีทองอร่าม</li>
          <li>มีความเงางาม</li>
          <li>ใช้เส้นใยไหมสำหรับผ้าพิเศษมากกว่าเส้นใยชนิดอื่น</li>
          <li>
            ทอผ้าสำหรับใช้เป็นผ้านุ่ง ผ้าตัดชุดทำงานทั้งหญิงชาย
            และผ้าเอนกประสงค์ ขนาดประมาณ 40–75 × 200–250 เซนติเมตร เพื่อใช้พันคอ
            คลุมไหล่ ห่มสไบ หรือผูกเอวมากขึ้น เนื่องจากขายง่าย ทำได้เร็ว
            และใช้ได้หลากหลาย
          </li>
        </ol>
        <div class="mb-6 text-center">
          <p
            class="text-2xl font-extrabold text-purple-800 dark:text-white mt-8 mb-4"
          >
            อัตลักษณ์ผ้าเขมร
          </p>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <figure class="text-center">
            <img
              src="/assetts/css/image/สไบเลือกเจือยย.jpg"
                alt="สไบเลือกเจือยย"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 1 สไบเลือกเจือยย
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/การ.jpg"
                alt="การสีสันแบบสีตรงกันข้าม มีสีขาวประปรายในผ้าโสร่งและสไบเลือกเจือยย"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 2 สีตรงกันข้ามมีสีขาว<br />
                ประปรายในผ้าโสร่งและสไบเลือกเจือยย
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ซิ่นหมีลายตีนตุ๊กแก.jpg"
                alt="ซิ่นหมีลายตีนตุ๊กแก"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 3 ซิ่นหมีลายตีนตุ๊กแก
            </figcaption>
          </figure>

          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าโฮลลายโฮลตะหลบ.jpg"
                alt="ผ้าโฮล ลายโฮลตะหลบ"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 4 ผ้าโฮล ลายโฮลตะหลบ
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายซะมอ.jpg"
                alt="ผ้าลายซะมอ"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 5 ผ้าลายซะมอ
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายอัมปรม.jpg"
                alt="ผ้าลายอัมปรม"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 6 ผ้าลายอัมปรม
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/ผ้าลายซะคู.jpg"
                alt="ผ้าลายซะคู"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 7 ผ้าลายซะคู
            </figcaption>
          </figure>
          <figure class="text-center">
            <img
              src="/assetts/css/image/เส้นยืนเส้นพุ่งต่างสีกัน.jpg"
                alt="ผ้าพื้นที่ใช้เส้นยืนเส้นพุ่งต่างสีกัน"
              class="rounded-2xl shadow-lg object-cover w-full h-[350px]"
            />
            <figcaption class="italic mt-2">
              ภาพที่ 8 ผ้าพื้นที่ใช้เส้นยืนเส้นพุ่งต่างสีกัน
            </figcaption>
          </figure>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
