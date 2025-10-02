<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router"; // เพิ่ม useRoute
import { Search, ShieldUser, ChevronDown, Menu, X } from "lucide-vue-next";
import { decodeJwt } from "jose";
import { useCookie } from "#app";

const route = useRoute();

// state ทั่วไป
const id = ref<string>("");
const router = useRouter();
const searchTerm = ref("");

const token = useCookie("token").value;
                       

// desktop dropdown
const showProcess = ref(false);
const showCommunity = ref(false);
const showHandmade = ref(false);

const showIdentity = ref(false);
const identityRef = ref<HTMLElement | null>(null);

// profile dropdown
const showNotifications = ref(false);
const profileRef = ref<HTMLElement | null>(null);

// mobile menu & sub-accordions
const showMobile = ref(false);
const mProcess = ref(false);
const mHandmade = ref(false);
const mCommunity = ref(false);
const mIdentity = ref(false);

//  ปิดทุกเมนูเมื่อเส้นทางเปลี่ยน (กันเมนูค้าง)
watch(
  () => route.fullPath,
  () => {
    showNotifications.value = false;
    showProcess.value = false;
    showCommunity.value = false;
    showHandmade.value = false;
    showIdentity.value = false;

    showMobile.value = false;
    mProcess.value = false;
    mHandmade.value = false;
    mCommunity.value = false;
  }
);

// ค้นหา
const doSearch = () => {
  const q = searchTerm.value.trim();
  if (!q) return;
  router.push({ path: "/member/search", query: { q } });
  showMobile.value = false; // ปิดแผงมือถือหลังค้นหา
};

// ปิดเมนูเมื่อคลิกนอกกรอบ (profile + desktop dropdown)
const handleGlobalPointer = (e: Event) => {
  const t = e.target as Node;
  if (profileRef.value && !profileRef.value.contains(t))
    showNotifications.value = false;

  // โซน desktop nav ทั้งหมด
  const nav = document.getElementById("main-nav");
  if (nav && !nav.contains(t)) {
    showProcess.value = false;
    showCommunity.value = false;
    showHandmade.value = false;
    showIdentity.value = false;
  }
};

// ปิดเมนูด้วย Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    showNotifications.value = false;
    showProcess.value = false;
    showCommunity.value = false;
    showHandmade.value = false;
    showIdentity.value = false;

    showMobile.value = false;
    mProcess.value = false;
    mHandmade.value = false;
    mCommunity.value = false;
  }
};

// ปรับสถานะเมื่อเปลี่ยนขนาดหน้าจอ (กันเมนูค้าง)
let mql: MediaQueryList | null = null;
const handleMediaChange = () => {
  const isDesktop = mql?.matches; // md และกว้างกว่า
  // รีเซ็ตเมนูมือถือเมื่อกลับสู่ desktop
  if (isDesktop) {
    showMobile.value = false;
    mProcess.value = false;
    mHandmade.value = false;
    mCommunity.value = false;
  }
};

const logout = () => {
  useCookie("token").value = null;
  router.push("/");
};

onMounted(() => {
  const token = useCookie<string | null>("token").value;
  if (token) {
    const decoded: any = decodeJwt(token);
    id.value = String(decoded.user_id);
  }

  document.addEventListener("pointerdown", handleGlobalPointer);
  document.addEventListener("keydown", handleEscape);

  // media query สำหรับ md ขึ้นไป
  mql = window.matchMedia("(min-width: 768px)");
  mql.addEventListener("change", handleMediaChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleGlobalPointer);
  document.removeEventListener("keydown", handleEscape);
  if (mql) mql.removeEventListener("change", handleMediaChange);
});
</script>

<template>
  <nav
    id="main-nav"
    class="sticky top-[env(safe-area-inset-top)] z-[9999] backdrop-blur-md bg-white/80 shadow-gray-300 border-b border-gray-200 h-24 md:h-28"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <!-- แถวบน -->
      <div class="flex h-16 md:h-20 items-center justify-between">
        <!-- ซ้าย: โลโก้ (fixed width, ไม่หด) -->
        <div class="flex items-center shrink-0">
          <NuxtLink to="/member" class="shrink-0 flex items-center gap-8 pr-4">
            <img
              src="/assetts/css/image/โลโก้5.png"
              alt="Mai Khmer Logo"
              class="object-cover max-w-md w-full h-23"
            />
          </NuxtLink>
        </div>

        <!-- กลาง: เมนู -->
        <div class="hidden md:flex flex-1 items-center justify-center">
          <nav class="flex items-center gap-8 lg:gap-10 whitespace-nowrap">
            <NuxtLink class="text-gray-800 hover:text-red-600" to="/member"
              >หน้าหลัก</NuxtLink
            >

            <!-- กระบวนการทอผ้า -->
            <div class="relative">
              <button
                @click="showProcess = !showProcess"
                :aria-expanded="showProcess"
                class="flex items-center gap-1 text-gray-800 hover:text-red-600"
              >
                กระบวนการทอผ้า
                <ChevronDown
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': showProcess }"
                />
              </button>
              <div
                v-if="showProcess"
                class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-xl border border-gray-200 z-[10000]"
              >
                <NuxtLink
                  to="/member/information_list/cloth/cloth13"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  @click="showProcess = false"
                  >กระบวนการผลิต</NuxtLink
                >

                <div class="relative">
                  <button
                    @click="showHandmade = !showHandmade"
                    :aria-expanded="showHandmade"
                    class="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    การผลิตผ้าทอมือ
                  </button>
                  <div
                    v-if="showHandmade"
                    class="absolute left-full top-0 w-60 bg-white shadow-lg rounded-xl border border-gray-200"
                  >
                    <NuxtLink
                      to="/member/information_list/cloth/cloth10"
                      class="block px-4 py-2 text-sm hover:bg-gray-100"
                      @click="showProcess = false"
                      >เทคนิคการผลิตผ้าทอมือ</NuxtLink
                    >
                    <NuxtLink
                      to="/member/information_list/cloth/cloth11"
                      class="block px-4 py-2 text-sm hover:bg-gray-100"
                      @click="showProcess = false"
                      >การย้อมสี</NuxtLink
                    >
                    <NuxtLink
                      to="/member/information_list/cloth/cloth12"
                      class="block px-4 py-2 text-sm hover:bg-gray-100"
                      @click="showProcess = false"
                      >การตกแต่งเส้นด้ายยืนและพุ่ง</NuxtLink
                    >
                  </div>
                </div>

                <NuxtLink
                  to="/member/information_list/cloth/cloth14"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  @click="showProcess = false"
                  >อุปกรณ์การทอ</NuxtLink
                >
              </div>
            </div>

            <!-- ลวดลายผ้า -->
            <div class="relative">
              <button
                @click="showCommunity = !showCommunity"
                :aria-expanded="showCommunity"
                class="flex items-center gap-1 text-gray-800 hover:text-red-600"
              >
                ลวดลายผ้า
                <ChevronDown
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': showCommunity }"
                />
              </button>
              <div
                v-if="showCommunity"
                class="absolute left-1/2 -translate-x-1/2 mt-2 w-60 bg-white shadow-lg rounded-xl border border-gray-200 z-[10000]"
              >
                <NuxtLink
                  to="/member/information_list/cloth/cloth9"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >การออกแบบลวดลายผ้าทอมือ</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth1"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้าหางกระรอก</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth2"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้าโสร่ง</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth3"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้าซิ่นหมี่</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth6"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้าโฮลเปราะห์</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth4"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้ายกดอกและผ้าสไบยกดอก</NuxtLink
                >
                <NuxtLink
                  to="/member/information_list/cloth/cloth5"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                  >ผ้าขาวม้ายกขิด ผ้าสไบยกขิด</NuxtLink
                >
              </div>
            </div>
            <!-- เมนู อัตลักษณ์ พร้อม Dropdown -->
            <div class="relative" ref="identityRef">
              <button
                @click="showIdentity = !showIdentity"
                @keydown.escape="showIdentity = false"
                :aria-expanded="showIdentity"
                class="flex items-center gap-1 text-gray-800 hover:text-red-600"
              >
                อัตลักษณ์
                <ChevronDown
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': showIdentity }"
                />
              </button>

              <div
                v-if="showIdentity"
                class="absolute left-1/2 -translate-x-1/2 mt-2 w-60 bg-white shadow-lg rounded-xl border border-gray-200 z-[10000]"
              >
                <ul class="py-2 text-sm text-gray-900">
                  <li>
                    <NuxtLink
                      to="/member/information_list/Identity/identity1"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      อัตลักษณ์ผ้าบรีรัมย์
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/Identity/Identity2"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      อัตลักษณ์ผ้าเขมร
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/Identity/Identity3"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้าพื้น
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity4"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้าลายริ้ว
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity5"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้าลายตาราง
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity6"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้ามัดหมี่
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity7"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ลายจากรูปลักษณ์ของข้าวของเครื่องใช้
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity8"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ลายจากงานสถาปัตยกรรม
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity9"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ลายจากพืชพรรณธรรมชาติ
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity10"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้าลวดลายรูปคนและสัตว์
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity11"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ผ้าลวดลายที่แสดงวิถีชีวิต
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/member/information_list/identity/identity12"
                      class="block px-4 py-2 hover:bg-gray-100"
                      @click="showIdentity = false"
                    >
                      ลายประยุกต์ประสมประสาน
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <NuxtLink
              class="text-gray-800 hover:text-red-600"
              to="/member/post_list"
              >โพสต์</NuxtLink
            >
            
          </nav>
        </div>

        <!-- ขวา: ค้นหา + โปรไฟล์  -->
        <div class="flex items-center gap-3 shrink-0">
          <!-- ช่องค้นหาเหมือนเดิม -->
          <div class="hidden sm:flex rounded-md overflow-hidden shadow">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="ค้นหา..."
              class="rounded-l-md border border-gray-300 py-1.5 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]"
              @keydown.enter="doSearch"
            />
            <button
              class="bg-gradient-to-r from-orange-600 to-orange-300 text-white px-3 py-1.5 hover:from-orange-300 hover:to-orange-600 cursor-pointer"
              @click="doSearch"
            >
              <Search class="w-4 h-4" />
            </button>
          </div>

          <!-- ปุ่มโปรไฟล์ -->
          <div ref="profileRef" class="relative hidden sm:block">
            <button
              @click="showNotifications = !showNotifications"
              :aria-expanded="showNotifications"
              aria-haspopup="menu"
              class="rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 transition cursor-pointer"
            >
              <ShieldUser class="w-6 h-6" />
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
                    class="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                    @click="showNotifications = false"
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

          <!-- Hamburger (มือถือ) -->
          <button
            class="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
            @click="showMobile = !showMobile"
            :aria-expanded="showMobile"
            aria-controls="mobile-menu"
          >
            <Menu v-if="!showMobile" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- แถวค้นหา (มือถือเท่านั้น) -->
      <div class="sm:hidden pb-2">
        <div class="flex rounded-md overflow-hidden shadow">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="ค้นหา..."
            class="flex-1 rounded-l-md border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]"
            @keydown.enter="doSearch"
          />
          <button
            class="bg-gradient-to-r from-orange-600 to-orange-300 text-white px-3 py-2 hover:from-orange-300 hover:to-orange-600 cursor-pointer"
            @click="doSearch"
          >
            <Search class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Panel -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showMobile" id="mobile-menu" class="md:hidden pb-4">
          <div
            class="space-y-1 rounded-xl border border-gray-200 bg-[#ede5ed] backdrop-blur-sm p-2 shadow"
          >
            <NuxtLink
              to="/member"
              class="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              @click="showMobile = false"
            >
              หน้าหลัก
            </NuxtLink>
            <NuxtLink
              to="/member/information_list/cloth/cloth7"
              class="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              @click="showMobile = false"
            >
              ชาติพันธุ์เขมรบุรีรัมย์
            </NuxtLink>
            <NuxtLink
              to="/member/information_list/cloth/cloth8"
              class="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              @click="showMobile = false"
            >
              วัฒนธรรมผ้าทอมือ
            </NuxtLink>

            <!-- Accordion: กระบวนการทอผ้า -->
            <div class="px-2">
              <button
                class="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 text-gray-900"
                @click="mProcess = !mProcess"
                :aria-expanded="mProcess"
                aria-controls="m-process"
              >
                <span>กระบวนการทอผ้า</span>
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': mProcess }"
                />
              </button>
              <div v-if="mProcess" id="m-process" class="mt-1 ml-3 space-y-1">
                <NuxtLink
                  to="/member/information_list/cloth/cloth13"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  กระบวนการผลิต
                </NuxtLink>

                <!-- Handmade sub-accordion -->
                <button
                  class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="mHandmade = !mHandmade"
                  :aria-expanded="mHandmade"
                  aria-controls="m-handmade"
                >
                  <span>การผลิตผ้าทอมือ</span>
                  <ChevronDown
                    class="w-4 h-4 transition-transform"
                    :class="{ 'rotate-180': mHandmade }"
                  />
                </button>
                <div
                  v-if="mHandmade"
                  id="m-handmade"
                  class="mt-1 ml-3 space-y-1"
                >
                  <NuxtLink
                    to="/member/information_list/cloth/cloth10"
                    class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                    @click="showMobile = false"
                  >
                    เทคนิคการผลิตผ้าทอมือ
                  </NuxtLink>
                  <NuxtLink
                    to="/member/information_list/cloth/cloth11"
                    class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                    @click="showMobile = false"
                  >
                    การย้อมสี
                  </NuxtLink>
                  <NuxtLink
                    to="/member/information_list/cloth/cloth12"
                    class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                    @click="showMobile = false"
                  >
                    การตกแต่งเส้นด้ายยืนและเส้นด้ายพุ่ง
                  </NuxtLink>
                </div>

                <NuxtLink
                  to="/member/information_list/cloth/cloth14"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  อุปกรณ์การทอ
                </NuxtLink>
              </div>
            </div>

            <div class="px-2">
              <button
                class="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 text-gray-900"
                @click="mIdentity = !mIdentity"
                :aria-expanded="mIdentity"
                aria-controls="m-process"
              >
                <span>อัตลักษณ์</span>
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': mIdentity }"
                />
              </button>
              <div v-if="mIdentity" id="m-process" class="mt-1 ml-3 space-y-1">
                <NuxtLink
                  to="/member/information_list/identity/identity1"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  อัตลักษณ์ผ้าบรีรัมย์
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity2"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  อัตลักษณ์ผ้าเขมร
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity3"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าพื้น
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity4"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าลายริ้ว
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity5"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าลายตาราง
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity6"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้ามัดหมี่
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity7"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ลายจากรูปลักษณ์ของข้าวของเครื่องใช้
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity8"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ลายจากงานสถาปัตยกรรม
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity9"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ลายจากพืชพรรณธรรมชาติ
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity10"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าลวดลายรูปคนและสัตว์
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity11"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าลวดลายที่แสดงวิถีชีวิต
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/identity/identity12"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ลายประยุกต์ประสมประสาน
                </NuxtLink>
              </div>
            </div>
            <!-- Accordion: ลวดลายผ้า -->
            <div class="px-2">
              <button
                class="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 text-gray-900"
                @click="mCommunity = !mCommunity"
                :aria-expanded="mCommunity"
                aria-controls="m-community"
              >
                <span>ลวดลายผ้า</span>
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': mCommunity }"
                />
              </button>
              <div
                v-if="mCommunity"
                id="m-community"
                class="mt-1 ml-3 space-y-1"
              >
                <NuxtLink
                  to="/member/information_list/cloth/cloth9"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  การออกแบบลวดลายผ้าทอมือ
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth1"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าหางกระรอก
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth2"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าโสร่ง
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth3"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าซิ่นหมี่
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth6"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าโฮลเปราะห์
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth4"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้ายกดอกและผ้าสไบยกดอก
                </NuxtLink>
                <NuxtLink
                  to="/member/information_list/cloth/cloth5"
                  class="block px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900"
                  @click="showMobile = false"
                >
                  ผ้าขาวม้ายกขิด ผ้าสไบยกขิด
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              to="/member/post_list"
              class="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              @click="showMobile = false"
            >
              โพสต์
            </NuxtLink>
            
            <NuxtLink
              to="/member/popularity"
              class="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              @click="showMobile = false"
            >
              ความนิยม
            </NuxtLink>
 
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>
