<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp, useCookie, useRuntimeConfig } from "#app";

definePageMeta({
  layout: "default",
});

const router = useRouter();
const { $axios } = useNuxtApp(); // ถ้ามี axios plugin อยู่แล้ว ใช้อันนี้ได้เลย
const error = ref("");
const formData = ref({
  user_username: "",
  user_password: "",
});

async function login() {
  error.value = "";
  try {
    const response = await $axios.post("/auth/login", formData.value);

    if (response.status === 200 && response.data.success) {
      const token = response.data.token;
      const tokenCookie = useCookie("token");
      tokenCookie.value = token; // ✅ เก็บ JWT ลง cookie

      const isAdmin = response.data.user?.is_admin ?? null; // ✅ รองรับ null

      // ✅ หน่วงสั้นๆ เพื่อให้ cookie เขียนเสร็จแน่นอนก่อน redirect
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (isAdmin === 1) {
        router.push("/admin");
      } else if (isAdmin === 0) {
        router.push("/member");
      } else {
        router.push("/"); // ผู้ใช้ทั่วไป (is_admin = null)
      }
    } else {
      error.value = response.data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!";
    }
  } catch (err) {
    console.error(err);
    error.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!";
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
  >
    <div
      class="bg-white/80 backdrop-blur-sm border border-white/50 shadow-2xl rounded-2xl text-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
    >
      <!-- 🔒 ฟอร์มล็อกอิน -->
      <div class="p-8 flex flex-col justify-center">
        <h1 class="text-4xl font-bold text-center mb-2 text-purple-600">
          KHMER WEAVE
        </h1>
        <h2 class="text-xl text-center text-gray-600 mb-6">เข้าสู่ระบบ</h2>

        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="formData.user_username"
              type="email"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="formData.user_password"
              type="password"
              class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 to-purple-300 text-white font-semibold py-2 rounded-lg shadow-md transition-all transform hover:scale-105 cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>

          <p class="text-center text-sm text-gray-600">
            ยังไม่มีบัญชีใช่ไหม?
            <NuxtLink
              to="/register"
              class="text-pink-600 hover:underline font-semibold"
            >
              ลงทะเบียนฟรี
            </NuxtLink>
          </p>

          <p v-if="error" class="text-center text-red-500 text-sm mt-2">
            {{ error }}
          </p>
        </form>
      </div>

      <!-- 🖼️ รูปภาพ -->
      <div class="hidden md:flex items-center justify-center p-6">
        <img
          src="/assetts/css/image/CCFM7339.JPG"
          alt="Login Illustration"
          class="rounded-r-2xl object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</template>
