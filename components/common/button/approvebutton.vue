<script setup lang="ts">
import { ref } from "vue";
import { Check, X } from "lucide-vue-next";
const props = defineProps<{
  path: string;
  params: number;
  status: number;
  className?: string;
}>();
const emit = defineEmits<{
  (e: "fetchPosts"): void;
}>();
const { $axios } = useNuxtApp();
const loading = ref(false);
const currentStatus = ref(props.status);

const toggleApprove = async () => {
  try {
    loading.value = true;
    // สลับสถานะ: ถ้า 1 ให้เป็น 0, ถ้า 0 ให้เป็น 1
    const newStatus = currentStatus.value === 1 ? 0 : 1;
    const res = await $axios.put(`/${props.path}/active/${props.params}`, {
      status: newStatus,
    });
    currentStatus.value = newStatus;
    emit("fetchPosts");
  } catch (error: any) {
    const msg = error?.response?.data?.message || "ไม่สามารถเปลี่ยนสถานะได้";
    alert(msg);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <button
    @click="toggleApprove"
    :disabled="loading"
    :class="[
      'min-w-[120px] h-10 px-3 inline-flex items-center justify-center gap-1 text-sm rounded text-white transition-all shadow cursor-pointer',
      props.className || '',
    ]"
  >
    <span class="text-black">
      {{ currentStatus == 1 ? "อนุมัติ" : "ปฏิเสธ" }}
    </span>
  </button>
</template>
