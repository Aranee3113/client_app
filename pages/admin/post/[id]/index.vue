<script setup>
definePageMeta({
  layout: "admin",
});
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isEditMode = id !== "add";
const loading = ref(false);
const error = ref("");
const success = ref("");

const form = ref({
  post_name: "",
  post_description: "",
  user_id: "",
  images: [], // ใช้แสดงรูป preview
  existingImages: [], // สำหรับรูปเดิมที่โหลดจาก backend
  keep_image_ids: [],
});
const newImages = ref([]); // สำหรับอัปโหลดจริง

// จัดการตอนเลือกรูปใหม่
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    newImages.value = Array.from(files);
    form.value.images = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  } else {
    newImages.value = [];
    form.value.images = [];
  }
};

// โหลดข้อมูลโพสต์
onMounted(async () => {
  const token = useCookie("token").value;
  if (token) {
    const decoded = decodeJwt(token);
    form.value.user_id = decoded.user_id;
  }

  if (isEditMode) {
    loading.value = true;
    try {
      const res = await $axios.get(`/post/${id}`);
      if (res.status === 200 && res.data.data) {
        const data = res.data.data;
        form.value.post_name = data.post_name;
        form.value.post_description = data.post_description;
        form.value.user_id = data.user_id;
        form.value.existingImages = data.images || [];
        form.value.keep_image_ids = data.images?.map((img) => img.post_image_id) || [];
      }
    } catch (err) {
      console.error("โหลดข้อมูลโพสต์ล้มเหลว", err);
      error.value = "ไม่สามารถโหลดข้อมูลโพสต์";
    } finally {
      loading.value = false;
    }
  }
});

// ส่งข้อมูลไป backend
const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  const payload = new FormData();
  payload.append("post_name", form.value.post_name);
  payload.append("post_description", form.value.post_description);
  payload.append("user_id", form.value.user_id);

  // แนบรูปภาพใหม่
  newImages.value.forEach((file) => {
    payload.append("post_images", file);
  });

  // แนบ id ของรูปเดิมที่ต้องการเก็บไว้
  form.value.keep_image_ids.forEach((id) => {
    payload.append("keep_image_ids", id.toString());
  });

  try {
    if (isEditMode) {
      await $axios.put(`/post/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "อัปเดตโพสต์สำเร็จ";
    } else {
      await $axios.post("/post", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      success.value = "เพิ่มโพสต์ใหม่สำเร็จ";
    }

    setTimeout(() => {
      router.push("/admin/post");
    }, 1000);
  } catch (err) {
    console.error("error:", err);
    error.value = err?.response?.data?.message || "เกิดข้อผิดพลาด";
  }
};
</script>


<template>
  <CommonButtonBack />
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6"
  >
    <div
      class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
    >
      <h1
        class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
      >
        {{ isEditMode ? "แก้ไขโพสต์" : "เพิ่มโพสต์" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >ชื่อโพสต์</label
          >
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >รายละเอียดโพสต์</label
          >
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>
        <!-- รูปภาพเดิม -->
        <div v-if="form.existingImages.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >รูปภาพเดิม</label
          >
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="img in form.existingImages"
              :key="img.post_image_id"
              class="relative border rounded overflow-hidden"
            >
              <img
                :src="img.post_image_path"
                class="w-full h-32 object-cover"
              />
              <label
                class="absolute top-1 right-1 bg-white text-xs p-1 rounded shadow"
              >
                <input
                  type="checkbox"
                  v-model="form.keep_image_ids"
                  :value="img.post_image_id"
                />
                เก็บไว้
              </label>
            </div>
          </div>
        </div>

        <!-- รูปใหม่ที่เลือก -->
        <div v-if="form.images.length" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >รูปภาพใหม่</label
          >
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="img in form.images"
              :key="img.url"
              class="border rounded overflow-hidden"
            >
              <img :src="img.url" class="w-full h-32 object-cover" />
            </div>
          </div>
        </div>

        <!-- Input เลือกรูป -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >อัปโหลดรูปใหม่</label
          >
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
          />
        </div>

        <input type="hidden" v-model="form.user_id" />

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มโพสต์" }}
          </button>

          <NuxtLink
            to="/admin/post"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>

        <p v-if="error" class="text-red-500 text-center text-sm mt-4">
          {{ error }}
        </p>
        <p v-if="success" class="text-green-600 text-center text-sm mt-4">
          {{ success }}
        </p>
      </form>
    </div>
  </div>
</template>
