<script setup>
const props = defineProps({
  data: Number,
  color: String,
  text: String,
  link: String,
  title: String,
});
</script>
<template>
  <div
    class="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 border border-gray-200 overflow-hidden"
  >
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-6">
        <div
          :class="[
            'w-14 h-14  rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300',
            color,
          ]"
        >
          <svg
            class="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-lg text-gray-500 font-medium">อัปเดตล่าสุด</p>
          <p class="text-xs text-gray-400">
            {{ new Date().toLocaleDateString("th-TH") }}
          </p>
        </div>
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2"></h3>
      <p
        :class="[
          'text-5xl font-bold  mb-4 group-hover:scale-105 transition-transform duration-300',
          'text-' + color,
          !data.count && 'text-2xl',
        ]"
      >
        {{ data.count || "กำลังโหลดจ้า" }}
      </p>
      <p class="text-gray-600 text-xl mb-6"> {{ title }}</p>
      <NuxtLink
        :to="link"
        :class="[
          'inline-flex items-center px-4 py-2  rounded-lg font-medium  transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105',
          text,
          color,
        ]"
      >
        <span>ดูทั้งหมด</span>
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
