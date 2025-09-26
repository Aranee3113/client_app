<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import { Shirt, Search, ShieldUser, Menu, X } from "lucide-vue-next";
import { decodeJwt } from "jose";
import { useCookie } from "#app";

const router = useRouter();

/* ---------- auth ---------- */
const id = ref<string>("");
const token = useCookie<string | null>("token");

/* ---------- ui state ---------- */
const showNotifications = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const showMobile = ref(false); // hamburger panel open?
const searchTerm = ref("");

/* ---------- handlers ---------- */
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleClickOutside = (event: Event) => {
  const target = event.target as Node;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showNotifications.value = false;
  }
};

const onResize = () => {
  // ปิดเมนูมือถือเมื่อขยายหน้าจอ >= md
  if (window.innerWidth >= 768 && showMobile.value) showMobile.value = false;
};

const doSearch = () => {
  const q = searchTerm.value.trim();
  if (!q) return;
  router.push({ path: "/admin/search", query: { q } });
  searchTerm.value = "";
  showMobile.value = false; // ปิดแผงมือถือหลังค้นหา
};

const logout = () => {
  token.value = null;
  router.push("/");
  showMobile.value = false;
};

const go = (to: string) => {
  router.push(to);
  showMobile.value = false; // ปิดแผงมือถือเมื่อเปลี่ยนหน้า
};

/* ---------- lifecycle ---------- */
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", onResize);

  // อ่าน user_id จาก token
  if (token.value) {
    try {
      const decoded: any = decodeJwt(token.value);
      id.value = String(decoded.user_id ?? decoded.userID ?? "");
    } catch {
      // ignore
    }
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", onResize);
});

// ถ้า token เปลี่ยน (login/logout) ให้ปิดเมนูที่เปิดอยู่
watch(token, () => {
  showNotifications.value = false;
  showMobile.value = false;
});
</script>

<template>
  <nav
    class="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-gray-300 border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-800"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Bar -->
      <div class="flex h-16 md:h-20 items-center justify-between gap-4">
        <!-- Left: brand + hamburger -->
        <div class="flex items-center gap-3">
          <!-- Hamburger (mobile) -->
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

          <!-- Brand -->
          <NuxtLink
            to="/admin"
            class="text-2xl md:text-3xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-700 to-orange-500 bg-clip-text text-transparent"
          >
            <Shirt class="w-6 h-6 md:w-7 md:h-7" />
            <span>Mai Khmer</span>
          </NuxtLink>
        </div>

        <!-- Center: desktop links -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/admin"
            class="text-base md:text-lg text-gray-700 hover:text-orange-600 transition dark:text-gray-200 dark:hover:text-orange-300"
            >หน้าหลัก</NuxtLink
          >
          <NuxtLink
            to="/admin/post"
            class="text-base md:text-lg text-gray-700 hover:text-orange-600 transition dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการโพสต์</NuxtLink
          >
          <NuxtLink
            to="/admin/comment"
            class="text-base md:text-lg text-gray-700 hover:text-orange-600 transition dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการความคิดเห็น</NuxtLink
          >
          <NuxtLink
            to="/admin/user"
            class="text-base md:text-lg text-gray-700 hover:text-orange-600 transition dark:text-gray-200 dark:hover:text-orange-300"
            >จัดการรายชื่อผู้ใช้</NuxtLink
          >
        </div>

        <!-- Right: search + profile -->
        <div class="flex items-center gap-3">
        
          <!-- Profile / dropdown -->
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
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
                  role="menuitem"
                  @click="showNotifications=false"
                >
                  แก้ไขข้อมูลผู้ใช้
                </NuxtLink>
                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl"
                  role="menuitem"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Panel -->
      <div
        id="admin-mobile-panel"
        v-show="showMobile"
        class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95"
      >
        <div class="px-3 py-3 space-y-2">
          
          <!-- Links (mobile) -->
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
            @click="go('/admin/user')"
          >
            จัดการรายชื่อผู้ใช้
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
