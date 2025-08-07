<script setup>
definePageMeta({
  layout: "admin",
});
import { ref, onMounted } from "vue";
const { $axios } = useNuxtApp();
const posts = ref([]);




const fetchPosts = async () => {
  try {
    const res = await $axios.get("/post");
    if (res.status === 200) {
      posts.value = res.data.data;
    }
  } catch (error) {
    console.error("โหลดข้อมูลโพสต์ล้มเหลว", error);
  }
};


onMounted(() => {
  fetchPosts();
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
          class="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
        >
          รายการโพสต์
        </h2>
        <div class="flex flex-col items-end space-y-2">
          <NuxtLink
            to="/admin/post/add"
            class="inline-flex items-center px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + เพิ่มโพสต์
          </NuxtLink>
          <NuxtLink
            to="/admin/dashboard"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition transform hover:scale-105 shadow-md"
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
            class="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700"
          >
            <tr>
              <th class="py-3 px-4 font-semibold text-center">Post ID</th>
              <th class="py-3 px-4 font-semibold">ชื่อโพสต์</th>
              <th class="py-3 px-4 font-semibold text-center">รูปภาพ</th>
              <th class="py-3 px-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in posts"
              :key="post.post_id"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-3 px-4 text-center">{{ post.post_id }}</td>
              <td class="py-3 px-4">{{ post.post_name }}</td>
              <td class="py-3 px-4">
                <div class="flex justify-center">
                  <img
                    v-if="post.images && post.images.length > 0"
                    :src="post.images[0].image_url"
                    alt="Post Image"
                    class="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <span v-else class="text-gray-400">ไม่มีรูปภาพ</span>
                </div>  
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-center gap-2">
                  <CommonButtonEditbutton
                    type="edit"
                    path="/admin/post"
                    :params="post.post_id"
                  />
                  <CommonButtonDeletebutton
                    type="post"
                    path="post"
                    :params="post.post_id"
                    @deleted="fetchPosts"
                  />
                  <CommonButtonApprovebutton
                    :text="post.is_active == 1 ? 'อนุมัติ' : 'ยังไม่อนุมัติ'"
                    :color="[
                      'text-white',
                      post.is_active == 1 ? 'bg-green-600' : 'bg-red-500',
                    ]"
                    path="/admin/post"
                    :params="post.post_id"
                    @fetchOn="fetchPosts"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="posts.length === 0">
              <td colspan="3" class="text-center text-gray-400 py-6">
                ไม่มีโพสต์ในระบบ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
