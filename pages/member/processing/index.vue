<script setup>
definePageMeta({
  layout: "member",
});

const r = useRoute();
const params = computed(() => r.query.menu || "weaving");

const data_center = [
  {
    name: "กระบวนการทอผ้า",
  },
  {
    name: "ลวดลายผ้า",
  },
  {
    name: "อัตลักษณ์ผ้าบุรีรัมย์",
  },
];

const weaving = [
  {
    name: "เทคนิคการผลิตผ้าทอมือ",
    path: "/member/information_list/cloth/cloth10",
  },
  { name: "การย้อมสี", path: "/member/information_list/cloth/cloth11" },
  {
    name: "การตกแต่งเส้นด้ายยืนพุ่ง",
    path: "/member/information_list/cloth/cloth12",
  },
  { name: "อุปกรณ์การทอ", path: "/member/information_list/cloth/cloth14" },
  {
    name: "ขั้นตอนการทอผ้า",
    path: "/member/information_list/identityy/identity13",
  },
];

const pattern = [
  { name: "ผ้าหางกระรอก", path: "/member/information_list/cloth/cloth1" },
  { name: "ผ้าโสร่ง", path: "/member/information_list/cloth/cloth2" },
  { name: "ผ้าซิ่นหมี่", path: "/member/information_list/cloth/cloth3" },
  { name: "ผ้าโฮลเปราะห์", path: "/member/information_list/cloth/cloth6" },
  { name: "ผ้ายกดอกสไบยกดอก",path: "/member/information_list/cloth/cloth4",},
  { name: "ผ้าขาวม้าสไบยกขิด",path: "/member/information_list/cloth/cloth5",},
];

const identity = [
  {
    name: "อัตลักษณ์ผ้าเขมร",
    path: "/member/information_list/identityy/identity2",
  },
  { name: "ผ้าพื้น", path: "/member/information_list/identityy/identity3" },
  { name: "ผ้าลายริ้ว", path: "/member/information_list/identityy/identity4" },
  { name: "ผ้าลายตาราง", path: "/member/information_list/identityy/identity5" },
  { name: "ผ้ามัดหมี่", path: "/member/information_list/identityy/identity6" },
  {
    name: "ลายรูปลักษณ์เครื่องใช้",
    path: "/member/information_list/identityy/identity7",
  },
  {
    name: "ลายงานสถาปัตยกรรม",
    path: "/member/information_list/identityy/identity8",
  },
  {
    name: "ลายพืชธรรมชาติ",
    path: "/member/information_list/identityy/identity9",
  },
  {
    name: "ลายรูปคนและสัตว์",
    path: "/member/information_list/identityy/identity10",
  },
  {
    name: "ลายที่แสดงวิถีชีวิต",
    path: "/member/information_list/identityy/identity11",
  },
  {
    name: "ลายประยุกต์",
    path: "/member/information_list/identityy/identity12",
  },
];

const style_weaving =
  "inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center text-purple-700 hover:bg-purple-200 hover:text-black transition";

const style_pattern =
  "inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center  text-purple-700 hover:bg-purple-200 hover:text-black transition";

const style_identity =
  "inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center text-purple-700 hover:bg-purple-200 hover:text-black transition";
</script>

<template>
  <div
    class="relative min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat md:bg-fixed pb-24 md:pb-28 lg:pb-32"
  >
    <CommonButtonBack />
    
    <div class="container mx-auto">
      <div class="pt-16 pb-8 text-center">
        <h1
          class="text-5xl font-bold text-white"
          style="text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6)"
        >
          {{
            params === "weaving"
              ? data_center[0].name
              : params === "pattern"
              ? data_center[1].name
              : params === "identity"
              ? data_center[2].name
              : ""
          }}
        </h1>
      </div>

      <div
        class="mt-8 text-left md:text-justify text-xl leading-relaxed text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
      
        <!-- กระบวนการทอผ้า -->
        <div v-if="params === 'weaving'">
          <div class="grid grid-cols-5 gap-4">
            <card-menu
              v-for="(item, index) in params === 'weaving'
                ? weaving
                : params === 'pattern'
                ? pattern
                : params === 'identity'
                ? identity
                : []"
              :key="index"
              :name="item.name"
              :path="item.path"
              :style="
                params === 'weaving'
                  ? style_weaving
                  : params === 'pattern'
                  ? style_pattern
                  : style_identity
              "
            />
          </div>
          <br />
          <div>
            <p class="text-2xl font-extrabold text-purple-800 dark:text-white">
              เทคโนโลยีและนวัตกรรมในการทอผ้า
            </p>

            <p class="mb-4 text-justify indent-8">
              กระบวนการทอผ้าเขมรบุรีรัมย์
              เทคโนโลยีและนวัตกรรมเป็นสิ่งที่เกิดขึ้นพร้อมกับกระบวนการทอผ้า
              และการเรียนรู้เรื่องการทอผ้า เป็นเทคโนโลยีที่เหมาะสมกับพื้นที่
              สิ่งแวดล้อม
              และพฤติกรรมการใช้ของผู้คนแต่ละพื้นที่มีเทคโนโลยีที่แตกต่างกันไปตามความถนัด
              ในจังหวัดบุรีรัมย์ถ้าพูดถึงแค่ประเภทของกี่ทอผ้ามีอยู่ถึง
              <span class="font-bold">3 ชนิด</span>
              ไม่รวมรายละเอียดย่อย เช่น ขนาดโครงสร้าง วัสดุที่ใช้ผลิต
              และศิลปะในการสร้างกี่ เป็นต้น
              แต่ละขั้นตอนในการทอผ้ามีเทคโนโลยีและนวัตกรรมที่จัดหมวดหมู่ได้คือ
              <span class="font-bold"
                >กระบวนการผลิตเส้นใย การฟอกย้อมเส้นใย และการทอผ้า</span
              >
              มีรายละเอียด ดังนี้
            </p>
            <p class="text-xl font-semibold text-purple-700 mt-6">
              เทคโนโลยีและนวัตกรรมในกระบวนการผลิตเส้นใย
            </p>

            <p class="mb-4 text-justify indent-8 leading-relaxed">
              เป็นกระบวนการต้นน้ำ ชาวบ้านในจังหวัดบุรีรัมย์จะปลูกหม่อน
              เลี้ยงไหมซึ่งเป็นความรู้ที่ตกทอดกันมานานมากตั้งแต่บรรพบุรุษ
              เทคโนโลยีในการปลูกหม่อนเลี้ยงไหมเป็นเทคโนโลยีที่ไม่ซับซ้อน
              ใช้การสังเกตพฤติกรรม การใช้งานสร้างเทคโนโลยีขึ้นมา เช่น
              รังไหมสำหรับให้หนอนไหมชักใย ชาวบ้านจะนำกิ่งไม้ที่มีกิ่งก้านเล็ก ๆ
              ละเอียดมารวบหัวท้ายเข้าด้วยกัน
              มีไม้เป็นตะขอไว้เกาะกับราวเพื่อห้อยรังสำหรับให้หนอนไหมซักใย
              ก่อนนำไปให้หนอนไหมชัก ต้องใช้ไม้ปั่นเส้นเล็ก ๆ ที่ติดอยู่ให้สะอาด
              นำไปผึ่งแดดจัดเพื่อฆ่าเชื้อโรค จึงนำมาให้หนอนไหมทำรังไหมได้
              ชาวบ้านจะระวังเรื่องความสะอาดอย่างมาก
              เนื่องจากหนอนไหมเป็นสัตว์ที่อ่อนแอมาก ชาวบ้านเรียกหนอนไหมว่า
              <span class="font-bold">“โกนเนียง”</span>
              <span class="font-bold">“โกน”</span> หมายถึง ลูก
              <span class="font-bold">“เนียง”</span>
              เป็นชื่อเรียกผู้หญิงอย่างสุภาพ หรือน่าเอ็นดู น่าทะนุถนอม
              “โกนเนียง” จะแปลว่า
              <span class="italic">“ลูกสาวที่ควรค่าแก่การทนุถนอม”</span>
              คือการปลูกหม่อนเลี้ยงไหมต้องใช้เทคโนโลยีหรือนวัตกรรมการเลี้ยงที่ประณีต
              น่ารัก และน่าทะนุถนอม
            </p>

            <br />
            <div class="flex justify-center gap-4">
              <div class="sm:col-span-3 text-center">
                <img
                  src="/assetts/css/image/สวนหม่อนข้างบ้าน.jpg"
                  alt="Home Illustration"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                />
                <p class="italic">ภาพที่ 1 สวนหม่อนข้างบ้าน</p>
              </div>
              <div class="sm:col-span-3 text-center">
                <img
                  src="/assetts/css/image/หนอนไหม.jpg"
                  alt="Home Illustration"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                />
                <p class="italic">ภาพที่ 2 หนอนไหมพันธุ์นางน้อย</p>
              </div>
              <div class="sm:col-span-3 text-center">
                <img
                  src="/assetts/css/image/อาหารหนอนไหม.jpg"
                  alt="Home Illustration"
                  class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                />
                <p class="italic">ภาพที่ 3 การให้อาหารหนอนไหม</p>
              </div>
            </div>
            <br />
            <p class="mb-4 text-justify indent-8">
              หลังจากเตรียมรังสำหรับหนอนไหมสะอาดเรียบร้อยแล้วจะโรยหนอนไหมที่สุกแล้วกระจายให้ทั่วถึง
              หนอนจะเลือกเกาะเกี่ยวกับกิ่งไม้ที่เหมาะ
              และจึงเริ่มชักใยจากด้านนอกเข้าหาตัวเองอย่างมีความสุขเป็นรังไหม
              เพื่อลอกคราบเปลี่ยนตัวเองเป็นผีเสื้อเพื่อผสมพันธุ์ ออกไข่เป็นหนอน
              กินใบไม้จนตัวเองแก่สุก ทำรังห่อหุ้มตัวเอง
              เพื่อกลายร่างเป็นผีเสื้อเป็นวัฏจักร
              นอกจากเทคโนโลยีเพื่อให้ได้มาซึ่งรังไหมสำหรับการสาวไหมก็เข้าสู่กระบวนการสาวเป็นเส้นไหม
              เทคโนโลยีและเครื่องมือที่ใช้ในการสาวไหมเป็นเครื่องมือที่ใช้ในกระบวนการต่อไปนี้คือ
            </p>

            <div class="space-y-4">
              <div>
                <p class="font-semibold">1.ส่วนของการเตรียมรังไหม มีดังนี้</p>
                <ol class="list-decimal ml-6 space-y-1">
                  <li>ตากรังไหมให้เส้นฟู</li>
                  <div class="mt-4 flex justify-center gap-4">
                    <img
                      src="/assetts/css/image/ตากรังไหม.png"
                      alt="Home Illustration"
                      class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                    />
                  </div>
                  <p class="justify-center text-center italic">
                    ภาพที่ 4 ตากรังไหมให้เส้นใยฟู
                  </p>
                  <li>ดึงสิ่งสกปรกออกจากรังไหมพักรอไว้</li>
                </ol>
                <div class="mt-4 flex justify-center gap-4">
                  <img
                    src="/assetts/css/image/ดึงสิ่งสกปรกออกจากรังไหม.jpg"
                    alt="Home Illustration"
                    class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
                  />
                </div>
                <p class="justify-center text-center italic">
                  ภาพที่ 5 การดึงสิ่งสกปรกออกจากรังไหม
                </p>
              </div>

              <div>
                <p class="font-semibold">2. ส่วนเครื่องมือและอุปกรณ์</p>
                <ol class="list-decimal ml-6 space-y-1">
                  <li>เตาฟืนหรือเตาถ่าน</li>
                  <li>
                    ใส่น้ำสะอาดในหม้อทรงสูงปากบานสำหรับนึ่งข้าว ยกขึ้นตั้งไฟ
                  </li>
                  <li>ประกอบอุปกรณ์การสาวเส้นไหม ยึดให้แข็งแรง</li>
                  <li>
                    รอน้ำร้อนเป็นไอ (ไม่เดือด) ประมาณ 70 องศาเซลเซียส
                    ชาวบ้านเรียกว่าประมาณน้ำลวกไก่ร้อน ๆ
                  </li>
                  <li>
                    ใส่รังไหมลงไปประมาณ 40–50 รัง
                    ใช้ไม้ที่มีปลายผ่าเป็นร่องสองร่องเพื่อให้เส้นใยลอดผ่าน
                    กดรังไหมให้ท่วมน้ำเล็กน้อย
                  </li>
                  <li>
                    มือซ้ายดึงเส้นขึ้นบางส่วน
                    มือขวาใช้ไม้สาวไหมกดรังไหมส่ายไปมาเล็กน้อย
                    เพื่อให้ใยไหมหลุดออกจากรังง่ายขึ้น
                  </li>
                  <li>
                    นำเส้นใยพันรอบวงล้อพันเกลียว 5–10 รอบ ผ่าไปทีละวงล้อ
                    เครื่องมือดั้งเดิมจะมีวงล้อเดียว ปัจจุบันมี 3 วงล้อ
                    เป็นการพัฒนาเครื่องมือเพื่อให้สาวเส้นใยได้กลมเรียบขึ้น
                    สม่ำเสมอขึ้น ลดขั้นตอนการตีเกลียว
                  </li>
                  <li class="space-y-2">
                    <div>ดึงเส้นใยทิ้งลงตะกร้าเป็นชั้น ๆ</div>
                    <figure class="mt-4">
                      <img
                        src="/assetts/css/image/สาวเส้นใยใส่ตะกร้า.jpg"
                        alt="การดึงสิ่งสกปรกออกจากรังไหม"
                        class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto mx-auto"
                      />
                      <figcaption class="text-center italic mt-2">
                        ภาพที่ 6 สาวเส้นใยใส่ตะกร้า
                      </figcaption>
                    </figure>
                  </li>

                  <li class="space-y-2">
                    <div>
                      กวักเส้นใยขึ้นกงจัดเรียงเส้นใยเป็นรูปตาข่าย เขมรจะนับเส้น
                      กวักได้ 4 รอบนับเป็น 1 หน่วย กวักทั้งหมด 100 หน่วย
                      เรียกไหม 100 จะพุ่งเส้นพุ่งได้ผ้าหนึ่งผืน ยาว 7 ศอก
                      ปัจจุบันใช้กะเอา โดยมีน้ำหนักเฉลี่ยประมาณ 70–100 กรัม
                      เนื่องจากกงกวักไหมมีขนาดเล็กลง
                    </div>
                    <figure class="mt-4">
                      <video
                        src="/assetts/css/video/IMG_1560-new.mp4"
                        autoplay
                        muted
                        playsinline
                        loop
                        class="rounded-2xl shadow-lg max-w-md w-full h-auto mx-auto"
                      >
                        เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                      </video>
                      <figcaption class="text-center italic mt-2">
                        กวักเส้นขึ้นกงจัดเรียงเส้นเป็นรูป
                      </figcaption>
                    </figure>
                  </li>
                  <li class="space-y-2">
                    <div>ตากให้แห้ง เก็บเป็นใจสำหรับใช้ทอผ้าต่อไป</div>
                    <div class="mt-4 flex justify-center gap-6">
                      <figure class="w-1/2">
                        <img
                          src="/assetts/css/image/เส้นใยไปผึ่งแดดให้แห้งสนิท.jpg"
                          alt="การดึงสิ่งสกปรกออกจากรังไหม"
                          class="rounded-2xl shadow-lg object-cover w-full h-auto"
                        />
                        <figcaption class="text-center italic mt-2">
                          ภาพที่ 7 การนำเส้นใยไปผึ่งแดดให้แห้งสนิท
                        </figcaption>
                      </figure>
                      <figure class="w-1/2">
                        <img
                          src="/assetts/css/image/ไหมพันธุ์พื้นบ้าน.jpg"
                          alt="การดึงสิ่งสกปรกออกจากรังไหม"
                          class="rounded-2xl shadow-lg object-cover w-full h-auto"
                        />
                        <figcaption class="text-center italic mt-2">
                          ภาพที่ 8 ไหมพันธุ์พื้นบ้านชื่อ “นางน้อย”
                        </figcaption>
                      </figure>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <br />
          
        </div>
        <!-- ลวดลาย -->
        <div v-else-if="params === 'pattern'">
          <div class="grid grid-cols-6 gap-4">
            <card-menu
              v-for="(item, index) in params === 'weaving'
                ? weaving
                : params === 'pattern'
                ? pattern
                : params === 'identity'
                ? identity
                : []"
              :key="index"
              :name="item.name"
              :path="item.path"
              :style="
                params === 'weaving'
                  ? style_weaving
                  : params === 'pattern'
                  ? style_pattern
                  : style_identity
              "
            />
          </div>
          <br>
          <h2
            id="design-overview"
            class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
          >
            การออกแบบลวดลายผ้าทอมือ
          </h2>
          <br />
          <h3
            id="design-importance"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            ความสำคัญของการออกแบบ (บริบทไทยแลนด์ 4.0)
          </h3>
          <ol class="list-decimal list-inside indent-8 space-y-3 text-justify">
            <li>
              <span class="font-semibold">ผ้าทอมือเป็นสินค้าแฟชั่น</span> —
              ต้องตอบสนองความพึงพอใจและความสุขของผู้บริโภค จึงต้องมีทั้ง
              “คุณค่า” และ “ความงาม”
              ความรู้ในการออกแบบคือเครื่องมือสร้างคุณค่าและความงามให้ผลิตภัณฑ์ผ้า
            </li>
            <li>
              <span class="font-semibold"
                >ผ้าทอมือสะท้อนวิถี คน และวัฒนธรรม</span
              >
              — การออกแบบต้องมี “อัตลักษณ์” ของชุมชนอย่างชัดเจน
            </li>
            <li>
              <span class="font-semibold"
                >การออกแบบคือศิลปะของศิลปินพื้นบ้าน</span
              >
              — จำเป็นต้องศึกษาและอธิบายอัตลักษณ์/ตัวตนท้องถิ่นให้ชัด มิฉะนั้นจะ
              “ทำลายตัวตนชุมชน” มากกว่าส่งเสริมศักยภาพ เมื่อใดชุมชนหมดอัตลักษณ์
              เมื่อนั้นชุมชนและชาติพันธุ์ย่อมอ่อนแรง; ในทางกลับกัน
              หากคงอัตลักษณ์ได้ ไม่ว่ารูปแบบใด ชุมชนและชาติพันธุ์ย่อมยั่งยืน
              (เทียบกรณีชาติพันธุ์มอญในไทย—สายสัมพันธ์ใกล้ชิดกับเขมร
              บางครั้งเรียก “มอญ–เขมร”—แม้ไม่มีประเทศมอญ
              แต่ยังเป็นที่รู้จักผ่านวัฒนธรรมและตัวตนของตนเอง)
              การคงอัตลักษณ์ช่วยส่งเสริม “การยอมรับความหลากหลาย”
              และการอยู่ร่วมกันอย่างเป็นสุขของสังคม
            </li>
          </ol>

          <h3
            id="jarunee-framework"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            กรอบการออกแบบตาม จารุณี ชัยโชติอนันต์ (2558)
          </h3>
          <p class="text-justify indent-8">
            “การออกแบบผ้า” คือการวางแผนล่วงหน้าว่าจะผลิตผ้าออกมาอย่างไร
            ใช้ในโอกาสไหน ใครเป็นผู้ใช้ และใช้อย่างไร
            โดยควรพิจารณาองค์ประกอบหลักดังต่อไปนี้:
          </p>

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

          <h4
            id="pattern-design"
            class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
          >
            2) การออกแบบลายผ้า
          </h4>
          <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
            <li>
              ประโยชน์ใช้สอย — เช่น ผ้านุ่ง ผ้าเมตร ผ้าพันคอ ผ้าคลุมไหล่
              ผ้าทอหมอน ฯลฯ
            </li>
            <div class="mt-4 flex justify-center gap-4">
              <img
                src="/assetts/css/image/ประโยชน์ใช้สอย.jpg"
                alt="คน"
                class="rounded-2xl shadow-lg object-cover max-w-md w-full h-auto"
              />
            </div>
            <p class="justify-center text-center italic">
              ภาพที่ 1 ผ้านุ่ง ผ้าพันคอ ผ้าคลุมไหล่
            </p>
            <br />
            <li>
              การให้สี — สีเส้นยืน–สีเส้นพุ่ง
              เมื่อนำมาทอรวมกันแล้วเกิดอารมณ์ภาพรวมอย่างไร
            </li>
            <li>
              ความสวยงามเชิงองค์ประกอบ — ช่องว่าง (negative space) และความสมดุล
            </li>
          </ol>

          <h4
            id="process-design"
            class="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200"
          >
            3) การออกแบบกระบวนการผลิตและการทอ
          </h4>
          <ol class="list-decimal list-inside indent-8 space-y-2 text-justify">
            <li>
              ขั้นตอนการผลิตและเครื่องมือ — แต่ละขั้นตอนใช้เครื่องมือชนิดใด
            </li>
            <li>ชนิดของกี่ทอผ้า — เลือกชนิดกี่ให้เหมาะกับลาย/เทคนิค</li>
            <li>
              การเก็บและเหยียบตะกอ —
              วิธีจัดตะกอและลำดับเหยียบเพื่อให้เกิดลายตามต้องการ
            </li>
            <li>วิธีการทอ — จังหวะทอ เทคนิคเฉพาะ และการควบคุมคุณภาพ</li>
          </ol>
          <br />
          
        </div>
        <!-- อัตลักษณ์ -->
        <div v-else-if="params === 'identity'">
          <div class="grid grid-cols-6 gap-4">
            <card-menu
              v-for="(item, index) in params === 'weaving'
                ? weaving
                : params === 'pattern'
                ? pattern
                : params === 'identity'
                ? identity
                : []"
              :key="index"
              :name="item.name"
              :path="item.path"
              :style="
                params === 'weaving'
                  ? style_weaving
                  : params === 'pattern'
                  ? style_pattern
                  : style_identity
              "
            />
          </div>
          <br />
          <h2
            id="buriram-identity"
            class="text-2xl md:text-3xl font-extrabold text-purple-800 dark:text-white"
          >
            ความรู้เกี่ยวกับอัตลักษณ์ผ้าบุรีรัมย์
          </h2>
          <br />
          <p class="text-justify indent-8">
            อ้างถึงแนวคิดของ
            <span class="font-medium">จารุณี ชัยโชติอนันต์ (2555)</span>
            ในหนังสือ
            <span class="italic">สืบสานตำนาไหมบุรีรัมย์</span>
            การทอผ้าทอมือสัมพันธ์แนบแน่นกับ “ความเป็นชุมชน” และ “วัฒนธรรมชุมชน”
            ลวดลาย–กระบวนการทอคือองค์ความรู้ที่สืบทอดยาวนาน
            ผ้ามีบทบาทเฉพาะในสังคม: เป็นเครื่องนุ่งห่ม,
            องค์ประกอบพิธีกรรมเกิด–แก่–เจ็บ–ตาย, ชุดพิเศษยามรื่นเริง, ตลอดจนเป็น
            “เครื่องวัดความพร้อม” ของคนในบางบริบท
            ลวดลาย–สีสันจึงสื่อความหมายต่างกันตามวัตถุประสงค์การใช้และวิธีคิดของสังคม
          </p>
          <br />
          <h3
            id="identity-dynamics"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            ลวดลาย ความเปลี่ยนแปลง – ความคงทน
          </h3>
          <p class="text-justify indent-8">
            ลายผ้าทอมือ “เปลี่ยนไปตามสังคมและวิถีชีวิต” บางลายเป็นแฟชั่น
            (มา–ไปตามกาลเวลา) แต่อีกหลายลาย “คงอยู่” เนิ่นนานร้อย–พันปี
            เพราะทำหน้าที่เป็นสัญลักษณ์ทางสังคม
            และบรรจุเรื่องเล่าของชุมชนไว้ในโครงสร้างผ้า สี และองค์ประกอบ
          </p>
          <br />
          <h3
            id="shared-identity"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            เหมือนในความต่าง 4 กลุ่มชาติพันธุ์ในบุรีรัมย์
          </h3>
          <p class="text-justify indent-8">
            ผ้าทอมือบุรีรัมย์จาก
            <span class="font-medium">ไทยเดิ้ง, ลาว, เขมร, กูย</span> มี
            “อัตลักษณ์ร่วม” จำนวนมาก จนกล่าวได้ว่า
            <span class="font-semibold">ความเหมือนในความแตกต่าง</span> —
            เปรียบดังการจัดดอกไม้ต่างสี แต่ลงตัวสวยงาม ลวดลาย/สีสันของ
            “ลาวบุรีรัมย์” อาจต่างจากลาวพื้นที่ไกล แต่คล้ายคลึงกับลาวพื้นที่ใกล้
            แม้ข้ามเขตจังหวัด แสดงให้เห็นว่า
            <span class="font-medium">พรมแดนการปกครอง</span> ไม่ทับซ้อนกับ
            <span class="font-medium">พรมแดนทางวัฒนธรรม</span> เสมอไป
            ผ้าทอมือจึงทำหน้าที่เป็น “สื่อสัญลักษณ์” สะท้อนสังคมแต่ละห้วงเวลา
            ผ่านลาย สี เนื้อ และรูปลักษณ์
          </p>
          <br />
          <h3
            id="symbolic-reading"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            ลายผ้าเพื่ออ่านสังคม
          </h3>
          <p class="text-justify indent-8">
            การเรียนรู้ “สัญลักษณ์บนผืนผ้า”
            ช่วยให้เข้าใจวิถีชีวิต–อุปนิสัยของผู้คน เกิดการยอมรับ
            “ความเหมือนที่แตกต่าง” และเห็นคุณค่าความงามที่หลากหลาย
            ผ้าทอมือจึงเป็นเครื่องมือสร้างสังคมสงบสุข—เมื่อเรามองเห็นคุณค่าความงามของผ้าแต่ละชิ้น
            เราก็พร้อมเห็นคุณค่าความงามของ “ผู้คน” ที่อยู่ร่วมกัน
          </p>
          <br />
          <h3
            id="identity-patterns"
            class="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300"
          >
            ประเภทลวดลายอัตลักษณ์ร่วม (กลุ่มไทยในบุรีรัมย์)
          </h3>
          <p class="text-justify indent-8">
            ลวดลายอัตลักษณ์ที่พบร่วมกันโดยสังเขป (ตัวอย่าง
            <span class="font-medium">8 ประเภทหลัก</span>):
          </p>
          <ul class="list-disc list-inside indent-8 space-y-2 text-justify">
            <li>
              <span class="font-medium">ผ้าพื้น</span> —
              เน้นผิว–สี–ความเรียบง่าย ใช้ได้อเนกประสงค์
            </li>
            <li>
              <span class="font-medium">ผ้าลายริ้ว</span> — ริ้วขวาง/ริ้วตามยืน
              สร้างจังหวะและน้ำหนักสี
            </li>
            <li>
              <span class="font-medium">ผ้าลายตาราง</span> — สมดุล–เป็นทางการ
              เหมาะทั้งใช้สอยและพิธีการ
            </li>
            <li>
              <span class="font-medium">ลายเรขาคณิต</span> — เช่น ลายโคม, ลายขอ,
              ลายนาค, ลายหมากจับ, ลายขาเปีย ฯลฯ (สื่อความเชื่อ ความศักดิ์สิทธิ์
              ความคุ้มครอง)
            </li>
            <li>
              <span class="font-medium">ลายจากข้าวของเครื่องใช้</span> —
              หยิบรูปทรงชีวิตประจำวันมาสร้างความหมายใหม่
            </li>
            <li>
              <span class="font-medium">ลายจากงานสถาปัตยกรรม</span> —
              รับอิทธิพลลวดลายศิลป์–ศาสนสถานในถิ่น
            </li>
            <li>
              <span class="font-medium">ลายจากพืชพรรณธรรมชาติ</span> — ดอก ใบ
              เถา เฉดสีจากภูมิทัศน์ท้องถิ่น
            </li>
            <li>
              <span class="font-medium">ลายประยุกต์–ประสมประสาน</span> —
              ผสานเทคนิค/แรงบันดาลใจร่วมสมัยและดั้งเดิม
            </li>
          </ul>
          <p class="text-justify indent-8">
            ทั้ง 4 กลุ่มชาติพันธุ์ทอได้ครบหมวดหมู่ข้างต้น สีสัน “หลากหลาย”
            แต่ระดับความเข้ม น้ำหนักสี และการจัดองค์ประกอบแตกต่างไปตาม
            “รสนิยมชุมชน” และ “บริบทการใช้” (เช่น งานพิธี–งานประจำวัน)
          </p>
          <br />
          
        </div>
      </div>

      <!--<div class="grid grid-cols-3 gap-4">
        <card-menu
          v-for="(item, index) in params === 'weaving'
            ? weaving
            : params === 'pattern'
            ? pattern
            : params === 'identity'
            ? identity
            : []"
          :key="index"
          :name="item.name"
          :path="item.path"
          :style="
            params === 'weaving'
              ? style_weaving
              : params === 'pattern'
              ? style_pattern
              : style_identity
          "
        />
      </div>-->
    </div>
  </div>
</template>
