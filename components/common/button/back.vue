<template>
  <div
    class="px-6 py-3 text-black transition hover:cursor-pointer"
    @click="back"
  >
    <Icon name="mdi:arrow-left-bold-circle" size="34" />
  </div>
</template>

<script setup>
const r = useRouter();
const back = async () => {
  r.go(-1);
};
</script>
