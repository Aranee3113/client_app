<script setup>
import { Users, Shirt, Star } from "lucide-vue-next";
</script>

<template>
  <section class="w-full min-h-[100svh] bg-[#2f0d48] dark:bg-gray-900">
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-[100svh]">
      <!-- รูป -->
      <div
        class="relative order-1 md:order-2 w-full aspect-[16/9] md:aspect-auto md:min-h-[100svh]"
      >
        <img
          src="/images/ปก.jpg"
          alt="cover"
          class="absolute inset-0 w-full h-full object-cover"
          decoding="async"
          fetchpriority="high"
        />
        <div
          class="md:hidden absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
        />
      </div>

      <!-- ข้อความ -->
      <div
        class="order-2 md:order-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10 md:py-0"
      >
        <h1
          class="font-extrabold text-white dark:text-white leading-tight text-[clamp(2rem,6vw,4.5rem)]"
        >
          ภูมิปัญญาผ้าทอ <br class="hidden md:block" />
          กลุ่มชาติพันธุ์เขมร<br class="hidden md:block" />
          จังหวัดบุรีรัมย์
        </h1>

        <p class="mt-6 text-lg md:text-xl text-white dark:text-gray-300">
          สัมผัสความงดงามแห่งลวดลาย ที่สามารถนำไปสร้างสรรค์บนผืนผ้า
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink
            to="/member/information_list/info1"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold 
                   bg-gradient-to-r from-purple-900 to-purple-500 
                   text-white hover:from-purple-800 hover:to-purple-600 transition"
          >
            <Users class="w-5 h-5" />
            ชาติพันธุ์เขมรบุรีรัมย์
          </NuxtLink>

          <NuxtLink
            to="/member/information_list/info2"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold 
                   bg-gradient-to-r from-amber-900 to-orange-600 
                   text-white hover:from-orange-800 hover:to-orange-600 transition"
          >
            <Shirt class="w-5 h-5" />
            วัฒนธรรมผ้าทอมือ
          </NuxtLink>

          <NuxtLink
            to="/member/popularity"
            class="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold 
                   bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-900
                   text-white hover:from-blue-900 hover:via-blue-800 hover:to-indigo-800 transition"
          >
            <Star class="w-5 h-5" />
            ความนิยม
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
