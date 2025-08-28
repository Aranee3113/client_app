<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{ postId: number | string }>();
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const comments = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path?: string) => {
  if (!path || typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  const base = getFileBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const fetchComments = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await $axios.get("/comment/active");
    const rows: any[] = Array.isArray(res.data?.data) ? res.data.data : [];
    // กรองเฉพาะของโพสต์นี้
    comments.value = rows.filter((r) => String(r.post_id) === String(props.postId));
  } catch (e) {
    console.error("โหลดคอมเมนต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดคอมเมนต์ได้";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchComments);
watch(() => props.postId, fetchComments);
</script>

<template>
  <div class="bg-white rounded-xl border p-4">
    <h3 class="font-semibold mb-3">ความคิดเห็น</h3>

    <div v-if="loading" class="text-gray-500">กำลังโหลด…</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else-if="comments.length === 0" class="text-gray-400">
      ยังไม่มีคอมเมนต์สำหรับโพสต์นี้
    </div>

    <ul v-else class="space-y-4">
      <li v-for="c in comments" :key="c.comment_id" class="flex gap-3">
        <div class="shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
          {{ (c.user_name || 'U').slice(0,1).toUpperCase() }}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ c.user_name || 'ไม่ทราบชื่อ' }}</span>
            <span class="text-xs text-gray-500">
              {{ new Date(c.comment_timestamp).toLocaleString() }}
            </span>
          </div>
          <p class="text-gray-800 whitespace-pre-line">
            {{ c.comment_text }}
          </p>
          <img
            v-if="c.comment_image_path"
            :src="getImageUrl(c.comment_image_path)"
            alt="comment image"
            class="mt-2 max-h-56 rounded border object-contain"
            loading="lazy"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
