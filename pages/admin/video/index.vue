<script setup>
definePageMeta({ layout: "admin" });
</script>
<template>
<div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
  <CommonButtonBack />
    <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">รายการคลังวิดีโอ</h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/post/add"
            class="inline-flex items-center px-5 py-2 bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มวิดีโอ
          </NuxtLink>
          
        </div>
      </div>
    </div>
    <div >
    






    </div>

</div>
</template>