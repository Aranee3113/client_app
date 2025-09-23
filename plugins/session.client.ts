export default defineNuxtPlugin(() => {
  const { currentUser } = useSession();
  if (process.client) {
    const raw = localStorage.getItem("app_user");
    if (raw && !currentUser.value) {
      try {
        currentUser.value = JSON.parse(raw);
      } catch {}
    }
  }

  watch(
    currentUser,
    (val) => {
      if (!process.client) return;
      if (val) localStorage.setItem("app_user", JSON.stringify(val));
      else localStorage.removeItem("app_user");
    },
    { deep: true }
  );
});
