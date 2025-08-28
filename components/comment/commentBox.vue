<script setup lang="ts">
import { ref } from "vue";
import CommentForm from "./commentForm.vue";
import CommentList from "./commentList.vue";

const props = defineProps<{ postId: number | string }>();

// ใช้ค่าเปลี่ยนเพื่อบังคับให้ list รีโหลด
const listKey = ref(0);
const refresh = () => (listKey.value += 1);
</script>

<template>
  <section class="space-y-4">
    <CommentForm :postId="props.postId" @submitted="refresh" />
    <CommentList :key="listKey" :postId="props.postId" />
  </section>
</template>
