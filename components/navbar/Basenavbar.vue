<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Shirt, Search, ShieldUser } from "lucide-vue-next";
import { decodeJwt } from "jose";

const showNotifications = ref(false);
const dropdownRef = ref(null);
const router = useRouter();
const id = ref<string>("");

const token = useCookie("token").value;

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

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  // ดึง user_id จาก token
  if (token) {
    const decoded: any = decodeJwt(token);
    id.value = String(decoded.user_id);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>


<template>
  <nav
    class="backdrop-blur-md bg-white/80 shadow-gray-300 z-50 border-b border-gray-200"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between space-x-6">
        <!-- ซ้าย: โลโก้ + เมนู -->
        <div class="flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text flex items-center space-x-2"
          >
            <Shirt />
            <span>Mai Khmer</span>
          </NuxtLink>
          <NuxtLink
            :to="`/admin/dashboard`"
            class="text-sm text-gray-700 hover:text-[#ff5a5f] transition"
            >หน้าหลัก</NuxtLink
          >
          <NuxtLink
            :to="`/admin/information`"
            class="text-sm text-gray-700 hover:text-[#ff5a5f] transition"
            >จัดการข้อมูลผ้า</NuxtLink
          >
          <NuxtLink
            :to="`/admin/post`"
            class="text-sm text-gray-700 hover:text-[#ff5a5f] transition"
            >จัดการโพสต์</NuxtLink
          >
          <NuxtLink
            :to="`/admin/user`"
            class="text-sm text-gray-700 hover:text-[#ff5a5f] transition"
            >จัดการรายชื่อผู้ใช้</NuxtLink
          >
        </div>

        <div class="flex items-center space-x-3">
          <div class="flex rounded-md overflow-hidden shadow">
            <input
              type="text"
              placeholder="ค้นหา..."
              class="rounded-l-md border border-gray-300 py-1.5 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]"
            />
            <button
              class="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1.5 hover:from-pink-600 hover:to-orange-600"
            >
              <Search class="w-4 h-4" />
            </button>
          </div>

          <div ref="dropdownRef" class="relative">
            <button
              @click="toggleNotifications"
              class="rounded-full bg-white border border-gray-300 p-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition"
            >
              <ShieldUser class="w-6 h-6" />
            </button>

            <div
              v-if="showNotifications"
              class="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl ring-1 ring-gray-200 z-50"
            >
              <div class="py-2">
                <NuxtLink
                  :to="`/admin/user`"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  แก้ไขข้อมูลผู้ใช้
                </NuxtLink>
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
