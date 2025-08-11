<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();
const route = useRoute();

const token = useCookie("token").value;

const user = ref({
  user_id: "",
  user_name: "",
  user_username: "",
  user_password: "",       
  user_image: null,        
  user_image_path: "",     
});
const loading = ref(true);
const saving = ref(false);
let previewUrl = null;      

// base URL สำหรับไฟล์ภาพ (ใช้ fileBase ก่อน; ถ้าไม่มีตัด /api ออกจาก apiBase)
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const fetchUser = async () => {
  
  let id = route.params.id;
  if (!id && token) {
    const decoded = decodeJwt(token);
    id = decoded.user_id;
  }
  if (!id) {
    loading.value = false;
    return;
  }

  try {
    const res = await $axios.get(`/user/${id}`);
    if (res.status === 200 && res.data?.data) {
      const u = res.data.data;
      user.value.user_id = u.user_id;
      user.value.user_name = u.user_name || "";
      user.value.user_username = u.user_username || "";
      user.value.user_password = "";
      user.value.user_image = null;
      user.value.user_image_path = u.user_image_path ? getImageUrl(u.user_image_path) : "";
    }
  } catch (err) {
    console.error("โหลดข้อมูลผู้ใช้ล้มเหลว", err);
  } finally {
    loading.value = false;
  }
};

const handleFileChange = (e) => {
  const file = (e.target.files && e.target.files[0]) || null;
  // ล้างพรีวิวเดิม
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  user.value.user_image = file;
  if (file) {
    previewUrl = URL.createObjectURL(file);
    // แสดงพรีวิวใหม่ (ครอบทับรูปเดิมชั่วคราว)
    user.value.user_image_path = previewUrl;
  } else {
    // ถ้าเอาไฟล์ออก ไม่ตั้งค่าทับ (ให้ยังเห็นรูปเดิมถ้ามี)
  }
};

const saveProfile = async () => {
  if (!user.value.user_id) return;
  saving.value = true;

  try {
    const formData = new FormData();
    formData.append("user_name", user.value.user_name);
    formData.append("user_username", user.value.user_username);

    // ถ้ามีการกรอกรหัสผ่านใหม่ ให้ส่งไปด้วย
    if (user.value.user_password) {
      formData.append("user_password", user.value.user_password);
    }
    // ถ้าเลือกรูปใหม่ ให้แนบไฟล์
    if (user.value.user_image) {
      formData.append("user_image", user.value.user_image);
    }

    const res = await $axios.put(`/user/${user.value.user_id}`, formData);
    if (res.status === 200) {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      user.value.user_password = "";
      // ถ้าอัปโหลดรูปใหม่สำเร็จ ให้รีเฟรชข้อมูลอีกครั้งเพื่อดึง path จริงจาก backend
      await fetchUser();
    }
  } catch (err) {
    console.error("ไม่สามารถบันทึกข้อมูลได้", err);
    alert("เกิดข้อผิดพลาด");
  } finally {
    saving.value = false;
  }
};

onMounted(fetchUser);

onBeforeUnmount(() => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
    <h1 class="text-2xl font-bold text-center text-purple-700 mb-8">
      จัดการข้อมูลผู้ใช้ (ผู้ดูแลระบบ)
    </h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">กำลังโหลดข้อมูลผู้ใช้...</div>

    <div v-else class="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
      <!-- ซ้าย: รูปโปรไฟล์และสรุป -->
      <div class="w-full md:w-1/3 bg-purple-100 p-6 rounded-xl text-purple-700 text-center shadow-md">
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 bg-white rounded-full shadow-md overflow-hidden mb-2">
            <img
              v-if="user.user_image_path"
              :src="user.user_image_path"
              alt="profile"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">ไม่มีรูป</div>
          </div>

          <label
            class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border rounded-lg text-sm cursor-pointer hover:bg-white"
          >
            <input type="file" accept="image/*" class="hidden" @change="handleFileChange" />
            <span>อัปโหลดรูปใหม่</span>
          </label>

          <div class="mt-4 text-sm">
            <p class="font-semibold">ชื่อผู้ใช้ (username)</p>
            <p class="text-sm">{{ user.user_username }}</p>
            <p class="text-sm">หมายเลขสมาชิก: {{ user.user_id }}</p>
          </div>
        </div>
      </div>

      <!-- ขวา: แบบฟอร์ม -->
      <div class="w-full md:w-2/3 bg-purple-100 p-6 rounded-xl text-purple-700 shadow space-y-4">
        <div>
          <label class="block mb-1 font-semibold">ชื่อผู้ใช้ (username)</label>
          <input
            v-model="user.user_username"
            class="w-full px-4 py-2 rounded-md bg-white border border-purple-200"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">ชื่อ-นามสกุล</label>
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
            :disabled="saving"
            class="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
          >
            {{ saving ? "กำลังบันทึก..." : "บันทึก" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
