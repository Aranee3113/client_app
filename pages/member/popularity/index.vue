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

/* ---------- helpers ---------- */
function onImageError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = "/placeholder.png";
}

/* ---------- fetch ---------- */
async function fetchPosts(): Promise<Post[]> {
  const res = await $axios.get("/post/active");
  const rows: any[] = res?.data?.data ?? [];
  return rows.map((p) => {
    const imgs =
      Array.isArray(p.images)
        ? p.images
        : typeof p.images === "string"
        ? (() => {
            try {
              return JSON.parse(p.images);
            } catch {
              return [];
            }
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

async function fetchSummary(
  postId: number
): Promise<{ count: number; avg: number }> {
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
    const r = await $axios.get(`/rating/${postId}/me`, {
      headers: authHeader.value,
    });
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
    const [summary, my] = await Promise.all([
      fetchSummary(postId),
      fetchMy(postId),
    ]);
    posts.value[idx].summary = summary;
    posts.value[idx].myStars = my;
  }
}

/* ---------- computed ---------- */
const totalPosts = computed(() => posts.value.length);

const totalVotes = computed(() =>
  posts.value.reduce((sum, p) => sum + (p.summary?.count ?? 0), 0)
);

const overallAvg = computed(() => {
  const numer = posts.value.reduce(
    (sum, p) => sum + (p.summary?.avg ?? 0) * (p.summary?.count ?? 0),
    0
  );
  return totalVotes.value ? numer / totalVotes.value : 0;
});

const postsToday = computed(() => {
  const tzNow = new Date();
  const y = tzNow.getFullYear();
  const m = String(tzNow.getMonth() + 1).padStart(2, "0");
  const d = String(tzNow.getDate()).padStart(2, "0");
  const todayStr = `${y}-${m}-${d}`;
  return posts.value.filter((p) =>
    (p.post_timestamp ?? "").startsWith(todayStr)
  ).length;
});

const latestPosts = computed(() =>
  [...posts.value]
    .sort(
      (a, b) =>
        new Date(b.post_timestamp).getTime() -
        new Date(a.post_timestamp).getTime()
    )
    .slice(0, 6)
);

const topRatedPosts = computed(() =>
  [...posts.value]
    .sort((a, b) => {
      const da = (b.summary?.avg ?? 0) - (a.summary?.avg ?? 0);
      if (Math.abs(da) > 1e-6) return da;
      return (b.summary?.count ?? 0) - (a.summary?.count ?? 0);
    })
    .slice(0, 6)
);

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
    <div class="max-w-6xl mx-auto space-y-8 text-lg">
      <div>
        <h1 class="text-3xl font-bold text-purple-800">ความนิยม</h1>
        <p class="text-purple-700/80">แดชบอร์ดสรุป และการให้คะแนน</p>
      </div>

      <div v-if="loading" class="text-center text-purple-600">กำลังโหลด...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="p-6 rounded-2xl text-white shadow bg-gradient-to-br from-amber-900 to-orange-800 "
        >
          <p class="uppercase text-xs tracking-wider text-white/80">จำนวนโพสต์</p>
          <p class="mt-2 text-4xl font-extrabold">{{ totalPosts }}</p>
          <p class="mt-1 text-white/80">โพสต์ที่ Active ทั้งหมด</p>
        </div>

        <div
          class="p-6 rounded-2xl text-white shadow bg-gradient-to-br from-pink-900 to-pink-500"
        >
          <p class="uppercase text-xs tracking-wider text-white/80">
            ค่าเฉลี่ยเรตติ้งรวม
          </p>
          <p class="mt-2 text-4xl font-extrabold">{{ overallAvg.toFixed(1) }}</p>
          <p class="mt-1 text-white/80">จาก {{ totalVotes }} โหวต</p>
        </div>

        <div
          class="p-6 rounded-2xl text-white shadow bg-gradient-to-br from-purple-900 to-purple-700"
        >
          <p class="uppercase text-sm tracking-wider text-white/80">เพิ่มวันนี้</p>
          <p class="mt-2 text-4xl font-extrabold">{{ postsToday }}</p>
          <p class="mt-1 text-white/80">โพสต์ที่อัปโหลดวันนี้</p>
        </div>
      </div>

      <div v-if="!loading && !error" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section class="lg:col-span-2">
          <h2 class="text-xl font-semibold text-purple-900 mb-4">โพสต์ล่าสุด</h2>

          <div v-if="latestPosts.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
              v-for="p in latestPosts"
              :key="p.post_id"
              class="rounded-2xl bg-white shadow border border-purple-50 overflow-hidden"
            >
              <div class="h-40 w-full bg-purple-100">
                <img
                  v-if="p.cover"
                  :src="p.cover"
                  alt=""
                  class="h-40 w-full object-cover"
                  @error="onImageError"
                />
                <div
                  v-else
                  class="h-full w-full grid place-items-center text-purple-500"
                >
                  ไม่มีรูปภาพ
                </div>
              </div>

              <div class="p-4 space-y-2">
                <h3 class="font-bold text-xl text-purple-900 line-clamp-1">
                  {{ p.post_name }}
                </h3>
                <p class="text-lg text-gray-600 line-clamp-2">
                  {{ p.post_description }}
                </p>
                <p class="text-sm text-gray-400">
                  {{ new Date(p.post_timestamp).toLocaleString() }}
                </p>

                <div class="flex items-center gap-1 pt-1">
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
            </article>
          </div>
          <div v-else class="p-6 rounded-2xl bg-white/60 text-purple-800 shadow">
            ยังไม่มีโพสต์
          </div>
        </section>

        <section class="lg:col-span-1">
          <h2 class="text-xl font-semibold text-purple-900 mb-4">คะแนนสูงสุด</h2>

          <div v-if="topRatedPosts.length" class="space-y-4">
            <article
              v-for="p in topRatedPosts"
              :key="p.post_id"
              class="flex gap-3 p-3 rounded-xl bg-white shadow border border-purple-50"
            >
              <div class="w-16 h-16 rounded-lg bg-purple-100 overflow-hidden shrink-0">
                <img
                  v-if="p.cover"
                  :src="p.cover"
                  alt=""
                  class="w-full h-full object-cover"
                  @error="onImageError"
                />
                <div
                  v-else
                  class="w-full h-full grid place-items-center text-purple-500 text-xs"
                >
                  ไม่มีรูป
                </div>
              </div>

              <div class="min-w-0">
                <h3 class="font-medium text-purple-900 line-clamp-1">
                  {{ p.post_name }}
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2">
                  {{ p.post_description }}
                </p>
                <div class="mt-1 flex items-center gap-1">
                  <span class="text-yellow-500">★</span>
                  <span class="text-sm font-medium">
                    {{ p.summary.avg.toFixed(1) }}
                  </span>
                  <span class="text-xs text-gray-400"
                    >({{ p.summary.count }})</span
                  >
                </div>
              </div>
            </article>
          </div>
          <div class="p-6 rounded-2xl bg-white/60 text-purple-800 shadow" v-else>
            ยังไม่มีคะแนน
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
