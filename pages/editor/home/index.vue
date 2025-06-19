<script setup>
import { onMounted, ref } from 'vue'
const { $axios } = useNuxtApp()
const token = useCookie('token')
const router = useRouter()

const textiles = ref([]) // ใช้เก็บข้อมูลจาก backend

const getTextiles = async () => {
  try {
    const response = await $axios.get('/product')
    if (response.status === 200 && response.data.data) {
      textiles.value = response.data.data
      console.log('Textiles:', textiles.value)
    } else {
      console.warn('ไม่มีข้อมูลผ้า')
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error)
  }
}

onMounted(() => {
  getTextiles()
})
</script>

<template>
  <NavbarBasenavbar />

  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-green-600">
        รายการผ้าทั้งหมด
      </h1>

      <div v-if="textiles.length === 0" class="text-center text-gray-500">
        ไม่มีข้อมูลผ้าในระบบ
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="item in textiles"
          :key="item.textile_id"
          class="bg-white shadow-md p-6 rounded"
        >
          <h2 class="text-xl font-bold text-purple-700">
            {{ item.textile_name }}
          </h2>
          <p class="text-gray-700 mt-2">
            {{ item.textile_description }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            สถานที่: {{ item.textile_location }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <FooterBasefooter />
</template>
