<script setup>
definePageMeta({
  layout: "member",
});
import { ref, onMounted } from "vue";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const { $axios } = useNuxtApp();

const posts = ref([]);
const currentUser = ref({ user_id: "", user_name: "" });

const form = ref({
  post_id: null,
  post_name: "",
  post_description: "",
  user_id: "",
});

// ดึงข้อมูล user จาก token JWT
const extractUserFromToken = () => {
  const token = useCookie("token").value;
  if (!token) return;
  const decoded = decodeJwt(token);
  currentUser.value.user_id = decoded.user_id;
  currentUser.value.user_name = decoded.user_name;
  form.value.user_id = decoded.user_id;
};

// โหลดโพสต์ทั้งหมด
const fetchPosts = async () => {
  const res = await $axios.get("/post");
  posts.value = res.data.data;
};

// เพิ่มหรืออัปเดตโพสต์
const onSubmit = async () => {
  if (form.value.post_id) {
    await $axios.put(`/post/${form.value.post_id}`, form.value);
  } else {
    await $axios.post("/post", form.value);
  }
  resetForm();
  fetchPosts();
};

// แก้ไขโพสต์
const editPost = (post) => {
  form.value = { ...post };
};

// รีเซ็ตฟอร์ม
const resetForm = () => {
  form.value = {
    post_id: null,
    post_name: "",
    post_description: "",
    user_id: currentUser.value.user_id,
  };
};

onMounted(() => {
  extractUserFromToken();
  fetchPosts();
});
</script>
<template>
  
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6"
  >
    <div
      class="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/30"
    >
      <h1
        class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-700 to-red-500 bg-clip-text text-transparent"
      >
        โพสต์
      </h1>

      <!-- ฟอร์มเพิ่ม/แก้ไขโพสต์ -->
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >โพสต์เรื่อง</label
          >
          <input
            v-model="form.post_name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >รายละเอียดโพสต์</label
          >
          <textarea
            v-model="form.post_description"
            rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
        </div>

        <!-- ไม่ให้เลือก user_id เอง -->
        <input type="hidden" v-model="form.user_id" />

        <div class="flex gap-3 justify-between items-center mt-6">
          <button
            type="submit"
            class="flex-1 px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-700 to-pink-500 transition transform hover:scale-105 shadow-md"
          >
            {{ form.post_id ? "อัปเดตโพสต์" : "เพิ่มโพสต์" }}
          </button>
          <button
            v-if="form.post_id"
            type="button"
            @click="resetForm"
            class="flex-1 px-6 py-2 rounded-lg text-white font-medium bg-pink-600 hover:bg-gray-500 transition transform hover:scale-105 shadow-md"
          >
            ยกเลิก
          </button>
        </div>
      </form>
      <!-- แสดงรายการโพสต์ -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">รายการโพสต์</h2>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div
            v-for="post in posts"
            :key="post.post_id"
            class="relative bg-white/80 backdrop-blur-sm border border-white/30 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div class="absolute top-3 right-3">
              <CommonButtonDeletebutton
                type="post"
                path="post"
                :params="post.post_id"
                @deleted="fetchPosts"
              />
            </div>
            <!--หัวข้อโพสต์ลิงก์ไปหน้าแก้ไข -->
            <NuxtLink
              :to="`/member/post_list/${post.post_id}`"
              class="block text-xl font-bold text-orange-600 mb-2 hover:underline hover:text-orange-800"
            >
              {{ post.post_name }}
            </NuxtLink>

            <p class="text-gray-700 mb-2">{{ post.post_description }}</p>
            <p class="text-sm text-gray-500 mb-4">
              ผู้ใช้ ID: {{ post.user_id }}
            </p>
          </div>
        </div>

        <p v-if="posts.length === 0" class="text-center text-gray-500 mt-4">
          ยังไม่มีโพสต์
        </p>
      </div>
    </div>
  </div>
</template>
