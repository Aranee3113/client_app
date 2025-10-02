export type SectionItem = {
  id: string;                 // unique id เช่น "cloth1"
  group: "cloth" | "identity" ; // หมวด
  name: string;               // ชื่อสั้นอ่านรู้เรื่อง
  summary?: string;           // คำอธิบายย่อ
  path: string;               // path ที่จะพาไป (มี /type ติดท้าย)
  anchors?: string[];         // ถ้ามี id ของหัวข้อในหน้านั้น เช่น #intro
  keywords: string[];         // คำค้น (ไทย/อังกฤษได้)
};

/**
 * ดัชนีชิ้นงานแบบละเอียด – ตอนนี้ใส่ให้หมวด cloth ตัวอย่างครบจากเนื้อหาที่ให้มา
 * (cloth1 – cloth6). หมวด identity เติมต่อได้ด้วยรูปแบบเดียวกัน
 */
export const SECTIONS: SectionItem[] = [
  {
    id: "cloth1",
    group: "cloth",
    name: "ผ้าหางกระรอก (กระเนียว/กะเนียวเสร็ย)",
    summary:
      "อัตลักษณ์เขมรบุรีรัมย์ เส้นพุ่งควบเกลียว 2 สี เงาเหลือบ—ลายกระรอกสาว, อัมพรภิรมย์, เบญจลักษณ์นรี",
    path: "/member/information_list/cloth/cloth1",
    anchors: ["#intro", "#features", "#styling", "#source"],
    keywords: [
      "หางกระรอก","ผ้าหางกระรอก","กระเนียว","กะเนียว","กะเนียวสรัย","กระเนียวสรัย",
      "ไหมควบ","เส้นพุ่งควบ","เหลือบเงา","สองสี","ตะกอ 2","ทอลายขัด","ริมผ้า",
      "ชายพก","หน้านาง","หางกระเบน","อัมพรภิรมย์","กระรอกสาว","เบญจลักษณ์นรี",
      "สีตุมปริง","กรมท่า","ชมพูม่วง","แดงน้ำหมาก","บ้านสนวนนอก","หนองเพชร"
    ]
  },
  {
    id: "cloth2",
    group: "cloth",
    name: "ผ้าโสร่ง (ซับโสร่ง/เปิดตาโสร่ง)",
    summary:
      "แพทเทิร์นตัวผ้าและเจือย 2 แบบ—โทนแดง–เขียว และโทนกรมท่า แนวคิดซับโสร่ง, ไหมควบ, ตารางใหญ่–เล็ก",
    path: "/member/information_list/cloth/cloth2",
    keywords: [
      "โสร่ง","ซับโสร่ง","เปิดตาโสร่ง","เจือย","ลายตาราง","มัดหมี่",
      "ไหมควบ 6","ฟันหวี 1760","หน้ากว้าง 102 ซม",
      "เขียวขี้ม้า","แดงเลือดหมู","กรมท่า","เขียวไข่กา",
      "สาวๆ แก้มเรื่อ","บนดินก็มีข้าวเขียว",
      "นุ่งโจง","โจงกระเบน","ผ้าไหมเขมร","ไทยพื้นบ้าน",
      "บ้านสนวนนอก","บ้านหนองเพชร","บ้านตะเคียน","บ้านสวายเจริญ","บ้านไม้แดง","บ้านหนองเต็ง"
    ]
  },
  {
    id: "cloth3",
    group: "cloth",
    name: "ผ้าซิ่นหมี่ ",
    summary:
      "คัดลายหมี่ยอดนิยม: ปะกากรองสะนัน, ปะกากะยอม, พวงเพชรพริ้งพราย + ชุดตีนซิ่น (ประโบล) 1–4",
    path: "/member/information_list/cloth/cloth3",
    keywords: [
      "ซิ่นหมี่","ซำปั๊วดโฮล","มัดหมี่","ตีนซิ่น","ประโบล",
      "ปะกากรองสะนัน","ปะกากะยอม","พวงเพชรพริ้งพราย",
      "เทอกระแซ","ดอกพะยอม","โคม","นางอัปสรา",
      "หัวแดงตีนแดง","รักร้อยรวมใจ","แพทเทิร์น 37 ลำ"
    ]
  },
  {
    id: "cloth4",
    group: "cloth",
    name: "ผ้าผ้ายกดอกและผ้าสไบยกดอก",
    summary:
      "พื้นขาว–ย้อมมะเกลือ ดำหรู ตะกอ ≤ 7 ขอบลายสองด้าน—ลาย ดอกกันเกรา, ดอกแก้วกาหลง",
    path: "/member/information_list/cloth/cloth4",
    keywords: [
      "ผ้ายกดอก","สไบยกดอก","ย้อมมะเกลือ","สีดำ","ขอบลายสองด้าน","ตะกอ 4","ตะกอ 6","ตะกอ 7",
      "ดอกกันเกรา","มันปู","ดอกแก้วกาหลง","เกาะดัจ","พนมเปญ","พรีเมี่ยม"
    ]
  },
  {
    id: "cloth5",
    group: "cloth",
    name: "ผ้าขาวม้ายกขิด ผ้าสไบยกขิด",
    summary:
      "ลายโกนจะดอ (เกล็ดปลาชะโด) สีครบ 5—เวอร์ชันผ้าขาวม้าและสไบยกขิด ลายกรวยเชิงดอกคูณ",
    path: "/member/information_list/cloth/cloth5",
    keywords: [
      "ผ้าขาวม้า","ยกขิด","สไบยกขิด","โกนจะดอ","เกล็ดปลาชะโด","ดอกแก้ว","กรวยเชิงดอกคูณ",
      "ฟันหวี 1200","หน้ากว้าง 75 ซม","ฟันหวี 880","หน้ากว้าง 65 ซม","ไหม 20/22 ดีเนียร์ ควบ 4","ไหมควบ 6"
    ]
  },
  {
    id: "cloth6",
    group: "cloth",
    name: "ผ้าโฮลเปราะห์ ",
    summary:
      "ท้องผ้า 4 ลาย + เจือย 1 ลาย ยาวราว 4 หลา ใช้นุ่งโจง/หน้านาง—ตัวอย่าง ‘ดอกดาวเรือง’, ‘ดอกจามจุรี’",
    path: "/member/information_list/cloth/cloth6",
    keywords: [
      "โฮลเปราะห์","ปูมเขมร","ท้องผ้า","เจือย","จกดาว","จกดาวสองชั้น",
      "ยาว 4 หลา","นุ่งโจง","หน้านางลอยชาย","ผ้าตัวเอก",
      "ดอกดาวเรือง","ดอกจามจุรี","ไหม 20/22 ดีเนียร์ ควบ 4","ไหมควบ 6",
      "บ้านหนองเพชร"
    ]
  },
  {
    "id": "identity1",
    "group": "identity",
    "name": "อัตลักษณ์ผ้าบุรีรัมย์",
    "summary": "ภาพรวมอัตลักษณ์ผ้าทอมือบุรีรัมย์: ความเหมือนในความต่างของ 4 ชาติพันธุ์ ลาย–สี–ความหมายเชิงสังคม",
    "path": "/member/information_list/Identity/identity1",
    "anchors": [
      "#buriram-identity",
      "#identity-dynamics",
      "#shared-identity",
      "#symbolic-reading",
      "#identity-patterns"
    ],
    "keywords": [
      "อัตลักษณ์","ผ้าทอมือ","บุรีรัมย์","ไทยเดิ้ง","ลาว","เขมร","กูย",
      "ลวดลาย","ความหมายเชิงสังคม","สีสัน","วัฒนธรรมชุมชน","ขนบประเพณี"
    ]
  },
  {
    "id": "identity2",
    "group": "identity",
    "name": "อัตลักษณ์ผ้าเขมรในยุคนี้",
    "summary": "ลักษณะเด่นที่ช่างเขมรเลือกใช้: ลายละเอียด สีตัดกัน โทนทองอร่าม เนื้อผ้ามันวาว และขนาดผืนร่วมสมัย",
    "path": "/member/information_list/Identity/identity2",
    "keywords": [
      "ผ้าเขมร","อัตลักษณ์ร่วมสมัย","ลายละเอียด","โทนทอง","สีตัดกัน",
      "สไบเลือกเจือยย","โสร่ง","ผ้าเอนกประสงค์","ไหม","ความมันวาว"
    ]
  },
  {
    "id": "identity3",
    "group": "identity",
    "name": "ผ้าพื้น (Plain Fabric)",
    "summary": "ผ้าสีเดียวที่งามด้วยโครงสร้างทอและผิวสัมผัสไหมพื้นบ้าน; เรียบแต่มีบุคลิก",
    "path": "/member/information_list/Identity/identity3",
    "anchors": [
      "#plain-silk",
      "#plain-key-features",
      "#plain-market",
      "#plain-identity"
    ],
    "keywords": [
      "ผ้าพื้น","Plain Fabric","ไหมพื้นบ้าน","ผิวสัมผัส","โครงสร้างทอ",
      "ทอมือ","บ้านหนองเพชร","บ้านตะเคียน","ดูแลง่าย","เรียบหรู"
    ]
  },
  {
    "id": "identity4",
    "group": "identity",
    "name": "ผ้าลายริ้ว (สมปักริ้ว)",
    "summary": "ความหมาย ประวัติ และองค์ความรู้เชิงช่างของลายริ้ว/สมปัก พร้อมไทม์ไลน์ผ้าจังหวัด",
    "path": "/member/information_list/Identity/identity4",
    "anchors": [
      "#striped-fabric",
      "#history-meaning",
      "#som-pak",
      "#timeline",
      "#design-knowledge",
      "#dye-care",
      "#contemporary-use",
      "#social-value"
    ],
    "keywords": [
      "ผ้าลายริ้ว","สมปักริ้ว","สมปักปูม","หางกระรอก","พุ่งควบ",
      "รายงานสี 2–4–2","จานสีจังหวัด","สองหน้าเม็ดทราย","ริมผ้า","สีย้อมธรรมชาติ"
    ]
  },
  {
    "id": "identity5",
    "group": "identity",
    "name": "ผ้าลายตาราง (Checked Fabric)",
    "summary": "โครงสร้างลายจากเส้นยืน–พุ่ง สีหลัก 5 สี คู่สีตรงข้าม และบทบาทในโสร่ง/ผ้าขาวม้า",
    "path": "/member/information_list/Identity/identity5",
    "anchors": [
      "#checked-fabric",
      "#checked-key-features",
      "#checked-market",
      "#checked-identity"
    ],
    "keywords": [
      "ผ้าลายตาราง","โสร่ง","ผ้าขาวม้า","สีหลักห้าสี","คู่สีตรงข้าม",
      "พุ่งควบเกลียว","ยกชายขิด","สไบเลิกเจียย","ทอสองตะกอ","เอนกประสงค์"
    ]
  },
  {
    "id": "identity6",
    "group": "identity",
    "name": "ผ้ามัดหมี่ (Mudmee / Ikat)",
    "summary": "ภาพรวมผ้ามัดหมี่บุรีรัมย์: เนื้อหนากับเนื้อซาติน เทคนิค 2–4 ตะกอ และหมวดลายหลัก",
    "path": "/member/information_list/Identity/identity6",
    "anchors": [
      "#mudmee-silk",
      "#mudmee-key-features",
      "#mudmee-market",
      "#mudmee-identity",
      "#mudmee-geometric"
    ],
    "keywords": [
      "มัดหมี่","Ikat","ไหมหัว","ไหมน้อย","ลายต่วน","ลายลูกแก้ว",
      "เรขาคณิต","ลายขอ","หมากจับ","ขาเปีย","ลายนาค"
    ]
  },
  {
    "id": "identity7",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายจากข้าวของเครื่องใช้",
    "summary": "ตีความสิ่งของใกล้ตัวเป็นลายผ้า ตั้งชื่อแบบพื้นบ้าน/ร่วมสมัย และเล่าเรื่องบนผืนผ้า",
    "path": "/member/information_list/Identity/identity7",
    "anchors": [
      "#mudmee-objects",
      "#mudmee-objects-key-features",
      "#mudmee-objects-market",
      "#mudmee-objects-identity"
    ],
    "keywords": [
      "ลายเชี่ยนหมาก","ขันบายศรี","ประแจบ่ไข","ฟันเลื่อย","ยางล้อรถไถ",
      "อิฐบล็อก","เชิงเทียน","storytelling","ลวดลายจากของใช้"
    ]
  },
  {
    "id": "identity8",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายจากงานสถาปัตยกรรม",
    "summary": "แรงบันดาลใจจากบ้าน วัด ปราสาท—เชื่อมภูมิปัญญาชาย–หญิง สัญลักษณ์นาคและสายน้ำ",
    "path": "/member/information_list/Identity/identity8",
    "anchors": [
      "#mudmee-architecture",
      "#mudmee-architecture-key-features",
      "#mudmee-architecture-market",
      "#mudmee-architecture-identity"
    ],
    "keywords": [
      "สถาปัตยกรรม","หลังคาโบสถ์","ประตูปราสาท","นาค","สายน้ำ",
      "ข้าวและน้ำ","แรงบันดาลใจ","การตั้งชื่อผ้า","งานจำหลัก"
    ]
  },
  {
    "id": "identity9",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายจากพืชพรรณธรรมชาติ",
    "summary": "ดอกไม้ ต้นไม้ บรรยากาศสวน—ถ่ายทอดความอุดมสมบูรณ์และฝีมือเชิงช่างผ่านสีและจังหวะ",
    "path": "/member/information_list/Identity/identity9",
    "anchors": [
      "#mudmee-botany",
      "#mudmee-botany-key-features",
      "#mudmee-botany-market",
      "#mudmee-botany-identity"
    ],
    "keywords": [
      "ลายดอกไม้","กอไคร้","ดอกแก้ว","ดอกพิกุล","กระถางดอกไม้",
      "โทนสวนดอกไม้","วิถีเกษตร","ธรรมชาติ","สีสัน"
    ]
  },
  {
    "id": "identity10",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายรูปคนและสัตว์",
    "summary": "สัตว์ศักดิ์สิทธิ์/พาหนะ/สัตว์เลี้ยง/งดงาม และรูปคน—จัดจังหวะนับเส้นให้ภาพอ่านชัด",
    "path": "/member/information_list/Identity/identity10",
    "anchors": [
      "#mudmee-figures-animals",
      "#mudmee-figures-animals-key-features",
      "#mudmee-figures-animals-market",
      "#mudmee-figures-animals-identity"
    ],
    "keywords": [
      "ลายนาค","ช้าง","ม้า","ไก่","กวาง","นกยูง",
      "กรอบเรขาคณิต","สไตลิสต์","เสมือนจริง","เล่าเรื่อง"
    ]
  },
  {
    "id": "identity11",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายวิถีชีวิต",
    "summary": "วิถีเกษตร บุญประเพณี การละเล่น จารีต—เล่าเรื่องความสุขแบบบ้าน ๆ บนทั้งผืน",
    "path": "/member/information_list/Identity/identity11",
    "anchors": [
      "#mudmee-lifestyle",
      "#mudmee-lifestyle-key-features",
      "#mudmee-lifestyle-market",
      "#mudmee-lifestyle-identity"
    ],
    "keywords": [
      "วิถีชีวิต","บุญประเพณี","การละเล่น","จารีต","ผ้าชุมชน",
      "ของที่ระลึก","storytelling","เทศน์มหาชาติ"
    ]
  },
  {
    "id": "identity12",
    "group": "identity",
    "name": "ผ้ามัดหมี่: ลายประยุกต์ประสมประสาน",
    "summary": "ความชำนาญของบุรีรัมย์: มัดหมี่สองทาง โทนสีมีความหมาย โครงสร้างลายใหม่–ร่วมสมัย",
    "path": "/member/information_list/Identity/identity12",
    "anchors": [
      "#mudmee-fusion",
      "#mudmee-fusion-key-features",
      "#mudmee-fusion-market",
      "#mudmee-fusion-identity"
    ],
    "keywords": [
      "ลายประยุกต์","มัดหมี่สองทาง","การแต้มสี","โครงสร้างลายใหม่",
      "แฟชั่นร่วมสมัย","เอกลักษณ์บุรีรัมย์","ออกแบบลาย"
    ]
  },
  
  {
  id: "cloth7",
  group: "cloth",
  name: "ชาติพันธุ์เขมรบุรีรัมย์",
  summary:
    "ภาพรวมชาติพันธุ์เขมรบุรีรัมย์: ภาษา–พิธีกรรม–เครือญาติ–เศรษฐกิจผ้า และพรมแดนอัตลักษณ์ที่ยืดหยุ่น",
  path: "/member/information_list/cloth/cloth7",
  anchors: [
    "#intro",
    "#definitions",
    "#culture-system",
    "#unit-boundary",
    "#otherness",
    "#buriram-context",
    "#language-identity",
    "#kinship-custom",
    "#economy-craft",
    "#arts-performance",
    "#interethnic-relations",
    "#modernity-digital",
    "#challenges-preservation",
    "#textile-link",
    "#summary"
  ],
  keywords: [
    "ชาติพันธุ์เขมรบุรีรัมย์","อัตลักษณ์","ภาษาเขมรถิ่นไทย","เครือญาติ",
    "พิธีกรรม","วิถีเกษตร","ผ้าทอมือ","พรมแดนทางวัฒนธรรม","Otherness",
    "การสืบสาน","ภูมิปัญญาท้องถิ่น","บุรีรัมย์"
  ]
},
{
  id: "cloth8",
  group: "cloth",
  name: "วัฒนธรรมผ้าทอมือ",
  summary:
    "บทบาทผ้าทอมือในวิถีชีวิต: การแต่งงาน การเกิด การเรียนรู้ การแต่งกาย วัสดุ ลวดลาย และความหมาย",
  path: "/member/information_list/cloth/cloth8",
  anchors: [
    "#intro",
    "#marriage",
    "#birth",
    "#learning",
    "#dress",
    "#materials",
    "#patterns",
    "#death",
    "#summary"
  ],
  keywords: [
    "วัฒนธรรมผ้า","การแต่งงาน","เกรืองสะมา","ผ้าไหว้","หมอตำแย",
    "บูชาครู","นุ่งลอยชาย","นุ่งโจง","ฝ้าย","ไหม","ลวดลายและความหมาย",
    "วิถีชีวิต","พิธีกรรม"
  ]
},
{
  id: "cloth9",
  group: "cloth",
  name: "การออกแบบลวดลายผ้าทอมือ",
  summary:
    "แนวคิดการออกแบบในยุคไทยแลนด์ 4.0 และกรอบคิดตาม จารุณี ชัยโชติอนันต์: เนื้อผ้า ลาย สี และกระบวนการทอ",
  path: "/member/information_list/cloth/cloth9",
  anchors: [
    "#design-overview",
    "#design-importance",
    "#jarunee-framework",
    "#fabric-design",
    "#pattern-design",
    "#process-design"
  ],
  keywords: [
    "ออกแบบผ้า","ไทยแลนด์ 4.0","อัตลักษณ์ชุมชน","การออกแบบเนื้อผ้า",
    "การออกแบบลายผ้า","สีเส้นยืนเส้นพุ่ง","การจัดตะกอ","ลำดับเหยียบ",
    "คุณค่าและความงาม"
  ]
},
{
  id: "cloth10",
  group: "cloth",
  name: "การผลิตผ้าทอมือ",
  summary:
    "ตั้งแต่การเตรียมเส้นใย ระบบเบอร์ การคำนวณฟันหวี/เส้นยืน จนถึงการฟอก–ย้อมเบื้องต้น",
  path: "/member/information_list/cloth/cloth10",
  anchors: [
    "#design-overview",
    "#fiber-prep",
    "#calc",
    "#calc-reed",
    "#calc-warp",
    "#calc-warp-rounds",
    "#scour-dye",
    "#degumming-cottonclean"
  ],
  keywords: [
    "การผลิตผ้า","เตรียมเส้นใย","ดีเนียร์","เท็กซ์","ฟันหวี","เส้นยืน",
    "การคำนวณ","ลอกกาวไหม","ทำความสะอาดฝ้าย","ตั้งฟืม","ตั้งยืน"
  ]
},
{
  id: "cloth11", 
  group: "cloth",
  name: "การย้อมสี",
  summary:
    "หลักการย้อมไหม ฝ้าย และด้ายประดิษฐ์ รวมถึงแนวปฏิบัติการย้อมสีธรรมชาติและการผนึกสี",
  path: "/member/information_list/cloth/cloth11",
  anchors: [
    "#dyeing-overview",
    "#dye-silk",
    "#dye-cotton",
    "#dye-manmade",
    "#dye-natural"
  ],
  keywords: [
    "ย้อมไหม","Acid dye","ย้อมฝ้าย","Reactive dye","สีดิส์เพิร์ส",
    "สีย้อมธรรมชาติ","การสกัดสี","การผนึกสี","กรดน้ำส้ม","โซดาแอช",
    "เกลือ","อุณหภูมิและเวลา"
  ]
},
{
  id: "cloth12", 
  group: "cloth",
  name: "การตกแต่งเส้นด้ายยืน–เส้นด้ายพุ่ง",
  summary:
    "แนวทางเลือกสารตกแต่งเพื่อให้เส้นเรียบ อยู่ตัว ลื่น หรือนุ่มลื่น พร้อมขั้นตอนและข้อควรระวัง",
  path: "/member/information_list/cloth/cloth12",
  anchors: [
    "#yarn-finishing",
    "#finishing-goals",
    "#finishing-steps",
    "#finishing-notes"
  ],
  keywords: [
    "ตกแต่งเส้นด้าย","เส้นยืน","เส้นพุ่ง","น้ำยาอัดกลีบ","น้ำยาปรับผ้านุ่ม",
    "น้ำยารีดผ้าเรียบ","ไหมเปลือกนอก","ความลื่น","ความอยู่ตัว","ทดสอบก่อนผลิตจริง"
  ]
},
{
  id: "cloth13", 
  group: "cloth",
  name: "กระบวนการทอผ้าเขมรบุรีรัมย์",
  summary:
    "เทคโนโลยีและนวัตกรรมตั้งแต่เลี้ยงไหม–สาวไหม–เตรียมเส้น จนถึงเครื่องมือกี่ทอผ้าหลายแบบ",
  path: "/member/information_list/cloth/cloth13",
  anchors: [
    "#tech-innovation",
    "#fiber-tech",
    "#cocoon-prep",
    "#silk-reeling-tools",
    "#reeling-steps",
    "#drying-storage"
  ],
  keywords: [
    "เทคโนโลยีการทอ","นวัตกรรมชุมชน","ปลูกหม่อนเลี้ยงไหม","สาวไหม",
    "โกนเนียง","วงล้อสาวไหม","กงกวัก","กี่มือ","กี่กระตุก","กระบวนการผลิตเส้นใย"
  ]
},
{
  id: "cloth14", 
  group: "cloth",
  name: "เครื่องมือและอุปกรณ์ทอผ้า",
  summary:
    "ระวิง–อัก ม้าเดินด้าย ฟันหวี หัวม้วนเส้นยืน กระสวย และกี่ทอผ้าประเภทต่าง ๆ",
  path: "/member/information_list/cloth/cloth14",
  anchors: [
    "#warp-prep",
    "#rawing-ak",
    "#yarn-walker",
    "#reed-beam",
    "#looms-and-shuttles"
  ],
  keywords: [
    "เครื่องมือทอผ้า","ระวิง","อัก","ม้าเดินด้าย","ฟันหวี","หัวม้วนเส้นยืน",
    "กี่มือโบราณ","กี่มือ","กี่กระตุก","กระสวย","เตรียมเส้นยืน"
  ]
},

];
