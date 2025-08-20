<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { useCookie } from "#app";
import { decodeJwt } from "jose";

const props = defineProps({
  postId: { type: [Number, String], required: true },
});
const emit = defineEmits(["commentAdded"]);

const { $axios } = useNuxtApp();

const isOpen = ref(false);           
const commentText = ref("");
const file = ref(null);
const previewUrl = ref("");
const sending = ref(false);
const msg = ref("");

const token = useCookie("token").value;
const currentUserId = computed(() => {
  if (!token) return "";
  try {
    const decoded = decodeJwt(token);
    return decoded.user_id || "";
  } catch {
    return "";
  }
});

const openForm = () => {
  isOpen.value = true;
  msg.value = currentUserId.value ? "" : "กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น";
};

const onFileChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    file.value = null;
    previewUrl.value = "";
    return;
  }
  file.value = f;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(f);
};

const resetForm = () => {
  commentText.value = "";
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = "";
  file.value = null;
};

const closeForm = () => {
  resetForm();
  msg.value = "";
  isOpen.value = false;
};

const submitComment = async () => {
  msg.value = "";
  if (!currentUserId.value) {
    msg.value = "กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น";
    return;
  }
  if (!String(commentText.value).trim()) {
    msg.value = "กรุณากรอกข้อความคอมเมนต์";
    return;
  }

  sending.value = true;
  try {
    const fd = new FormData();
    fd.append("post_id", String(props.postId));
    fd.append("user_id", String(currentUserId.value));
    fd.append("comment_text", commentText.value);
    if (file.value) fd.append("comment_image", file.value);

    const res = await $axios.post("/comment", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 201) {
      msg.value = "ส่งคอมเมนต์แล้ว (รอผู้ดูแลอนุมัติ)";
      emit("commentAdded");
      closeForm(); 
    } else {
      msg.value = "ส่งคอมเมนต์ไม่สำเร็จ";
    }
  } catch (e) {
    console.error(e);
    msg.value = "เกิดข้อผิดพลาดในการส่งคอมเมนต์";
  } finally {
    sending.value = false;
  }
};

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});
</script>

<template>
  <div class="p-4 rounded-lg border bg-pink-50">
    <!-- ปุ่มเปิดฟอร์ม -->
    <button
      v-if="!isOpen"
      type="button"
      @click="openForm"
      class="w-full text-left px-3 py-2 rounded-lg border bg-white/90 hover:bg-white transition text-gray-600"
    >
      เขียนความคิดเห็น...
    </button>

    <!--  ฟอร์มคอมเมนต์ (โชว์เมื่อกดปุ่ม) -->
    <div v-else>
      <div class="font-medium text-purple-800 mb-2">แสดงความคิดเห็น</div>

      <textarea
        v-model="commentText"
        rows="3"
        placeholder="พิมพ์คอมเมนต์ของคุณ..."
        class="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div class="mt-3">
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-purple-700 hover:file:bg-pink-200"
        />
        <div v-if="previewUrl" class="mt-2">
          <img :src="previewUrl" alt="preview" class="max-h-40 rounded border object-contain" />
        </div>
      </div>

      <div class="mt-3 flex items-center gap-3">
        <button
          type="button"
          @click="submitComment"
          :disabled="sending"
          class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow hover:opacity-95 disabled:opacity-60"
        >
          {{ sending ? "กำลังส่ง..." : "ส่งคอมเมนต์" }}
        </button>
        <button
          type="button"
          @click="closeForm"
          :disabled="sending"
          class="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-60"
        >
          ยกเลิก
        </button>
      </div>
    </div>

    <p
      v-if="msg"
      class="text-sm mt-2"
      :class="msg.includes('รอผู้ดูแล') ? 'text-green-600' : 'text-red-500'"
    >
      {{ msg }}
    </p>
  </div>
</template>
