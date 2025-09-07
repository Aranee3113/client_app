<!-- CLIENT_APP/pages/member/search.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRuntimeConfig, useHead } from "#app";
import { Search as SearchIcon, FileText, Shapes, AlertCircle } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const q = ref<string>((route.query.q as string) || "");
const qLocal = ref<string>(q.value); // กล่องค้นหาในหน้านี้
const loading = ref(false);
const errorMsg = ref("");

const allPosts = ref<any[]>([]);
const allProducts = ref<any[]>([]);

const config = useRuntimeConfig();
const apiBase = config.public.apiBase || "http://localhost:3000/api";

// ---------- load all then filter on client ----------
const fetchAll = async () => {
  loading.value = true;
  errorMsg.value = "";
  try {
    const [posts, products] = await Promise.all([
      $fetch(`${apiBase}/post`),     // ปรับ path ให้ตรงโปรเจกต์
      $fetch(`${apiBase}/product`),  // ปรับ path ให้ตรงโปรเจกต์
    ]);

    allPosts.value = (posts as any)?.data ?? (posts as any) ?? [];
    allProducts.value = (products as any)?.data ?? (products as any) ?? [];
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || "โหลดข้อมูลไม่สำเร็จ";
  } finally {
    loading.value = false;
  }
};

const norm = (s: any) => String(s ?? "").toLowerCase().trim();
const safe = (v: any) => String(v ?? "");

// ---------- filters ----------
const filteredPosts = computed(() => {
  const key = norm(q.value);
  if (!key) return [];
  return allPosts.value.filter((p) =>
    norm(safe(p.post_name)).includes(key) || norm(safe(p.post_description)).includes(key)
  );
});

const filteredProducts = computed(() => {
  const key = norm(q.value);
  if (!key) return [];
  return allProducts.value.filter((t) =>
    norm(safe(t.product_name ?? t.textile_name)).includes(key) ||
    norm(safe(t.product_description ?? t.textile_description)).includes(key)
  );
});

const totalCount = computed(() => filteredPosts.value.length + filteredProducts.value.length);

// ---------- XSS-safe highlight ----------
const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m] as string));

const highlight = (text: string) => {
  const key = (q.value || "").trim();
  if (!key) return escapeHtml(text || "");
  const safeText = escapeHtml(text || "");
  const re = new RegExp(`(${key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "gi");
  return safeText.replace(re, `<mark class="bg-yellow-200 rounded px-1">$1</mark>`);
};

// ---------- tabs: all / post / product ----------
const tab = ref<"all" | "post" | "product">("all");
const showPosts = computed(() => tab.value === "all" || tab.value === "post");
const showProducts = computed(() => tab.value === "all" || tab.value === "product");

// ---------- navigate with new query ----------
const applyQuery = () => {
  const next = qLocal.value.trim();
  router.push({ path: "/member/search", query: next ? { q: next } : {} });
};

// ---------- sync from navbar / update title / scroll top ----------
watch(
  () => route.query.q,
  (val) => {
    q.value = (val as string) || "";
    qLocal.value = q.value;
    if (process.client) window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

// SEO title
useHead({
  title: q.value ? `ค้นหา: ${q.value} | Mai Khmer` : "ค้นหา | Mai Khmer",
});
watch(q, (val) => {
  useHead({ title: val ? `ค้นหา: ${val} | Mai Khmer` : "ค้นหา | Mai Khmer" });
});

onMounted(fetchAll);

// (optional) cap display if lists get large
const MAX_SHOW = 50;
const visiblePosts = computed(() => filteredPosts.value.slice(0, MAX_SHOW));
const visibleProducts = computed(() => filteredProducts.value.slice(0, MAX_SHOW));
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#bf9fdf] via-white to-[#e8c9ad]">
    <!-- Header ค้นหา -->
    <header class="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">ผลการค้นหา</h1>
          <p class="text-sm text-gray-600">
            คำค้น:
            <span class="font-semibold text-gray-800">"{{ q }}"</span>
            <span v-if="!loading" class="ml-2 text-gray-500">— พบ {{ totalCount }} รายการ</span>
          </p>
        </div>

        <div class="flex w-full md:w-auto">
          <input
            v-model="qLocal"
            type="text"
            placeholder="พิมพ์คำค้นใหม่แล้วกด Enter…"
            class="flex-1 md:w-80 rounded-l-xl border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            @keydown.enter="applyQuery"
          />
          <button
            class="inline-flex items-center gap-2 rounded-r-xl bg-gradient-to-r from-orange-600 to-orange-400 text-white px-4 hover:from-orange-500 hover:to-orange-500 transition disabled:opacity-50"
            :disabled="!qLocal.trim()"
            @click="applyQuery"
            aria-label="ค้นหา"
            title="ค้นหา"
          >
            <SearchIcon class="w-4 h-4" />
            ค้นหา
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="max-w-6xl mx-auto px-4 pb-3 flex items-center gap-2">
        <button
          class="text-xs px-3 py-1.5 rounded-full border"
          :class="tab==='all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'"
          @click="tab='all'">ทั้งหมด</button>
        <button
          class="text-xs px-3 py-1.5 rounded-full border"
          :class="tab==='post' ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-gray-700 border-gray-300'"
          @click="tab='post'">โพสต์</button>
        <button
          class="text-xs px-3 py-1.5 rounded-full border"
          :class="tab==='product' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-gray-700 border-gray-300'"
          @click="tab='product'">ผ้าทอ</button>
      </div>
    </header>

    <!-- ปุ่ม back (ถ้าคุณมีคอมโพเนนต์นี้ global) -->
    <CommonButtonBack />

    <!-- เนื้อหา -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl border border-gray-200 bg-white p-4">
          <div class="h-5 w-1/2 bg-gray-200 rounded mb-3"></div>
          <div class="h-4 w-11/12 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 w-10/12 bg-gray-200 rounded mb-4"></div>
          <div class="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="errorMsg" class="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
        <AlertCircle class="w-5 h-5 mt-0.5" />
        <div>{{ errorMsg }}</div>
      </div>

      <!-- Results -->
      <div v-else>
        <template v-if="totalCount > 0">
          <!-- Posts -->
          <section v-if="showPosts && filteredPosts.length">
            <div class="flex items-center gap-2 mb-3">
              <FileText class="w-5 h-5 text-purple-700" />
              <h2 class="text-lg font-semibold text-gray-900">โพสต์</h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {{ filteredPosts.length }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article
                v-for="p in visiblePosts"
                :key="p.post_id"
                class="group rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                <h3 class="font-semibold text-gray-900 mb-1" v-html="highlight(p.post_name)"></h3>
                <p class="text-sm text-gray-600 line-clamp-3" v-html="highlight(p.post_description)"></p>
                <NuxtLink
                  :to="`/member/post_list/${p.post_id}`"
                  class="inline-flex items-center gap-1 mt-3 text-sm text-orange-700 group-hover:text-orange-800 hover:underline"
                >
                  อ่านต่อ
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </article>
            </div>
          </section>

          <!-- Products / Textile -->
          <section v-if="showProducts && filteredProducts.length" class="mt-8">
            <div class="flex items-center gap-2 mb-3">
              <Shapes class="w-5 h-5 text-emerald-700" />
              <h2 class="text-lg font-semibold text-gray-900">ผ้าทอ</h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                {{ filteredProducts.length }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article
                v-for="t in visibleProducts"
                :key="t.product_id || t.textile_id"
                class="group rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                <h3 class="font-semibold text-gray-900 mb-1" v-html="highlight(t.product_name || t.textile_name)"></h3>
                <p class="text-sm text-gray-600 line-clamp-3" v-html="highlight(t.product_description || t.textile_description)"></p>
                <!-- ⬇️ ถ้าปลายทางจริงคือ /member/textile/:id ให้แก้บรรทัดลิงก์นี้ -->
                <NuxtLink
                  :to="`/member/information_list/${t.product_id || t.textile_id}`"
                  class="inline-flex items-center gap-1 mt-3 text-sm text-orange-700 group-hover:text-orange-800 hover:underline"
                >
                  ดูรายละเอียด
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </article>
            </div>
          </section>
        </template>

        <!-- Empty state -->
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
