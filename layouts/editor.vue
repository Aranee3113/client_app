<template>
  <div class="min-h-screen">
    <Basenavbar />
    <Membernavber/>
    <slot />
  </div>
</template>
<script setup>
import Basenavbar from "~/components/navbar/Basenavbar.vue";
import Membernavber from "~/components/navbar/Membernavber.vue";
</script>
