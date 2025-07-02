<script setup>
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const postId = route.params.post_id;

const postName = ref("");
const postDescription = ref("");
const loading = ref(true);
const isSubmitting = ref(false);
const message = ref("");

// Mock ข้อมูล user_id และ is_active
const userId = 1;
const isActive = 1;

const fetchPost = async () => {
  try {
    const res = await $axios.get(`/post/${postId}`);
    if (res.status === 200 && res.data.data) {
      postName.value = res.data.data.post_name;
      postDescription.value = res.data.data.post_description;
    } else {
      message.value = "ไม่พบโพสต์นี้";
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการโหลดโพสต์:", err);
    message.value = "เกิดข้อผิดพลาด";
  } finally {
    loading.value = false;
  }
};

const updatePost = async () => {
  if (!postName.value || !postDescription.value) {
    message.value = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  isSubmitting.value = true;
  try {
    const res = await $axios.put(`/post/${postId}`, {
      post_name: postName.value,
      post_description: postDescription.value,
      post_timestamp: new Date(), // ส่ง timestamp ปัจจุบัน
      user_id: userId,
      is_active: isActive,
    });

    if (res.status === 200) {
      router.push("/editor/managepost");
    } else {
      message.value = "❌ ไม่สามารถบันทึกโพสต์ได้";
    }
  } catch (err) {
    console.error("ไม่สามารถอัปเดตโพสต์ได้:", err);
    message.value = "❌ เกิดข้อผิดพลาด";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
    <h1 class="text-3xl font-bold text-[#000000] text-center mb-6">
      แก้ไขโพสต์ ID: {{ postId }}
    </h1>

    <div v-if="loading" class="text-center text-gray-500">กำลังโหลดข้อมูล...</div>

    <div v-else class="space-y-5">
      <div>
        <label class="block mb-1 font-medium text-gray-700">ชื่อโพสต์</label>
        <input
          v-model="postName"
          type="text"
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">รายละเอียด</label>
        <textarea
          v-model="postDescription"
          class="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100"
        ></textarea>
      </div>

      <button
        @click="updatePost"
        :disabled="isSubmitting"
        class="w-full bg-[#ff5a5f] shadow-md shadow-gray-500 text-white font-semibold px-6 py-2 rounded transition"
      >
        {{ isSubmitting ? "กำลังบันทึก..." : "บันทึกการแก้ไข" }}
      </button>

      <p
        v-if="message"
        class="text-center mt-2 font-medium"
        :class="message.includes('สำเร็จ') ? 'text-green-600' : 'text-red-500'"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>
