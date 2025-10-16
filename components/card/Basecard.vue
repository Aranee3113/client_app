<script setup>
import { Users, Shirt, Star, SquarePen } from "lucide-vue-next";
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
          มรดกทางวัฒนธรรมที่สะท้อนถึงวิถีชีวิตและภูมิปัญญาท้องถิ่นของกลุ่มชาติพันธุ์เขมร
        </p>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <!-- ปุ่มที่ 1: ชมพู -->
          <NuxtLink
            to="/member/information_list/cloth/cloth7"
            class="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center bg-gradient-to-r from-pink-900 to-rose-500 text-white hover:from-pink-700 hover:to-rose-600 transition"
          >
            <Users class="w-5 h-5" />
            ชาติพันธุ์เขมรบุรีรัมย์
          </NuxtLink>

          <!-- ปุ่มที่ 2: ม่วง -->
          <NuxtLink
            to="/member/information_list/cloth/cloth8"
            class="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center bg-gradient-to-r from-violet-900 to-purple-600 text-white hover:from-violet-800 hover:to-purple-700 transition"
          >
            <Shirt class="w-5 h-5" />
            วัฒนธรรมผ้าทอมือ
          </NuxtLink>

          <!-- ปุ่มที่ 3: ส้ม -->
          <NuxtLink
            to="/member/popularity"
            class="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center bg-gradient-to-r from-amber-900 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition"
          >
            <Star class="w-5 h-5" />
            ความนิยม
          </NuxtLink>

          <!-- ปุ่มที่ 4: แดง -->
          <a
            href="https://pattern.bru.ac.th/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex flex-col sm:flex-row items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-center bg-gradient-to-r from-red-900 to-red-500 text-white hover:from-red-800 hover:to-red-600 transition"
          >
            <SquarePen class="w-5 h-5" />
            ออกแบบลายผ้า
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
