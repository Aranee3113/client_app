<script setup>
const prop = defineProps({
  name: String,
  path: String,
  style: String,
});
</script>
<template>
  <NuxtLink
    :to="path"
    :class="style"
    >{{ name }}</NuxtLink
  >
</template>
