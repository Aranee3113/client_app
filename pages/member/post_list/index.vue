<script setup lang="ts">
definePageMeta({ layout: "member" });

// MODIFIED: เพิ่ม useRoute, useRouter และ import Modal
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // ADDED
import { Star } from "lucide-vue-next";
import { useCookie } from "#app";
import { decodeJwt } from "jose";
import CommonConfirmModal from "~/components/common/button/ConfirmModal.vue"; // ADDED: Import Modal

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

// --- Composables ---
const route = useRoute(); // ADDED
const router = useRouter(); // ADDED

const posts = ref<any[]>([]);
const currentUser = ref<{ user_id: string; user_name: string }>({
  user_id: "",
  user_name: "",
});

const listKeys = ref<Record<string, number>>({});
const bumpListKey = (postId: number | string) => {
  const key = String(postId);
  listKeys.value[key] = (listKeys.value[key] || 0) + 1;
};

// --- Notification State (Toast) ---
const notification = ref({
  show: false,
  message: "",
  type: "success",
});
let notificationTimer: any = null;

// --- Modal State (Confirm) ---
const showDeleteModal = ref(false); // ADDED: State ควบคุม Modal
const postToDelete = ref<any>(null); // ADDED: State เก็บข้อมูลโพสต์ที่จะลบ

// ----------------------------------------
// (ฟังก์ชัน `form` และ `deletePost` เดิม (บรรทัด 24-66) ถูกลบออก
//  เนื่องจากเราจะใช้ `openDeleteModal` และ `confirmDelete` ใหม่
//  และฟังก์ชัน `deletePost` เดิมก็ไม่ได้ถูกเรียกใช้อยู่แล้ว)
// ----------------------------------------

const isOwnerPost = (post: any) =>
  String(post.user_id) === String(currentUser.value.user_id);

// --- Notification (Toast) Helper ---
// ADDED: ฟังก์ชันสำหรับแสดงการแจ้งเตือน
const showNotification = (
  message: string,
  type: "success" | "error" = "success",
  duration = 3500
) => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notification.value = { show: true, message, type };
  notificationTimer = setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

// --- Modal Handlers (ADDED) ---

// ADDED: ฟังก์ชันสำหรับเปิด Modal
const openDeleteModal = (post: any) => {
  postToDelete.value = post; // เก็บข้อมูลโพสต์ที่จะลบ
  showDeleteModal.value = true; // เปิด Modal
};

// ADDED: ฟังก์ชันสำหรับปิด Modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  postToDelete.value = null; // ล้างข้อมูล
};

// ADDED: ฟังก์ชันสำหรับ "ยืนยัน" การลบ (แทนที่ deletePost เดิม)
const confirmDelete = async () => {
  if (!postToDelete.value) return;

  if (!isOwnerPost(postToDelete.value)) {
    showNotification("ลบได้เฉพาะโพสต์ของตัวเอง", "error");
    closeDeleteModal();
    return;
  }

  try {
    // แนบ Bearer token ให้หลังบ้านตรวจสิทธิ์
    await $axios.delete(`/post/${postToDelete.value.post_id}`, {
      headers: {
        Authorization: `Bearer ${useCookie("token").value || ""}`,
      },
    });

    showNotification("ลบโพสต์สำเร็จแล้ว", "success");
    await fetchPosts(); // รีเฟรชรายการ
  } catch (err: any) {
    showNotification(
      err?.response?.status === 403
        ? "ลบได้เฉพาะโพสต์ของตัวเอง"
        : "ลบโพสต์ไม่สำเร็จ",
      "error"
    );
    console.error(err);
  } finally {
    closeDeleteModal();
  }
};

// --- Helper Functions ---
const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const base = getFileBase();
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${base}${path}`;
};

const normalizeImages = (raw: any) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const extractUserFromToken = () => {
  const token = useCookie("token").value as string | undefined;
  if (!token) return;
  const decoded: any = decodeJwt(token);
  const uid = decoded.user_id ?? decoded.userId ?? decoded.id ?? "";
  const uname = decoded.user_name ?? decoded.username ?? "";
  currentUser.value.user_id = String(uid);
  currentUser.value.user_name = String(uname);
};

// ====================== Rating (MODIFIED) ======================
const tokenCookie = useCookie<string | null>("token");
const myRatings = ref<Record<string, number | null>>({});
const ratingSummaries = ref<Record<string, { avg: number; count: number }>>({});

const loadRatingForPost = async (postId: number) => {
  const key = String(postId);
  try {
    const sumRes = await $axios.get(`/rating/${postId}/summary`);
    const sum = sumRes?.data?.data ?? { avg: 0, count: 0 };
    ratingSummaries.value[key] = {
      avg: Number(sum?.avg ?? 0),
      count: Number(sum?.count ?? 0),
    };

    const token = tokenCookie.value || "";
    if (!token) {
      myRatings.value[key] = null;
      return;
    }
    const myRes = await $axios.get(`/rating/${postId}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mine = myRes?.data?.data;
    myRatings.value[key] = mine?.stars ?? null;
  } catch (err) {
    console.error("loadRatingForPost error:", err);
  }
};

const loadRatingsAll = async () => {
  await Promise.all(
    posts.value.map((p: any) => loadRatingForPost(Number(p.post_id)))
  );
};

// MODIFIED: setRating (เปลี่ยน alert เป็น showNotification)
const setRating = async (postId: number, stars: number) => {
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      showNotification("กรุณาเข้าสู่ระบบก่อนให้คะแนน", "error"); // MODIFIED
      return;
    }
    await $axios.post(
      `/rating/${postId}`,
      { stars },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    showNotification("ให้คะแนนสำเร็จ", "success"); // ADDED
    await loadRatingForPost(postId);
  } catch (err) {
    console.error("setRating error:", err);
    showNotification("ให้คะแนนไม่สำเร็จ", "error"); // MODIFIED
  }
};

// MODIFIED: removeMyRating (เปลี่ยน alert เป็น showNotification)
const removeMyRating = async (postId: number) => {
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      showNotification("กรุณาเข้าสู่ระบบก่อน", "error"); // MODIFIED
      return;
    }
    await $axios.delete(`/rating/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    showNotification("ลบคะแนนสำเร็จ", "success"); // ADDED
    await loadRatingForPost(postId);
  } catch (err) {
    console.error("removeMyRating error:", err);
    showNotification("ลบคะแนนไม่สำเร็จ", "error"); // MODIFIED
  }
};
// ====================== /Rating ======================

// MODIFIED: fetchPosts (เพิ่ม try...catch และ notification)
const fetchPosts = async () => {
  try {
    const res = await $axios.get("/post/active");
    const rows = res.data?.data || [];
    posts.value = rows.map((p: any) => ({
      ...p,
      images: normalizeImages(p.images),
    }));
    await loadRatingsAll();
  } catch (e) {
    console.error("โหลดโพสต์ล้มเหลว", e);
    showNotification("ไม่สามารถโหลดโพสต์ได้", "error"); // ADDED
  }
};

// MODIFIED: editPost (เปลี่ยน alert เป็น showNotification)
const editPost = (post: any) => {
  if (String(post.user_id) !== String(currentUser.value.user_id)) {
    showNotification("คุณไม่สามารถแก้ไขโพสต์ของผู้อื่นได้", "error"); // MODIFIED
    return;
  }
  navigateTo(`/member/post_list/${post.post_id}`);
};

// MODIFIED: onMounted (เพิ่มการตรวจสอบ query params)
onMounted(async () => {
  extractUserFromToken();

  // ADDED: ตรวจสอบ query params จากหน้า Add/Edit
  if (route.query.status === "edited") {
    showNotification("แก้ไขโพสต์สำเร็จแล้ว", "success");
    router.replace({ query: { ...route.query, status: undefined } });
  } else if (route.query.status === "added") {
    showNotification("เพิ่มโพสต์สำเร็จแล้ว", "success");
    router.replace({ query: { ...route.query, status: undefined } });
  }

  await fetchPosts();
});
</script>

<template>
  <div
    class="relative min-h-screen 
           bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat
           md:bg-fixed
           px-4 pb-24 md:pb-28 lg:pb-32"
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
    <div class="max-w-4xl mx-auto pt-28 md:pt-32 lg:pt-36">
      <h1
        class="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-900 to-red-500 bg-clip-text text-transparent"
      >
        โพสต์
      </h1>

      <NuxtLink
        to="/member/post_list/add"
        class="flex-1 block rounded-full px-5 py-3 bg-gray-200 text-gray-600 text-lg shadow-inner hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
      >
        คุณกำลังคิดอะไรอยู่
      </NuxtLink>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">รายการโพสต์</h2>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="relative bg-white/80 backdrop-blur-sm text-lg border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div class="absolute top-3 right-3 flex gap-2">
              <button
                v-if="isOwnerPost(post)"
                class="h-9 w-9 rounded bg-purple-300 text-gray-800 flex items-center justify-center cursor-pointer hover:bg-purple-400"
                @click="editPost(post)"
                title="แก้ไข"
              >
                ✏️
              </button>

              <button
                v-if="isOwnerPost(post)"
                @click="openDeleteModal(post)"
                type="button"
                title="ลบโพสต์"
                class="flex h-9 w-9 items-center justify-center rounded bg-red-200 text-red-700 transition-all hover:bg-red-300"
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

            <p class="text-2xl font-bold text-purple-800 mb-1">
              {{ post.user_name || "ไม่มีชื่อผู้ใช้" }}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              โพสต์เมื่อ : {{ new Date(post.post_timestamp).toLocaleString() }}
            </p>
            <p class="text-xl font-bold mb-2">
              {{ post.post_name || "ไม่มีชื่อโพสต์" }}
            </p>
            <p class="text-gray-900 mb-3">
              {{ post.post_description }}
            </p>

            <div v-if="post.images && post.images.length" class="mt-3">
              <NuxtLink
                :to="`/member/post/${post.post_id}`"
                class="block group"
              >
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-2">
                    <img
                      :src="getImageUrl(post.images[0].post_image_path)"
                      class="w-full h-64 md:h-72 object-cover rounded-lg shadow"
                      loading="lazy"
                    />
                  </div>
                  <div class="col-span-1 grid grid-rows-2 gap-2">
                    <div v-if="post.images[1]">
                      <img
                        :src="getImageUrl(post.images[1].post_image_path)"
                        class="w-full h-31 md:h-36 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <div v-if="post.images[2]" class="relative">
                      <img
                        :src="getImageUrl(post.images[2].post_image_path)"
                        class="w-full h-31 md:h-36 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div
                        v-if="(post.images?.length || 0) - 3 > 0"
                        class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-white text-xl font-semibold"
                      >
                        +{{ (post.images?.length || 0) - 3 }}
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div
              class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <button
                  class="px-4 py-2 bg-purple-200 rounded hover:bg-purple-300 text-gray-800 font-semibold cursor-pointer"
                  @click="post.showComment = !post.showComment"
                >
                  {{ post.showComment ? "ซ่อนความคิดเห็น" : "แสดงความคิดเห็น" }}
                </button>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex">
                  <button
                    v-for="s in 5"
                    :key="s"
                    class="p-1"
                    :title="`ให้ ${s} ดาว`"
                    @click="setRating(post.post_id, s)"
                  >
                    <Star
                      class="w-6 h-6"
                      :class="[
                        (myRatings[String(post.post_id)] ?? 0) >= s
                          ? 'text-yellow-400'
                          : 'text-gray-300',
                      ]"
                      :fill="
                        (myRatings[String(post.post_id)] ?? 0) >= s
                          ? 'currentColor'
                          : 'none'
                      "
                    />
                  </button>
                </div>
                <div class="text-sm text-gray-700">
                  ⭐
                  {{
                    (ratingSummaries[String(post.post_id)]?.avg ?? 0).toFixed(2)
                  }}
                  ({{ ratingSummaries[String(post.post_id)]?.count ?? 0 }} โหวต)
                </div>
                <button
                  v-if="myRatings[String(post.post_id)] != null"
                  class="flex items-center gap-1 text-xs px-3 py-1 rounded text-white cursor-pointer"
                  @click="removeMyRating(post.post_id)"
                  title="ลบคะแนนของฉัน"
                >
                  🗑
                </button>
              </div>
            </div>

            <CommentBox
              v-if="post.showComment"
              :postId="post.post_id"
              class="mt-2"
              @commentAdded="bumpListKey(post.post_id)"
            />
          </div>
        </div>

        <p v-if="posts.length === 0" class="text-center text-gray-500 mt-4">
          ยังไม่มีโพสต์
        </p>
      </div>
    </div>

    <CommonConfirmModal
      :show="showDeleteModal"
      title="ยืนยันการลบโพสต์"
      :message="`คุณต้องการลบโพสต์ '${
        postToDelete?.post_name || ''
      }' ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`"
      confirmText="ยืนยันการลบ"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>