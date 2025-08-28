<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";


definePageMeta({
  layout: "default",
});

const { $axios } = useNuxtApp();
const router = useRouter();

const error = ref("");
const formData = ref({
  user_name: "",
  user_username: "",
  user_password: "",
  confirmPassword: "",
});

async function register() {
  error.value = "";

  if (formData.value.user_password !== formData.value.confirmPassword) {
    error.value = "รหัสผ่านไม่ตรงกัน";
    return;
  }

  try {
    const payload = {
      user_name: formData.value.user_name,
      user_username: formData.value.user_username,
      user_password: formData.value.user_password,
    };

    const response = await $axios.post("/user", payload);

    if (response.status === 201) {
      alert("ลงทะเบียนสำเร็จ!");
      router.push("/admin/dashboard");
    }
  } catch (err) {
    console.error("Registration error:", err);
    error.value = "เกิดข้อผิดพลาดในการลงทะเบียน";
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] flex items-center justify-center px-4"
  >
    <div
      class="bg-white/80 backdrop-blur-sm border border-white/30 shadow-2xl rounded-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
    >
      <!-- ฟอร์มลงทะเบียน -->
      <div class="p-8 flex flex-col justify-center">
        <h1 class="text-4xl font-bold text-center mb-2 text-purple-600">
          Mai Khmer
        </h1>
        <h2 class="text-xl text-center text-gray-600 mb-6">ลงทะเบียน</h2>

        <form @submit.prevent="register" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input
              v-model="formData.user_name"
              type="text"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">อีเมลผู้ใช้</label>
            <input
              v-model="formData.user_username"
              type="text"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              v-model="formData.user_password"
              type="password"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 to-purple-300 text-white font-semibold py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            ลงทะเบียน
          </button>

          <p class="text-center text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?
            <NuxtLink to="/" class="text-pink-600 hover:underline font-semibold">
              เข้าสู่ระบบ
            </NuxtLink>
          </p>

          <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>
        </form>
      </div>

      <!-- รูปภาพ -->
      <div class="hidden md:flex items-center justify-center p-6">
        <img
          src="/assetts/css/image/03.JPG"
          alt="Register Illustration"
          class="rounded-r-2xl object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

