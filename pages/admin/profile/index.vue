<script setup>
definePageMeta({ layout: "admin" });

// MODIFIED: เพิ่ม import Modal
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { decodeJwt } from "jose";
import CommonConfirmModal from "~/components/common/button/ConfirmModal.vue"; // ADDED

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();
const route = useRoute();

const token = useCookie("token").value;

const user = ref({
  user_id: "",
  user_name: "",
  user_username: "",
  user_password: "", // ว่าง = ไม่เปลี่ยนรหัส
  user_image: null, // File
  user_image_path: "", // สำหรับแสดงผล (URL เต็ม)
});
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);
let previewUrl = null;

// --- Notification State (Toast) ---
const notification = ref({
  show: false,
  message: "",
  type: "success",
});
let notificationTimer = null;

// --- Modal State (Confirm) ---
const showDeleteModal = ref(false); // ADDED

// --- Notification (Toast) Helper ---
// ADDED: ฟังก์ชันสำหรับแสดงการแจ้งเตือน
const showNotification = (message, type = "success", duration = 3500) => {
  if (notificationTimer) clearTimeout(notificationTimer);
  notification.value = { show: true, message, type };
  notificationTimer = setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

// --- Modal Handlers (ADDED) ---
// ADDED: ฟังก์ชันสำหรับเปิด Modal
const openDeleteModal = () => {
  if (!user.value.user_id) return;
  showDeleteModal.value = true;
};

// ADDED: ฟังก์ชันสำหรับปิด Modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};
// ---------------------------------

// base URL สำหรับไฟล์ภาพ
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// MODIFIED: fetchUser (เพิ่ม notification)
const fetchUser = async () => {
  let id = route.params.id;
  if (!id && token) {
    const decoded = decodeJwt(token);
    id = decoded.user_id ?? decoded.userId ?? decoded.id;
  }
  if (!id) {
    loading.value = false;
    return;
  }

  try {
    const res = await $axios.get(`/user/${id}`);
    if (res.status === 200 && res.data?.data) {
      const u = res.data.data;
      user.value.user_id = u.user_id;
      user.value.user_name = u.user_name || "";
      user.value.user_username = u.user_username || "";
      user.value.user_password = "";
      user.value.user_image = null;
      user.value.user_image_path = u.user_image_path
        ? getImageUrl(u.user_image_path)
        : "";
    }
  } catch (err) {
    console.error("โหลดข้อมูลผู้ใช้ล้มเหลว", err);
    showNotification("โหลดข้อมูลผู้ใช้ล้มเหลว", "error"); // ADDED
  } finally {
    loading.value = false;
  }
};

const handleFileChange = (e) => {
  const file = (e.target.files && e.target.files[0]) || null;
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  user.value.user_image = file;
  if (file) {
    previewUrl = URL.createObjectURL(file);
    user.value.user_image_path = previewUrl;
  }
};

const clearSelectedImage = () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  user.value.user_image = null;
  const input = document.getElementById("admin-profile-image");
  if (input) input.value = "";
  // (ไม่ต้อง fetchUser ใหม่ทันที)
};

// MODIFIED: saveProfile (เปลี่ยน alert เป็น showNotification)
const saveProfile = async () => {
  if (!user.value.user_id) return;
  saving.value = true;

  try {
    const formData = new FormData();
    formData.append("user_name", user.value.user_name);
    formData.append("user_username", user.value.user_username);
    if (user.value.user_password) {
      formData.append("user_password", user.value.user_password);
    }
    if (user.value.user_image) {
      formData.append("user_image", user.value.user_image);
    }

    const res = await $axios.put(`/user/${user.value.user_id}`, formData);
    if (res.status === 200) {
      // alert("บันทึกข้อมูลเรียบร้อยแล้ว"); // REMOVED
      showNotification("บันทึกข้อมูลเรียบร้อยแล้ว", "success"); // ADDED
      user.value.user_password = "";
      await fetchUser(); // รีเฟรชข้อมูลจริง
      clearSelectedImage(); // เคลียร์พรีวิว
    }
  } catch (err) {
    console.error("ไม่สามารถบันทึกข้อมูลได้", err);
    // alert("เกิดข้อผิดพลาด"); // REMOVED
    showNotification("ไม่สามารถบันทึกข้อมูลได้", "error"); // ADDED
  } finally {
    saving.value = false;
  }
};

// RENAMED & MODIFIED: (เดิมชื่อ deleteProfile)
const confirmDelete = async () => {
  if (!user.value.user_id) return;
  // REMOVED: if (!confirm(...)) return;

  try {
    deleting.value = true;
    await $axios.delete(`/user/${user.value.user_id}`);
    useCookie("token").value = null; // ออกจากระบบกรณีลบตัวเอง
    
    // ADDED: แจ้งเตือนก่อนเด้ง
    showNotification("ลบโปรไฟล์สำเร็จ", "success");
    // รอแป๊บนึงให้ Toast แสดง
    setTimeout(() => {
      navigateTo("/"); // กลับหน้าแรก
    }, 1500);

  } catch (err) {
    console.error("ลบโปรไฟล์ไม่สำเร็จ", err);
    // alert("ลบโปรไฟล์ไม่สำเร็จ"); // REMOVED
    showNotification("ลบโปรไฟล์ไม่สำเร็จ", "error"); // ADDED
  } finally {
    deleting.value = false;
    closeDeleteModal(); // ADDED
  }
};

onMounted(fetchUser);
onBeforeUnmount(() => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});
</script>

<template>
  <div
    class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat"
  >
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform translate-x-10"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-10"
    >
      <div
        v-if="notification.show"
        :class="[
          'fixed bottom-5 right-5 z-50 max-w-sm rounded-lg p-4 text-white shadow-xl',
          notification.type === 'success'
            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
            : 'bg-gradient-to-r from-red-500 to-rose-600',
        ]"
        role="alert"
      >
        <div class="flex items-center justify-between">
          <svg
            v-if="notification.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 flex-shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 flex-shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <span class="ml-3 font-medium">{{ notification.message }}</span>
          <button
            @click="notification.show = false"
            class="ml-6 -mr-1 rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
    <CommonButtonBack />
    <h1 class="text-2xl font-bold text-center text-gray-900 mb-8">
      จัดการข้อมูลผู้ใช้ (ผู้ดูแลระบบ)
    </h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">
      กำลังโหลดข้อมูลผู้ใช้...
    </div>

    <div
      v-else
      class="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start text-lg"
    >
      <div
        class="w-full md:w-1/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-md text-purple-700"
      >
        <div class="flex flex-col items-center">
          <div
            class="relative w-28 h-28 rounded-full shadow overflow-hidden mb-3 border border-purple-100"
          >
            <img
              v-if="user.user_image_path"
              :src="user.user_image_path"
              alt="profile"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              ไม่มีรูป
            </div>
            <button
              v-if="user.user_image && user.user_image_path === previewUrl"
              type="button"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
              @click="clearSelectedImage"
              title="ยกเลิกรูปที่เลือก"
            >
              ✕
            </button>
          </div>
          <label
            for="admin-profile-image"
            class="mt-1 cursor-pointer"
            title="อัปโหลดรูปภาพ"
          >
            <div
              class="w-10 h-10 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition shadow-sm ring-1 ring-gray-300/60 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
          </label>
          <input
            id="admin-profile-image"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
          <div class="mt-4 text-sm text-center">
            <p class="font-semibold">ชื่อผู้ใช้ (username)</p>
            <p class="text-sm">{{ user.user_username || "-" }}</p>
            <p class="text-sm">หมายเลขสมาชิก: {{ user.user_id }}</p>
          </div>
        </div>
      </div>

      <div
        class="w-full md:w-2/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow space-y-4 text-purple-700"
      >
        <div>
          <label class="block mb-1 font-semibold">ชื่อผู้ใช้ (username)</label>
          <input
            v-model="user.user_username"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">ชื่อ-นามสกุล</label>
          <input
            v-model="user.user_name"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold"
            >รหัสผ่านใหม่ (หากต้องการเปลี่ยน)</label
          >
          <input
            type="password"
            v-model="user.user_password"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <button
            @click="saveProfile"
            :disabled="saving"
            class="px-5 py-2.5 rounded-full bg-gradient-to-r bg-purple-500 text-white shadow hover:opacity-95 transition disabled:opacity-60 cursor-pointer"
          >
            {{ saving ? "กำลังบันทึก..." : "บันทึก" }}
          </button>

          <button
            type="button"
            @click="openDeleteModal"
            :disabled="deleting"
            class="px-5 py-2.5 rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition disabled:opacity-60 cursor-pointer"
            title="ลบโปรไฟล์นี้และกลับสู่หน้าแรก"
          >
            {{ deleting ? "กำลังลบ..." : "ลบโปรไฟล์" }}
          </button>
        </div>
      </div>
    </div>

    <CommonConfirmModal
      :show="showDeleteModal"
      title="ยืนยันการลบโปรไฟล์"
      :message="`คุณต้องการลบโปรไฟล์ '${
        user.user_username || ''
      }' ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`"
      confirmText="ยืนยันการลบ"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>