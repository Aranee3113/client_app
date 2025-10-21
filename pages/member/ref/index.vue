<script setup>
// ตั้งค่า layout ของหน้านี้ให้เป็น "member"
definePageMeta({
  layout: "member",
});

// --- ข้อมูลกลุ่มที่ 1: ข้อมูลการทอผ้า ---
const weaving = [
  {
    name: "เทคนิคการผลิตผ้าทอมือ",
    path: "/member/information_list/cloth/cloth10",
    source: "อ้างอิง: หนังสือ 'ศิลปะผ้าทอ' (2565) หน้า 18"
  },
  { 
    name: "การย้อมสี", 
    path: "/member/information_list/cloth/cloth11",
    source: "อ้างอิง: กรมส่งเสริมวัฒนธรรม, 'ภูมิปัญญาการย้อมสีธรรมชาติ'"
  },
  {
    name: "การตกแต่งเส้นด้ายยืนพุ่ง",
    path: "/member/information_list/cloth/cloth12",
    source: "อ้างอิง: มหาวิทยาลัยราชภัฏสุรินทร์, 'นวัตกรรมผ้าไหม'"
  },
  { 
    name: "อุปกรณ์การทอ", 
    path: "/member/information_list/cloth/cloth14",
    source: "อ้างอิง: พิพิธภัณฑสถานแห่งชาติ (2564)"
  },
  {
    name: "ขั้นตอนการทอผ้า",
    path: "/member/information_list/identityy/identity13",
    source: "อ้างอิง: สัมภาษณ์คุณยายสมศรี (ช่างทอชุมชน)"
  },
];

// --- ข้อมูลกลุ่มที่ 2: ลวดลายผ้า ---
const pattern = [
  { 
    name: "ผ้าหางกระรอก", 
    path: "/member/information_list/cloth/cloth1",
    source: "อ้างอิง: 'ผ้าไทยลายอัตลักษณ์', OTOP (2563)"
  },
  { 
    name: "ผ้าโสร่ง", 
    path: "/member/information_list/cloth/cloth2",
    source: "อ้างอิง: 'ผ้าไทยลายอัตลักษณ์', OTOP (2563)"
  },
  { 
    name: "ผ้าซิ่นหมี่", 
    path: "/member/information_list/cloth/cloth3",
    source: "อ้างอิง: กรมหม่อนไหม, 'ลายผ้าซิ่น'"
  },
  { 
    name: "ผ้าโฮลเปราะห์", 
    path: "/member/information_list/cloth/cloth6",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ผ้ายกดอกและผ้าสไบยกดอก",
    path: "/member/information_list/cloth/cloth4",
    source: "อ้างอิง: หนังสือ 'ผ้าทออีสานใต้' (2565)"
  },
  {
    name: "ผ้าขาวม้ายกขิด ผ้าสไบยกขิด",
    path: "/member/information_list/cloth/cloth5",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
];

// --- ข้อมูลกลุ่มที่ 3: อัตลักษณ์ผ้า ---
const identity = [
  {
    name: "อัตลักษณ์ผ้าเขมร",
    path: "/member/information_list/identityy/identity2",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  { 
    name: "ผ้าพื้น", 
    path: "/member/information_list/identityy/identity3",
    source: "อ้างอิง: ภูมิปัญญาท้องถิ่น จ.สุรินทร์"
  },
  { 
    name: "ผ้าลายริ้ว", 
    path: "/member/information_list/identityy/identity4",
    source: "อ้างอิง: ภูมิปัญญาท้องถิ่น จ.สุรินทร์"
  },
  { 
    name: "ผ้าลายตาราง", 
    path: "/member/information_list/identityy/identity5",
    source: "อ้างอิง: ภูมิปัญญาท้องถิ่น จ.สุรินทร์"
  },
  { 
    name: "ผ้ามัดหมี่", 
    path: "/member/information_list/identityy/identity6",
    source: "อ้างอิง: กรมหม่อนไหม, 'ลายมัดหมี่'"
  },
  {
    name: "ลายจากรูปลักษณ์ของข้าวของเครื่องใช้",
    path: "/member/information_list/identityy/identity7",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ลายจากงานสถาปัตยกรรม",
    path: "/member/information_list/identityy/identity8",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ลายจากพืชพรรณธรรมชาติ",
    path: "/member/information_list/identityy/identity9",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ผ้าลวดลายรูปคนและสัตว์",
    path: "/member/information_list/identityy/identity10",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ผ้าลวดลายที่แสดงวิถีชีวิต",
    path: "/member/information_list/identityy/identity11",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
  {
    name: "ลายประยุกต์ประสมประสาน",
    path: "/member/information_list/identityy/identity12",
    source: "อ้างอิง: 'ผ้าเขมรสุรินทร์' (2559)"
  },
];
</script>

<template>
  <div class="relative min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat md:bg-fixed pb-24 md:pb-28 lg:pb-32">
    
    <CommonButtonBack /> 

    <div class="container mx-auto pt-16 pb-8">
      
      <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
        แหล่งอ้างอิงข้อมูล
      </h1>

      <div class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md text-gray-900 dark:text-white">

        <section class="mb-8">
          <h2 class="text-3xl font-semibold mb-4 border-b border-gray-500 pb-2 text-indigo-800 dark:text-indigo-300">
            ข้อมูลการทอผ้า
          </h2>
          <ul class="list-disc list-inside space-y-3 pl-2 text-lg text-gray-800 dark:text-gray-200">
            <li v-for="item in weaving" :key="item.path" class="relative group cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400">
              {{ item.name }} 
              
              <span class="absolute z-10 hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-base rounded-md shadow-lg bg-black text-white dark:bg-white dark:text-black whitespace-nowrap">
                {{ item.source }} 
              </span>
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-3xl font-semibold mb-4 border-b border-gray-500 pb-2 text-indigo-800 dark:text-indigo-300">
            ลวดลายผ้า
          </h2>
          <ul class="list-disc list-inside space-y-3 pl-2 text-lg text-gray-800 dark:text-gray-200">
            <li v-for="item in pattern" :key="item.path" class="relative group cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400">
              {{ item.name }} 
              <span class="absolute z-10 hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-base rounded-md shadow-lg bg-black text-white dark:bg-white dark:text-black whitespace-nowrap">
                {{ item.source }}
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-3xl font-semibold mb-4 border-b border-gray-500 pb-2 text-indigo-800 dark:text-indigo-300">
            อัตลักษณ์ผ้า
          </h2>
          <ul class="list-disc list-inside space-y-3 pl-2 text-lg text-gray-800 dark:text-gray-200">
            <li v-for="item in identity" :key="item.path" class="relative group cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400">
              {{ item.name }} 
              <span class="absolute z-10 hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-base rounded-md shadow-lg bg-black text-white dark:bg-white dark:text-black whitespace-nowrap">
                {{ item.source }}
              </span>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </div>
</template>