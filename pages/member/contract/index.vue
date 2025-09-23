<script setup>
definePageMeta({
  layout: "member",
});
const { $axios } = useNuxtApp();

const route = useRoute();
const mesto = route.query.mesto;
const user = useState("currentUser");
const me = user?.value?.user_username;
const to = ref("");

const fetchUser = async () => {
  try {
    const data = await $axios.get("/aut62h/getmes/" + mesto);
    to.value = data.data.data.user_username;
    console.log("Fetched user data:", data.data.data.user_username);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad] py-12 px-6"
  >
    หน้าแชท ระหว่าง {{ me || "คุณ" }} กับ คนโพสต์ id ที่
    {{ to || "กำลังโหลด..." }}
  </div>
</template>
