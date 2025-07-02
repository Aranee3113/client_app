<script setup>
import { onMounted, ref } from "vue";
import { Trash2 } from "lucide-vue-next";
import EditTextileModal from "~/components/modal/edit.vue";

const { $axios } = useNuxtApp();
const token = useCookie("token");
const router = useRouter();

const textiles = ref([]);
const editTextile = ref(null);
const getTextiles = async () => {
  try {
    const response = await $axios.get("/product");
    if (response.status === 200 && response.data.data) {
      textiles.value = response.data.data;
    } else {
      console.warn("ไม่มีข้อมูลผ้า");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
};
const updateTextile = async (updatedItem) => {
  try {
    const { textile_id, textile_name, textile_description, textile_location } =
      updatedItem;
    await $axios.put(`/product/${textile_id}`, {
      textile_name,
      textile_description,
      textile_location,
    });
    editTextile.value = null;
    getTextiles();
    alert("✅ แก้ไขข้อมูลสำเร็จแล้ว");
  } catch (error) {
    console.error("แก้ไขข้อมูลล้มเหลว:", error);
    alert("❌ ไม่สามารถแก้ไขข้อมูลได้");
  }
};

const deleteTextile = async (id) => {
  try {
    await $axios.delete(`/product/${id}`);
    getTextiles();
  } catch (error) {
    console.error("ลบข้อมูลล้มเหลว:", error);
  }
};

onMounted(() => {
  getTextiles();
});
</script>
<template>
  <NavbarBasenavbar />

  <div class="min-h-screen bg-slate-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-10 text-green-900">
        รายการผ้าทั้งหมด
      </h1>

      <div v-if="textiles.length === 0" class="text-center text-gray-500">
        ไม่มีข้อมูลผ้าในระบบ
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="item in textiles"
          :key="item.textile_id"
          class="relative bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
        >
          <!-- ข้อมูลผ้า -->
          <h2 class="text-xl font-bold text-green-800">
            {{ item.textile_name }}
          </h2>
          <p class="text-gray-700 mt-2">{{ item.textile_description }}</p>
          <p class="text-sm text-gray-500 mt-1">
            🏭 สถานที่: {{ item.textile_location }}
          </p>

          <!-- ปุ่มแก้ไขและลบ -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="editTextile = item"
              class="px-4 py-2 bg-yellow-100 text-yellow-800 font-medium text-sm rounded-lg hover:bg-yellow-200 transition"
            >
              ✏️ แก้ไข
            </button>

            <button
              @click="deleteTextile(item.textile_id)"
              class="px-4 py-2 bg-red-100 text-red-700 font-medium text-sm rounded-lg hover:bg-red-200 transition flex items-center gap-1"
              title="ลบผ้า"
            >
              <Trash2 class="w-4 h-4" />
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

