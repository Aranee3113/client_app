<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = id !== "add";
const loading = ref(false);
const error = ref("");
const success = ref("");

// ------- ฟอร์มคอมเมนต์ -------
const form = ref({
  post_id: "",               // ต้องเลือกโพสต์
  user_id: "",               // ดึงจาก token
  comment_text: "",          // ข้อความคอมเมนต์
  existingImagePath: "",     // path รูปเดิม (ถ้ามี)
  newImagePreviewUrl: "",    // objectURL สำหรับพรีวิวรูปใหม่
});
const newImageFile = ref(null); // File (รูปใหม่)

// รายการโพสต์ให้เลือก (ดึงจาก /post)
const posts = ref([]);

// ---- helpers ----
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

// โหลด user_id จาก token
const loadUserFromToken = () => {
  const token = useCookie("token").value;
  if (!token) return;
  const decoded = decodeJwt(token);
  form.value.user_id = decoded.user_id;
};

// โหลดโพสต์ทั้งหมด (เพื่อใช้ใน select)
const loadPosts = async () => {
  const res = await $axios.get("/post");
  const rows = res.data?.data || [];
  posts.value = rows;
};

// โหลดคอมเมนต์เดิมตอนแก้ไข
const loadComment = async () => {
  // ไม่มี endpoint get by id; ดึงทั้งหมดแล้วหาเอา
  const res = await $axios.get("/comment");
  const rows = res.data?.data || [];
  const found = rows.find((c) => String(c.comment_id) === String(id));
  if (!found) {
    throw new Error("ไม่พบคอมเมนต์ที่ต้องการแก้ไข");
  }
  form.value.post_id = String(found.post_id || "");
  form.value.user_id = String(found.user_id || "");
  form.value.comment_text = found.comment_text || "";
  form.value.existingImagePath = found.comment_image_path || "";
};

// เลือกรูปใหม่
const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  // clear พรีวิวเดิม
  if (form.value.newImagePreviewUrl) {
    URL.revokeObjectURL(form.value.newImagePreviewUrl);
    form.value.newImagePreviewUrl = "";
  }
  newImageFile.value = null;

  if (file) {
    newImageFile.value = file;
    form.value.newImagePreviewUrl = URL.createObjectURL(file);
  }
};

onBeforeUnmount(() => {
  if (form.value.newImagePreviewUrl) {
    URL.revokeObjectURL(form.value.newImagePreviewUrl);
  }
});

// ส่งฟอร์ม
const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    const fd = new FormData();
    fd.append("post_id", String(form.value.post_id));
    fd.append("user_id", String(form.value.user_id));
    fd.append("comment_text", form.value.comment_text);

    if (newImageFile.value) {
      fd.append("comment_image", newImageFile.value);
    }

    if (isEditMode) {
      await $axios.put(`/comment/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "อัปเดตความคิดเห็นสำเร็จ";
    } else {
      await $axios.post("/comment", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "เพิ่มความคิดเห็นสำเร็จ (รออนุมัติ)";
    }

    setTimeout(() => router.push("/admin/comment"), 800);
  } catch (e) {
    console.error(e);
    error.value = e?.response?.data?.message || "เกิดข้อผิดพลาด";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loadUserFromToken();
  await loadPosts();

  if (isEditMode) {
    loading.value = true;
    try {
      await loadComment();
    } catch (e) {
      error.value = e?.message || "โหลดความคิดเห็นล้มเหลว";
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขความคิดเห็น" : "เพิ่มความคิดเห็น" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5 text-lg">
        <!-- เลือกโพสต์ -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">เลือกโพสต์</label>
          <select
            v-model="form.post_id"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none bg-white"
          >
            <option value="" disabled>-- เลือกโพสต์ --</option>
            <option v-for="p in posts" :key="p.post_id" :value="String(p.post_id)">
              #{{ p.post_id }} — {{ p.post_name }}
            </option>
          </select>
        </div>

        <!-- ข้อความคอมเมนต์ -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ข้อความความคิดเห็น</label>
          <textarea
            v-model="form.comment_text"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <!-- รูปเดิม (ถ้ามี) -->
        <div v-if="isEditMode && form.existingImagePath" class="mt-2">
          <label class="block mb-1 text-sm font-medium text-gray-700">รูปภาพเดิม</label>
          <img
            :src="getImageUrl(form.existingImagePath)"
            class="w-32 h-32 object-cover rounded border"
            alt="old comment image"
            loading="lazy"
          />
          <p class="text-xs text-gray-500 mt-1">
            * ถ้าอัปโหลดรูปใหม่ ระบบจะทับรูปเดิมอัตโนมัติ
          </p>
        </div>

        <!-- อัปโหลดรูปใหม่ (ไม่บังคับ) -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">อัปโหลดรูป (ไม่บังคับ)</label>
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none bg-white"
          />

          <!-- พรีวิวรูปใหม่ -->
          <div v-if="form.newImagePreviewUrl" class="mt-3">
            <label class="block text-xs text-gray-600 mb-1">รูปใหม่ที่จะอัปโหลด</label>
            <img :src="form.newImagePreviewUrl" class="w-32 h-32 object-cover rounded border" alt="preview" />
          </div>
        </div>

        <input type="hidden" v-model="form.user_id" />

        <!-- ปุ่ม -->
        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md disabled:opacity-60"
            :disabled="loading"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มความคิดเห็น" }}
          </button>

          <NuxtLink
            to="/admin/comment"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>

        <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center text-sm mt-4">{{ success }}</p>
      </form>
    </div>
  </div>
</template>
