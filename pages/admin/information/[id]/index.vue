<script setup>
definePageMeta({
  layout: "admin",
});
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const { $axios } = useNuxtApp();

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
  textile_images: [],
});
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const newFiles = Array.from(files);
    form.value.textile_images = [
      ...form.value.textile_images.filter((img) => typeof img === "string"),
      ...newFiles,
    ];
  }
};

onMounted(async () => {
  if (isEditMode) {
    loading.value = true;
    try {
      const res = await $axios.get(`/product/${id}`);
      if (res.status === 200 && res.data.data) {
        const data = res.data.data;
        form.value = {
          textile_name: data.textile_name,
          textile_description: data.textile_description,
          textile_location: data.textile_location,
          textile_images:
            data.images?.map((img) => img.textile_image_path) || [],
        };
      }
    } catch (err) {
      console.error("โหลดข้อมูลผ้าไม่สำเร็จ", err);
      error.value = "ไม่สามารถโหลดข้อมูลผ้า";
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  const formData = new FormData();
  formData.append("textile_name", form.value.textile_name);
  formData.append("textile_description", form.value.textile_description);
  formData.append("textile_location", form.value.textile_location);

  for (const file of form.value.textile_images) {
    formData.append("textile_images", file);
  }

  try {
    if (isEditMode) {
      await $axios.put(`/product/${id}`, formData);
      success.value = "อัปเดตข้อมูลผ้าสำเร็จ";
    } else {
      await $axios.post("/product", formData);
      success.value = "เพิ่มข้อมูลผ้าสำเร็จ";
    }

    setTimeout(() => {
      router.push("/admin/information");
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
        class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        {{ isEditMode ? "แก้ไขข้อมูลผ้า" : "เพิ่มข้อมูลผ้า" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">

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

        <!-- แสดงรูปผ้า (ทั้งเดิม + ใหม่) -->
        <div v-if="form.textile_images.length" class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพ</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="(img, index) in form.textile_images"
              :key="index"
              class="relative border rounded overflow-hidden shadow-sm"
            >
              <img
                :src="typeof img === 'string' ? img : URL.createObjectURL(img)"
                alt="รูปผ้า"
                class="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
              />
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


