\
<script setup>
import { ref } from "vue";
import { Check, X } from "lucide-vue-next";

const props = defineProps({
  text: String,
  params: Number, // ใช้ post_id
});

const { $axios } = useNuxtApp();
const approved = ref(false); // เริ่มต้นคือยังไม่อนุมัติ

const handleApprove = async () => {
  if (approved.value) return;

  const confirmApprove = confirm(`คุณต้องการอนุมัติ ${props.text} หรือไม่?`);
  if (!confirmApprove) return;

  try {
    const response = await $axios.put(`/post/active/${props.params}`);

    if (response.status === 200) {
      alert(`${props.text} ได้รับการอนุมัติแล้ว`);
      approved.value = true;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    alert("ไม่สามารถอนุมัติได้");
  }
};
</script>

<template>
  <button
    @click="handleApprove"
    class="w-10 h-10 flex items-center justify-center rounded-none transition-all"
    :class="approved ? 'bg-green-800 text-white' : 'bg-red-800 text-white'"
    :title="approved ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ'"
  >
    <component :is="approved ? Check : X" class="w-5 h-5" />
  </button>
</template>
