<script setup>
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

const form = ref({
  textile_name: "",
  textile_description: "",
  textile_location: "",
  keep_image_ids: [],   // number[]
  existingImages: [],   // { textile_image_id, textile_image_path }[]
  newImages: [],        // { file: File, url: string }[]
});

// ---------- helpers ----------
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

// images อาจเป็น JSON string จาก JSON_ARRAYAGG
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

// ---------- load (edit mode) ----------
onMounted(async () => {
  if (!isEditMode) return;

  loading.value = true;
  try {
    const res = await $axios.get(`/product/${id}`);
    if (res.status === 200 && res.data?.data) {
      const data = res.data.data;

      form.value.textile_name = data.textile_name || "";
      form.value.textile_description = data.textile_description || "";
      form.value.textile_location = data.textile_location || "";

      const imgs = normalizeImages(data.images);
      form.value.existingImages = imgs;
      form.value.keep_image_ids = imgs.map((img) => img.textile_image_id);
    }
  } catch (err) {
    console.error("โหลดข้อมูลผ้าไม่สำเร็จ", err);
    error.value = "ไม่สามารถโหลดข้อมูลผ้า";
  } finally {
    loading.value = false;
  }
});

// ---------- file handlers ----------
const handleFileChange = (event) => {
  const files = Array.from(event.target.files || []);
  // เคลียร์ของเดิมก่อน (ถ้าไม่ต้องการ stack)
  form.value.newImages.forEach((i) => URL.revokeObjectURL(i.url));
  form.value.newImages = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));
};

onBeforeUnmount(() => {
  form.value.newImages.forEach((i) => URL.revokeObjectURL(i.url));
});

// ---------- submit ----------
const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  const fd = new FormData();
  fd.append("textile_name", form.value.textile_name);
  fd.append("textile_description", form.value.textile_description);
  fd.append("textile_location", form.value.textile_location);

  // 🔸 backend ปัจจุบันอ่าน keep_image_ids เป็นสตริงเดียว แล้ว split(',')
  if (isEditMode) {
    const keepIds = (form.value.keep_image_ids || [])
      .filter((v) => v !== null && v !== undefined)
      .join(",");
    fd.append("keep_image_ids", keepIds);
  }

  form.value.newImages.forEach((img) => {
    fd.append("textile_images", img.file);
  });

  try {
    if (isEditMode) {
      await $axios.put(`/product/${id}`, fd);
      success.value = "อัปเดตข้อมูลผ้าสำเร็จ";
    } else {
      await $axios.post("/product", fd);
      success.value = "เพิ่มข้อมูลผ้าสำเร็จ";
    }

    setTimeout(() => {
      router.push("/admin/information");
    }, 800);
  } catch (err) {
    console.error("error:", err);
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  }
};
</script>

<template>
  <CommonButtonBack />
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขข้อมูลผ้า" : "เพิ่มข้อมูลผ้า" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5" :aria-busy="loading">
        <!-- ชื่อผ้า -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อผ้า</label>
          <input
            v-model="form.textile_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <!-- รายละเอียด -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียด</label>
          <textarea
            v-model="form.textile_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <!-- สถานที่ -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">สถานที่</label>
          <input
            v-model="form.textile_location"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <!-- รูปเดิม -->
        <div v-if="form.existingImages.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพเดิม</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="img in form.existingImages"
              :key="img.textile_image_id"
              class="relative border rounded overflow-hidden"
            >
              <img
                :src="getImageUrl(img.textile_image_path)"
                class="w-full h-32 object-cover"
                alt="textile old image"
                loading="lazy"
              />
              <label class="absolute top-1 right-1 bg-white text-xs p-1 rounded shadow flex items-center gap-1">
                <input
                  type="checkbox"
                  v-model="form.keep_image_ids"
                  :value="img.textile_image_id"
                />
                เก็บไว้
              </label>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">* เอาเครื่องหมายถูกออก = ลบรูปนั้นเมื่อบันทึก</p>
        </div>

        <!-- รูปใหม่ที่เลือก -->
        <div v-if="form.newImages.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพใหม่</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="img in form.newImages"
              :key="img.url"
              class="border rounded overflow-hidden"
            >
              <img :src="img.url" class="w-full h-32 object-cover" alt="textile new image preview" />
            </div>
          </div>
        </div>

        <!-- input เลือกรูป -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">อัปโหลดรูปใหม่</label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
            class="mt-2"
          />
        </div>

        <!-- ปุ่ม -->
        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 shadow-md"
            :disabled="loading"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มข้อมูลผ้า" }}
          </button>

          <NuxtLink
            to="/admin/information"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 shadow-md"
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
