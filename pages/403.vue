<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-300 text-center"
  >
    <h1 class="text-7xl font-extrabold text-purple-700 mb-4">403</h1>
    <p class="text-2xl text-gray-700 mb-6">
      คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้ ❌
    </p>

    <NuxtLink
      to="/"
      class="inline-block bg-gradient-to-r from-purple-600 to-pink-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-all"
    >
      🔙 กลับหน้าหลัก
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
