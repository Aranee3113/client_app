<script setup>
definePageMeta({
  layout: "member",
});


import { ref, onMounted } from "vue";
import { decodeJwt } from "jose";
import { useRoute } from "vue-router";

const { $axios } = useNuxtApp();
const token = useCookie("token").value;
const route = useRoute();

const user = ref({
  user_id: "",
  user_name: "",
  user_username: "",
  user_password: "", // เพิ่มช่องรหัสผ่าน
});

const loading = ref(true);

const fetchUser = async () => {
  let id = route.params.id;
  if (!id) {
    if (!token) return;
    const decoded = decodeJwt(token);
    id = decoded.user_id;
  }
  try {
    const res = await $axios.get(`/user/${id}`);
    if (res.status === 200) {
      user.value = { ...res.data.data, user_password: "" };
    }
  } catch (err) {
    console.error("โหลดข้อมูลผู้ใช้ล้มเหลว", err);
  } finally {
    loading.value = false;
  }
};

const saveProfile = async () => {
  try {
    const payload = {
      user_name: user.value.user_name,
      user_username: user.value.user_username,
    };

    // ถ้ามีการกรอกรหัสผ่านใหม่ ให้ส่งไปด้วย
    if (user.value.user_password) {
      payload.user_password = user.value.user_password;
    }

    const res = await $axios.put(`/user/${user.value.user_id}`, payload);
    if (res.status === 200) {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      user.value.user_password = ""; // เคลียร์ช่องรหัสผ่าน
    }
  } catch (err) {
    console.error("ไม่สามารถบันทึกข้อมูลได้", err);
    alert("เกิดข้อผิดพลาด");
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-10 px-4">
    <h1 class="text-2xl font-bold text-center text-purple-700 mb-8">ข้อมูลส่วนตัว</h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">กำลังโหลดข้อมูลผู้ใช้...</div>

    <div v-else class="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
      <!-- ซ้าย -->
      <div class="w-full md:w-1/3 bg-purple-100 p-6 rounded-xl text-purple-700 text-center shadow-md">
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 bg-white rounded-full shadow-md relative mb-2">
            <span class="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">🖉</span>
          </div>
          <p class="font-semibold">ชื่อผู้ใช้</p>
          <p class="text-sm">{{ user.user_username }}</p>
          <p class="text-sm">หมายเลขสมาชิก: {{ user.user_id }}</p>
        </div>
      </div>

      <!-- ขวา -->
      <div class="w-full md:w-2/3 bg-purple-100 p-6 rounded-xl text-purple-700 shadow space-y-4">
        <div>
          <label class="block mb-1 font-semibold">ชื่อผู้ใช้</label>
          <input
            v-model="user.user_username"
            class="w-full px-4 py-2 rounded-md bg-white border border-purple-200"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">ชื่อ</label>
          <input
            v-model="user.user_name"
            class="w-full px-4 py-2 rounded-md bg-white border border-purple-200"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">รหัสผ่านใหม่ (หากต้องการเปลี่ยน)</label>
          <input
            type="password"
            v-model="user.user_password"
            class="w-full px-4 py-2 rounded-md bg-white border border-purple-200"
            placeholder="••••••••"
          />
        </div>
        <div class="text-center mt-6">
          <button
            @click="saveProfile"
            class="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
