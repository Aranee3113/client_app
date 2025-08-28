<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Check, X } from "lucide-vue-next";
const props = defineProps<{
  /** ชื่อ resource บน API เช่น "post" หรือ "comment" (ห้ามใส่ /admin/...) */
  path: string;
  /** ไอดีของแถว เช่น post_id หรือ comment_id */
  params: number;
  /** สถานะปัจจุบันจากฐานข้อมูล: 1 = อนุมัติแล้ว, 0 = ยังไม่อนุมัติ */
  status: number;
  /** override class ได้ถ้าต้องการ */
  className?: string;
}>();
const emit = defineEmits<{
  (e: "fetchPosts"): void; // ให้ parent รีโหลดรายการหลังเปลี่ยนสถานะสำเร็จ
}>();
const { $axios } = useNuxtApp();
const loading = ref(false);
const handleApprove = async () => {
  try {
    loading.value = true;
    const res = await $axios.put(`/${props.path}/active/${props.params}`);
    console.log(res.data);

    emit("fetchPosts");
  } catch (error: any) {
    console.error("เกิดข้อผิดพลาด:", error);
    const msg = error?.response?.data?.message || "ไม่สามารถเปลี่ยนสถานะได้";
    alert(msg);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <button
    @click="handleApprove"
    :disabled="loading"
    :class="[
      'min-w-[120px] h-10 px-3 inline-flex items-center justify-center gap-1 text-sm rounded text-white transition-all shadow',
      ,
      props.className || '',
    ]"
  >
    <span class="text-black">{{ props.status == 1 ? "app" : "reject" }}</span>
  </button>
</template>
