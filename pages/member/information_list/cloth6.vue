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
          ผ้าโฮลเปราะห์
        </h2>
      </div>

      <!-- เนื้อหา -->
      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          ผ้าโฮลเปราะห์
        </p>
        <p class="mb-4 text-justify indent-8">
          กลุ่มชาติพันธุ์เขมรบุรีรัมย์จำนวนหนึ่ง ทอผ้า โฮลเปราะห์ (ผ้าปูมเขมร)
          สำหรับใช้ในงาบวชพระของลูกชาย ผ้าจะแบ่งออกเป็น 2 ส่วน คือส่วนท้องผ้า
          และส่วน เจือย (ชายผ้า) มีความยาวประมาณ 4 หลา เท่ากับ 2 เท่าของซิ่นหมี่
          ใช้นุ่งโจง หรือนุ่งหน้านางลอยชาย ส่วนใหญ่จะใช้ร่วมกันกับผ้าขาวม้ายกขิด
          ออกแบบลวดลายส่วนท้องผ้าให้ผู้เชี่ยวชาญได้เลือกพิจารณาไว้ 4 ลาย
          แต่ส่วนของเจือย ออกแบบไว้เพียงลายเดียว
          เนื่องจากได้กับลายท้องผ้าได้ทุกลาย
          ผู้เชี่ยวชาญได้เลือกลายผ้าโฮลเปราะห์ ลายดังนี้คือ
        </p>
        <p class="mb-4 text-justify indent-8">
          วัตถุดิบในการทำผ้าต้นแบบใช้เส้นใยไหมยืนควบ 4 20/22 ดีเนียร์
          ของบริษัทจุลไหมไทย สีกรมท่าเข้ม (Navy Blue) เส้นพุ่งใช้ไหมควบ 6 ไซด์
          LL เลือกใช้ไหมเส้นเล็ก เนื่องจากลวดลายที่ออกแบบมีความละเอียดมาก
          ถ้าใช้ไหมเส้นใหญ่จะไม่สามารถมัดลายได้ละเอียดตามความต้องการ นอกจากนี้
          นักวิจัยยังได้เพิ่มเทคนิคการจกดาวที่เชิงผ้าทั้งสองด้าน
          เพื่อเพิ่มความหรูหรา เพื่อให้ผ้าชิ้นนี้เป็นผ้าชิ้นเอก
          โดยจะแสดงได้หลังจากที่ทำผ้าตัวอย่างเสร็จสิ้นแล้ว
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 1 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/โฮลเปราะห์.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 1"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 1 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 1
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 2 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ท้องผ้า.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 2"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 2 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 2
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 3 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่3.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 3"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 3 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 3
        </p>
        <p class="mb-4 text-justify indent-8">ลายที่ 4 ท้องผ้าโฮลเปราะห์</p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่4.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 4"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 4 แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 4
        </p>
        <p class="mb-4 text-justify indent-8">
          ลายที่ 4 เจือย (ชายผ้า) สำหรับผ้าโฮลเปราะห์
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ลายที่5.png"
            alt="แพทเทรินท้องผ้าโฮลเปราะห์ ลายที่ 5"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 5 แพทเทรินเจือยสำหรับผ้าโฮลเปราะห์
        </p>
        <br />
        <p class="mb-4 text-justify indent-8">
          แรงบันดาลใจในการทำผ้าโฮลเปราะห์
          มาจากวิถีการอยู่ร่วมกันของกลุ่มชาติพันธ์ไทยบุรีรัมย์ ได้แก่ ไทยเดิ้ง
          เขมร กูย และลาว กลุ่มชาติพันธุ์ดังกล่าวอยู่ร่วมกันอย่างแนบแน่น ลายผ้า
          ของใครงามก็ชื่นชม หยิบยืมไปใส่ในผืนผ้าของตัวเอง ไม่มีใครหวง
          ประสบการณ์ที่พูดคุยกับชาวบ้านกลุ่มทอผ้าหลากหลายชาติพันธุ์ไทยบุรีรัมย์
          ทำให้สัมผัสได้ แม่ใหญ่ฮวด ช่างทอผ้าบ้านดอนกลาง อำเภอนาโพธิ์
          เป็นชาวบ้านกลุ่มชาติพันธุ์ลาว ภูมิใจในผ้ามัดหมี่หัวแดงตีนแดง
          แต่เธอทำผ้ามัดหมี่ได้ทุกประเภท
          ชมชอบใส่สีเขียวแบบเขมรลงในลายหมี่ของเธอโดยไม่รู้ตัว แม่แอ็ด
          ช่างทอผ้าบ้านกระโดน อำเภอกระสัง เป็นช่างทอกลุ่มชาติพันธุ์เขมร
          นุ่งผ้าเนื้อเนียนพลิ้วแบบเขมรแต่เธอชื่นชมความสามารถในการมัดหมี่ของชาติพันธ์ลาว
          แถบพุทไธสงและนาโพธิ์ด้วยความจริงใจ และมักบอกกับตลอดเวลาว่า
          ถ้าเรื่องมัดหมี่ต้องยกให้พุทไธงและนาโพธิ์เลยสถานการณ์ดังกล่าวเป็นแรงบันดาลใจ
          อันสำคัญที่จะทำผ้าผืนพิเศษสุดให้สามารถรวบรวมจุดเด่น
          และความงามของผ้าของกลุ่มชาติพันธุ์ทั้งสี่เผ่าพันธุ์ให้ออกมาเป็นผ้าทอของไทยบุรีรัมย์
        </p>
        
        <figure class="mt-4">
                  <video
                    src="/assetts/css/video/IMG_3198-new.mp4"
                    autoplay
                    muted
                    playsinline
                    loop
                    class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
                  >
                    เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                  </video>
                  <figcaption class="text-center italic mt-2">
                    ผ้าโฮลเปราะห์
                  </figcaption>
                </figure>


        <p class="mb-4 text-justify indent-8">
          ดังนั้น การทำตัวอย่างผ้าโฮลเปราะห์ในครั้งนี้
          เลือกที่จะใส่เทคนิคการจกดาวสองชั้นไว้ที่เชิงผ้า เนื่องจาก
          การจกดาวที่ชายผ้านั้น ถือเป็นอัตลักษณ์ร่วมของผ้าตีนแดงบุรีรัมย์
          ซึ่งเป็นผ้าที่จังหวัดสนับสนุนให้คนในจังหวัดบุรีรัมย์ได้ใช้ทั่วกัน
          ต้องการให้ผ้าเขมรบุรีรัมย์มีส่วนในการคงอัตลักษณ์ร่วมไว้
          ทั้งนี้เพื่อให้ผู้คนหลายๆ
          ภาคส่วนยอมรับความเป็นเขมรบุรีรัมย์อย่างชื่นชม ผ้าชิ้นนี้
          ถือเป็นผ้าที่เป็นตัวเอก
          เพราะนอกเหนือจากการเหลือกลุ่มที่ทำผ้าชนิดนี้ที่บ้านหนองเพชร
          เพียงหมู่บ้านเดียว แล้ว การจกดาว ก็มีช่างทอทำได้เพียงไม่กี่คน
          เพราะใช้เวลานาน ต้องใช้ทักษะในการทอหลายอย่าง ดังนั้นในครั้งนี้
          เลือกสีสัน โครงสร้างลาย
          และเนื้อผ้าที่นุ่มพลิ้วแบบชาติพันธุ์เขมรไว้ในผืนเดียวกัน
          <strong
            >ให้ความหมายถึง ไทยบุรีรัมย์ที่อยู่ร่วมกันอย่างมีคุณค่า คุณประโยชน์
            งดงาม และสันติสุข</strong
          >
          ดอกดาวเรืองให้ความหมายถึงความเจริญรุ่งเรือง ผ่องใส ก้าวหน้า มีความหวัง
          จึงเลือกลายท้องผ้า ทำได้เพียง 2 ลาย
          และทอเสร็จการประชาสัมพันธ์เผยแพร่ตัวอย่างผ้าเพียงลายเดียว
          คือลายดอกจามจุรี แพทเทริน์ลายที่ 3
          โดยเมื่อผลิตเป็นผืนผ้าจะมีรูปลักษณ์ดังต่อไปนี้
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <img
            src="/assetts/css/image/ผ้าซิ่นหมี่3.jpg"
            alt="ผืนผ้าโฮลเปราะห์จกขิดดาว ลายดอกดาวเรือง"
            class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
          />
        </div>
        <p class="justify-center text-center italic">
          ภาพที่ 6 ผืนผ้าโฮลเปราะห์จกขิดดาว ลายดอกดาวเรือง
        </p>
        <br />
        <p class="mb-4 text-justify indent-8">
          ในการทำผ้าต้นแบบทั้งหมด กลุ่มชาติพันธุ์เขมรบุรีรัมย์
          กระจายออกไปจำนวน 12 กี่ 4 หมู่บ้าน ทั้งนี้
          เนื่องจากการทอผ้าเป็นงานศิลปะ อย่างหนึ่งเรียกงานศิลปหัตถกรรม
          จึงแสดงออกมาตามอัตลักษณ์ของตนเอง
          มาจากจิตวิญญาณและความชอบของตนเอง ผ้าจึงมีบุคลิกที่แตกต่างกัน
          แม้ว่าจะทำลวดลายเดียวกันก็ตาม เช่นเดียวกันกับผ้ามัดหมี่ทอมือของชาวบ้าน
          จะมีบุคลิกที่แตกต่างกันจากผ้าพิมพ์ลายมัดหมี่จากโรงงาน
          แม้ว่าผ้าพิมพ์ลายมัดหมี่จากโรงงาน จะให้รูปลักษณ์ที่คมชัด
          สีสันที่สวยงาม และเนื้อผ้าที่เรียบสม่ำเสมอ ก็ตาม
          หรืออาจเปรียบความงามของหญิงสาวแท้ๆ กับความงามของหญิงสาวดัดแปลง
          แม้หญิงสาวดัดแปลงจะสวยงามสมบูรณ์เพียงใดก็ตาม นี่คือความสำคัญ
          และความแตกต่างของอัตลักษณ์ อัตลักษณ์จึงเป็นความงามจากตัวตนที่แตกต่าง
          เป็นความงามที่เสน่ห์เฉพาะ
          เป็นความงามที่เป็นหนึ่งซึ่งใครก็ลอกเลียนแบบไม่ได้
        </p>

        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          คุณลักษณะของผ้า
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
        
        <p class="text-2xl font-extrabold text-purple-800 dark:text-white mb-4">
          การแต่งกายด้วยผ้าโฮลเปราะห์
        </p>
        <p class="mb-4 text-justify indent-8">
          เมื่อนำไปทดลองนุ่งห่มในระเบียบการนุ่งแบบไทยพื้นบ้าน
          เพื่อการประชาสัมพันธ์ผ้าตัวอย่าง ที่ศูนย์การค้าโรบินสันบุรีรัมย์
          เมื่อวันที่ 10 สิงหาคม ก็เห็นคุณค่าและความงามที่ปรากกฎได้ดังต่อไปนี้
        </p>
        <div class="flex justify-center gap-8">
          <div class="text-center">
            <img
              src="/assetts/css/image/นุ่งห่ม.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 7 การนุ่งผ้าโฮลเปราะห์จกขิดดาว ลาย <br>ดอกดาวเรือง ในรูปลักษณ์ <br>การนุ่งห่มแบบไทย
            </p>
          </div>

          <div class="text-center">
            <img
              src="/assetts/css/image/ผ้าซิ่นหมี่6.jpg"
              alt="การแต่งกายด้วยผ้าซิ่นหมี่และโฮลเปราะห์"
              class="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <p class="italic mt-2">
              ภาพที่ 8 การนุ่งผ้าโฮลเปราะห์จกขิดดาว ลาย <br>ดอกดาวเรือง ในรูปลักษณ์ <br>การนุ่งห่มแบบไทย
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
