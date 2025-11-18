<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  user: Object,
});

const emits = defineEmits(["update", "cancel"]);

const form = ref({
  user_id: null,
  user_name: "",
  user_username: "",
  user_password: "",
});

watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      form.value = {
        user_id: newVal.user_id,
        user_name: newVal.user_name,
        user_username: newVal.user_username,
        user_password: "", // รีเซ็ตรหัสผ่านใหม่ให้ว่าง
      };
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
    class="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4 text-center text-[#ff5a5f]">แก้ไขข้อมูลผู้ใช้</h2>

      <div class="space-y-3">
        <input
          v-model="form.user_name"
          placeholder="ชื่อผู้ใช้"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="form.user_username"
          placeholder="Username"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="form.user_password"
          placeholder="รหัสผ่านใหม่ (ถ้าไม่เปลี่ยนให้เว้นว่าง)"
          type="password"
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
          class="px-4 py-2 bg-[#ff5a5f] text-white rounded hover:bg-[#e14a4f]"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>
