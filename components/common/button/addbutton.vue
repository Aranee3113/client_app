<script setup>
const props = defineProps({
  text: String,
  color: String,
  path: String,
});

const router = useRouter();

async function handleNavigate() {
  const confirmGo = confirm(`คุณต้องการเพิ่ม ${props.text} หรือไม่?`);
  if (!confirmGo) return;

  try {
    await router.push(props.path);
    alert(`นำทางไปยังหน้าสำหรับเพิ่ม ${props.text} สำเร็จ`);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการนำทาง:", error);
    alert("ไม่สามารถนำทางไปยังหน้าได้");
  }
}
</script>

<template>
  <button
    @click="handleNavigate"
    :class="['p-3', 'rounded-md hover:cursor-pointer', color]"
  >
    เพิ่ม {{ text }}
  </button>
</template>
