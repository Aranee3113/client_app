<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Shirt, Search, ShieldUser } from "lucide-vue-next";
import { decodeJwt } from "jose";

// เตรียมตัวแปร reactive
const id = ref<string>("");

onMounted(() => {
  // ดึง token และ decode
  const token = useCookie("token").value;
  if (token) {
    const decoded = decodeJwt(token);
    id.value = String(decoded.user_id);
  }

  // event สำหรับปิดเมนู dropdown
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const showNotifications = ref(false);
const dropdownRef = ref(null);
const router = useRouter();

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleClickOutside = (event: Event) => {
  if (
    dropdownRef.value &&
    !(dropdownRef.value as HTMLElement).contains(event.target as Node)
  ) {
    showNotifications.value = false;
  }
};

const logout = () => {
  useCookie("token").value = null;
  router.push("/");
};
</script>

<template>
  <nav class="backdrop-blur-md bg-white/80 shadow-gray-300 z-50 border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between space-x-6">

        <!-- เมนูด้านซ้าย -->
        <div class="flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="text-3xl font-bold  bg-gradient-to-r  text-purple-600  bg-clip-text flex items-center space-x-2"
          >
            <Shirt />
            <span>Mai Khmer</span>
          </NuxtLink>
          <NuxtLink :to="`/member/home`" class="text-sm text-gray-700 hover:text-orange-600 transition">หน้าหลัก</NuxtLink>
          <NuxtLink :to="`/member/information_list`" class="text-sm text-gray-700 hover:text-orange-600 transition">ชุมชนผ้าทอ</NuxtLink>
          <NuxtLink :to="`/member/post_list`" class="text-sm text-gray-700 hover:text-orange-600 transition">โพสต์</NuxtLink>
          <NuxtLink :to="`/member/contract`" class="text-sm text-gray-700 hover:text-orange-600 transition">แชท</NuxtLink>
        </div>

        <!-- เมนูด้านขวา -->
        <div class="flex items-center space-x-3">
          <!-- ค้นหา -->
          <div class="flex rounded-md overflow-hidden shadow">
            <input
              type="text"
              placeholder="ค้นหา..."
              class="rounded-l-md border border-gray-300 py-1.5 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]"
            />
            <button class="bg-gradient-to-r from-orange-600 to-orange-300 text-white px-3 py-1.5 hover:from-orange-300 hover:to-orange-600 cursor-pointer">
              <Search class="w-4 h-4" />
            </button>
          </div>

          <!-- ปุ่มโปรไฟล์ -->
          <div ref="dropdownRef" class="relative">
            <button
              @click="toggleNotifications"
              class="rounded-full bg-white border border-gray-300 p-2 hover:bg-gradient-to-r hover:from-slate-600 hover:text-white transition cursor-pointer"
            >
              <ShieldUser class="w-6 h-6" />
            </button>

            <!-- เมนู dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl ring-1 ring-gray-200 z-50"
            >
              <div class="py-2">
                <template v-if="id">
                  <NuxtLink
                    :to="`/member/profile`"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    แก้ไขข้อมูลผู้ใช้
                  </NuxtLink>
                </template>
                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

