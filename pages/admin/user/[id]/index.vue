<script setup lang="ts">
definePageMeta({ layout: "admin" });

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = id !== "add";
const loading = ref(false);
const error = ref("");
const success = ref("");

// เก็บ URL พรีวิวล่าสุดไว้เพื่อ revoke ตอนเปลี่ยนไฟล์/ออกจากหน้า
let lastPreviewUrl: string | null = null;

const form = ref({
  user_name: "",
  user_username: "",
  user_password: "",
  user_image: null as File | null,
  user_image_path: "", // แสดงพรีวิว (ถ้าเป็นรูปใหม่ = objectURL, ถ้าเป็นรูปเก่า = URL เต็ม)
});

// ---- helpers ----
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

// โหลดข้อมูลตอนแก้ไข
onMounted(async () => {
  if (!isEditMode) return;

  loading.value = true;
  try {
    const res = await $axios.get(`/user/${id}`);
    if (res.status === 200 && res.data?.data) {
      const u = res.data.data;
      form.value.user_name = u.user_name || "";
      form.value.user_username = u.user_username || "";
      // ใช้ URL เต็มของรูปเก่า
      form.value.user_image_path = u.user_image_path ? getImageUrl(u.user_image_path) : "";
    }
  } catch (err) {
    console.error("โหลดข้อมูลล้มเหลว", err);
    error.value = "ไม่สามารถโหลดข้อมูลผู้ใช้";
  } finally {
    loading.value = false;
  }
});

// handle รูปภาพ (พรีวิวรูปใหม่)
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = (input.files && input.files[0]) || null;

  // เคลียร์พรีวิวเดิม
  if (lastPreviewUrl) {
    URL.revokeObjectURL(lastPreviewUrl);
    lastPreviewUrl = null;
  }

  form.value.user_image = file;
  if (file) {
    const url = URL.createObjectURL(file);
    lastPreviewUrl = url;
    form.value.user_image_path = url; // แสดงพรีวิวใหม่
  } else {
    // ถ้าเอาไฟล์ออก ให้กลับไปใช้รูปเดิม (ถ้ามี) หรือเคลียร์
    // หมายเหตุ: ในกรณีนี้เราไม่มี path เดิมเก็บแยกไว้ จึงปล่อยเป็นค่าว่าง
    form.value.user_image_path = "";
  }
};

onBeforeUnmount(() => {
  if (lastPreviewUrl) URL.revokeObjectURL(lastPreviewUrl);
});

// submit
const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  try {
    const formData = new FormData();
    formData.append("user_name", form.value.user_name);
    formData.append("user_username", form.value.user_username);
    if (!isEditMode) {
      formData.append("user_password", form.value.user_password);
    }
    if (form.value.user_image) {
      formData.append("user_image", form.value.user_image);
    }

    if (isEditMode) {
      await $axios.put(`/user/${id}`, formData);
      success.value = "อัปเดตข้อมูลผู้ใช้สำเร็จ";
    } else {
      await $axios.post("/user", formData);
      success.value = "เพิ่มผู้ใช้ใหม่สำเร็จ";
    }

    setTimeout(() => {
      router.push("/admin/user");
    }, 800);
  } catch (err: any) {
    console.error("error:", err);
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  }
};
</script>

<template>
  
  <div class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat ">
    <CommonButtonBack />
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5 text-lg" enctype="multipart/form-data">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
          <input v-model="form.user_name" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
          <input v-model="form.user_username" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>

        <div v-if="!isEditMode">
          <label class="block mb-1 text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <input v-model="form.user_password" type="password" class="w-full px-4 py-2 border rounded-lg" required />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รูปภาพ</label>
          <input type="file" @change="handleFileChange" accept="image/*" />
          <div v-if="form.user_image_path" class="mt-2">
            <img :src="form.user_image_path" alt="preview" class="w-24 h-24 rounded-full object-cover border bg-white" />
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md"
            :disabled="loading"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มผู้ใช้" }}
          </button>

          <NuxtLink
            to="/admin/user"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md"
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
