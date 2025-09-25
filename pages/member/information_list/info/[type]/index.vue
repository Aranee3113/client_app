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
    v-if="type === 'info1'"
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

  <div
    v-else-if="type === 'info2'"
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
          วัฒนธรรมผ้าทอมือ
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
          ผ้าทอมือ
        </h2>

        <!-- บริบทและความหมาย -->

        <p class="text-justify indent-8">
          เป็นวัฒนธรรมในหมวดหมู่ของกิจกรรมเพื่อการยังชีพภายใต้ความต้องการปัจจัยสี่เพื่อการดำรงชีวิตและสืบทอดเผ่าพันธุ์
          และเนื่องจากการทอผ้าเป็นวัฒนธรรมเพื่อการดำรงอยู่ของชีวิตมนุษย์
          ดังนั้นจึงเกี่ยวพันธุ์และมีมิติรอบด้านอย่างลึกซึ้ง
          เกี่ยวพันธุ์กับนิเวศวิทยาโดยเป็นส่วนหนึ่งของนิเวศวิทยาวัฒนธรรม
          เรียกนิเวศวิทยาวัฒนธรรมการทอผ้าซึ่งจะเกี่ยวข้องกับการนำนิเวศวิทยาด้านสิ่งแวดล้อมๆ
          มาสร้างเครื่องมือในการทอผ้า มาเป็นแรงบันดาลใจในการออกแบบลวดลายผ้า
          ออกแบบการใช้ผ้าให้เหมาะกับนิเวศของแต่ละพื้นที่
          การทำผ้าและกระบวนการทอผ้าเข้าไปใช้ในพิธีกรรมต่างๆ อย่างแยบยล เป็นต้น
          ดั้งนั้นผ้าทอมือจึงให้ความหมายมากกว่าการเป็นเครื่องนุ่งห่ม
        </p>

        <!-- การแต่งงาน -->
        <h3
          id="marriage"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการแต่งงาน
        </h3>
        <p class="text-justify indent-8">
          การแต่งงานในสังคมชนบทเป็นการสร้างครอบครัวใหม่ ดังนั้น
          พิธีกรรมตามวัฒนธรรมจึงล้วนแล้วแต่ให้ความหมายในด้านการสร้าง การเติบโต
          การเจริญรุ่งเรือง การให้กำลังใจ ให้ต้นทุนชีวิต
          และให้ความคาดหวังว่าจะต้องพบสิ่งที่ดีงามในอนาคต
          วัฒนธรรมการแต่งงานของชาติพันธุ์เขมรจะใช้ผ้าทอมือในกิจกรรมหลายๆ
          ส่วนด้วยกันคือ
        </p>
        <ol class="list-decimal list-inside indent-8 space-y-4 text-justify">
          <li>
            ในส่วนเครื่องเซ่นไหว้เพื่อบอกกล่าวบรรพบุรุษที่ล่วงลับ ผีบ้านผีเรือน
            จะใช้ผ้าผู้หญิง ผ้าผู้ชาย ประกอบด้วยผ้านุ่ง ผ้าสไบ ผ้าโสร่ง
            และผ้าขาวม้า พร้อม หมาก พลู ขันธ์ 5 ให้ความหมาย
          </li>
          <li>ในส่วนของผ้าไหว้ หรือเครื่องสมมา เขมรเรียก เกรืองสะมา</li>
          <li>ในส่วนของเครื่องแต่งกายของเจ้าบ่าว เจ้าสาว</li>
          <li>ในส่วนของเครื่องแต่งกายผู้ร่วมงาน</li>
        </ol>

        <!-- การเกิด -->
        <h3
          id="birth"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการเกิด
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการเกิด ในอดีตการคลอดอยู่ในการดูแลของหมอตำแย
          ครอบครัวจัดเครื่องไหว้ยกครูเพื่อความราบรื่น ประกอบด้วยผ้าขาว ขันธ์ห้า
          และเงินตามที่ครูสืบทอด (เดิมราวหกสลึง–หกบาท ปัจจุบันแล้วแต่เจ้าของไข้)
          พิธีนี้สะท้อนการใช้ผ้าที่ตนผลิตอย่างคุ้มค่าและเป็นส่วนหนึ่งของเครื่องบูชาประจำพิธี
        </p>
        <p class="text-justify indent-8">
          ผ้านุ่ง ผ้าโสร่ง หรือผ้าเก่าของแม่ยังใช้เป็นผ้าอ้อมได้ดี เพราะนุ่ม
          ซับน้ำได้มาก และสิ่งตกค้างจากแป้งหรือเส้นใยเล็กถูกซักออกจนหมด
          ลดการระคายผิวทารก อีกทั้งกลิ่นพ่อแม่ช่วยให้เด็กรู้สึกใกล้ชิด อบอุ่น
          และลดความกังวล
        </p>

        <!-- การศึกษาและการเรียนรู้ -->
        <h3
          id="learning"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          การศึกษาและการเรียนรู้
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการศึกษาและการเรียนรู้
          ชาวเขมรนับถือผีบรรพบุรุษแนบแน่น
          กิจกรรมสำคัญจึงมักมีการกรวดน้ำหรือบอกกล่าวเสมอ ก่อนเรียนรู้งานใหม่
          เช่น การทอลายใหม่ จะทำพิธีบูชาครูด้วยขันธ์ห้าและผ้าขาว
          พร้อมชุดผ้าหญิง–ชายครบ แม้ดูเรียบง่าย แต่ช่วยให้ผู้ทำมีสมาธิ สติ
          เป้าหมายชัด เกิดการวางแผนและทำงานอย่างเป็นขั้นตอน จนนำไปสู่ความสำเร็จ
        </p>

        <!-- การแต่งกายและการใช้ผ้า -->
        <h3
          id="dress"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          การแต่งกายและการใช้ผ้า
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวการแต่งกาย
          การนุ่งผ้าทอมือที่ผลิตเองสอดคล้องวิถีชีวิตและนิเวศการผลิต
          เคารพกาลเทศะและฐานะทางสังคม ใช้อย่างประหยัดและสร้างสรรค์
          โครงสร้างผ้าผืน 4–8 ศอก นุ่งได้หลายแบบ แบ่งใหญ่เป็น “นุ่งลอยชาย”
          สำหรับใช้ทั่วไป และ “นุ่งโจง” เมื่อต้องการคล่องตัว เช่น
          ทำเกษตรหรือปีนต้นไม้ ผ้าขนาดประมาณ 70×200 ซม. จะนุ่งโจงได้กระชับ
          ส่วนในโอกาสพิเศษ อาจนุ่งลอยชายรุ่มรามหรือโจงยาวเบาสบาย
          เติมสไบ/เครื่องประดับเพื่อยกระดับความงาม
        </p>

        <!-- วัสดุและเส้นใย -->
        <h3
          id="materials"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัสดุและเส้นใย
        </h3>
        <p class="text-justify indent-8">
          นอกเหนือจากรูปแบบการนุ่ง วัตถุดิบก็ชี้นำโอกาสใช้ผ้าเช่นกัน
          งานกลางแจ้งและงานบ้านนิยมฝ้าย เพราะซับเหงื่อ ระบายอากาศดี
          และเหนียวขึ้นเมื่อเปียก ส่วนงานพิเศษนิยมไหม เพราะใยยาว ละเอียด เงางาม
          ผิวเรียบ เหมาะกับงานที่ต้องการความประณีต
        </p>

        <!-- ลวดลายและความหมาย -->
        <h3
          id="patterns"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ลวดลายและความหมาย
        </h3>
        <p class="text-justify indent-8">
          การออกแบบลวดลายพื้นบ้านผ่านการคิดวิเคราะห์ให้สอดคล้องวิถีและประเพณี
          ลายพื้น ลายทาง ลายตาราง เหมาะใช้ทั่วไป ขณะที่มัดหมี่ ยกดอก ยกขิด
          หรือเทคนิคซับซ้อน ใช้ในโอกาสสำคัญเพราะต้องใช้เวลาและองค์ความรู้มาก
          แบบแผนนี้ทำให้สังคมให้ “คุณค่า” ตามความยากง่ายของงานและภูมิปัญญา
          เคารพผู้รู้หรือ “ปราชญ์” (อาจารย์/กรู/หลูกกูร)
          บทบาทผ้าทอมือจึงเกินกว่าความเป็นเครื่องนุ่งห่ม
        </p>

        <!-- การตาย -->
        <h3
          id="death"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          วัฒนธรรมการตาย
        </h3>
        <p class="text-justify indent-8">
          วัฒนธรรมเกี่ยวกับการตาย เชื่อว่าผู้ตายไปสู่อีกภพหนึ่ง
          จึงเตรียมปัจจัยสี่ โดยเฉพาะเสื้อผ้า นิยมใส่ผ้า 4 ผืนของหญิง–ชาย
          เผื่อคู่ผู้ตายในโลกหน้า บางท้องถิ่นถวายทำบุญกับพระ หรือใส่ลงโลง
          (กรณีฝังแบบโบราณ) ก่อนขุดกระดูกทำบุญภายหลัง
          ซึ่งสอดคล้องกับข้อมูลพื้นที่ป่าช้า
          และหลักฐานโบราณคดีที่พบเศษผ้ากับเครื่องประดับ
          ผ้าทอมือจึงผูกพันพิธีตายมาเนิ่นนาน
          เป็นสื่อแห่งความรักและเมตตาระหว่างคนกับสังคม
          เสริมพลังชุมชนด้วยภูมิปัญญาของตนเอง
        </p>

        <!-- สรุปภาพรวม -->
        <h2
          id="summary"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          สรุปภาพรวม
        </h2>
        <p class="text-justify indent-8">
          ผ้าทอมือนั้น เป็นเครื่องมือที่มีความหมาย ยิ่งต่อการพัฒนาศักยภาพของคน
          พัฒนาความสุขและความเข้มแข็งของสังคมชุมชน
          พัฒนารายได้เข้าครอบครัวอย่างสม่ำเสมอและเป็นอิสระยิ่ง
          ไม่ต้องเป็นลูกจ้างใคร ตราบเท่าที่คนทอผ้าจะพัฒนาตนเองเองได้
          ยิ่งพัฒนาตัวเองได้มากเท่าไหร่ รายได้ก็เพิ่มมากขึ้นเท่านั้น
          โดยเฉพาะในยุค 4.0 นี้ การตลาดอยู่ในโลกออนไลน์
          ที่มีผู้คนนับไม่ถ้วนที่เห็นสินค้าผ้าทอมือของเรา หากบริหารจัดการความรู้
          ความสามารถ และเวลาได้อย่างเหมาะสมแล้ว
          ศักยภาพในการค้าขายผ้าทอมือก็จะสมบูรณ์ยิ่งขึ้นอย่างน่าสนใจ
        </p>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'info3'"
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
          การออกแบบลวดลายผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="design-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การออกแบบลวดลายผ้าทอมือ
        </h2>

        <!-- ความสำคัญในยุคไทยแลนด์ 4.0 -->
        <h3
          id="design-importance"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          ความสำคัญของการออกแบบ (บริบทไทยแลนด์ 4.0)
        </h3>
        <ol class="list-decimal list-inside indent-8 space-y-3 text-justify">
          <li>
            <span class="font-semibold">ผ้าทอมือเป็นสินค้าแฟชั่น</span> — ต้องตอบสนองความพึงพอใจและความสุขของผู้บริโภค จึงต้องมีทั้ง “คุณค่า” และ “ความงาม” ความรู้ในการออกแบบคือเครื่องมือสร้างคุณค่าและความงามให้ผลิตภัณฑ์ผ้า
          </li>
          <li>
            <span class="font-semibold">ผ้าทอมือสะท้อนวิถี คน และวัฒนธรรม</span> — การออกแบบต้องมี “อัตลักษณ์” ของชุมชนอย่างชัดเจน
          </li>
          <li>
            <span class="font-semibold">การออกแบบคือศิลปะของศิลปินพื้นบ้าน</span> — จำเป็นต้องศึกษาและอธิบายอัตลักษณ์/ตัวตนท้องถิ่นให้ชัด มิฉะนั้นจะ “ทำลายตัวตนชุมชน” มากกว่าส่งเสริมศักยภาพ เมื่อใดชุมชนหมดอัตลักษณ์ เมื่อนั้นชุมชนและชาติพันธุ์ย่อมอ่อนแรง; ในทางกลับกัน หากคงอัตลักษณ์ได้ ไม่ว่ารูปแบบใด ชุมชนและชาติพันธุ์ย่อมยั่งยืน (เทียบกรณีชาติพันธุ์มอญในไทย—สายสัมพันธ์ใกล้ชิดกับเขมร บางครั้งเรียก “มอญ–เขมร”—แม้ไม่มีประเทศมอญ แต่ยังเป็นที่รู้จักผ่านวัฒนธรรมและตัวตนของตนเอง) การคงอัตลักษณ์ช่วยส่งเสริม “การยอมรับความหลากหลาย” และการอยู่ร่วมกันอย่างเป็นสุขของสังคม
          </li>
        </ol>

        <!-- กรอบความรู้ -->
        <h3
          id="jarunee-framework"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          กรอบการออกแบบตาม จารุณี ชัยโชติอนันต์ (2558)
        </h3>
        <p class="text-justify indent-8">
          “การออกแบบผ้า” คือการวางแผนล่วงหน้าว่าจะผลิตผ้าออกมาอย่างไร ใช้ในโอกาสไหน ใครเป็นผู้ใช้ และใช้อย่างไร โดยควรพิจารณาองค์ประกอบหลักดังต่อไปนี้:
        </p>

        <!-- 1. การออกแบบเนื้อผ้า -->
        <h4
          id="fabric-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          1) การออกแบบเนื้อผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>เบอร์ (ขนาด) ของเส้นยืนและเส้นพุ่ง</li>
          <li>เบอร์ฟันหวี / ความถี่–ความหนาของฟันหวี</li>
          <li>ความกว้างของหน้าผ้า</li>
        </ol>

        <!-- 2. การออกแบบลายผ้า -->
        <h4
          id="pattern-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2) การออกแบบลายผ้า
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ประโยชน์ใช้สอย — เช่น ผ้านุ่ง ผ้าเมตร ผ้าพันคอ ผ้าคลุมไหล่ ผ้าทอหมอน ฯลฯ</li>
          <li>การให้สี — สีเส้นยืน–สีเส้นพุ่ง เมื่อนำมาทอรวมกันแล้วเกิดอารมณ์ภาพรวมอย่างไร</li>
          <li>ความสวยงามเชิงองค์ประกอบ — ช่องว่าง (negative space) และความสมดุล</li>
        </ol>

        <!-- 3. การออกแบบกระบวนการผลิตและการทอ -->
        <h4
          id="process-design"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3) การออกแบบกระบวนการผลิตและการทอ
        </h4>
        <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
          <li>ขั้นตอนการผลิตและเครื่องมือ — แต่ละขั้นตอนใช้เครื่องมือชนิดใด</li>
          <li>ชนิดของกี่ทอผ้า — เลือกชนิดกี่ให้เหมาะกับลาย/เทคนิค</li>
          <li>การเก็บและเหยียบตะกอ — วิธีจัดตะกอและลำดับเหยียบเพื่อให้เกิดลายตามต้องการ</li>
          <li>วิธีการทอ — จังหวะทอ เทคนิคเฉพาะ และการควบคุมคุณภาพ</li>
        </ol>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'info4'"
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
          เทคนิคการผลิตผ้าทอมือ
        </h1>
      </header>

      <!-- กล่องเนื้อหา -->
      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="design-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การผลิตผ้าทอมือ
        </h2>

        <p class="text-justify indent-8">
          การผลิตผ้าทอมือ ช่างทออาศัยองค์ความรู้ตั้งแต่การเตรียมเส้นใย
          การกำหนดเบอร์เส้นด้าย การคำนวณฟันหวี–เส้นยืน ตลอดจนการฟอกและย้อมเส้นใย
          เพื่อให้ได้ผืนผ้าที่มีคุณภาพ ลวดลาย สีสัน และคุณสมบัติตามต้องการ
        </p>

        <!-- การเตรียมเส้นใยและระบบเบอร์ -->
        <h3
          id="fiber-prep"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          1) การเตรียมเส้นใย และระบบเบอร์เส้นด้าย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยที่ใช้เป็นเส้นยืน–เส้นพุ่งอาจผลิตเองหรือซื้อสำเร็จรูป
          โดยเส้นใยที่ซื้อจะระบุ “เบอร์” ชัดเจน ซึ่งมีระบบหลักดังนี้:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">ระบบดีเนียร์ (Denier; D)</span> —
            ใช้กับเส้นไหม นิยาม: 1 ดีเนียร์ = เส้นยาว 9,000 เมตร หนัก 1 กรัม
            (เบอร์ยิ่งสูง เส้นยิ่ง “ใหญ่–หนัก”
            ในมวลเท่ากันเส้นจะสั้นกว่าเบอร์ต่ำ)
          </li>
          <li>
            <span class="font-medium">ระบบเท็กซ์ (Tex; T)</span> —
            ใช้กับฝ้าย/เส้นใยสังเคราะห์ นิยาม: 1 เท็กซ์ = เส้นยาว 1,000 เมตร
            หนัก 1 กรัม (ยิ่งเลข Tex สูง เส้นยิ่ง “ใหญ่–หนัก”)
          </li>
        </ul>
        <p class="text-justify indent-8">
          ตัวอย่างการแสดงสเปกเส้นด้าย: ไหมจุล “4 เส้น ขนาด 25/30 เกลียว 170 รอบ”
          หมายถึงรวม ~4×27.5D ≈ 110D ตีเกลียว 170 รอบ/นิ้ว
          เหมาะทำเส้นพุ่งให้ผ้าเนื้อหนา; สเปกฝ้ายแบบอุตสาหกรรม เช่น
          <span class="whitespace-nowrap">20/1, 40/2, 60/2, 180/2</span>
          อ่านว่าเบอร์–จำนวนเส้นควบ ตัวอย่าง:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            <span class="font-medium">20/1</span> เส้นใหญ่ปานกลาง เหนียวน้อย
            เหมาะเส้นพุ่ง
          </li>
          <li>
            <span class="font-medium">40/2</span> เส้นกลาง เหนียวกว่า 20/1
            ใช้ได้ทั้งยืน–พุ่ง
          </li>
          <li>
            <span class="font-medium">60/2</span> เส้นเล็ก เหนียว
            ใช้เย็บทั่วไป/เส้นยืนผ้าฝ้ายเนื้อละเอียด
          </li>
          <li>
            <span class="font-medium">180/2</span> เส้นเล็กมาก
            เหมาะเย็บผ้าเนื้อบาง/เส้นยืน–พุ่งผ้าบาง
          </li>
        </ul>

        <!-- วิธีคำนวณ -->
        <h3
          id="calc"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          2) วิธีคำนวณที่จำเป็น
        </h3>

        <h4
          id="calc-reed"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.1 การหาจำนวนช่องฟันหวี (ฟืม/รีด)
        </h4>
        <p class="text-justify indent-8">
          วิธีชุมชนพื้นบ้านนิยม “นับเป็นหลบ” (1 หลบ = 40 ช่องฟันหวี)
          และหน่วยย่อย “ควม” (1 ควม = 4 ช่อง) ตัวอย่าง:
          <span class="whitespace-nowrap">ฟืม 21 หลบ 2 ควม</span>
          = (40×21) + (4×2) = 848 ช่องฟันหวี
        </p>
        <p class="text-justify indent-8">
          แบบอุตสาหกรรมจะใช้:
          <span class="font-medium">เบอร์ฟันหวี × หน้าผ้า (นิ้ว)</span>
          ตัวอย่าง ฟันหวีเบอร์ 50, หน้าผ้า 40 นิ้ว ⇒ 50×40 = 2,000 ช่อง
        </p>

        <h4
          id="calc-warp"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.2 การคำนวณจำนวนเส้นยืน / ความยาว / น้ำหนักเส้นไหม
        </h4>
        <p class="text-justify indent-8">
          ต้องทราบ (ก) จำนวนช่องฟันหวี (ข) ความยาวผ้า (ค) จำนวนเส้นต่อ 1 ช่อง
          (ง) เบอร์เส้นด้าย ตัวอย่างโจทย์:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>
            ฟันหวี = 2,000 ช่อง; เพิ่มความหนาริมด้านละ 10 ช่อง ⇒ รวมริม 20 ช่อง
          </li>
          <li>จำนวนเส้นต่อ 1 ช่อง = 2 เส้น</li>
          <li>เส้นไหม 20 ดีเนียร์</li>
          <li>หน้าผ้า 40 นิ้ว (กรณีคำนวณได้ 2,000 ช่องตามตัวอย่างข้างบน)</li>
          <li>
            ความยาวผ้าสำหรับคำนวณ
            <span class="font-medium">สมมุติ 20 เมตร</span> (หมายเหตุ:
            หากต้องการคำนวณที่ 16 เมตร ให้แทนค่าตามจริงได้)
          </li>
        </ul>

        <div >
          <p class="font-semibold">
            ตารางที่ 2.1 วิธีคำนวณหาจำนวนเส้นยืน (ตัวอย่าง)
          </p>
          <ol class="list-decimal list-inside mt-2 space-y-2 text-justify">
            <li>
              <span class="font-medium">จำนวนเส้นยืนทั้งหมด</span><br />
              = (จำนวนเส้น/ช่อง) × (จำนวนช่องทั้งหมด) + (ช่องริมทั้งสองด้าน)<br />
              = (2 × 2000) + 20 = <span class="font-medium">4,020 เส้น</span>
            </li>
            <li>
              <span class="font-medium">ความยาวเส้นยืนรวม</span><br />
              = จำนวนเส้นยืนทั้งหมด × ความยาวผ้า<br />
              = 4,020 × 20 m = <span class="font-medium">80,400 m</span>
            </li>
            <li>
              <span class="font-medium">น้ำหนักไหมที่ต้องใช้ (ดีเนียร์)</span
              ><br />
              = (ดีเนียร์ × ความยาว (m)) ÷ 9,000<br />
              = (20 × 80,400) ÷ 9,000 ≈
              <span class="font-medium">178.7 g</span> (≈ 0.179 kg)
            </li>
          </ol>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            หมายเหตุ: หากใช้ความยาว 16 m ให้แทนค่าเป็น 4,020 × 16 = 64,320 m ⇒
            น้ำหนัก ≈ 142.9 g
          </p>
        </div>

        <h4
          id="calc-warp-rounds"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          2.3 การหาจำนวนรอบ “เดินเส้นยืน”
        </h4>
        <p class="text-justify indent-8">
          ขึ้นกับความยาวหลักผือ/ม้าเดินเส้น และจำนวนหลอด (อัก) ที่ใช้:
          หลักผือยาว–หลอดมาก ⇒ เดินรอบน้อย; หลักผือสั้น–หลอดน้อย ⇒
          ต้องเดินรอบมาก
        </p>

        <!-- ฟอก/ย้อมเส้นใย -->
        <h3
          id="scour-dye"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          3) การฟอกและการย้อมเส้นใย
        </h3>
        <p class="text-justify indent-8">
          เส้นใยดิบ (ฝ้าย/ไหม) ต้องฟอก–ย้อมก่อนทอ ด้วยเหตุผลหลัก (1)
          ทำให้เส้นใยนุ่มพร้อมทอ (2) สร้างสีสันตอบโจทย์การออกแบบลวดลาย
          ขั้นตอนแบ่งตามชนิดเส้นใย ดังนี้
        </p>

        <h4
          id="degumming-cottonclean"
          class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
        >
          3.1 การลอกกาวไหม และการทำความสะอาดเส้นฝ้าย
        </h4>
        <p class="text-justify indent-8">
          เส้นไหมเป็นใยโปรตีนธรรมชาติที่ได้จากรังไหม ประกอบไปด้วยส่วนเส้นใย
          และส่วนของกาวไหมเคลือบเส้นใย ซึ่งจะมีอยู่ประมาณ 25 % ของน้ำหนักไหมดิบ
          กาวไหมจะมีสิ่งเจือปน เช่น ขี้ผึ้ง ไขมัน
          ซึ่งสามารถละลายได้ในสบู่ร้อนและด่าง
          ส่วนเส้นใยฝ้ายก็มีน้ำมันและสิ่งสกปรก
          ที่เกิดจากการทำเส้นใยเจือปนอยู่เช่นกัน
          การลอกกาวไหมและการทำความสะอาดเส้นฝ้าย
          ทำเพื่อให้เหลือส่วนที่เป็นเฉพาะเส้นใยที่มีความนุ่มละเอียด
          โดยเฉพาะไหมจะมีความมันวาวสูงขึ้น
          โดยมีขั้นตอนการลอกกาวและการทำความสะอาดดังต่อไปนี้คือ
        </p>
        <ul class=" list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">1) ชั่งน้ำหนักเพื่อหาอัตราส่วนน้ำ</span> —
            เส้นไหมดิบ/ฝ้ายดิบ 1 ส่วน : น้ำ ~30 ส่วน (ขึ้นกับปริมาณกาว/สิ่งสกปรก
            เช่น ไหม 1 กก. ใช้น้ำ ~20–30 กก.)
          </li>
          <li>
            <span class="font-medium">2) อัตราส่วนสารเคมี</span><br />
            <p class="text-justify indent-12">• ไหม: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส (alkali) 1 g/L</p>
            <p class="text-justify indent-12">• ฝ้าย: สบู่ (ไม่มีประจุ) 1 g/L + โซดาแอส 0.1 g/L</p>
          </li>
          <li>
            <span class="font-medium">3) ต้มลอกกาวและทำความสะอาดเส้นใยฝ้ายดังต่อไปนี้ ตามกระบวนการดังนี้
                </span>
          </li>
        </ul>
        <p class="text-justify indent-8">
            ตารางที่ 1 การลอกกาวเส้นไหมและการทำสะอาดเส้นฝ้าย
        </p>
        <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง1.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'info41'"
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
          การย้อมสี
        </h1>
      </header>

      <section
        class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
      >
        <h2
          id="dyeing-overview"
          class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
        >
          การย้อมสี
        </h2>

        <p class="text-justify indent-8">
          การย้อมสีทำให้ผ้าและเส้นใยมีความน่าสนใจและมีชีวิต เส้นไหม เส้นฝ้าย
          และด้ายประดิษฐ์ สามารถย้อมได้ แต่แต่ละชนิดต้องใช้
          “ชนิดสี–สารช่วย–อุณหภูมิ–เวลา” ที่ต่างกัน โดยหลักการควบคุมคุณภาพย้อมมี
          4 ข้อสำคัญ ได้แก่
        </p>
        <ul class="list-disc list-inside indent-8 space-y-1 text-justify">
          <li>ใช้ “ชนิดสี” ให้ตรงกับ “ชนิดเส้นใย”</li>
          <li>ควบคุมอุณหภูมิให้เหมาะสม</li>
          <li>ทำ “กระบวนการ” ให้ครบถ้วน (เตรียม–ย้อม–ล้าง/ผนึก–ทำให้แห้ง)</li>
          <li>รักษา “เวลา” ให้อยู่ในช่วงที่กำหนด</li>
        </ul>

        <!-- 1) ย้อมไหม -->
        <h3
          id="dye-silk"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          1) การย้อมสีเส้นไหม (Silk)
        </h3>
        <p class="text-justify indent-8">
          ส่วนประกอบหลัก: น้ำ ความร้อน สี และสารช่วยย้อม โดยทั่วไป “ไหม”
          เหมาะกับ
          <span class="font-medium">สีแอซิด (Acid dye)</span>
          ใช้กรดน้ำส้มเป็นสารช่วยย้อมเพื่อเพิ่มการติดสี
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อเส้นไหม 1 กก.</span> น้ำ 20–30
            ลิตร; สี 0.1–40 กรัม (ตามความเข้ม); กรดน้ำส้ม 10–40 กรัม
            ตามความเข้มของสี สีอ่อนใส่น้อย สีเข้มใส่มาก
            โดยมีกระบวนการย้อมสีดังนี้
          </li>
        </ul>
        <p class="text-justify indent-8">
          ตารางที่ 1 การย้อมเส้นไหมด้วยสีแอซิค
        </p>
        <div class="mt-4 flex justify-center">
          <img
            src="/assetts/css/image/ตาราง2.png"
            alt="table1"
            loading="lazy"
            decoding="async"
            class="shadow-lg object-contain max-w-full h-auto"
          />
        </div>

        <!-- 2) ย้อมฝ้าย -->
        <h3
          id="dye-cotton"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          2) การย้อมสีเส้นฝ้าย (Cotton)
        </h3>
        <p class="text-justify indent-8">
          ส่วนประกอบหลัก: น้ำ ความร้อน สี และสารช่วยย้อม “ฝ้าย” เหมาะกับ
          <span class="font-medium">สีรีแอคทีฟ (Reactive dye)</span> ใช้ด่าง
          (โซดาแอช) และเกลือช่วยย้อม/ช่วยติด
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อฝ้าย 1 กก.</span> น้ำ 20–30
            ลิตร; สี 0.1–40 กรัม; เกลือ 10–40 กรัม; ด่าง 10–40 กรัม
            ตามความเข้มของสี สีอ่อนใส่น้อย สีเข้มใส่มาก
            โดยมีกระบวนการย้อมสีดังต่อไปนี้
          </li>
          <p class="text-justify indent-8">
            ตารางที่ 2 การย้อมเส้นฝ้ายด้วยสีรีแอคทีฟ
          </p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง3.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
        </ul>

        <!-- 3) ย้อมด้ายประดิษฐ์ -->
        <h3
          id="dye-manmade"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          3) การย้อมสีด้ายประดิษฐ์ (Man-made Fibres)
        </h3>
        <p class="text-justify indent-8">
          ด้ายประดิษฐ์ครอบคลุมทั้งเส้นใยเซลลูโลสที่ผลิตขึ้น (เช่น เรยอน)
          และเส้นใยสังเคราะห์ (ไนลอน/โพลีเอสเตอร์ ฯลฯ) ควรใช้
          <span class="font-medium">สีย้อมเฉพาะของเส้นใยนั้น</span> (เช่น
          เรยอนใช้สีรีแอคทีฟหรือไดเร็กต์, ไนลอนใช้สีแอซิด,
          โพลีเอสเตอร์ใช้สีดิส์เพิร์ส)
          ข้อความต่อไปนี้เป็นสัดส่วนอ่างย้อมแบบกรดอ่อนซึ่งใช้ได้กับกลุ่มที่ตอบสนองต่อกรด:
        </p>
        <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
          <li>
            <span class="font-medium">อัตราส่วนต่อเส้นด้าย 1 กก.</span> น้ำ
            20–30 ลิตร; สี 0.1–40 กรัม; กรดน้ำส้ม 10–40 กรัม ตามความเข้มของสี
            สีอ่อนใส่น้อย สีเข้มใส่มาก โดยมีกระบวนการย้อมสีดังต่อไปนี้
          </li>
          <p class="text-justify indent-8">ตารางที่ 3 การย้อมสีด้ายประดิษฐ์</p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง4.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain max-w-full h-auto"
            />
          </div>
        </ul>

        <!-- 4) ย้อมสีธรรมชาติ -->
        <h3
          id="dye-natural"
          class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
        >
          4) การย้อมสีจากวัสดุธรรมชาติ
        </h3>
        <p class="text-justify indent-8">
          สีย้อมธรรมชาติได้จากสัตว์ พืชพรรณ และแร่ธาตุ เช่น
          ต้น–ใบ–เปลือก–เมล็ด–ราก–แก่น, โคลน/ดิน, ครั่ง ฯลฯ ใช้กับ “ไหม” และ
          “ฝ้าย” เป็นหลัก กระบวนการแบ่งเป็น 3 ส่วน:
          <span class="font-medium">การเตรียมน้ำสี</span> →
          <span class="font-medium">การย้อม</span> →
          <span class="font-medium">การผนึกสี</span>
        </p>
        <ul class="list-disc list-inside indent-8 space-y-3 text-justify">
          <li>
            <span class="font-semibold"
              >อัตราส่วนอ่างย้อม (ต่อเส้นใย 1 กก.)</span
            >: น้ำ 20–30 ลิตร; ปริมาณ “น้ำสี” ตามการสกัด; สารช่วย
            (เกลือ/ด่าง/กรด) 10–40 กรัม ตามเฉดและวัสดุให้สี
          </li>
          <p class="font-semibold">
            4.1 การสกัดสีธรรมชาติ
          </p>
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">สกัดร้อน</span> (ใช้ได้กับเปลือก ใบ
                ดอก ผล แก่น)
                <ol class="list-decimal list-inside indent-22 space-y-1">
                  <li>ตำ/บดวัสดุให้ละเอียด</li>
                  <li>หมัก ~1 ชั่วโมง</li>
                  <li>ต้มที่ ~90°C แล้ว “พัก” 12–24 ชม. ก่อนกรองเอาแต่น้ำสี</li>
                </ol>
                <p class="indent-8">
                  หมายเหตุ: วัสดุเดียวกันสามารถสกัดซ้ำได้จนสีจาง
                  แล้วจึงเปลี่ยนใหม่/เติมวัสดุเพิ่ม
                </p>
              </li>
              <li>
                <span class="font-medium">สกัดเย็น</span>
                (มักใช้กับผล/เปลือก/แก่นบางชนิด)
                <ol class="list-decimal list-inside indent-22 space-y-1">
                  <li>ตำ/บดให้ละเอียด</li>
                  <li>
                    เติมน้ำ หมักอย่างน้อย 1 ชั่วโมง (หรือมากกว่านั้นตามชนิด)
                  </li>
                </ol>
              </li>
            </ul>
          
          <p class="font-semibold">
            4.2 การย้อมสีธรรมชาติ
          </p>
          
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">ย้อมร้อน</span>: ต้มน้ำสี 80–90°C ย้อม
                ~1 ชั่วโมง หากต้องการเข้ม/ทน ให้อุ่นไว้ 45–50°C ต่ออีก 12–24
                ชั่วโมง (ยิ่งเวลานาน สีมักยิ่งเข้มและทน)
              </li>
              <li>
                <span class="font-medium">ย้อมเย็น</span>: จุ่ม–ขยำในน้ำสี
                (โดยเฉพาะสีที่สกัดเย็น) ~30 นาทีขึ้นไป บางสีต้อง “ตากแดดคั่น”
                แล้วจุ่มซ้ำหลายรอบ สีจะเข้มขึ้นตามจำนวนรอบ (เช่น คราม/มะเกลือ)
                บางชนิดแช่ค้างคืน (เช่น เปลือกมังคุด)
              </li>
            </ul>
          
          <p class="font-semibold">
            4.3 การใช้สารช่วยติด (Mordant/Assist)
          </p>
            
            <ul class="list-disc list-inside indent-15 space-y-2">
              <li>
                <span class="font-medium">ก่อนย้อม</span>: เช่น
                แช่ฝ้ายในน้ำถั่วเหลืองให้โปรตีนแทรกเส้นใยเซลลูโลส
                ช่วยเพิ่มการติดสี
              </li>
              <li>
                <span class="font-medium">ขณะย้อม</span>: ใส่เกลือเมื่อ ~60°C
                หรือต้มไป ~10 นาที และ/หรือเติมด่างช่วงท้าย ~15 นาที
                (ขึ้นกับสูตร/วัสดุให้สี)
              </li>
              <li>
                <span class="font-medium">หลังย้อม</span>: คลุกขี้เถ้า/หมักโคลน
                (กรณีมะเกลือ) หรือจุ่มน้ำด่างสำหรับสีกลุ่มเปลือกไม้ เป็นต้น
              </li>
            </ul>
            <p class="indent-8">
              บางวัสดุทำหน้าที่ได้ทั้ง “ให้สี–ช่วยย้อม–ช่วยติด” พร้อมกัน (เช่น
              กลุ่มที่มีรสฝาด/กรดอ่อนอย่างใบมะขามแก่ในสูตรย้อมครั่งดั้งเดิม)
            </p>
          
        </ul>
        <p class="text-justify indent-8">
          การใช้สารช่วยติดทั้ง 3 ลักษณะ เลือกใช้ได้ตามความเหมาะสม ทักษะ ความถนัด
          และวัสดุที่หาได้ในท้องถิ่น
          การย้อมสีธรรมชาติมีความหลากหลายไม่น้อยไปกว่า
          การย้อมเส้นไหมด้วยสีสังเคราะห์ แม้การให้สีอาจแตกต่างกัน
          แต่คุณภาพและความงามไม่น้อยกว่ากัน
          สีสังเคราะห์โดดเด่นเรื่องความสม่ำเสมอ ควบคุมได้ง่าย
          ส่วนสีธรรมชาติโดดเด่นเรื่อง “ความต่างและเอกลักษณ์”
          จึงเหมาะกับงานหัตถกรรมพื้นบ้าน
          และสามารถสร้างมูลค่าเพิ่มจากความต่างนี้ได้
          เมื่อทุกคนเข้าใจคุณค่าเดียวกัน
        </p>
        <p class="text-justify indent-8">
          จังหวัดบุรีรัมย์มีทรัพยากรพืชให้สีจำนวนมาก จากการทดลองนำผู้นำชาวบ้าน
          ตำบลบัวทอง อำเภอเมือง จังหวัดบุรีรัมย์
          และนักศึกษาสาขาวิทยาศาสตร์สิ่งทอ มหาวิทยาลัยราชภัฏบุรีรัมย์
          เข้าสำรวจป่าติดที่ทำการองค์การบริหารส่วนตำบลบัวทอง เมื่อเดือนกรกฎาคม
          2555 บริเวณประมาณ 200 ตารางเมตร ใช้เวลา 1 ชั่วโมง พบพืชให้สีมากกว่า 20
          ชนิด แสดงให้เห็นว่าพืชให้สีมีอยู่ทั่วไป และหาได้ไม่ยาก โดยแสดงเป็นตัวอย่างดังต่อไปนี้
        </p>
        <p class="text-justify indent-8">ตารางที่ 4 การสกัดและการย้อมสีธรรมชาติ</p>
          <div class="mt-4 flex justify-center">
            <img
              src="/assetts/css/image/ตาราง5.png"
              alt="table1"
              loading="lazy"
              decoding="async"
              class="shadow-lg object-contain w-full max-w-3xl"
            />
          </div>
      </section>
    </div>
  </div>

  <div
    v-else-if="type === 'info42'"
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
          การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
        </h1>
      </header>

      <section
  class="text-base md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 md:p-10 rounded-2xl shadow-md space-y-8"
>
  <h2
    id="yarn-finishing"
    class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
  >
    การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
  </h2>

  <p class="text-justify indent-8">
    การตกแต่งเส้นด้ายยืนหรือเส้นด้ายพุ่ง “ควรทำหรือไม่” ขึ้นอยู่กับการใช้งานและลักษณะทางกายภาพของเส้นไหม/เส้นด้าย
    จุดมุ่งหมายหลักมีสองแบบคือ (ก) ให้เส้นเรียบ อยู่ตัว และลื่น เพื่อทอได้ไหลลื่นบนฟันหวี–ตะกอ และ (ข) ให้สัมผัสนุ่มลื่น
    ทั้งนี้ช่างทอใช้ดุลยพินิจและทักษะในการเลือกสูตรที่เหมาะสม
  </p>

  <h3
    id="finishing-goals"
    class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
  >
    วัตถุประสงค์และแนวทางเลือกสารตกแต่ง
  </h3>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>
      <span class="font-medium">ต้องการให้ “เรียบ–อยู่ตัว–ลื่น”</span>:
      ผสมน้ำยาอัดกลีบลงในน้ำแป้งที่ใช้เคลือบเส้น (สูตรแม่บ้าน/ชุมชน) อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">ต้องการให้ “นุ่ม–ลื่น”</span>:
      แช่เส้นด้ายในน้ำยาปรับผ้านุ่ม อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span>.
    </li>
    <li>
      <span class="font-medium">กรณีใช้ “ไหมเปลือกนอก” เป็นเส้นพุ่ง (ไม่ตีเกลียว)</span>:
      ควรแช่ในน้ำยารีดผ้าเรียบ อัตรา <span class="font-semibold">5–10% ของปริมาณน้ำ</span> เพื่อลดการแตกฟูและช่วยให้ไหลลื่นขณะพุ่ง.
    </li>
  </ul>
  <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ไหมเปลือนอก.jpg"
            alt="ไหมเปลือกนอก"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 ไหมเปลือกนอก
        </p>
  <h4
    id="finishing-steps"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    ขั้นตอนแนะนำแบบสั้น
  </h4>
  <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
    <li>ผสมสารตามอัตราส่วนที่เลือกในน้ำสะอาด คนให้เข้ากัน</li>
    <li>แช่เส้นด้ายให้ชุ่ม ทิ้งไว้ 5–15 นาที (ขึ้นกับขนาดเส้น/ความหนา)</li>
    <li>ยกขึ้นบีบหมาด จัดเส้นให้เรียงไม่พันกัน</li>
    <li>ผึ่งในที่ร่ม อากาศถ่ายเท จนแห้งพอดี (ไม่ตากแดดจัดเพื่อลดการกรอบ)</li>
  </ol>

  <h4
    id="finishing-notes"
    class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
  >
    หมายเหตุการใช้งาน
  </h4>
  <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
    <li>ทดสอบกับเส้นปริมาณเล็กน้อยก่อนผลิตจริง เพื่อดูผลความลื่น ความอยู่ตัว และการเข้ากันของสี</li>
    <li>อย่าใส่สารตกแต่งมากเกินไป เพราะอาจเกิดคราบสะสม ทำให้ฟันหวี–ตะกอเหนียว และเส้นขาดง่าย</li>
    <li>เลือกสูตรต่างกันระหว่าง “เส้นยืน” (เน้นความทน–อยู่ตัว–ลื่นผ่านตะกอ) กับ “เส้นพุ่ง” (เน้นไหลลื่นและผิวสัมผัส)</li>
    <li>หากจะย้อมสีหลังตกแต่ง ควรล้างออกให้เหมาะสมเพื่อลดผลกระทบต่อการติดสี</li>
  </ul>
</section>

    </div>
  </div>
</template>
