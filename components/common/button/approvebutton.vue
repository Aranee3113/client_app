\
<script setup>
import { ref } from "vue";
import { Check, X } from "lucide-vue-next";

const props = defineProps({
  text: String,
  params: Number, // ใช้ post_id
  color: String,
});
const emit = defineEmits(["fetchOn"]);
const { $axios } = useNuxtApp();
const approved = ref(false);

const handleApprove = async () => {
  try {
    const response = await $axios.put(`/post/active/${props.params}`);

    if (response.status === 200) {
      approved.value = true;
      emit("fetchOn");
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
    :class="[
      'w-10 h-10 flex items-center justify-center text-xs text-nowrap  px-3 transition-all min-w-[100px] rounded',
      color,
    ]"
  >
    {{ text }}
  </button>
</template>
