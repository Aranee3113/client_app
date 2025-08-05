<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const { $axios } = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: "default", 
});

const error = ref("");
const formData = ref({
  user_username: "",
  user_password: "",
});

async function login() {
  try {
    const response = await $axios.post("/auth/login", formData.value);
    if (response.status === 200) {
      const token = response.data.token;
      const tokenCookie = useCookie("token");
      tokenCookie.value = token;

      console.log(response.data.data.is_admin);
      const isAdmin = response.data.data.is_admin;
      if (isAdmin === 0) {
        const id = response.data.data.user_id;
        router.push(`/member/${id}/home`);
      }
      else
      if (isAdmin === 1) {
        router.push(`/admin/${id}/dashboard`);
      }
      // router.push("/admin/dashboard");
    }
  } catch (err) {
    error.value = "รหัสผ่านหรืออีเมลไม่ถูกต้อง!";
    console.error(err);
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
    <div class="bg-white/80 backdrop-blur-sm border border-white/30 shadow-2xl rounded-2xl w-full max-w-md p-8">
      <h1 class="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Mai Khmer
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
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="formData.user_password"
            type="password"
            class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          เข้าสู่ระบบ
        </button>

        <p class="text-center text-sm text-gray-600">
          ยังไม่มีบัญชีใช่ไหม?
          <NuxtLink to="/register" class="text-pink-600 hover:underline font-semibold">
            ลงทะเบียนฟรี
          </NuxtLink>
        </p>

        <p v-if="error" class="text-center text-red-500 text-sm mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
