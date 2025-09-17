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
</template>
