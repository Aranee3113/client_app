<script setup lang="ts">
import { ref, watch, computed } from "vue";
const { $axios } = useNuxtApp();

const props = defineProps<{
  id: number | string;          // ไอดีของรายการ (เช่น post_id)
  modelValue: number | boolean; // ค่าปัจจุบัน (1/0 หรือ true/false)
  path: string;                 // พาธฐานสำหรับเรียก API เช่น "post/active"
  trueLabel?: string;           // ข้อความตอนอนุมัติ (ค่าเริ่มต้น: "อนุมัติ")
  falseLabel?: string;          // ข้อความตอนยังไม่อนุมัติ (ค่าเริ่มต้น: "ไม่อนุมัติ")
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: number | boolean): void;
  (e: "updated", v: { id: string | number; is_active: number }): void;
  (e: "error", err: any): void;
}>();

// แปลงค่าให้เป็นตัวเลข 0/1 ภายในคอมโพเนนต์
const localActive = ref<number>(props.modelValue ? 1 : 0);
watch(
  () => props.modelValue,
  (v) => (localActive.value = v ? 1 : 0)
);

const loading = ref(false);

const label = computed(() =>
  localActive.value === 1 ? props.trueLabel ?? "อนุมัติ" : props.falseLabel ?? "ไม่อนุมัติ"
);

const btnClass = computed(() =>
  [
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium shadow-sm transition",
    loading.value ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
    localActive.value === 1
      ? "bg-green-500 text-white hover:bg-green-600"
      : "bg-gray-300 text-gray-700 hover:bg-gray-400",
  ].join(" ")
);

const icon = computed(() =>
  localActive.value === 1
    ? "M5 13l4 4L19 7" // check
    : "M6 18L18 6M6 6l12 12" // x
);

const toggle = async () => {
  if (loading.value) return;
  const previous = localActive.value;
  const next = previous === 1 ? 0 : 1;

  // อัปเดตแบบ optimistic
  localActive.value = next;
  emit("update:modelValue", next);

  try {
    loading.value = true;
    await $axios.put(`/${props.path}/${props.id}`, { is_active: next });
    emit("updated", { id: props.id, is_active: next });
  } catch (err) {
    // rollback
    localActive.value = previous;
    emit("update:modelValue", previous);
    emit("error", err);
    console.error("Toggle active failed:", err);
    // แจ้งเตือนแบบง่าย ๆ
    alert("เปลี่ยนสถานะไม่สำเร็จ");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <button
    :aria-pressed="localActive === 1"
    :disabled="loading"
    :class="btnClass"
    @click="toggle"
  >
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path v-if="localActive === 1" :d="icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path v-else :d="icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span>{{ label }}</span>
    <span v-if="loading" class="animate-pulse">...</span>
  </button>
</template>
