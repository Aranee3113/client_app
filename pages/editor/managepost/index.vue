<script setup>
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();

// ดึง user_id สมมุติว่าได้จากระบบ auth
const userId = ref("123"); // เปลี่ยนเป็น dynamic user_id ถ้ามีระบบ auth จริง

const posts = ref([]);
const postName = ref("");
const postDescription = ref("");
const isSubmitting = ref(false);
const message = ref("");

const fetchPosts = async () => {
  try {
    const response = await $axios.get("/post");
    if (response.status === 200 && response.data.data) {
      posts.value = response.data.data;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
};

const createPost = async () => {
  if (!postName.value || !postDescription.value) {
    message.value = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  isSubmitting.value = true;
  try {
    const response = await $axios.post("/post", {
      post_name: postName.value,
      post_description: postDescription.value,
      user_id: userId.value,
    });

    if (response.status === 201) {
      message.value = "✅ สร้างโพสต์สำเร็จ!";
      postName.value = "";
      postDescription.value = "";
      await fetchPosts();
    }
  } catch (error) {
    console.error("ไม่สามารถสร้างโพสต์ได้:", error);
    message.value = "❌ เกิดข้อผิดพลาด";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <NavbarBasenavbar />

  <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-10 mb-14">
    <h2 class="text-3xl font-bold mb-6 text-[#ff5a5f] hover:text-black text-center">
      สร้างโพสต์ใหม่
    </h2>
    <div class="space-y-5">
      <div>
        <label class="block text-gray-700 mb-1 font-medium">ชื่อโพสต์</label>
        <input
          v-model="postName"
          type="text"
          placeholder="กรอกชื่อโพสต์"
          class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label class="block text-gray-700 mb-1 font-medium">รายละเอียด</label>
        <textarea
          v-model="postDescription"
          placeholder="กรอกรายละเอียดโพสต์"
          class="w-full border border-gray-300 rounded-xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100"
        ></textarea>
      </div>

      <button
        @click="createPost"
        :disabled="isSubmitting"
        class="bg-[#ff5a5f] shadow-md shadow-gray-500 text-white font-semibold px-6 py-2 rounded-xl w-full transition"
      >
        {{ isSubmitting ? "กำลังบันทึก..." : " สร้างโพสต์" }}
      </button>

      <p
        class="text-center text-sm mt-2 font-medium"
        :class="message.includes('สำเร็จ') ? 'text-green-600' : 'text-red-500'"
        v-if="message"
      >
        {{ message }}
      </p>
    </div>
  </div>

  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-[#ff5a5f] hover:text-black">
        รายการโพสต์ทั้งหมด
      </h1>

      <div v-if="posts.length === 0" class="text-center text-gray-500">
        ไม่มีโพสต์ในระบบ
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <NuxtLink
          v-for="post in posts"
          :key="post.post_id"
          :to="`/editor/managepost/${post.post_id}`"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition block"
        >
          <h2 class="text-xl font-bold text-[#ff5a5f] mb-2">
            {{ post.post_name }}
          </h2>
          <p class="text-gray-700 mb-4 line-clamp-3">
            {{ post.post_description }}
          </p>
          <p class="text-sm text-gray-500">
            🕒 {{ new Date(post.post_timestamp).toLocaleString() }}
          </p>
          <p class="text-sm text-gray-400 mt-1">
            👤 ผู้ใช้ ID: {{ post.user_id }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>

  <FooterBasefooter />
</template>
