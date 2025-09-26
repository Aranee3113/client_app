<script setup lang="ts">
definePageMeta({ layout: "member" });

import { ref, onMounted } from "vue";
import { Star } from "lucide-vue-next"; // icon ดาว
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const posts = ref<any[]>([]);
const currentUser = ref<{ user_id: string; user_name: string }>({
  user_id: "",
  user_name: "",
});

// ใช้บังคับรีเฟรชรายการคอมเมนต์รายโพสต์
const listKeys = ref<Record<string, number>>({});
const bumpListKey = (postId: number | string) => {
  const key = String(postId);
  listKeys.value[key] = (listKeys.value[key] || 0) + 1;
};

// ฟอร์มสร้าง/แก้ไขโพสต์ + รูปใหม่
const form = ref({
  post_id: null as number | null,
  post_name: "",
  post_description: "",
  user_id: "",
});

// ดึง user ปัจจุบันจาก token (เรียก extractUserFromToken อยู่แล้ว)
const isOwnerPost = (post: any) =>
  String(post.user_id) === String(currentUser.value.user_id);

const deletingPostId = ref<number | null>(null);

/** ลบโพสต์ (ต้องเป็นเจ้าของเท่านั้น) */
const deletePost = async (post: any) => {
  if (!isOwnerPost(post)) {
    alert("ลบได้เฉพาะโพสต์ของตัวเอง");
    return;
  }
  if (!confirm("ยืนยันลบโพสต์นี้?")) return;

  try {
    deletingPostId.value = post.post_id;

    // แนบ Bearer token ให้หลังบ้านตรวจสิทธิ์
    await $axios.delete(`/post/${post.post_id}`, {
      headers: {
        Authorization: `Bearer ${useCookie("token").value || ""}`,
      },
    });

    // รีเฟรชรายการ
    await fetchPosts();
  } catch (err: any) {
    alert(
      err?.response?.status === 403
        ? "ลบได้เฉพาะโพสต์ของตัวเอง"
        : "ลบโพสต์ไม่สำเร็จ"
    );
    console.error(err);
  } finally {
    deletingPostId.value = null;
  }
};

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

// ดึง user จาก token
const extractUserFromToken = () => {
  const token = useCookie("token").value as string | undefined;
  if (!token) return;
  const decoded: any = decodeJwt(token);
  const uid = decoded.user_id ?? decoded.userId ?? decoded.id ?? "";
  const uname = decoded.user_name ?? decoded.username ?? "";
  currentUser.value.user_id = String(uid);
  currentUser.value.user_name = String(uname);
};

// ====================== Rating: state & helpers ======================
const tokenCookie = useCookie<string | null>("token");

// เก็บคะแนนของตัวเองต่อโพสต์ เช่น { "1": 4, "2": null }
const myRatings = ref<Record<string, number | null>>({});

// เก็บสรุปต่อโพสต์ เช่น { "1": { avg: 4.2, count: 12 } }
const ratingSummaries = ref<Record<string, { avg: number; count: number }>>({});

// โหลดสรุป + คะแนนของฉัน ของโพสต์เดียว
const loadRatingForPost = async (postId: number) => {
  const key = String(postId);
  try {
    // summary (ไม่ต้องใช้ token)
    const sumRes = await $axios.get(`/rating/${postId}/summary`);
    const sum = sumRes?.data?.data ?? { avg: 0, count: 0 };
    ratingSummaries.value[key] = {
      avg: Number(sum?.avg ?? 0),
      count: Number(sum?.count ?? 0),
    };

    // my rating (ต้องใช้ token)
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

// โหลดสรุป + คะแนนของฉัน ของทุกโพสต์ในหน้า
const loadRatingsAll = async () => {
  await Promise.all(
    posts.value.map((p: any) => loadRatingForPost(Number(p.post_id)))
  );
};

// กดให้คะแนน/แก้คะแนน
const setRating = async (postId: number, stars: number) => {
  const key = String(postId);
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนให้คะแนน");
      return;
    }
    await $axios.post(
      `/rating/${postId}`,
      { stars },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // รีโหลดข้อมูลคะแนนเฉพาะโพสต์นั้น
    await loadRatingForPost(postId);
  } catch (err) {
    console.error("setRating error:", err);
    alert("ให้คะแนนไม่สำเร็จ");
  }
};

// ลบคะแนนของตัวเอง
const removeMyRating = async (postId: number) => {
  const key = String(postId);
  try {
    const token = tokenCookie.value || "";
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    await $axios.delete(`/rating/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadRatingForPost(postId);
  } catch (err) {
    console.error("removeMyRating error:", err);
    alert("ลบคะแนนไม่สำเร็จ");
  }
};
// ====================== /Rating ======================

// โหลดโพสต์ทั้งหมด
const fetchPosts = async () => {
  const res = await $axios.get("/post/active");
  const rows = res.data?.data || [];
  posts.value = rows.map((p: any) => ({
    ...p,
    images: normalizeImages(p.images),
  }));
  // 🔹 เมื่อได้รายการโพสต์แล้ว ให้โหลดเรตติ้งทั้งหมดของโพสต์เหล่านี้
  await loadRatingsAll();
};

// แก้ไขโพสต์ (เฉพาะของตัวเองเท่านั้น)
const editPost = (post: any) => {
  if (String(post.user_id) !== String(currentUser.value.user_id)) {
    alert("คุณไม่สามารถแก้ไขโพสต์ของผู้อื่นได้");
    return;
  }
  // ไปหน้าแก้ไข
  navigateTo(`/member/post_list/${post.post_id}`);
};

onMounted(async () => {
  extractUserFromToken();
  await fetchPosts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-12 px-6"
  >
    <div
      class="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/30"
    >
      <h1
        class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-700 to-red-500 bg-clip-text text-transparent"
      >
        โพสต์
      </h1>

      <!-- ฟอร์มเพิ่ม/แก้ไขโพสต์ -->
      <NuxtLink
        to="/member/post_list/add"
        class="flex-1 block rounded-full px-5 py-3 bg-gray-200 text-gray-600 shadow-inner hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
      >
        คุณกำลังคิดอะไรอยู่
      </NuxtLink>

      <!-- แสดงรายการโพสต์ -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">รายการโพสต์</h2>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="relative bg-white/80 backdrop-blur-sm border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div class="absolute top-3 right-3 flex gap-2">
              <!-- ปุ่มแก้ไข: แสดงเฉพาะเจ้าของ -->
              <button
                v-if="isOwnerPost(post)"
                class="h-9 w-9 rounded bg-purple-300 text-gray-800 flex items-center justify-center cursor-pointer hover:bg-purple-400"
                @click="editPost(post)"
                title="แก้ไข"
              >
                ✏️
              </button>

              <!-- ปุ่มลบโพสต์ -->
              <CommonButtonDeletebutton
                v-if="isOwnerPost(post)"
                type="post"
                path="post"
                :params="post.post_id"
                @deleted="fetchPosts"
                class="h-9"
              />
            </div>

            <!-- หัวข้อโพสต์ -->
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

            <!-- คอลลาจ -->
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

            <!-- ความคิดเห็น + Rating -->
            <div
              class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <!-- ปุ่มแสดงความคิดเห็น -->
              <div>
                <button
                  class="px-4 py-2 bg-purple-200 rounded hover:bg-purple-300 text-gray-800 font-semibold cursor-pointer"
                  @click="post.showComment = !post.showComment"
                >
                  {{ post.showComment ? "ซ่อนความคิดเห็น" : "แสดงความคิดเห็น" }}
                </button>
              </div>

              <!-- Rating block -->
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
                <div class="text-sm text-gray-700  ">
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

            <!-- กล่อง Comment -->
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
  </div>
</template>
