<script setup>


const token = useCookie('token')
const router = useRouter()

</script>

<template>
  <NavbarBasenavbar/>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    
    <div class="bg-white p-10 rounded shadow-md text-center">
      <h1 class="text-3xl font-bold text-green-600 mb-4">ยินดีต้อนรับสู่หน้าหลัก</h1>
      <p class="text-lg text-gray-700">คุณเข้าสู่ระบบเรียบร้อยแล้ว</p>
    </div>
  </div>
  <FooterBasefooter/>
</template>
