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
  user_password: "",   // ว่าง = ไม่เปลี่ยนรหัส
  user_image: null,    // File
  user_image_path: "", // สำหรับแสดงผล (URL เต็ม)
});
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);
let previewUrl = null;

// base URL สำหรับไฟล์ภาพ
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
    id = decoded.user_id ?? decoded.userId ?? decoded.id;
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
    user.value.user_image_path = previewUrl; // แสดงพรีวิวทับชั่วคราว
  }
};

const clearSelectedImage = () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  user.value.user_image = null;
  // รีเซ็ต input ไฟล์
  const input = document.getElementById("admin-profile-image");
  if (input) input.value = "";
  // รีโหลดรูปเดิมจาก backend ถ้าต้องการ (หรือปล่อยให้ยังเห็นรูปเดิมอยู่แล้ว)
  // ที่นี่ไม่เรียก fetchUser เพื่อไม่รีเซ็ต field อื่น ๆ
};

const saveProfile = async () => {
  if (!user.value.user_id) return;
  saving.value = true;

  try {
    const formData = new FormData();
    formData.append("user_name", user.value.user_name);
    formData.append("user_username", user.value.user_username);
    if (user.value.user_password) {
      formData.append("user_password", user.value.user_password);
    }
    if (user.value.user_image) {
      formData.append("user_image", user.value.user_image);
    }

    const res = await $axios.put(`/user/${user.value.user_id}`, formData);
    if (res.status === 200) {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      user.value.user_password = "";
      // รีเฟรชข้อมูลจริงจาก backend เพื่อได้ path รูปถาวร
      await fetchUser();
      // เคลียร์พรีวิวที่สร้างไว้
      clearSelectedImage();
    }
  } catch (err) {
    console.error("ไม่สามารถบันทึกข้อมูลได้", err);
    alert("เกิดข้อผิดพลาด");
  } finally {
    saving.value = false;
  }
};

// ลบโปรไฟล์ แล้วเด้งไปหน้าแรก
const deleteProfile = async () => {
  if (!user.value.user_id) return;
  if (!confirm("ยืนยันลบโปรไฟล์ผู้ใช้นี้? การลบไม่สามารถย้อนกลับได้")) return;

  try {
    deleting.value = true;
    await $axios.delete(`/user/${user.value.user_id}`);
    useCookie("token").value = null; // ออกจากระบบกรณีลบตัวเอง
    navigateTo("/"); // กลับหน้าแรก
  } catch (err) {
    console.error("ลบโปรไฟล์ไม่สำเร็จ", err);
    alert("ลบโปรไฟล์ไม่สำเร็จ");
  } finally {
    deleting.value = false;
  }
};

onMounted(fetchUser);
onBeforeUnmount(() => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-10">
    <h1 class="text-2xl font-bold text-center text-purple-700 mb-8">
      จัดการข้อมูลผู้ใช้ (ผู้ดูแลระบบ)
    </h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">กำลังโหลดข้อมูลผู้ใช้...</div>

    <div v-else class="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
      <!-- ซ้าย: การ์ดโปรไฟล์ -->
      <div class="w-full md:w-1/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-md text-purple-700">
        <div class="flex flex-col items-center">
          <div class="relative w-28 h-28 rounded-full shadow overflow-hidden mb-3 border border-purple-100">
            <img
              v-if="user.user_image_path"
              :src="user.user_image_path"
              alt="profile"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">ไม่มีรูป</div>

            <!-- ปุ่มกากบาทล้างรูปที่เลือก (เฉพาะตอนมีพรีวิวใหม่) -->
            <button
              v-if="user.user_image && user.user_image_path === previewUrl"
              type="button"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
              @click="clearSelectedImage"
              title="ยกเลิกรูปที่เลือก"
            >
              ✕
            </button>
          </div>

          <!-- ปุ่มกล้องอัปโหลด -->
          <label
            for="admin-profile-image"
            class="mt-1 cursor-pointer"
            title="อัปโหลดรูปภาพ"
          >
            <div
              class="w-10 h-10 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition shadow-sm ring-1 ring-gray-300/60 rounded-xl"
            >
              <!-- ไอคอนกล้อง -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
            </div>
          </label>
          <input id="admin-profile-image" type="file" accept="image/*" class="hidden" @change="handleFileChange" />

          <div class="mt-4 text-sm text-center">
            <p class="font-semibold">ชื่อผู้ใช้ (username)</p>
            <p class="text-sm">{{ user.user_username || "-" }}</p>
            <p class="text-sm">หมายเลขสมาชิก: {{ user.user_id }}</p>
          </div>
        </div>
      </div>

      <!-- ขวา: ฟอร์ม -->
      <div class="w-full md:w-2/3 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow space-y-4 text-purple-700">
        <div>
          <label class="block mb-1 font-semibold">ชื่อผู้ใช้ (username)</label>
          <input
            v-model="user.user_username"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">ชื่อ-นามสกุล</label>
          <input
            v-model="user.user_name"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">รหัสผ่านใหม่ (หากต้องการเปลี่ยน)</label>
          <input
            type="password"
            v-model="user.user_password"
            class="w-full px-4 py-2 rounded-xl bg-white/70 border border-purple-200 ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <button
            @click="saveProfile"
            :disabled="saving"
            class="px-5 py-2.5 rounded-full bg-gradient-to-r bg-purple-500 text-white shadow hover:opacity-95 transition disabled:opacity-60 cursor-pointer"
          >
            {{ saving ? "กำลังบันทึก..." : "บันทึก" }}
          </button>

          <button
            type="button"
            @click="deleteProfile"
            :disabled="deleting"
            class="px-5 py-2.5 rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition disabled:opacity-60 cursor-pointer"
            title="ลบโปรไฟล์นี้และกลับสู่หน้าแรก"
          >
            {{ deleting ? "กำลังลบ..." : "ลบโปรไฟล์" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
