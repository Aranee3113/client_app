<template>
  <footer
    class="bg-gradient-to-t from-[#c87032] via-[#dbd5d0] to-white 
           dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
           shadow-inner rounded-t-2xl mt-10"
  >
    <div class="w-full max-w-screen-xl mx-auto px-6 py-10">
      <div
        class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8"
      >
        <!-- Brand + Description -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
          <!-- Brand -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <span
              class="text-3xl md:text-4xl font-extrabold 
                     bg-gradient-to-r from-amber-900 via-amber-700 to-orange-600 
                     bg-clip-text text-transparent"
            >
              KHMER WEAVE
            </span>
          </div>

          <!-- Description -->
          <p
            class="mt-4 text-gray-600 dark:text-gray-300 max-w-md leading-relaxed 
                   text-center md:text-right"
          >
            ภูมิปัญญาการทอผ้าของชาวเขมรในจังหวัดบุรีรัมย์
            มรดกทางวัฒนธรรมที่ควรค่าแก่การอนุรักษ์และสืบทอดสู่คนรุ่นหลัง
            ผ้าทอเขมรสะท้อนถึงความงดงามและภูมิปัญญาของบรรพบุรุษ
          </p>
        </div>

        <!-- Social Links -->
        <div class="flex space-x-6">
          <a
            href="#"
            class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition"
          >
            <i class="fab fa-facebook-f text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition"
          >
            <i class="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="#"
            class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <i class="fab fa-youtube text-xl"></i>
          </a>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-8 border-gray-300 dark:border-gray-700" />

      <!-- Footer Bottom -->
      <p class="text-sm text-center text-gray-500 dark:text-gray-400">
        © 2025
        <span class="font-semibold text-amber-900 dark:text-orange-400">
          สานเขมร
        </span>
      </p>
    </div>
  </footer>
</template>
