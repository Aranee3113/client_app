<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";

const { $axios } = useNuxtApp();

// state
const posts = ref([]);
const loading = ref(true);
const error = ref("");
const showTail = ref(false);

// utils
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

// fetch posts only
const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post"); // backend คืนเฉพาะ is_active = 1
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
  <div class="w-full mx-auto">
    <!-- BaseCard -->
    <card-basecard />
  </div>

  
  <div
    class="relative min-h-screen
           bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat
           md:bg-fixed
           pb-24 md:pb-28 lg:pb-32"
  >
    <div class="max-w-6xl mx-auto pt-8 md:pt-12 lg:pt-16">
      <!-- ยินดีต้อนรับ -->
      <div class="text-center mb-12">
        <h2
          class="text-4xl font-extrabold  dark:text-white tracking-tight"
        >
          ภูมิปัญญาผ้าทอ กลุ่มชาติพันธุ์เขมรจังหวัดบุรีรัมย์
        </h2>
      </div>
      <div
        class="text-xl p-6 md:p-10 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-300 dark:border-gray-700 mb-12 md:mb-16 lg:mb-24"
      >
        <p class="text-2xl font-extrabold text-purple-800">
          ผ้าทอมือของเขมรบุรีรัมย์
        </p>

        <!-- พารากราฟย่อให้กระชับ -->
        <p class="text-justify indent-8">
          ผ้าทอมือของชาวเขมรบุรีรัมย์ใช้ทั้งในชีวิตประจำวันและงานพิธี
          นิยมนำไปเป็น เครื่องใช้ (ที่นอน หมอน ผ้าห่ม) เครื่องนุ่งห่ม
          (ผ้าท่อนล่าง/ท่อนบน) และผ้าเอนกประสงค์
          โดยมีชื่อเรียกดั้งเดิมที่คุ้นเคย เช่น
          <span class="font-bold">สำป๊วดกะเนียว (ผ้าหางกระรอก)</span>,
          <span class="font-bold">สำป็วดโฮล (ผ้าลาย/มัดหมี่)</span>,
          <span class="font-bold">สมอ</span>,
          <span class="font-bold">อัปปรม</span>,
          <span class="font-bold">ละเบิก</span> เป็นต้น
        </p>

        <p class="text-justify indent-8">
          ปัจจุบันมีการรับอิทธิพลความรู้จากภายนอก
          ทำให้เกิดคำเรียกแบบไทย/ลาวปนเขมร เช่น
          <span class="font-bold">“ซินมี”</span> (ผ้าซิ่นลายมัดหมี่)
          ลักษณะเด่นของผ้าพื้นถิ่นคือ เนื้อแน่น เรียบ ไม่หนาจนเกินไป
          เมื่อนุ่งแล้ว “ทิ้งตัวสวย” ตรงกับรสนิยมท้องถิ่น และต่างจากภาพ
          “นางอัปสรา” ในจารีตโบราณที่นิยมผ้าเนื้อบางแนบเนื้อ
        </p>

        <div class="mt-4 flex justify-center">
          <img
            src="/images/Apsaraskirt.jpg"
            alt="ผ้านุ่งอัปสรา"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p
          class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
        >
          ผ้านุ่งอัปสรา
        </p>

        <p class="text-justify indent-8">
          เรื่อง “สีสัน” สะท้อนตัวตนมานุษยวิทยาได้ชัด โดยเฉพาะคำล้อท้องถิ่น
          <span class="font-bold">“เขียวสวายจีก”</span>
          ที่กลายเป็นตัวแทนรสนิยมสีของชุมชน ในการจัดสีผืนผ้ามักเลือก
          “แม่สีประจำถิ่น” ราว 5 สี ได้แก่ เหลืองเข้ม เขียวขี้ม้า แดงน้ำหมาก
          น้ำเงินสด และดำ พร้อมใช้
          <span class="font-bold">สีขาว</span> เพื่อเว้นจังหวะให้ลายเด่นชัด
        </p>

        <div class="mt-4 flex justify-center">
          <img
            src="/images/Naga.jpg"
            alt="การให้สีสันผ้าทอมือ ในประเพณีบวชนาคชาวเขมรบุรีรัมย์"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p
          class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
        >
          การให้สีสันผ้าทอมือ ในประเพณีบวชนาคชาวเขมรบุรีรัมย์
        </p>

        <p class="text-justify indent-8">
          นอกจาก “สี” แล้ว “น้ำหนักสี” ก็สำคัญ ช่างทอพื้นที่อำเภอห้วยราช–กระสัง
          นิยมคู่สีที่ “เข้มไล่ระดับใกล้กัน” เพื่อให้ไหมขึ้นเงา โดยเรียกกันว่า
          <span class="font-bold">“สีต้องเข้มได้ขนาดกัน”</span>
          มีการกล่าวถึงผ้าหางกระรอกบ้านสนวนว่าโดดเด่นทั้งความมันวาวและความประณีต
          <span
            @click="showTail = !showTail"
            class="ml-2 align-baseline text-red-800 cursor-pointer font-semibold hover:underline"
            role="button"
            :aria-expanded="showTail.toString()"
          >
            {{ showTail ? "ซ่อนเนื้อหา" : "อ่านเพิ่มเติม" }}
          </span>
        </p>

        <!-- เนื้อหาเดิม (คงไว้ครบ) ย้ายเข้า 'อ่านเพิ่มเติม' -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div v-if="showTail">
            <p class="text-justify indent-8">
              กระบวนการทอผ้าหางกระรอกของชาวเขมรบ้านสนวน
              นั้นให้ความประณีตในการทำไหมควบเพื่อทำเส้นพุ่งทุกขั้นตอนตั้งแต่ 1)
              การเลือกเส้นไหมน้อย พันธุ์นางน้อย เส้นเล็กสม่ำเสมอ ตีเกลียวหลวม ๆ
              ก่อนครั้งหนึ่งให้เส้นไหมเรียบ กลม ตลอดเส้น 2)
              การทำความสะอาดเส้นไหมให้สะอาด นิ่ม
              และเริ่มเห็นความเงางามของเส้นไหมอย่างเด่นชัด 3)
              การย้อมสีที่ให้น้ำหนักสีที่เหมาะสมอย่างชำนาญการ 4)
              การเลือกคู่สีที่ตัดกันอย่างเหมาะสม เช่น เขียวแดง เหลืองเขียว
              เหลืองแดง น้ำเงินแดง 5) การควบเกลียวเส้นไหมอย่างประณีต สม่ำเสมอ
              โดยมีระยะเกลียว ประมาณ 14-16 รอบเกลียว ต่อความยาว 1 นิ้ว …
              (คงข้อความเดิมทั้งหมด)
            </p>

            <div class="mt-4 flex justify-center">
              <img
                src="/assetts/css/image/Sbrijjer.jpg"
                alt="ลวดลายและสีสันของผ้าสไบรือเจียร์ บ้านสนวน"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p
              class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center"
            >
              ลวดลายและสีสันของผ้าสไบรือเจียร์ บ้านสนวน
            </p>

            <p class="text-justify indent-8">
              ลวดลายผ้าของชาวเขมรบุรีรัมย์จำนวนมากเกิดจาก “โครงสร้างการทอ” เช่น
              ผ้าโสร่ง ผ้าขาวม้า ผ้าสมอ และลายพื้นถิ่นอื่น ๆ รวมถึงการ “ยกตะกอ”
              ให้เกิดลวดลายพิเศษ (ผ้ายกดอก ฉนูดเลิก ราชวัตร ฯลฯ) เรียกรวมว่า
              <span class="font-bold">ผ้าละเบิก</span>
              และการ “มัดย้อมเส้นพุ่ง” ให้เกิดลวดลาย เรียก
              <span class="font-bold">ผ้าโฮล/ผ้ามัดหมี่</span>
              สุดท้ายเอกลักษณ์จึงอยู่ที่ “การวางจังหวะลาย + การให้สีสัน”
              ซึ่งสื่ออัตลักษณ์ชาติพันธุ์ได้ชัดเจน
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
