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

    const response = await $axios.post("/auth/register", payload);

    if (response.status === 201) {
      // optional: save token / cookie if backend returns it
      router.push("/login"); 
    }
  } catch (err) {
    console.error("Registration error:", err);
    error.value = "เกิดข้อผิดพลาดในการลงทะเบียน";
  }
}
</script>

<template>
  <div class="flex justify-center h-screen items-center mx-auto">
    <div
      class="bg-white shadow-gray-500 p-8 rounded-4xl shadow-md w-full max-w-md"
    >
      <h1 class="text-4xl font-bold mb-6 text-center">Mai Khmer</h1>
      <h2 class="text-2xl mb-4 text-center">ลงทะเบียน</h2>

      <form @submit.prevent="register" class="flex flex-col gap-5">
        <div class="mb-4">
          <label class="block text-gray-700">ชื่อ-นามสกุล</label>
          <input
            v-model="formData.user_name"
            type="text"
            placeholder="ชื่อ-นามสกุล"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">ชื่อผู้ใช้</label>
          <input
            v-model="formData.user_username"
            type="text"
            placeholder="ชื่อผู้ใช้"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">รหัสผ่าน</label>
          <input
            v-model="formData.user_password"
            type="password"
            placeholder="รหัสผ่าน"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">ยืนยันรหัสผ่าน</label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#593f5d] text-white p-2 rounded-md hover:bg-white hover:text-[#8E1616] transition border-2 text-xl"
        >
          ลงทะเบียน
        </button>

        <label class="text-gray-500 p-2 text-sm text-center w-full">
          มีบัญชีอยู่แล้ว?
          <NuxtLink
            href="/"
            class="text-red-500 font-bold hover:underline ml-1"
          >
            เข้าสู่ระบบ
          </NuxtLink>
        </label>

        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
