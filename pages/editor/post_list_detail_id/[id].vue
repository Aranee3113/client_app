<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const post = ref({
  post_name: "",
  post_description: "",
  user_id: null,
  is_active: 0, // ค่าเริ่มต้น
});
const fetchPost = async () => {
  try {
    const res = await $axios.get(`/post/${route.params.id}`);
    if (res.status === 200 && res.data.data) {
      console.log(res.data.data);
      post.value = {
        post_name: res.data.data.post_name,
        post_description: res.data.data.post_description,
        user_id: res.data.data.user_id,
        is_active: res.data.data.is_active,
      };
    }
  } catch (error) {
    console.error("ไม่สามารถโหลดโพสต์:", error);
  }
};

const updatePost = async () => {
  try {
    const res = await $axios.put(`/post/${route.params.id}`, {
      post_name: post.value.post_name,
      post_description: post.value.post_description,
      user_id: post.value.user_id,
      post_timestamp: new Date().toISOString(),
      is_active: post.value.is_active,
    });

    if (res.status === 200) {
      alert("อัปเดตโพสต์เรียบร้อยแล้ว");
      router.push(`/editor/post_list_detail_id/${route.params.id}`);
    } else {
      alert("อัปเดตไม่สำเร็จ");
    }
  } catch (err) {
    console.error("อัปเดตล้มเหลว:", err);
    alert("เกิดข้อผิดพลาดขณะอัปเดตโพสต์");
  }
};

onMounted(fetchPost);
</script>

<template>
  <div class="min-h-screen py-10 px-4 bg-gray-50">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold text-indigo-700 mb-4">📝 แก้ไขโพสต์</h1>

      <form @submit.prevent="updatePost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600"
            >ชื่อโพสต์</label
          >
          <input
            v-model="post.post_name"
            type="text"
            class="w-full mt-1 border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600"
            >คำอธิบาย</label
          >
          <textarea
            v-model="post.post_description"
            class="w-full mt-1 border rounded px-3 py-2"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600"
            >สถานะโพสต์</label
          >
          <select
            v-model="post.is_active"
            class="w-full mt-1 border rounded px-3 py-2"
          >
            <option :value="1">✅ อนุมัติ</option>
            <option :value="0">❌ ยังไม่อนุมัติ</option>
          </select>
        </div>
        <div class="flex gap-4 justify-between">
          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              บันทึกการแก้ไข
            </button>
            <NuxtLink
              :to="`/editor/post_list`"
              class="px-4 py-2 border rounded text-gray-600 hover:underline cursor-pointer"
            >
              ยกเลิก
            </NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
