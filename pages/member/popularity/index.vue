<script setup lang="ts">
definePageMeta({ layout: "member" });

import { ref, onMounted, computed } from "vue";

const { $axios } = useNuxtApp();
const token = useCookie<string | null>("token");

// อ่าน base URL สำหรับไฟล์จาก nuxt.config.ts (runtimeConfig.public.fileBase)
const {
  public: { fileBase, apiBase },
} = useRuntimeConfig();

// แปลง path แบบ /uploads/... ให้เป็น URL เต็มของ backend
const toImageUrl = (path?: string | null): string | null =>
  path ? (path.startsWith("http") ? path : `${fileBase}${path}`) : null;

/* ---------- types ---------- */
type Post = {
  post_id: number;
  post_name: string;
  post_description: string;
  post_timestamp: string;
  cover?: string | null; // URL เต็มหลังแปลงด้วย toImageUrl
  summary: { count: number; avg: number };
  myStars: number | null;
};

/* ---------- state ---------- */
const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref("");

const authHeader = computed(() =>
  token.value ? { Authorization: `Bearer ${token.value}` } : {}
);

/* ---------- fetch ---------- */
async function fetchPosts(): Promise<Post[]> {
  const res = await $axios.get("/post/active"); // ใช้ $axios ตั้ง base เป็น apiBase อยู่แล้ว
  const rows: any[] = res?.data?.data ?? [];
  return rows.map((p) => {
    // images อาจเป็น array หรือเป็น string JSON
    const imgs =
      Array.isArray(p.images)
        ? p.images
        : typeof p.images === "string"
          ? (() => {
              try { return JSON.parse(p.images); } catch { return []; }
            })()
          : [];
    const coverPath: string | null = imgs?.[0]?.post_image_path ?? null;
    return {
      post_id: p.post_id,
      post_name: p.post_name,
      post_description: p.post_description,
      post_timestamp: p.post_timestamp,
      cover: toImageUrl(coverPath),
      summary: { count: 0, avg: 0 },
      myStars: null,
    } as Post;
  });
}

async function fetchSummary(postId: number): Promise<{ count: number; avg: number }> {
  const r = await $axios.get(`/rating/${postId}/summary`);
  const raw = r?.data?.data ?? { count: 0, avg: 0 };
  return {
    count: Number(raw.count ?? 0),
    avg: Number(raw.avg ?? 0),
  };
}

async function fetchMy(postId: number): Promise<number | null> {
  if (!token.value) return null;
  try {
    const r = await $axios.get(`/rating/${postId}/me`, { headers: authHeader.value });
    return (r?.data?.data?.stars as number | undefined) ?? null;
  } catch {
    return null;
  }
}

async function rate(postId: number, stars: number): Promise<void> {
  if (!token.value) {
    error.value = "กรุณาเข้าสู่ระบบก่อน";
    return;
  }
  await $axios.post(
    `/rating/${postId}`,
    { stars },
    { headers: { ...authHeader.value, "Content-Type": "application/json" } }
  );
  const idx = posts.value.findIndex((p) => p.post_id === postId);
  if (idx >= 0) {
    const [summary, my] = await Promise.all([fetchSummary(postId), fetchMy(postId)]);
    posts.value[idx].summary = summary;
    posts.value[idx].myStars = my;
  }
}

/* ---------- init ---------- */
onMounted(async () => {
  loading.value = true;
  error.value = "";
  try {
    const list: Post[] = await fetchPosts();
    const enriched: Post[] = await Promise.all(
      list.map(async (p: Post): Promise<Post> => {
        const [summary, my] = await Promise.all([
          fetchSummary(p.post_id),
          fetchMy(p.post_id),
        ]);
        return { ...p, summary, myStars: my };
      })
    );
    posts.value = enriched;
  } catch (e: any) {
    error.value = e?.message ?? "โหลดข้อมูลล้มเหลว";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  
  <div class="min-h-screen bg-[#ddcbe9] py-10 px-6">
    <CommonButtonBack />
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-800 mb-6">ความนิยม</h1>

      <div v-if="loading" class="text-center text-purple-600">กำลังโหลด...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="p in posts"
          :key="p.post_id"
          class="rounded-xl bg-white shadow p-4 space-y-3"
        >
          <img
            v-if="p.cover"
            :src="p.cover"
            alt=""
            class="h-40 w-full object-cover rounded-lg"
          />
          <div v-else class="h-40 w-full rounded-lg bg-purple-100 grid place-items-center text-purple-500">
            ไม่มีรูปภาพ
          </div>

          <h3 class="font-bold text-lg">{{ p.post_name }}</h3>
          <p class="text-sm text-gray-600">{{ p.post_description }}</p>

          <!-- stars -->
          <div class="flex items-center gap-1">
            <button
              v-for="n in 5"
              :key="n"
              @click="rate(p.post_id, n)"
              class="text-xl"
              :class="(p.myStars ?? 0) >= n ? 'text-yellow-500' : 'text-gray-300'"
            >
              ★
            </button>
            <span class="ml-2 text-sm text-gray-500">
              {{ p.summary.avg.toFixed(1) }} ({{ p.summary.count }} โหวต)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
