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
const newTextile = ref({
  textile_name: "",
  textile_description: "",
  textile_location: "",
});

const createTextile = async () => {
  try {
    const { textile_name, textile_description, textile_location } =
      newTextile.value;

    if (!textile_name || !textile_description || !textile_location) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    await $axios.post("/product", {
      textile_name,
      textile_description,
      textile_location,
    });

    // เคลียร์ฟอร์ม
    newTextile.value = {
      textile_name: "",
      textile_description: "",
      textile_location: "",
    };

    getTextiles();
    alert("✅ เพิ่มผ้าเรียบร้อยแล้ว");
  } catch (error) {
    console.error("เพิ่มผ้าล้มเหลว:", error);
    alert("❌ ไม่สามารถเพิ่มผ้าได้");
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
  <div class="max-w-3xl mx-auto mb-10 bg-white shadow p-6 rounded-2xl">
  <h2 class="text-2xl font-bold mb-4 text-green-900">เพิ่มผ้าใหม่</h2>
  <form @submit.prevent="createTextile" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">ชื่อผ้า</label>
      <input
        v-model="newTextile.textile_name"
        type="text"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        placeholder="กรอกชื่อผ้า"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">รายละเอียด</label>
      <textarea
        v-model="newTextile.textile_description"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        placeholder="กรอกรายละเอียด"
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">สถานที่ผลิต</label>
      <input
        v-model="newTextile.textile_location"
        type="text"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        placeholder="เช่น จังหวัดเชียงใหม่"
      />
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      ➕ เพิ่มผ้า
    </button>
  </form>
</div>

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

