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
  post_name: "",
  post_description: "",
  user_id: 1, // ซ่อนไว้สำหรับระบบ admin ปัจจุบัน
});

onMounted(async () => {
  if (isEditMode) {
    loading.value = true;
    try {
      const res = await $axios.get(`/post/${id}`);
      if (res.status === 200 && res.data.data) {
        form.value = {
          post_name: res.data.data.post_name,
          post_description: res.data.data.post_description,
          user_id: res.data.data.user_id,
        };
      }
    } catch (err) {
      console.error("โหลดข้อมูลโพสต์ล้มเหลว", err);
      error.value = "ไม่สามารถโหลดข้อมูลโพสต์";
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";

  try {
    if (isEditMode) {
      await $axios.put(`/post/${id}`, form.value);
      success.value = "อัปเดตข้อมูลโพสต์สำเร็จ";
    } else {
      await $axios.post("/post", form.value);
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
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขโพสต์" : "เพิ่มโพสต์" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อโพสต์</label>
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

        <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center text-sm mt-4">{{ success }}</p>
      </form>
    </div>
  </div>
</template>
