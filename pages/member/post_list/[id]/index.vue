<script setup>
definePageMeta({ layout: "member" })

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCookie } from "#app"
import { decodeJwt } from "jose"

const { $axios } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const id = route.params.id
const isEditMode = id !== "add"

const form = ref({
  post_name: "",
  post_description: "",
  user_id: "",
})

const error = ref("")
const success = ref("")

const getCurrentUser = () => {
  const token = useCookie("token").value
  if (token) {
    const decoded = decodeJwt(token)
    form.value.user_id = decoded.user_id
  }
}

const loadPost = async () => {
  try {
    const res = await $axios.get(`/post/${id}`)
    const data = res.data.data
    form.value.post_name = data.post_name
    form.value.post_description = data.post_description
    form.value.user_id = data.user_id
  } catch (err) {
    error.value = "ไม่สามารถโหลดโพสต์ได้"
  }
}

const handleSubmit = async () => {
  error.value = ""
  success.value = ""

  try {
    if (isEditMode) {
      await $axios.put(`/post/${id}`, form.value)
      success.value = "อัปเดตโพสต์สำเร็จ"
    } else {
      await $axios.post("/post", form.value)
      success.value = "เพิ่มโพสต์สำเร็จ"
    }

    setTimeout(() => {
      router.push("/member/post_list")
    }, 1000)
  } catch (err) {
    error.value = "เกิดข้อผิดพลาด"
  }
}

onMounted(() => {
  getCurrentUser()
  if (isEditMode) loadPost()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
    <div class="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <h1 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {{ isEditMode ? "แก้ไขโพสต์" : "เพิ่มโพสต์" }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">ชื่อโพสต์</label>
          <input v-model="form.post_name" type="text" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">รายละเอียด</label>
          <textarea v-model="form.post_description" rows="4" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <input type="hidden" v-model="form.user_id" />

        <div class="flex justify-between items-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-red-500"
          >
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่มโพสต์" }}
          </button>

          <NuxtLink
            to="/member/post_list"
            class="px-6 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500"
          >
            ย้อนกลับ
          </NuxtLink>
        </div>

        <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center text-sm mt-4">{{ success }}</p>
      </form>
    </div>
  </div>
</template>
