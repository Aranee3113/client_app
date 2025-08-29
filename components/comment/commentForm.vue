<script setup lang="ts">
import { ref, computed } from "vue";
import { decodeJwt } from "jose";

const props = defineProps<{ postId: number | string }>();
const emit = defineEmits<{ (e: "submitted"): void }>();

const { $axios } = useNuxtApp();

const commentText = ref("");
const file = ref<File | null>(null);
const previewUrl = ref("");
const sending = ref(false);
const message = ref("");

const token = useCookie("token").value;
//
const decoded = decodeJwt(token);

const currentUserId = decoded?.userId;
console.log(currentUserId);

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const f = input.files?.[0] || null;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  file.value = f;
  previewUrl.value = f ? URL.createObjectURL(f) : "";
};

const resetForm = () => {
  commentText.value = "";
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = "";
  file.value = null;
};

const submitComment = async () => {
  message.value = "";
  if (!currentUserId) {
    message.value = "กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น";
    return;
  }
  if (!commentText.value.trim()) {
    message.value = "กรุณาพิมพ์ข้อความความคิดเห็น";
    return;
  }

  const fd = new FormData();
  fd.append("post_id", String(props.postId));
  fd.append("user_id", String(currentUserId));
  fd.append("comment_text", commentText.value.trim());
  if (file.value) fd.append("comment_image", file.value);

  try {
    sending.value = true;
    await $axios.post("/comment", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    message.value = "ส่งความคิดเห็นแล้ว (รอตรวจ)";
    emit("submitted");
    resetForm();
  } catch (err: any) {
    message.value = err?.response?.data?.message || "ส่งความคิดเห็นไม่สำเร็จ";
  } finally {
    sending.value = false;
  }
};
</script>

<template>
  <div class="p-4 bg-white rounded-xl border">
    <h3 class="font-semibold mb-2">แสดงความคิดเห็น</h3>

    <textarea
      v-model="commentText"
      class="w-full border rounded-lg p-3 mb-3"
      rows="3"
      placeholder="พิมพ์ความคิดเห็นของคุณ…"
    />

    <div class="flex items-center gap-3 mb-3">
      <input type="file" accept="image/*" @change="onFileChange" />
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="w-16 h-16 object-cover rounded border"
        alt="preview"
      />
    </div>

    <div class="flex items-center justify-between">
      <span
        class="text-sm"
        :class="message.includes('รอตรวจ') ? 'text-green-600' : 'text-red-600'"
      >
        {{ message }}
      </span>
      <button
        class="px-4 py-2 rounded-lg text-white bg-purple-600 disabled:opacity-60"
        :disabled="sending"
        @click="submitComment"
      >
        {{ sending ? "กำลังส่ง…" : "ส่งความคิดเห็น" }}
      </button>
    </div>
  </div>
</template>
