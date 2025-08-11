<script setup>
definePageMeta({ layout: "member" });

import { ref, onMounted } from "vue";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const posts = ref([]);
const currentUser = ref({ user_id: "", user_name: "" });

// ฟอร์ม + รูปใหม่
const form = ref({
  post_id: null,
  post_name: "",
  post_description: "",
  user_id: "",
});
const newFiles = ref([]);               // File[] ที่เลือก
const newFilePreviews = ref([]);        // URL preview


const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const base = getFileBase();
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${base}${path}`;
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

// ดึง user_id และ user_name จาก token
const extractUserFromToken = () => {
  const token = useCookie("token").value;
  if (!token) return;
  const decoded = decodeJwt(token);
  currentUser.value.user_id = decoded.user_id;
  currentUser.value.user_name = decoded.user_name;
  form.value.user_id = decoded.user_id;
};

// ดึงโพสต์ทั้งหมด
const fetchPosts = async () => {
  const res = await $axios.get("/post");
  const rows = res.data?.data || [];
  posts.value = rows.map((p) => ({
    ...p,
    images: normalizeImages(p.images),
  }));
};

// ------- File input -------
// เมื่อเลือกไฟล์ใหม่
const handleFileChange = (e) => {
  const files = Array.from(e.target.files || []);
  newFiles.value = files;
  newFilePreviews.value = files.map((f) => URL.createObjectURL(f));
};

const removeNewFileAt = (idx) => {
  newFiles.value.splice(idx, 1);
  URL.revokeObjectURL(newFilePreviews.value[idx]);
  newFilePreviews.value.splice(idx, 1);
};

// ------- Submit form -------
// เมื่อกดส่งฟอร์ม
const onSubmit = async () => {
  // สร้าง FormData เพื่อส่ง multipart/form-data
  const fd = new FormData();
  fd.append("post_name", form.value.post_name);
  fd.append("post_description", form.value.post_description);
  fd.append("user_id", String(form.value.user_id));
  // รูปหลายรูป: key = post_images (ตาม backend)
  newFiles.value.forEach((file) => fd.append("post_images", file));

  let res;
  if (form.value.post_id) {
    // (ถ้าจะรองรับแก้ไข: ต้องเพิ่ม keep_image_ids / post_images ใหม่ใน fd)
    res = await $axios.put(`/post/${form.value.post_id}`, fd);
  } else {
    res = await $axios.post("/post", fd);
  }

  // เคลียร์ฟอร์ม + พรีวิว
  const created = res?.data?.data || null;

  resetForm();

  // แสดงโพสต์ใหม่ทันที (แม้ /post จะยังไม่ active)
  if (created) {
    posts.value.unshift({
      ...created,
      images: normalizeImages(created.images),
      user_id: created.user_id,
      // กรณี backend ไม่ส่งชื่อผู้ใช้กลับมา ให้โชว์เฉพาะ user_id ไปก่อน
      user_name: currentUser.value.user_name || "",
    });
  } else {
    // เผื่อกรณี backend ไม่คืน data กลับมา
    await fetchPosts();
  }
};

const editPost = (post) => {
  form.value = {
    post_id: post.post_id,
    post_name: post.post_name,
    post_description: post.post_description,
    user_id: currentUser.value.user_id,
  };
  // เคลียร์ไฟล์ใหม่
  clearNewFiles();
};

const clearNewFiles = () => {
  newFilePreviews.value.forEach((u) => URL.revokeObjectURL(u));
  newFilePreviews.value = [];
  newFiles.value = [];
};

const resetForm = () => {
  form.value = {
    post_id: null,
    post_name: "",
    post_description: "",
    user_id: currentUser.value.user_id,
  };
  clearNewFiles();
};

onMounted(async () => {
  extractUserFromToken();
  await fetchPosts();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/30">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-700 to-red-500 bg-clip-text text-transparent">
        โพสต์
      </h1>

      <!-- ฟอร์มเพิ่ม/แก้ไขโพสต์ -->
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">โพสต์เรื่อง</label>
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียดโพสต์</label>
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <!-- อัปโหลดรูป -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รูปภาพ (เลือกได้หลายรูป)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
            class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          <!-- พรีวิวรูปใหม่ -->
          <div v-if="newFilePreviews.length" class="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div
              v-for="(url, idx) in newFilePreviews"
              :key="idx"
              class="relative aspect-square rounded-lg overflow-hidden border"
            >
              <img :src="url" alt="preview" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeNewFileAt(idx)"
                class="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                aria-label="ลบรูปนี้"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>

        <!-- ไม่ให้เลือก user_id เอง -->
        <input type="hidden" v-model="form.user_id" />

        <div class="flex gap-3 justify-between items-center mt-6">
          <button
            type="submit"
            class="flex-1 px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-pink-700 to-pink-500 transition transform hover:scale-105 shadow-md"
          >
            {{ form.post_id ? "อัปเดตโพสต์" : "เพิ่มโพสต์" }}
          </button>
          <button
            v-if="form.post_id"
            type="button"
            @click="resetForm"
            class="flex-1 px-6 py-2 rounded-lg text-white font-medium bg-pink-600 hover:bg-gray-500 transition transform hover:scale-105 shadow-md"
          >
            ยกเลิก
          </button>
        </div>
      </form>

      <!-- แสดงรายการโพสต์ -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">รายการโพสต์</h2>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="relative bg-white/80 backdrop-blur-sm border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div class="absolute top-3 right-3">
              <CommonButtonDeletebutton
                type="post"
                path="post"
                :params="post.post_id"
                @deleted="fetchPosts"
              />
            </div>

            <!-- หัวข้อโพสต์ -->
            <NuxtLink
              :to="`/member/post_list/${post.post_id}`"
              class="block text-xl font-bold text-orange-600 mb-2 hover:underline hover:text-orange-800"
            >
              {{ post.post_name }}
            </NuxtLink>

            <p class="text-gray-700 mb-2">{{ post.post_description }}</p>
            <p class="text-sm text-gray-500 mb-2">ผู้ใช้ ID: {{ post.user_id }}</p>

            <!-- รูปโพสต์ -->
            <div v-if="post.images && post.images.length" class="mt-3">
              <!-- รูปแรก -->
              <img
                :src="getImageUrl(post.images[0].post_image_path)"
                alt="post cover"
                class="w-full h-56 object-cover rounded-lg shadow mb-3"
                loading="lazy"
              />
              <!-- แกลเลอรีเพิ่มเติม -->
              <div v-if="post.images.length > 1" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div
                  v-for="img in post.images"
                  :key="img.post_image_id || img.post_image_path"
                  class="aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    :src="getImageUrl(img.post_image_path)"
                    class="w-full h-full object-cover"
                    alt="post image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p v-if="posts.length === 0" class="text-center text-gray-500 mt-4">
          ยังไม่มีโพสต์
        </p>
      </div>
    </div>
  </div>
</template>
