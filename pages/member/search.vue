<!-- CLIENT_APP/pages/member/search.vue -->
<script setup lang="ts">
definePageMeta({ layout: "member" });

import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig, useHead } from "#app";
import { Search as SearchIcon, FileText, AlertCircle, Shapes } from "lucide-vue-next";
import { SECTIONS } from "~/textiles/index";

const route = useRoute();

const q = ref<string>((route.query.q as string) || "");
const mode = ref<"AND" | "OR">("AND");
const loading = ref(false);
const errorMsg = ref("");

const allPosts = ref<any[]>([]);
const allSections = ref(SECTIONS);

const config = useRuntimeConfig();
const apiBase = config.public.apiBase || "http://localhost:3000/api";
const fileBase = config.public.fileBase || "";

/* ---------- image helpers ---------- */
const toImageUrl = (path?: string | null): string | null =>
  path ? (path.startsWith("http") ? path : `${fileBase}${path}`) : null;

const normalizeImages = (raw: unknown): string[] => {
  if (!raw) return [];
  const arr = Array.isArray(raw)
    ? raw
    : (() => {
        try {
          const p = typeof raw === "string" ? JSON.parse(raw) : raw;
          return Array.isArray(p) ? p : [];
        } catch {
          return [];
        }
      })();
  return (arr as any[])
    .map((x) =>
      typeof x === "string"
        ? x
        : x?.post_image_path || x?.image_path || x?.path || x?.url || null
    )
    .filter(Boolean) as string[];
};

const thumbOf = (p: any): string | null => {
  if (p?.cover) return toImageUrl(p.cover);
  const imgs =
    normalizeImages(p?.images) ||
    normalizeImages(p?.post_images) ||
    normalizeImages(p?.post_image);
  if (imgs && imgs.length) return toImageUrl(imgs[0]);
  if (p?.post_image_path) return toImageUrl(p.post_image_path);
  return null;
};

/* ---------- fetch posts ---------- */
const fetchAll = async () => {
  loading.value = true;
  errorMsg.value = "";
  try {
    const posts = await $fetch(`${apiBase}/post`);
    const rows = (posts as any)?.data ?? (posts as any) ?? [];
    allPosts.value = rows.map((p: any) => ({ ...p, images: normalizeImages(p.images) }));
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || "โหลดโพสต์ไม่สำเร็จ";
  } finally {
    loading.value = false;
  }
};

/* ---------- keyword helpers ---------- */
const norm = (s: unknown) => String(s ?? "").toLowerCase().trim();
const words = computed(() => norm(q.value).split(/\s+/).filter(Boolean));

const matchText = (text: string, ws: string[], m: "AND" | "OR") => {
  const hay = norm(text);
  return m === "AND" ? ws.every((w) => hay.includes(w)) : ws.some((w) => hay.includes(w));
};

/* ---------- filter posts ---------- */
const filteredPosts = computed(() => {
  const ws = words.value;
  if (!ws.length) return [];

  return allPosts.value
    .filter((p) =>
      matchText(`${p.post_name ?? ""} ${p.post_description ?? ""}`, ws, mode.value)
    )
    // กรองโพสต์ที่มีไฟล์อยู่ใน /uploads/videos/ ออก
    .filter((p) => {
      const allPaths = [
        p.cover,
        ...(normalizeImages(p?.images) || []),
        ...(normalizeImages(p?.post_images) || []),
      ].filter(Boolean);
      return !allPaths.some((path: string) => path.includes("/uploads/videos/"));
    });
});

/* ---------- filter textile sections ---------- */
const filteredSections = computed(() => {
  const ws = words.value;
  if (!ws.length) return [];
  return allSections.value.filter((s) => {
    const text = `${s.name ?? ""} ${s.summary ?? ""} ${(s.keywords || []).join(" ")}`;
    return matchText(text, ws, mode.value);
  });
});

/* ---------- total ---------- */
const totalCount = computed(
  () => filteredPosts.value.length + filteredSections.value.length
);

/* ---------- sync query & title ---------- */
watch(
  () => route.query.q,
  (val) => {
    q.value = (val as string) || "";
    if (process.client) window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

useHead(() => ({
  title: q.value ? `ค้นหา: ${q.value} | Khmer Weave` : "ค้นหา | Khmer Weave",
}));

onMounted(fetchAll);
</script>

<template>
  <div
    class="min-h-screen bg-[url('/assetts/css/image/bg.png')] bg-cover bg-center bg-no-repeat px-4 pb-12"
  >
    <div class="pt-6">
      <CommonButtonBack />
    </div>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="i in 6"
          :key="i"
          class="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div class="h-48 w-full bg-gray-200 rounded-xl mb-4"></div>
          <div class="h-5 w-1/2 bg-gray-200 rounded mb-3"></div>
          <div class="h-4 w-11/12 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 w-10/12 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="errorMsg"
        class="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700"
      >
        <AlertCircle class="w-5 h-5 mt-0.5" />
        <div>{{ errorMsg }}</div>
      </div>

      <!-- Results -->
      <div v-else>
        <div class="mb-6">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">ค้นหา</h1>
          <p class="text-sm text-gray-600">
            คำค้น: <span class="font-semibold text-gray-800">"{{ q }}"</span>
            <span class="ml-2 text-gray-500">— พบ {{ totalCount }} รายการ</span>
          </p>
        </div>

        <template v-if="totalCount > 0">
          <!-- โพสต์ -->
          <section v-if="filteredPosts.length">
            <div class="flex items-center gap-2 mb-3">
              <FileText class="w-5 h-5 text-purple-700" />
              <h2 class="text-xl font-semibold text-gray-900">โพสต์</h2>
              <span
                class="text-lg px-2 py-0.5 rounded-full bg-purple-100 text-purple-700"
              >
                {{ filteredPosts.length }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article
                v-for="p in filteredPosts"
                :key="p.post_id"
                class="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                <div v-if="thumbOf(p)" class="aspect-[16/9] w-full">
                  <img
                    :src="thumbOf(p) as string"
                    :alt="p.post_name || 'post cover'"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div class="p-5">
                  <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {{ p.post_name }}
                  </h3>
                  <p class="text-sm text-gray-600 line-clamp-3">
                    {{ p.post_description }}
                  </p>

                  <NuxtLink
                    :to="`/member/post/${p.post_id}`"
                    class="inline-flex items-center gap-1 mt-3 text-sm text-orange-700 group-hover:text-orange-800 hover:underline"
                  >
                    เปิดโพสต์
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </article>
            </div>
          </section>

          <!-- ผ้าทอ -->
          <section v-if="filteredSections.length" class="mt-10">
            <div class="flex items-center gap-2 mb-3">
              <Shapes class="w-5 h-5 text-emerald-700" />
              <h2 class="text-xl font-semibold text-gray-900">ผ้าทอ</h2>
              <span
                class="text-lg px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
              >
                {{ filteredSections.length }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article
                v-for="s in filteredSections"
                :key="s.id"
                class="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                <div class="p-5">
                  <h3 class="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {{ s.name }}
                  </h3>
                  <p class="text-sm text-gray-600 line-clamp-3">{{ s.summary }}</p>

                  <NuxtLink
                    :to="s.anchors?.length ? `${s.path}${s.anchors[0]}` : s.path"
                    class="inline-flex items-center gap-1 mt-3 text-sm text-orange-700 group-hover:text-orange-800 hover:underline"
                  >
                    ดูรายละเอียด
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </article>
            </div>
          </section>
        </template>

        <!-- Empty -->
        <div
          v-else
          class="mx-auto max-w-xl text-center rounded-3xl border border-dashed border-gray-300 bg-white/70 p-10"
        >
          <SearchIcon class="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <h3 class="text-lg font-semibold text-gray-800">ไม่พบผลลัพธ์</h3>
          <p class="text-sm text-gray-600 mt-1">
            ลองปรับคำค้นให้กว้างขึ้น หรือใช้คำหลักสั้น ๆ
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
