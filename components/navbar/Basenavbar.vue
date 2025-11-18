<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Menu, X, ShieldUser } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

/* ---------- state ---------- */
const showMobile = ref(false);
const showNotifications = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

/* ---------- handlers ---------- */
const go = (path: string) => {
  showMobile.value = false;
  router.push(path);
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const logout = () => {
  // clear token / session
  localStorage.removeItem("token");
  router.push("/");
};

const handleClickOutside = (event: Event) => {
  const target = event.target as Node;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showNotifications.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav
    class="sticky top-[env(safe-area-inset-top)] z-[9999] backdrop-blur-md bg-white/80 shadow-gray-300 border-b border-gray-200 h-24 md:h-28"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4 py-4 md:py-5">
        <div class="flex items-center gap-3 shrink-0">
          <button
            class="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            @click.stop="showMobile = !showMobile"
            :aria-expanded="showMobile"
            aria-controls="admin-mobile-panel"
            aria-label="Toggle navigation"
          >
            <Menu v-if="!showMobile" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>

          <div class="flex items-center shrink-0">
            <NuxtLink to="/admin" class="shrink-0 flex items-center gap-8 pr-4">
              <img
                src="/assetts/css/image/โลโก้5.png"
                alt="Mai Khmer Logo"
                class="object-cover h-20 md:h-20  "
              />
            </NuxtLink>
          </div>
        </div>

        <div class="hidden md:flex flex-1 items-center justify-center gap-10">
          <NuxtLink
            to="/admin"
            class="px-2 py-2 text-xl text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            >หน้าหลัก</NuxtLink
          >
          <NuxtLink
            to="/admin/post"
            class="px-2 py-2 text-xl text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการโพสต์</NuxtLink
          >
          <NuxtLink
            to="/admin/comment"
            class="px-2 py-2 text-xl text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการความคิดเห็น</NuxtLink
          >
          <NuxtLink
            to="/admin/video"
            class="px-2 py-2 text-xl text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการวิดีโอ</NuxtLink
          >
          <NuxtLink
            to="/admin/user"
            class="px-2 py-2 text-xl text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการรายชื่อผู้ใช้</NuxtLink
          >
        </div>

        <div class="flex items-center gap-3">
          <div ref="dropdownRef" class="relative">
            <button
              @click.stop="toggleNotifications"
              class="rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              aria-haspopup="menu"
              :aria-expanded="showNotifications"
            >
              <ShieldUser class="w-6 h-6" />
            </button>

            <div
              v-if="showNotifications"
              class="absolute right-0 mt-3 w-44 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 z-50"
              role="menu"
            >
              <div class="py-2">
                <NuxtLink
                  to="/admin/profile"
                  class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
                  role="menuitem"
                  @click="showNotifications = false"
                >
                  แก้ไขข้อมูลผู้ใช้
                </NuxtLink>
                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl"
                  role="menuitem"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="admin-mobile-panel"
        v-show="showMobile"
        class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95"
      >
        <div class="px-3 py-3 space-y-2">
          <button
            class="w-full text-left block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            @click="go('/admin')"
          >
            หน้าหลัก
          </button>
          <button
            class="w-full text-left block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            @click="go('/admin/post')"
          >
            จัดการโพสต์
          </button>
          <button
            class="w-full text-left block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            @click="go('/admin/comment')"
          >
            จัดการความคิดเห็น
          </button>
          <button
            class="w-full text-left block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            @click="go('/admin/video')"
          >
            จัดการวิดีโอ
          </button>
          <button
            class="w-full text-left block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            @click="go('/admin/user')"
          >
            จัดการรายชื่อผู้ใช้
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
