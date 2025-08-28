<script setup>
definePageMeta({
  layout: "member",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import CommentBox from "~/components/comment/commentBox.vue";
import CommentList from "~/components/comment/commentList.vue";

const { $axios, $config } = useNuxtApp();

const products = ref([]);
const posts = ref([]);
const route = useRoute();
const loading = ref(true);
const error = ref("");
const userId = route.params.id;

// ✅ state สำหรับบังคับรีเฟรช CommentList รายโพสต์
const listKeys = ref({});
const bumpListKey = (postId) => {
  listKeys.value[postId] = (listKeys.value[postId] || 0) + 1;
};

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  // ถ้ามี fileBase ให้ใช้ก่อน, ถ้าไม่มีให้ตัด /api ออกจาก apiBase อัตโนมัติ
  const apiBase = $config?.public?.apiBase || "";
  const fileBase =
    $config?.public?.fileBase || apiBase.replace(/\/api\/?$/, "");

  return `${fileBase}${path}`;
};

const fetchProducts = async () => {
  try {
    const res = await $axios.get("/product");
    if (res.status === 200) {
      products.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลผ้าล้มเหลว", error);
  }
};

const normalizeImages = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/post"); // backend คืนเฉพาะ is_active = 1
    const rows = res.data?.data || [];
    posts.value = rows.map((p) => ({
      ...p,
      images: normalizeImages(p.images),
    }));
  } catch (e) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดโพสต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
  fetchPosts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- BaseCard -->
      <card-basecard />

      <!-- ยินดีต้อนรับ -->
      <div class="text-center mt-10 mb-12">
        <h2
          class="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
        >
          ภูมิปัญญาผ้าทอ กลุ่มชาติพันธุ์เขมรจังหวัดบุรีรัมย์
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          ยินดีต้อนรับสู่ชุมชนของเรา!
          ที่นี่คุณจะได้พบกับข้อมูลผ้าทอและโพสต์ต่างๆ
          ที่เกี่ยวข้องกับภูมิปัญญาผ้าทอของกลุ่มชาติพันธุ์เขมรในจังหวัดบุรีรัมย์
          เราหวังว่าคุณจะสนุกกับการสำรวจและเรียนรู้เกี่ยวกับวัฒนธรรมผ้าทอของเรา
        </p>
        <p
          class="text-2xl font-extrabold text-purple-800 dark:text-white tracking-tight"
        >
          10 พื้นที่ ใน 7 อำเภอที่มีกลุ่มชาติพันธุ์เขมรอาศัยอยู่ได้แก่
        </p>
      </div>

      <!-- รายการข้อมูลผ้า -->
      <section class="mb-20">
        <h2
          class="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-800 to-pink-500 bg-clip-text text-transparent"
        >
          ชุมชนผ้าทอ
        </h2>
        <div
          v-if="products.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            v-for="item in products"
            :key="item.textile_id"
            class="bg-white/90 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700"
          >
            <!-- รูปผ้า: แสดงรูปแรกถ้ามี -->
            <img
              v-if="item.images && item.images.length > 0"
              :src="getImageUrl(item.images[0].textile_image_path)"
              alt="textile"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />

            <NuxtLink
              :to="`/member/information_list/${item.textile_id}`"
              class="text-xl font-semibold text-purple-800 hover:text-pink-800 transition"
            >
              {{ item.textile_name }}
            </NuxtLink>

            <p class="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
              {{ item.textile_description }}
            </p>

            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              แหล่งที่มา: {{ item.textile_location }}
            </p>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 mt-12 text-lg">
          ไม่มีข้อมูลผ้าในขณะนี้
        </div>
      </section>

      <!-- รายการโพสต์ (ดูอย่างเดียว) -->
      <section>
        <h2
          class="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          โพสต์ผ้าทอ
        </h2>

        <!-- สถานะโหลด/ผิดพลาด -->
        <div v-if="loading" class="text-center text-gray-500">
          กำลังโหลดข้อมูล...
        </div>
        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <!-- รายการ -->
        <div v-else>
          <div v-if="posts.length > 0" class="space-y-6">
            <div
              v-for="post in posts"
              :key="post.post_id"
              class="bg-white/90 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700"
            >
              <!-- รูปปก (รูปแรก ถ้ามี) -->
              <div v-if="post.images && post.images.length" class="mb-4">
                <img
                  :src="getImageUrl(post.images[0].post_image_path)"
                  alt="post cover"
                  class="w-full h-56 object-cover rounded-lg shadow"
                  loading="lazy"
                />
              </div>

              <!-- ชื่อโพสต์ (ลิงก์ไปหน้ารายละเอียด) -->
              <NuxtLink
                :to="`/member/post/${post.post_id}`"
                class="text-xl font-semibold text-purple-800 hover:underline"
              >
                {{ post.post_name }}
              </NuxtLink>

              <!-- รายละเอียดย่อ -->
              <p class="text-gray-700 mt-2 line-clamp-2">
                {{ post.post_description }}
              </p>

              <!-- เมตา -->
              <p class="text-sm text-gray-400 mt-1">
                โพสต์เมื่อ: {{ new Date(post.post_timestamp).toLocaleString() }}<br />
                โดย {{ post.user_name }} ({{ post.user_username }})
              </p>

              <!-- ✅ คอมเมนต์ -->
              <div class="mt-6 border-t pt-4">
                <CommentBox
                  :postId="post.post_id"
                  @commentAdded="bumpListKey(post.post_id)"
                />
                <CommentList
                  :key="listKeys[post.post_id] || 0"
                  :postId="post.post_id"
                  class="mt-4"
                />
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 mt-12 text-lg">
            ไม่มีโพสต์ที่เปิดใช้งาน
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
