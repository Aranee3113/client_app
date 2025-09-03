<script setup>
definePageMeta({ layout: "member" });

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const isEditMode = id !== "add";

const form = ref({
  post_name: "",
  post_description: "",
  user_id: "",
});

const error = ref("");
const success = ref("");

// ------- รูปภาพ --------
// รูปเดิมจากฐานข้อมูล
const existingImages = ref([]); // [{ post_image_id, post_image_path }]
// id ของรูปเดิมที่ "ยังเก็บไว้"
const keepImageIds = ref(new Set());
// รูปใหม่ที่เพิ่งเลือก
const newFiles = ref([]);        // File[]
const newFilePreviews = ref([]); // blob urls

// base url สำหรับไฟล์ภาพ (รองรับกรณี apiBase ลงท้าย /api)
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

// ---------- Auth ----------
const getCurrentUser = () => {
  const token = useCookie("token").value;
  if (token) {
    const decoded = decodeJwt(token);
    form.value.user_id = decoded.user_id;
  }
};

// ---------- Load post (edit mode) ----------
const loadPost = async () => {
  try {
    const res = await $axios.get(`/post/${id}`);
    const data = res.data?.data;
    form.value.post_name = data.post_name;
    form.value.post_description = data.post_description;
    form.value.user_id = data.user_id;
    existingImages.value = normalizeImages(data.images);

    // ตอนเริ่มต้น: เก็บรูปเดิมทั้งหมดไว้ก่อน (เลือกเอาไว้ทั้งหมด)
    keepImageIds.value = new Set(
      existingImages.value.map((img) => img.post_image_id)
    );
  } catch (err) {
    console.error(err);
    error.value = "ไม่สามารถโหลดโพสต์ได้";
  }
};

// ---------- File handlers ----------
const handleFileChange = (e) => {
  const files = Array.from(e.target.files || []);
  newFiles.value.push(...files);
  newFilePreviews.value.push(...files.map((f) => URL.createObjectURL(f)));
};

const removeNewFileAt = (idx) => {
  newFiles.value.splice(idx, 1);
  URL.revokeObjectURL(newFilePreviews.value[idx]);
  newFilePreviews.value.splice(idx, 1);
};

const toggleKeepExisting = (imgId) => {
  if (keepImageIds.value.has(imgId)) {
    keepImageIds.value.delete(imgId); // ไม่เก็บ (จะลบ)
  } else {
    keepImageIds.value.add(imgId); // เก็บไว้
  }
};

// ---------- Submit ----------
const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  try {
    const fd = new FormData();
    fd.append("post_name", form.value.post_name);
    fd.append("post_description", form.value.post_description);
    fd.append("user_id", String(form.value.user_id));

    // แนบไฟล์ใหม่ทั้งหมด
    newFiles.value.forEach((file) => fd.append("post_images", file));

    if (isEditMode) {
      // แนบ keep_image_ids ทีละค่า (backend ใช้ formData.getAll("keep_image_ids"))
      Array.from(keepImageIds.value).forEach((id) =>
        fd.append("keep_image_ids", String(id))
      );

      await $axios.put(`/post/${id}`, fd); // Elysia จะอ่าน formData
      success.value = "อัปเดตโพสต์สำเร็จ";
    } else {
      const res = await $axios.post("/post", fd);
      success.value = "เพิ่มโพสต์สำเร็จ";
    }

    setTimeout(() => {
      router.push("/member/post_list");
    }, 800);
  } catch (err) {
    console.error(err);
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  }
};

onMounted(() => {
  getCurrentUser();
  if (isEditMode) loadPost();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขโพสต์" : "เพิ่มโพสต์" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อโพสต์</label>
          <input v-model="form.post_name" type="text" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียด</label>
          <textarea v-model="form.post_description" rows="4" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <!-- อัปโหลดรูป -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รูปภาพ (เลือกได้หลายรูป)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
            class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 "
          />

          <!-- พรีวิวรูปใหม่ -->
          <div v-if="newFilePreviews.length" class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="(url, idx) in newFilePreviews"
              :key="idx"
              class="relative aspect-square rounded-lg overflow-hidden border"
            >
              <img :src="url" alt="preview" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeNewFileAt(idx)"
                class="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded cursor-pointer"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>

        <!-- แสดงรูปเดิม (เฉพาะแก้ไข) + toggle เก็บ/ลบ -->
        <div v-if="isEditMode && existingImages.length" class="mt-4">
          <p class="text-sm font-medium text-gray-700 mb-2">รูปเดิม</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="img in existingImages"
              :key="img.post_image_id"
              class="relative rounded-lg overflow-hidden border"
            >
              <img :src="getImageUrl(img.post_image_path)" class="w-full h-40 object-cover" />
              <button
                type="button"
                @click="toggleKeepExisting(img.post_image_id)"
                class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded shadow
                       transition"
                :class="keepImageIds.has(img.post_image_id)
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'"
              >
                {{ keepImageIds.has(img.post_image_id) ? 'เก็บไว้' : 'ลบ' }}
              </button>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            * ถ้าปุ่มเป็น “ลบ” รูปนั้นจะถูกลบออกเมื่อบันทึก
          </p>
        </div>

        <input type="hidden" v-model="form.user_id" />

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มโพสต์" }}
          </button>

          <NuxtLink
            to="/member/post_list"
            class="px-6 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500"
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
