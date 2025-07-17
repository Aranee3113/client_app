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
  user_name: "",
  user_username: "",
  user_password: "",
});

onMounted(async () => {
  if (isEditMode) {
    loading.value = true;
    try {
      const res = await $axios.get(`/user/${id}`);
      if (res.status === 200 && res.data.data) {
        form.value = {
          user_name: res.data.data.user_name,
          user_username: res.data.data.user_username,
          user_password: "",
        };
      }
    } catch (err) {
      console.error("โหลดข้อมูลล้มเหลว", err);
      error.value = "ไม่สามารถโหลดข้อมูลผู้ใช้";
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
      await $axios.put(`/user/${id}`, form.value);
      success.value = "อัปเดตข้อมูลผู้ใช้สำเร็จ";
    } else {
      await $axios.post("/user", form.value);
      success.value = "เพิ่มผู้ใช้ใหม่สำเร็จ";
    }

    setTimeout(() => {
      router.push("/admin/user");
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
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
          <input
            v-model="form.user_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
          <input
            v-model="form.user_username"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <div v-if="!isEditMode">
          <label class="block mb-1 text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <input
            v-model="form.user_password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105 shadow-md"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มผู้ใช้" }}
          </button>

          <NuxtLink
            to="/admin/user"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105 shadow-md"
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
