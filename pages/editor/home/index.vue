<template>
  <NavbarBasenavbar />

  <div class="min-h-screen bg-slate-100  py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-green-900">
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
          <h2 class="text-xl font-bold  text-green-900">
            {{ item.textile_name }}
          </h2>
          <p class="text-gray-700 mt-2">{{ item.textile_description }}</p>
          <p class="text-sm text-gray-500 mt-1">
            สถานที่: {{ item.textile_location }}
          </p>
          <div class="mt-4 flex justify-end space-x-2">
            <button
              class="bg-[#00a699] text-white px-4 py-1 rounded hover:bg-green-800"
              @click="editTextile = item"
            >
              แก้ไข
            </button>
            <button
              class="bg-[#ff5a5f] text-white px-4 py-1 rounded hover:bg-red-600"
              @click="deleteTextile(item.textile_id)"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <EditTextileModal
    :show="!!editTextile"
    :textile="editTextile"
    @update="updateTextile"
    @cancel="editTextile = null"
  />

  <FooterBasefooter />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import EditTextileModal from '~/components/modal/edit.vue'

const { $axios } = useNuxtApp()
const token = useCookie('token')
const router = useRouter()

const textiles = ref([])
const editTextile = ref(null)

const getTextiles = async () => {
  try {
    const response = await $axios.get('/product')
    if (response.status === 200 && response.data.data) {
      textiles.value = response.data.data
    } else {
      console.warn('ไม่มีข้อมูลผ้า')
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error)
  }
}

const updateTextile = async (updatedItem) => {
  try {
    const { textile_id, textile_name, textile_description, textile_location } = updatedItem
    await $axios.put(`/product/${textile_id}`, {
      textile_name,
      textile_description,
      textile_location,
    })
    editTextile.value = null
    getTextiles()
    alert('✅ แก้ไขข้อมูลสำเร็จแล้ว')
  } catch (error) {
    console.error('แก้ไขข้อมูลล้มเหลว:', error)
    alert('❌ ไม่สามารถแก้ไขข้อมูลได้')
  }
}

const deleteTextile = async (id) => {
  try {
    await $axios.delete(`/product/${id}`)
    getTextiles()
  } catch (error) {
    console.error('ลบข้อมูลล้มเหลว:', error)
  }
}

onMounted(() => {
  getTextiles()
})
</script>
