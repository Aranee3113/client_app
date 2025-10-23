<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import CommonConfirmModal from "~/components/common/button/ConfirmModal.vue";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

// --- Composables ---
const route = useRoute();
const router = useRouter();

// --- State ---
const videos = ref([]);
const loading = ref(true);
const error = ref("");

// --- Notification State (Toast) ---
const notification = ref({
  show: false,
  message: "",
  type: "success",
});
let notificationTimer = null;

// --- Modal State (Confirm Delete) ---
const showDeleteModal = ref(false);
const videoToDelete = ref(null);

// --- Modal State (Confirm Edit) ---
const showEditModal = ref(false);
const videoToEdit = ref(null);

// ---- helpers ----
const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

const getMediaUrl = (path) => {
  if (!path || typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// --- Notification (Toast) Helper ---
const showNotification = (message, type = "success", duration = 3500) => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notification.value = { show: true, message, type };
  notificationTimer = setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

// --- Data Fetching ---
const fetchVideos = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post/video");
    videos.value = Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (e) {
    console.error("โหลดวิดีโอล้มเหลว", e);
    error.value = "ไม่สามารถโหลดวิดีโอได้";
    showNotification("ไม่สามารถโหลดวิดีโอได้", "error");
  } finally {
    loading.value = false;
  }
};

// --- Delete Modal Handlers ---
const openDeleteModal = (video) => {
  videoToDelete.value = video;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  videoToDelete.value = null;
};

const confirmDelete = async () => {
  if (!videoToDelete.value) return;
  try {
    await $axios.delete(`/post/${videoToDelete.value.post_id}`);
    showNotification("ลบวิดีโอสำเร็จแล้ว", "success");
    await fetchVideos();
  } catch (e) {
    console.error("ลบวิดีโอล้มเหลว", e);
    showNotification("ลบวิดีโอล้มเหลว", "error");
  } finally {
    closeDeleteModal();
  }
};

// --- Edit Modal Handlers ---
const openEditModal = (video) => {
  videoToEdit.value = video;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  videoToEdit.value = null;
};

const confirmEdit = () => {
  if (!videoToEdit.value) return;

  // สั่งให้ไปหน้าแก้ไข
  router.push(`/admin/video/${videoToEdit.value.post_id}`);

  // ปิด Modal (ถึงแม้จะเปลี่ยนหน้าทันทีก็ตาม)
  closeEditModal();
};

// --- Lifecycle ---
onMounted(() => {
  if (route.query.status === "edited") {
    showNotification("แก้ไขวิดีโอสำเร็จแล้ว", "success");
    router.replace({ query: { ...route.query, status: undefined } });
  } else if (route.query.status === "added") {
    showNotification("เพิ่มวิดีโอสำเร็จแล้ว", "success");
    router.replace({ query: { ...route.query, status: undefined } });
  }
  fetchVideos();
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
            ? 'bg-gradient-to-r from-green-600 to-emerald-900'
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
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">จัดการวิดีโอ</h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/video/add"
            class="inline-flex items-center px-5 py-2 bg-purple-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มวิดีโอ
          </NuxtLink>
        </div>
      </div>

      <div
        class="max-w-6xl mx-auto overflow-x-auto rounded-2xl shadow-lg shadow-gray-300 bg-white/80 backdrop-blur-sm border border-white/20 p-4 sm:p-6"
      >
        <table class="min-w-full text-left text-base sm:text-lg">
          <thead
            class="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700"
          >
            <tr>
              <th class="py-3 px-4 font-semibold text-center">ID</th>
              <th class="py-3 px-4 font-semibold">ชื่อเรื่อง</th>
              <th class="py-3 px-4 font-semibold">คำอธิบาย</th>
              <th class="py-3 px-4 font-semibold text-center">วิดีโอ</th>
              <th class="py-3 px-4 font-semibold">เวลา</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="py-6 text-center text-gray-500">
                กำลังโหลดข้อมูล...
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="6" class="py-6 text-center text-red-500">
                {{ error }}
              </td>
            </tr>

            <tr
              v-else
              v-for="v in videos"
              :key="v.post_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ v.post_id }}</td>
              <td class="py-3 px-4 truncate max-w-[16rem] sm:max-w-[20rem]">
                <div class="font-medium text-gray-800">
                  {{ v.post_name || "ไม่มีชื่อเรื่อง" }}
                </div>
              </td>
              <td class="py-3 px-4 max-w-[20rem] sm:max-w-[26rem]">
                <div class="line-clamp-2 text-gray-700">
                  {{ v.post_description }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-center">
                  <video
                    v-if="
                      v.videos &&
                      v.videos.length > 0 &&
                      v.videos[0].post_image_path
                    "
                    :src="getMediaUrl(v.videos[0].post_image_path)"
                    alt="video preview"
                    class="w-28 h-20 object-cover rounded-lg shadow-md border bg-black"
                    controls
                    preload="metadata"
                    muted
                    playsinline
                  ></video>
                  <span v-else class="text-gray-400">ไม่มีวิดีโอ</span>
                </div>
              </td>
              <td class="py-3 px-4 whitespace-nowrap text-gray-700">
                {{ new Date(v.post_timestamp).toLocaleString() }}
              </td>

              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <button
                    @click="openEditModal(v)"
                    type="button"
                    title="แก้ไขวิดีโอ"
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-all hover:bg-yellow-200 hover:text-yellow-700 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-5 w-5"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="openDeleteModal(v)"
                    type="button"
                    title="ลบวิดีโอ"
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-500 transition-all hover:bg-red-200 hover:text-red-700 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && !error && videos.length === 0">
              <td colspan="6" class="text-center text-gray-400 py-6">
                ยังไม่มีวิดีโอในระบบ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CommonConfirmModal
      :show="showDeleteModal"
      title="ยืนยันการลบวิดีโอ"
      :message="`คุณต้องการลบวิดีโอ '${
        videoToDelete?.post_name || ''
      }' ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`"
      confirmText="ยืนยันการลบ"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <CommonConfirmModal
      :show="showEditModal"
      title="ยืนยันการแก้ไข"
      :message="`คุณต้องการแก้ไขวิดีโอ '${
        videoToEdit?.post_name || ''
      }' ใช่หรือไม่?`"
      confirmText="ไปที่หน้าแก้ไข"
      type="info"  @confirm="confirmEdit"
      @cancel="closeEditModal"
    />
  </div>
</template>