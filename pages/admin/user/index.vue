<script setup>
definePageMeta({
  layout: "admin",
});
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { $axios } = useNuxtApp();

const users = ref([]);

const fetchUsers = async () => {
  try {
    const res = await $axios.get("/user");
    if (res.status === 200) {
      users.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลผู้ใช้ล้มเหลว", error);
  }
};


onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <CommonButtonBack />
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          รายชื่อผู้ใช้
        </h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/user/add"
            class="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-800 to-pink-400 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มข้อมูลผู้ใช้
          </NuxtLink>
          <NuxtLink
            to="/admin/dashboard"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-800 to-pink-400 hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 shadow-md"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>
      </div>

      <div
        class="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20"
      >
        <table class="min-w-full text-left text-sm">
          <thead
            class="bg-gradient-to-r from-purple-100 to-indigo-100 text-gray-700"
          >
            <tr>
              <th class="py-3 px-4 font-semibold text-center">User ID</th>
              <th class="py-3 px-4 font-semibold">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold">Username</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.user_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ user.user_id }}</td>

              <td class="py-3 px-4">
                <img
                  v-if="user.user_image_path"
                  :src="user.user_image_path"
                  alt="user image"
                  class="w-12 h-12 rounded-full object-cover border"
                />
                <span v-else class="text-gray-400">ไม่มีรูป</span>
              </td>

              <td class="py-3 px-4">{{ user.user_username }}</td>

              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/user"
                    :params="user.user_id"
                  />
                  <CommonButtonDeletebutton
                    type="delete"
                    :params="user.user_id"
                    @deleted="fetchUsers"
                    path="user"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4" class="text-center text-gray-400 py-6">
                ไม่มีข้อมูลผู้ใช้ในระบบ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

