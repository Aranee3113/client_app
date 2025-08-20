<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  postId: { type: [Number, String], required: true },
  // เริ่มต้นให้คอมเมนต์ถูกซ่อน
  startCollapsed: { type: Boolean, default: true },
});

const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const comments = ref([]);
const loading = ref(false);
const error = ref("");

// สถานะเปิด/ปิด + โหลดครั้งแรกหรือยัง
const isOpen = ref(!props.startCollapsed);
const hasLoaded = ref(false);

// base สำหรับรูปจาก /uploads/*
const getFileBase = () =>
  (config?.public?.fileBase ||
    (config?.public?.apiBase || "").replace(/\/api\/?$/, "")) || "";

const getImageUrl = (path) => {
  if (!path) return "";
  if (String(path).startsWith("http")) return path;
  const base = getFileBase();
  const p = String(path).startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};

const fetchComments = async () => {
  loading.value = true;
  error.value = "";
  try {
    // ดึงคอมเมนต์ที่อนุมัติทั้งหมด แล้วกรองตาม postId
    const res = await $axios.get("/comment/active");
    const rows = res.data?.data || [];
    comments.value = rows.filter(
      (c) => String(c.post_id) === String(props.postId)
    );
  } catch (e) {
    console.error("โหลดคอมเมนต์ล้มเหลว", e);
    error.value = "ไม่สามารถโหลดคอมเมนต์ได้";
  } finally {
    loading.value = false;
  }
};

// เรียกโหลดเมื่อกดเปิดครั้งแรก
const ensureLoaded = async () => {
  if (!hasLoaded.value) {
    await fetchComments();
    hasLoaded.value = true;
  }
};

const toggleOpen = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) await ensureLoaded();
};

// ให้ parent เรียกรีเฟรชได้ (เช่นหลังเพิ่มคอมเมนต์)
defineExpose({
  fetchComments: async () => {
    await fetchComments();
    hasLoaded.value = true;
  },
});

onMounted(async () => {
  // ถ้าเริ่มต้นเป็นเปิดอยู่ ให้โหลดเลย
  if (isOpen.value) await ensureLoaded();
});

// ถ้า postId เปลี่ยน ให้รีเซ็ตสถานะ
watch(
  () => props.postId,
  async () => {
    comments.value = [];
    error.value = "";
    loading.value = false;
    hasLoaded.value = false;
    if (isOpen.value) await ensureLoaded();
  }
);
</script>

<template>
  <div class="mt-4">
    <!-- ปุ่มเปิด/ปิดคอมเมนต์ -->
    <button
      type="button"
      @click="toggleOpen"
      class="text-sm font-medium text-purple-700 hover:text-purple-900"
    >
      <span v-if="!isOpen">
        ดูความคิดเห็น
        <span v-if="hasLoaded && comments.length">({{ comments.length }})</span>
      </span>
      <span v-else>ซ่อนความคิดเห็น</span>
    </button>

    <!-- เนื้อหาคอมเมนต์ แสดงเฉพาะตอนเปิด -->
    <div v-show="isOpen" class="mt-3">
      <div v-if="loading" class="text-sm text-gray-500">
        กำลังโหลดคอมเมนต์...
      </div>
      <div v-else-if="error" class="text-sm text-red-500">
        {{ error }}
      </div>

      <template v-else>
        <div
          v-for="c in comments"
          :key="c.comment_id"
          class="p-3 rounded-lg border bg-white/70 mb-3"
        >
          <div class="text-sm text-gray-600 mb-1">
            {{ c.user_name || ('ผู้ใช้ #' + c.user_id) }}
            <span class="text-xs text-gray-400">
              • {{ new Date(c.comment_timestamp).toLocaleString() }}
            </span>
          </div>
          <div class="text-gray-800 whitespace-pre-line">
            {{ c.comment_text }}
          </div>
          <div v-if="c.comment_image_path" class="mt-2">
            <img
              :src="getImageUrl(c.comment_image_path)"
              alt="comment image"
              class="max-h-56 rounded border object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <p v-if="comments.length === 0" class="text-gray-500 text-sm">
          ยังไม่มีความคิดเห็น
        </p>
      </template>
    </div>
  </div>
</template>
