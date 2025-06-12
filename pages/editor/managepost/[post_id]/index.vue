<template>
  <div>
    <h1>จัดการโพสต์ตามไอดี</h1>
    <p>แก้ไข Post ID: {{ post_id }}</p>
    <p>ดูรายละเอียด Post ID: {{ post_id }}</p>
    <p v-if="post_id === 0">เพิ่ม post = {{ post_id }}</p>
  </div>
</template>

<script setup>
const route = useRoute();
const post_id = route.params.post_id;
</script>
