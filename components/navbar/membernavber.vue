<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

import { ShieldUser, Menu, Search } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const searchTerm = ref("");
const router = useRouter();

const isMobileMenuOpen = ref(false);
const mobileMenuRef = ref<HTMLElement | null>(null); // Ref สำหรับตัวเมนู
const hamburgerRef = ref<HTMLElement | null>(null); // Ref สำหรับปุ่ม Hamburger

//  สำหรับ dropdown โปรไฟล์
const showNotifications = ref(false);
const profileRef = ref<HTMLElement | null>(null);

//  สมมุติว่ามี token แปลว่าผู้ใช้ล็อกอินอยู่
const token = useCookie("token").value;
const id = token ? true : false;

//  ฟังก์ชันค้นหา
const doSearch = () => {
  const q = searchTerm.value.trim();
  if (!q) return;
  router.push({ path: "/member/search", query: { q } });
  isMobileMenuOpen.value = false; // ปิดเมนูมือถือเมื่อค้นหา
};

//  ฟังก์ชันออกจากระบบ
const logout = () => {
  useCookie("token").value = null;
  showNotifications.value = false;
  isMobileMenuOpen.value = false; // ปิดเมนูมือถือเมื่อ logout
  router.push("/");
};

//  อัปเดตฟังก์ชันปิด dropdown เมื่อคลิกนอกกรอบ
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  // ปิด Profile Dropdown
  if (profileRef.value && !profileRef.value.contains(target)) {
    showNotifications.value = false;
  }

  // ปิด Mobile Menu
  if (
    hamburgerRef.value && // ต้องมีปุ่ม hamburger
    !hamburgerRef.value.contains(target) && // และไม่ได้คลิกที่ปุ่ม
    mobileMenuRef.value && // และต้องมีเมนูมือถือเปิดอยู่
    !mobileMenuRef.value.contains(target) // และไม่ได้คลิกที่ตัวเมนู
  ) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div class="container mx-auto h-20 md:h-24 relative">
    <div class="flex justify-between md:justify-around items-center h-full px-4 md:px-0">
      <div class="logo">
        <img
          src="/assetts/css/image/โลโก้5.png"
          alt="Mai Khmer Logo"
          class="object-cover h-16 md:h-20"
        />
      </div>

      <div class="menu hidden md:flex gap-8 text-xl">
        <NuxtLink
          to="/member"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >หน้าหลัก</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=weaving"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >กระบวนการทอผ้า</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=pattern"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >ลวดลายผ้า</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=identity"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >อัตลักษณ์</NuxtLink
        >
        <NuxtLink
          to="/member/video"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >คลังวิดีโอ</NuxtLink
        >
        <NuxtLink
          to="/member/post_list"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >โพสต์</NuxtLink
        >
        <NuxtLink
          to="/member/ref"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
          >อ้างอิง</NuxtLink
        >
      </div>

      <div class="flex items-center gap-2 md:gap-6">
        <div class="search flex">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="ค้นหา..."
            class="border border-gray-300 rounded-l px-2 py-1 text-sm md:px-3 md:py-1.5 md:text-base focus:outline-none w-24 sm:w-32 md:w-auto"
            @keydown.enter="doSearch"
          />
          <button
            class="bg-gradient-to-r from-orange-600 to-orange-300 text-white px-2 md:px-3 py-1.5 hover:from-orange-300 hover:to-orange-600 cursor-pointer"
            @click="doSearch"
          >
            <Search class="w-5 h-5 md:hidden" />
            <span class="hidden md:inline">ค้นหา</span>
          </button>
        </div>

        <div ref="profileRef" class="relative">
          <button
            @click="showNotifications = !showNotifications"
            :aria-expanded="showNotifications"
            aria-haspopup="menu"
            class="rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 transition cursor-pointer"
          >
            <ShieldUser
              class="w-8 h-8 text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            />
          </button>

          <div
            v-if="showNotifications"
            role="menu"
            class="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl ring-1 ring-gray-200 z-[10000]"
          >
            <div class="py-2">
              <template v-if="id">
                <NuxtLink
                  to="/member/profile"
                  class="block px-4 py-2 text-lg text-gray-900 hover:bg-gray-100"
                  @click="showNotifications = false"
                >
                  แก้ไขข้อมูลผู้ใช้
                </NuxtLink>
              </template>
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-lg text-red-600 hover:bg-red-50"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        <button
          ref="hamburgerRef"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 transition cursor-pointer"
        >
          <Menu class="w-8 h-8 text-gray-700" />
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      ref="mobileMenuRef"
      class="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-[9000] border-t border-gray-200"
    >
      <nav class="flex flex-col p-4 gap-3">
        <NuxtLink
          to="/member"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >หน้าหลัก</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=weaving"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >กระบวนการทอผ้า</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=pattern"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >ลวดลายผ้า</NuxtLink
        >
        <NuxtLink
          to="/member/processing?menu=identity"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >อัตลักษณ์</NuxtLink
        >
        <NuxtLink
          to="/member/video"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >คลังวิดีโอ</NuxtLink
        >
        <NuxtLink
          to="/member/post_list"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >โพสต์</NuxtLink
        >
        <NuxtLink
          to="/member/ref"
          class="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300 text-lg p-2 rounded-md hover:bg-gray-100"
          @click="isMobileMenuOpen = false"
          >อ้างอิง</NuxtLink
        >
      </nav>
    </div>
  </div>
</template>