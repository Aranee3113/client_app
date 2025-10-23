<template>
<div class="member-layout-sarabun">
<navbar-membernavber class="sticky top-0 z-50 bg-white shadow-md w-full" />

<slot />
<footer-Basefooter />
</div>
</template>

<script setup>
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap');

.member-layout-sarabun {
  font-family: 'Sarabun', sans-serif;
}
</style>