<script setup>
const props = defineProps({
  type: String,
  path: String,
  params: [String, Number],
});

const router = useRouter();

async function handleNavigate() {
  const confirmGo = confirm("คุณต้องการไปยังหน้าจัดการข้อมูลนี้หรือไม่?");
  if (!confirmGo) return;

  try {
    await router.push(`${props.path}/${props.params}`);
    alert("นำทางสำเร็จแล้ว!");
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการเปลี่ยนหน้า", err);
    alert("เกิดข้อผิดพลาดในการนำทาง");
  }
}
</script>

<template>
  <button
    @click="handleNavigate"
    :class="[
      'w-10 items-center justify-center text-white transition',
      'bg-amber-400 hover:bg-amber-700 shadow-md cursor-pointer ',
    ]"
  >
    <icon name="uil:edit-alt" class="w-5 h-5" />
  </button>
</template>
