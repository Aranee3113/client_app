<script setup>
definePageMeta ({
    layout:"defualt"
})
</script>
<template>
  <div class="flex justify-center h-screen items-center mx-auto">
    <div class="bg-white shadow-gray-500 p-8 rounded-4xl shadow-md w-full max-w-md">
      <h1 class="text-4xl font-bold mb-6 text-center">Mai Khmer</h1>
      <h2 class="text-2xl  mb-4 text-center">ลงทะเบียน</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">

        <div class="mb-4">
          <label for="email" class="block text-gray-700">ชื่อผู้ใช้</label>
          <input
            v-model="ชื่อผู้ใช้"
            type="text"
            id="text"
            placeholder="ชื่อผู้ใช้"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700">รหัสผ่าน</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="รหัสผ่าน"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">ยืนยันรหัสผ่าน</label>
          <input
            v-model="ยืนยันรหัสผ่าน"
            type="password"
            id="password"
            placeholder="ยืนยันรหัสผ่าน"
            class="mt-1 w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#593f5d] text-white p-2 rounded-md hover:bg-white hover:text-[#8E1616] transition border-2 text-xl"
        >
          ลงทะเบียน
        </button>
      
        <label className="text-gray-500 p-2 text-sm text-center w-full">
              ยังไม่มีบัญชีใช่ไหม?
              <NuxtLink
                href="/"
                className="text-red-500 font-bold hover:underline ml-1"
              >
                เข้าสู่ระบบ
              </NuxtLink>
            </label>
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
