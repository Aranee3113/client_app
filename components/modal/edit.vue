<script setup>
const props = defineProps({
  show: Boolean,
  textile: Object,
});

const emits = defineEmits(["update", "cancel"]);

import { ref, watch } from "vue";

const form = ref({
  textile_id: null,
  textile_name: "",
  textile_description: "",
  textile_location: "",
});

watch(
  () => props.textile,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    }
  },
  { immediate: true }
);

const onSave = () => {
  emits("update", form.value);
};

const onCancel = () => {
  emits("cancel");
};
</script>

<template>

  <div
    v-if="show"
    class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4 text-center">แก้ไขข้อมูล</h2>
      <div class="space-y-3">
        <input
          v-model="form.textile_name"
          placeholder="ชื่อผ้า"
          class="w-full p-2 border rounded"
        />
        <textarea
          v-model="form.textile_description"
          placeholder="คำอธิบาย"
          class="w-full p-2 border rounded"
        ></textarea> 
        <input
          v-model="form.textile_location"
          placeholder="สถานที่"
          class="w-full p-2 border rounded"
        />
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="onCancel"
          class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          ยกเลิก
        </button>
        <button
          @click="onSave"
          class="px-4 py-2 bg-[#ff5a5f] text-white rounded hover:bg-blue-600"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>


