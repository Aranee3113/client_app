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

const decoded = decodeJwt(token);

const currentUserId = decoded?.userId;
console.log(currentUserId);

// จัดการการเปลี่ยนแปลงไฟล์
const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const f = input.files?.[0] || null;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  file.value = f;
  previewUrl.value = f ? URL.createObjectURL(f) : "";
};
// ลบรูปที่เลือก
const removeImage = () => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = "";
  file.value = null;
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
  if (!commentText.value.trim() && !file.value) {
  message.value = "กรุณาพิมพ์ข้อความหรือเลือกรูปภาพก่อนส่ง";
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
  <div class="p-4 bg-white">
    <h3 class="font-semibold mb-2">แสดงความคิดเห็น</h3>

    <textarea
      v-model="commentText"
      class="w-full border border-gray-400 rounded-lg p-3 mb-3"
      rows="3"
      placeholder="พิมพ์ความคิดเห็นของคุณ…"
    />

    <div class="flex items-center gap-3 mb-3">
      <label
        class="cursor-pointer flex items-center gap-2"
        title="อัปโหลดรูปภาพ"
      >
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
        <div
          class="w-10 h-10 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition shadow-sm ring-1 ring-gray-300/60"
        >
          <!-- ไอคอนกล้อง -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </div>
      </label>

      <div v-if="previewUrl" class="relative">
        <img
          :src="previewUrl"
          class="w-10 h-10 object-cover shadow-sm rounded"
          alt="preview"
        />
        <!-- ปุ่มลบ -->
        <button
          type="button"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600"
          @click="removeImage"
          title="ลบภาพ"
        >
          ✕
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <button
        class="px-4 py-2 rounded-lg text-gray-800 bg-purple-200 disabled:opacity-60 cursor-pointer"
        :disabled="sending"
        @click="submitComment"
      >
        {{ sending ? "กำลังส่ง…" : "ส่งความคิดเห็น" }}
      </button>
    </div>
  </div>
</template>
