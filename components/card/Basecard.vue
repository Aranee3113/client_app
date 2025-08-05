<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  "https://media.readthecloud.co/wp-content/uploads/2022/08/29095532/wasin-thai-textile-23-750x500.jpg",
  "https://lekanis.com/wp-content/uploads/2022/08/IMG_4400-1024x683.jpg",
  "https://media.readthecloud.co/wp-content/uploads/2022/08/29095532/wasin-thai-textile-23-750x500.jpg"
]

const currentIndex = ref(0)
let intervalId = null

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    nextImage()
  }, 3000)
}

const stopAutoSlide = () => {
  clearInterval(intervalId)
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const manualChange = (direction) => {
  stopAutoSlide()
  direction === 'next' ? nextImage() : prevImage()
  startAutoSlide() // เริ่มใหม่หลังหยุด
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
  <div
    class="p-5 bg-gradient-to-br from-pink-100 via-white to-purple-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition max-w-4xl mx-auto overflow-visible relative"
  >
    <!-- ภาพ -->
    <div class="relative w-full h-60 md:h-80 overflow-hidden rounded-xl">
      <img
        :src="images[currentIndex]"
        alt="ผ้าทอ"
        class="object-cover w-full h-full rounded-xl transition-opacity duration-700 ease-in-out shadow-inner"
      />

      <!-- ปุ่มซ้าย -->
      <button
        @click="manualChange('prev')"
        class="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/60 dark:bg-gray-600 hover:bg-pink-200 dark:hover:bg-gray-500 p-3 rounded-full shadow-lg z-10 transition"
        aria-label="เลื่อนไปก่อนหน้า"
      >
        <span class="text-2xl font-bold text-gray-700 dark:text-white">←</span>
      </button>

      <!-- ปุ่มขวา -->
      <button
        @click="manualChange('next')"
        class="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/60 dark:bg-gray-600 hover:bg-pink-200 dark:hover:bg-gray-500 p-3 rounded-full shadow-lg z-10 transition"
        aria-label="เลื่อนไปถัดไป"
      >
        <span class="text-2xl font-bold text-gray-700 dark:text-white">→</span>
      </button>
    </div>

    <!-- จุดเลื่อน -->
    <div class="flex justify-center mt-6 space-x-2">
      <span
        v-for="(img, index) in images"
        :key="index"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="{
          'bg-pink-500 scale-125 shadow-md': currentIndex === index,
          'bg-white/50 dark:bg-gray-400': currentIndex !== index
        }"
      ></span>
    </div>
  </div>
</template>



