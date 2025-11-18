<script setup lang="ts">
definePageMeta({ layout: "member" });

// MODIFIED: เพิ่ม import Modal
import { ref, onMounted, onUnmounted } from "vue";
import { useCookie } from "#app";
import { decodeJwt } from "jose";
import CommonConfirmModal from "~/components/common/button/ConfirmModal.vue"; // ADDED

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const tokenCookie = useCookie<string | null>("token");

// state
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);
const error = ref("");

const form = ref({
  user_id: "",
  user_name: "",
  user_username: "",
  user_password: "", // เว้นว่าง = ไม่เปลี่ยน
  user_image_path: "" as string | null,
});

const newImageFile = ref<File | null>(null);
const newImagePreview = ref<string>("");

// --- Notification State (Toast) ---
const notification = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});
let notificationTimer: any = null;

// --- Modal State (Confirm Delete) ---
const showDeleteModal = ref(false); // ADDED

// --- Modal State (Confirm Save) ---
const showSaveModal = ref(false);

// --- Notification (Toast) Helper ---
// ADDED: ฟังก์ชันสำหรับแสดงการแจ้งเตือน
const showNotification = (
  message: string,
  type: "success" | "error" = "success",
  duration = 3500
) => {
  if (notificationTimer) clearTimeout(notificationTimer);
  notification.value = { show: true, message, type };
  notificationTimer = setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

// --- Delete Modal Handlers (ADDED) ---
// ADDED: ฟังก์ชันสำหรับเปิด Modal
const openDeleteModal = () => {
  if (!form.value.user_id) return;
  showDeleteModal.value = true;
};

// ADDED: ฟังก์ชันสำหรับปิด Modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};
// ---------------------------------

// --- Save Modal Handlers (ADDED) ---
const openSaveModal = () => {
  showSaveModal.value = true;
};

const closeSaveModal = () => {
  showSaveModal.value = false;
};
// ---------------------------------

const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// MODIFIED: loadMe (เพิ่ม notification)
const loadMe = async () => {
  try {
    loading.value = true;
    error.value = "";

    const token = tokenCookie.value;
    if (!token) throw new Error("ไม่พบโทเค็น กรุณาเข้าสู่ระบบใหม่");

    const payload = decodeJwt(token);
    const uid =
      (payload as any)?.user_id ??
      (payload as any)?.userId ??
      (payload as any)?.id;
    if (!uid) throw new Error("โทเค็นไม่ถูกต้อง");

    const { data } = await $axios.get(`/user/${uid}`); // GET /user/:id
    const u = data?.data || {};
    form.value.user_id = String(u.user_id || "");
    form.value.user_name = u.user_name || "";
    form.value.user_username = u.user_username || "";
    form.value.user_password = "";
    form.value.user_image_path = u.user_image_path || null;
  } catch (e: any) {
    console.error(e);
    error.value = e?.message || "โหลดข้อมูลไม่สำเร็จ";
    showNotification(error.value, "error"); // ADDED
  } finally {
    loading.value = false;
  }
};

// เลือกรูปใหม่
const onImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] || null;

  if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);
  newImageFile.value = null;
  newImagePreview.value = "";

  if (file) {
    newImageFile.value = file;
    newImagePreview.value = URL.createObjectURL(file);
  }
};

// ล้างรูปที่เลือก (กลับไปใช้รูปเดิม)
const removeSelectedImage = () => {
  if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);
  newImagePreview.value = "";
  newImageFile.value = null;
  const input = document.getElementById(
    "profile-image"
  ) as HTMLInputElement | null;
  if (input) input.value = "";
};

// RENAMED & MODIFIED: (เดิมชื่อ saveProfile)
const confirmSave = async () => {
  if (!form.value.user_id) return;
  closeSaveModal(); // ปิด Modal
  try {
    saving.value = true;
    const fd = new FormData();
    fd.append("user_name", (form.value.user_name || "").trim());
    fd.append("user_username", (form.value.user_username || "").trim());
    if (form.value.user_password) {
      fd.append("user_password", form.value.user_password);
    }
    if (newImageFile.value) {
      fd.append("user_image", newImageFile.value);
    }

    await $axios.put(`/user/${form.value.user_id}`, fd); // PUT /user/:id

    removeSelectedImage();
    await loadMe();
    showNotification("อัปเดตโปรไฟล์สำเร็จ", "success"); // MODIFIED
  } catch (e: any) {
    console.error(e);
    showNotification("อัปเดตไม่สำเร็จ", "error"); // MODIFIED
  } finally {
    saving.value = false;
  }
};

// RENAMED & MODIFIED: (เดิมชื่อ deleteProfile)
const confirmDelete = async () => {
  if (!form.value.user_id) return;
  // ลบ confirm() ออก
  try {
    deleting.value = true;
    await $axios.delete(`/user/${form.value.user_id}`); // DELETE /user/:id
    useCookie("token").value = null; // ออกจากระบบ
    navigateTo("/"); // กลับหน้าแรก
  } catch (e: any) {
    console.error(e);
    showNotification("ลบโปรไฟล์ไม่สำเร็จ", "error"); // MODIFIED
  } finally {
    deleting.value = false;
    closeDeleteModal(); // ADDED
  }
};

onMounted(loadMe);
onUnmounted(() => {
  if (newImagePreview.value) URL.revokeObjectURL(newImagePreview.value);
});
</script>

<template>
  <div
    class="relative min-h-screen
             bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat
             md:bg-fixed
             pb-24 md:pb-28 lg:pb-32"
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
    <h1 class="text-2xl font-bold text-center mb-8">
      จัดการข้อมูลผู้ใช้ (สมาชิก)
    </h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">
      กำลังโหลดข้อมูลผู้ใช้...
    </div>

    <div
      v-else
      class="max-w-5xl mx-auto text-lg flex flex-col md:flex-row gap-6 items-start"
    >
      <div
        class="w-full md:w-1/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-md text-purple-700"
      >
        <div class="flex flex-col items-center">
          <div
            class="relative w-28 h-28 rounded-full shadow overflow-hidden mb-3 border border-purple-100"
          >
            <img
              :src="newImagePreview || getImageUrl(form.user_image_path)"
              alt="profile"
              class="w-full h-full object-cover"
            />
            <button
              v-if="newImagePreview"
              type="button"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
              @click="removeSelectedImage"
              title="ยกเลิกรูปที่เลือก"
            >
              ✕
            </button>
          </div>
          <label
            for="profile-image"
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
            id="profile-image"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onImageChange"
          />

          <div class="mt-4 text-sm text-center">
            <p class="font-semibold">ชื่อผู้ใช้ (username)</p>
            <p class="text-sm">{{ form.user_username || "-" }}</p>
            <p class="text-sm">หมายเลขสมาชิก: {{ form.user_id || "-" }}</p>
            <span
              v-if="newImagePreview"
              class="block mt-1 text-xs text-gray-600"
            >
              เลือกรูปใหม่แล้ว — อย่าลืมกด “บันทึก”
            </span>
          </div>
        </div>
      </div>

      <div
        class="w-full md:w-2/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow space-y-4 text-purple-700"
      >
        <div>
          <label class="block mb-1 font-semibold">ชื่อผู้ใช้ (username)</label>
          <input
            v-model="form.user_username"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">ชื่อ-นามสกุล</label>
          <input
            v-model="form.user_name"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold"
            >รหัสผ่านใหม่ (หากต้องการเปลี่ยน)</label
          >
          <input
            type="password"
            v-model="form.user_password"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <button
            @click="openSaveModal"
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
        form.user_username
      }' ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`"
      confirmText="ยืนยันการลบ"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <CommonConfirmModal
      :show="showSaveModal"
      title="ยืนยันการบันทึก"
      :message="`คุณต้องการบันทึกการเปลี่ยนแปลงโปรไฟล์ '${
        form.user_username
      }' ใช่หรือไม่?`"
      confirmText="ยืนยันการบันทึก"
      type="info"
      @confirm="confirmSave"
      @cancel="closeSaveModal"
    />
  </div>
</template>