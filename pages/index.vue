<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const { $axios } = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: "default", // ✅ Fixed typo
});

const error = ref("");
const formData = ref({
  email: "",
  password: "",
});

async function login() {
  try {
    console.log(formData.value);
    const response = await $axios.post("/auth/login", formData.value);
    console.log(response.data);
    if (response.status === 200) {
      const token = response.data.token;
      const tokenCookie = useCookie("token");
      tokenCookie.value = token;

      console.log("Login success", response.data);
      // ✅ Redirect to homepage or dashboard
      router.push("/");
    }
  } catch (err) {
    error.value = "รหัสผ่านหรืออีเมลไม่ถูกต้อง!";
    console.log(err);
  }
}
</script>

<template>
  <div class="flex justify-center h-screen items-center mx-auto">
    <div
      class="bg-white shadow-gray-500 p-8 rounded-4xl shadow-md w-full max-w-md"
    >
      <h1 class="text-4xl font-bold mb-6 text-center">Mai Khmer</h1>
      <h2 class="text-2xl mb-4 text-center">เข้าสู่ระบบ</h2>

      <form @submit.prevent="login" class="flex flex-col gap-5">
        <!-- ✅ Fix className -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#593f5d] text-white p-2 rounded-md hover:bg-white hover:text-[#8E1616] transition border-2 text-xl"
        >
          เข้าสู่ระบบ
        </button>

        <label class="text-gray-500 p-2 text-sm text-center w-full">
          ยังไม่มีบัญชีใช่ไหม?
          <NuxtLink
            href="/register"
            class="text-red-500 font-bold hover:underline ml-1"
          >
            ลงทะเบียนฟรี
          </NuxtLink>
        </label>

        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
