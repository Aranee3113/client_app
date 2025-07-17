<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  "https://media.readthecloud.co/wp-content/uploads/2022/08/29095532/wasin-thai-textile-23-750x500.jpg",
  "https://lekanis.com/wp-content/uploads/2022/08/IMG_4400-1024x683.jpg",
  "https://media.readthecloud.co/wp-content/uploads/2022/08/29095532/wasin-thai-textile-23-750x500.jpg"
]

const currentIndex = ref(0)
let intervalId

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 3000) // ทุก 3 วินาที
}

onMounted(startAutoSlide)
onUnmounted(() => clearInterval(intervalId))
</script>

<template>

  <div
    class="p-5 md-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg transition max-w-4xl mx-auto overflow-hidden"
  >
    <!-- หัวข้อ -->
    <h1 class="text-4xl font-extrabold text-center text-[#2d3748] dark:text-white py-6">
      ผ้าทอออออออออออออออท้อ
    </h1>

    <!-- ภาพเดียวที่แสดง -->
    <div class="relative w-full h-80 md:h-[30rem]">
      <img
        :src="images[currentIndex]"
        alt="ผ้าทอ"
        class="object-cover w-full h-full transition-opacity duration-700 ease-in-out"
      />
    </div>
  </div>
</template>

