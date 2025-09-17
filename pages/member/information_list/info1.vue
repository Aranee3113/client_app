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
</template>
