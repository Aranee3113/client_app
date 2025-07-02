<script setup>
import { ref, onMounted } from "vue";
import { Trash2 } from "lucide-vue-next";
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
const deletePost = async (postIdToDelete) => {
  const confirmDelete = confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?");
  if (!confirmDelete) return;

  try {
    const response = await $axios.delete(`/post/${postIdToDelete}`);
    if (response.status === 200) {
      message.value = "ลบโพสต์สำเร็จ!";
      await fetchPosts(); // โหลดโพสต์ใหม่
    } else {
      message.value = "❌ ไม่สามารถลบโพสต์ได้";
    }
  } catch (error) {
    console.error("ลบโพสต์ล้มเหลว:", error);
    message.value = "❌ เกิดข้อผิดพลาด";
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <NavbarBasenavbar />

  <!-- ฟอร์มสร้างโพสต์ -->
  <section
    class="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 mt-12 mb-16"
  >
    <h2
      class="text-3xl font-bold text-center text-[#ff5a5f] mb-8 flex items-center justify-center gap-2"
    >
      <span>สร้างโพสต์ใหม่</span>
    </h2>

    <div class="space-y-6">
      <div>
        <label class="block text-gray-800 font-semibold mb-2">ชื่อโพสต์</label>
        <input
          v-model="postName"
          type="text"
          placeholder="กรอกชื่อโพสต์"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff5a5f] outline-none transition"
        />
      </div>

      <div>
        <label class="block text-gray-800 font-semibold mb-2">รายละเอียด</label>
        <textarea
          v-model="postDescription"
          placeholder="กรอกรายละเอียดโพสต์"
          class="w-full px-4 py-3 h-32 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#ff5a5f] outline-none transition"
        ></textarea>
      </div>

      <button
        @click="createPost"
        :disabled="isSubmitting"
        class="w-full bg-[#ff5a5f] hover:bg-[#e14a4f] text-white font-bold py-3 rounded-xl shadow-md transition"
      >
        {{ isSubmitting ? "⏳ กำลังบันทึก..." : "สร้างโพสต์" }}
      </button>

      <p
        v-if="message"
        class="text-center text-sm font-medium"
        :class="message.includes('สำเร็จ') ? 'text-green-600' : 'text-red-500'"
      >
        {{ message }}
      </p>
    </div>
  </section>

  <!-- รายการโพสต์ทั้งหมด -->
  <section class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h1
        class="text-3xl font-bold text-center mb-10 text-[#ff5a5f] flex items-center justify-center gap-2"
      >
        <span>รายการโพสต์ทั้งหมด</span>
      </h1>

      <div v-if="posts.length === 0" class="text-center text-gray-500">
        ไม่มีโพสต์ในระบบ
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in posts"
          :key="post.post_id"
          class="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group"
        >
          <!-- ปุ่มลบ -->
          <button
            @click="deletePost(post.post_id)"
            class="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition"
            title="ลบโพสต์"
          >
            <Trash2 class="w-5 h-5" />
          </button>

          <NuxtLink
            :to="`/editor/managepost/${post.post_id}`"
            class="block space-y-2"
          >
            <h2 class="text-xl font-bold text-[#ff5a5f] group-hover:underline">
              {{ post.post_name }}
            </h2>
            <p class="text-gray-700 text-sm line-clamp-3">
              {{ post.post_description }}
            </p>
            <p class="text-xs text-gray-500 mt-2">
              🕒 {{ new Date(post.post_timestamp).toLocaleString() }}
            </p>
            <p class="text-xs text-gray-400">
              👤 ผู้ใช้ ID: {{ post.user_id }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <FooterBasefooter />
</template>
