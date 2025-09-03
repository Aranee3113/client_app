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

const showProcess = ref(false);
const showCommunity = ref(false);
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
  <nav
    class="backdrop-blur-md bg-white/80 shadow-gray-300 z-50 border-b border-gray-200"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between space-x-6">
        <!-- เมนูด้านซ้าย -->
        <div class="flex items-center space-x-6">
          <NuxtLink
            to="/member"
            class="text-3xl font-bold bg-gradient-to-r text-purple-600 bg-clip-text flex items-center space-x-2"
          >
            <Shirt />
            <span>Mai Khmer</span>
          </NuxtLink>
          <NuxtLink
            :to="`/member`"
            class="text-sm text-gray-700 hover:text-orange-600 transition"
            >หน้าหลัก</NuxtLink
          >
          <!-- Dropdown เมนูกระบวนการทอผ้า -->
          <div class="relative">
            <button
              @click="showProcess = !showProcess"
              class="text-sm text-gray-700 hover:text-orange-600 transition flex items-center space-x-1 cursor-pointer"
            >
              <span>กระบวนการทอผ้า</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showProcess }"
              />
            </button>

            <!-- dropdown list -->
            <div
              v-if="showProcess"
              class="absolute left-0 mt-2 w-35 bg-white shadow-lg rounded-xl border border-gray-200 z-50 cursor-pointer"
            >
              <NuxtLink
                to="/member/information_list/33"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showProcess = false"
              >
                กระบวนการผลิต
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/34"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showProcess = false"
              >
                อุปกรณ์การทอ
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/35"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showProcess = false"
              >
                อัตลักษณ์ผ้าเขมร
              </NuxtLink>
            </div>
          </div>

          <!-- Dropdown เมนูชุมชนผ้าทอ -->
          <div class="relative">
            <button
              @click="showCommunity = !showCommunity"
              class="text-sm text-gray-700 hover:text-orange-600 transition flex items-center space-x-1 cursor-pointer"
            >
              <span>ลวดลายผ้า</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showCommunity }"
              />
            </button>

            <!-- dropdown list -->
            <div
              v-if="showCommunity"
              class="absolute left-0 mt-2 w-50 bg-white shadow-lg rounded-xl border border-gray-200 z-50 cursor-pointer"
            >
              <NuxtLink
                to="/member/information_list/28"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ผ้าหางกระรอก
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/29"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ผ้าโสร่ง
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/30"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ผ้าซิ่นหมี่และโฮลเปราะห์
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/31"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ผ้ายกดอกและผ้าสไบยกดอก
              </NuxtLink>
              <NuxtLink
                to="/member/information_list/32"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ผ้าขาวม้ายกขิด ผ้าสไบยกขิด
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            :to="`/member/post_list`"
            class="text-sm text-gray-700 hover:text-orange-600 transition"
            >โพสต์</NuxtLink
          >
          <NuxtLink
            :to="`/member/contract`"
            class="text-sm text-gray-700 hover:text-orange-600 transition"
            >แชท</NuxtLink
          >
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
            <button
              class="bg-gradient-to-r from-orange-600 to-orange-300 text-white px-3 py-1.5 hover:from-orange-300 hover:to-orange-600 cursor-pointer"
            >
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
              class="absolute right-0 mt-3 w-35 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl ring-1 ring-gray-200 z-50"
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
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
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
