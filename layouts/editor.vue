<template>
  <div class="min-h-screen">
    <Basenavbar />
    <slot />
  </div>
</template>
<script setup>
import Basenavbar from "~/components/navbar/Basenavbar.vue";
</script>
