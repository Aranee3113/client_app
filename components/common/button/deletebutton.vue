<script setup>
const props = defineProps({
  type: String,
  params: [String, Number],
  path: String,
});
const emit = defineEmits(["deleted"]);

const { $axios } = useNuxtApp();

async function Handledelete() {
  const confirmDelete = confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?");
  if (!confirmDelete) return;

  try {
    const res = await $axios.delete("/" + props.path + "/" + props.params);
    alert("ลบข้อมูลสำเร็จ");

    emit("deleted");
  } catch (error) {
    console.error("ลบไม่สำเร็จ", error);
    alert("เกิดข้อผิดพลาดในการลบข้อมูล");
  }
}
</script>

<template>
  <button
    @click="Handledelete"
    :class="[
      'w-10   items-center justify-center text-white transition',
      'bg-red-500 hover:bg-red-600 shadow-md',
    ]"
  >
    <icon name="solar:archive-down-bold" />
  </button>
</template>
