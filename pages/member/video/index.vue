<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: "member",
});

// 1. สร้าง Array ข้อมูลวิดีโอ
const videoList = [
  {
    id: 1,
    title: "กระบวนการทอผ้า",
    embedUrl: "https://www.youtube.com/embed/kY-Qc1Nl-mE"
  },
  {
    id: 2,
    title: "การย้อมสี (สีธรรมชาติ)",
    embedUrl: "https://www.youtube.com/embed/y-q8-sIRL-g"
  },
  {
    id: 3,
    title: "การตกแต่งเส้นด้าย (การมัดหมี่)",
    embedUrl: "https://www.youtube.com/embed/x-M-h3iSg-Y"
  },
  {
    id: 4,
    title: "เครื่องมือและอุปกรณ์ในการทอผ้า",
    embedUrl: "https://www.youtube.com/embed/rK-G8QkXgU4"
  },
  {
    id: 5,
    title: "ขั้นตอนการทอผ้าไหมมัดหมี่",
    embedUrl: "https://www.youtube.com/embed/IdCEWR4miNI?start=48"
  }
];

// 2. สร้าง ref เพื่อเก็บวิดีโอที่กำลังถูกเลือก (ให้วิดีโอแรกเป็นค่าเริ่มต้น)
const selectedVideo = ref(videoList[0]);

// 3. สร้างฟังก์ชันสำหรับเปลี่ยนวิดีโอ
function selectVideo(video) {
  selectedVideo.value = video;
}
</script>

<template>
  <div
    class="relative min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat md:bg-fixed pb-24 md:pb-28 lg:pb-32"
  >
    <CommonButtonBack />

    <div class="container mx-auto pt-16 pb-8">
      <div
        class="bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-md"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div class="md:col-span-1">
            <h2 class="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">
              รายการวิดีโอ
            </h2>
            <ul class="space-y-2">
              <li v-for="video in videoList" :key="video.id">
                <button
                  @click="selectVideo(video)"
                  class="w-full text-left p-4 rounded-lg transition duration-200"
                  :class="[
                    selectedVideo.id === video.id
                      ? 'bg-violet-700 text-white shadow-lg'
                      : 'bg-white/80 hover:bg-violet-100 text-gray-800'
                  ]"
                >
                  {{ video.title }}
                </button>
              </li>
            </ul>
          </div>

          <div class="md:col-span-2">
            <h2 class="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">
              {{ selectedVideo.title }}
            </h2>

            <div class="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                :src="selectedVideo.embedUrl"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          
        </div> </div> </div> </div>
</template>