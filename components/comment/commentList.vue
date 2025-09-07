<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useCookie } from "#app";

const props = defineProps<{ postId: number | string }>();
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();

const tokenCookie = useCookie<string | null>("token");

const comments = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

// ================== จัดการ current user ==================
const currentUser = ref<{ user_id?: number | string } | null>(null);

// ดึง userId จาก token (ถ้าไม่มีหรือแปลงไม่ได้คืนค่า null)
const getUserIdFromToken = (jwt?: string | null): string | null => {
  if (!jwt) return null;
  try {
    const payload = JSON.parse(atob(jwt.split(".")[1] || ""));
    // ปรับชื่อ field ให้ตรง backend (จากไฟล์หลังบ้านใช้ decoded.userId)
    return payload?.userId != null ? String(payload.userId) : null;
  } catch {
    return null;
  }
};
// รีเฟรช currentUser จาก token
const refreshCurrentUser = () => {
  currentUser.value = null;
  const userId = getUserIdFromToken(tokenCookie.value || null);
  if (userId) currentUser.value = { user_id: userId };
};
// ตรวจสอบว่าเป็นเจ้าของคอมเมนต์หรือไม่
const isOwner = (c: any) =>
  currentUser.value?.user_id != null &&
  String(currentUser.value.user_id) === String(c.user_id);
// =======================================================================

// แก้ไขข้อความ/รูป
const editingId = ref<number | null>(null);
const editingText = ref("");

const editImageFile = ref<File | null>(null);
const editPreviewUrl = ref<string>("");
const editImageName = ref<string>("");

const getFileBase = () =>
  config?.public?.fileBase ||
  (config?.public?.apiBase || "").replace(/\/api\/?$/, "") ||
  "";

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
    const res = await $axios.get("/comment", {
      params: { post_id: props.postId },
    });
    const rows: any[] = Array.isArray(res.data?.data) ? res.data.data : [];
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

// รวม logic ลบรูป/พรีวิวไว้ที่เดียว
const removeEditImage = () => {
  if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);
  editPreviewUrl.value = "";
  editImageFile.value = null;
  editImageName.value = "";
  const input = editingId.value
    ? (document.getElementById(`edit-file-${editingId.value}`) as HTMLInputElement | null)
    : null;
  if (input) input.value = "";
};

const startEdit = (c: any) => {
  // กันไว้ชั้นหน้า: ไม่ใช่เจ้าของไม่ให้เริ่มแก้ไข
  if (!isOwner(c)) return;
  editingId.value = c.comment_id;
  editingText.value = c.comment_text ?? "";
  removeEditImage();
};

const cancelEdit = () => {
  editingId.value = null;
  editingText.value = "";
  removeEditImage();
};

// จัดการเลือกรูปใหม่ตอนแก้ไข
const onEditImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] || null;

  if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);

  if (file) {
    editImageFile.value = file;
    editImageName.value = file.name;
    editPreviewUrl.value = URL.createObjectURL(file);
  } else {
    removeEditImage();
  }
};

// บันทึกการแก้ไข (ข้อความ + รูปใหม่ถ้ามี)
const saveEdit = async (c: any) => {
  if (!isOwner(c)) return;
  try {
    const fd = new FormData();
    fd.append("comment_text", (editingText.value || "").trim());
    if (editImageFile.value) fd.append("comment_image", editImageFile.value);

    await $axios.put(`/comment/${c.comment_id}`, fd, {
      headers: {
        Authorization: tokenCookie.value ? `Bearer ${tokenCookie.value}` : "",
      },
    });

    await fetchComments();
    cancelEdit();
  } catch (e) {
    console.error("บันทึกคอมเมนต์ไม่สำเร็จ", e);
    alert("บันทึกไม่สำเร็จ");
  }
};

// ลบรูปเดิมออกจากคอมเมนต์
const removeImage = async (c: any) => {
  if (!isOwner(c)) return;
  try {
    const fd = new FormData();
    fd.append("comment_text", c.comment_text ?? "");
    fd.append("remove_image", "1");

    await $axios.put(`/comment/${c.comment_id}`, fd, {
      headers: {
        Authorization: tokenCookie.value ? `Bearer ${tokenCookie.value}` : "",
      },
    });

    await fetchComments();
  } catch (e) {
    console.error("ลบภาพไม่สำเร็จ", e);
    alert("ลบภาพไม่สำเร็จ");
  }
};

onMounted(() => {
  refreshCurrentUser();
  fetchComments();
});
watch(() => props.postId, fetchComments);
// อัปเดต user เมื่อ token เปลี่ยน
watch(tokenCookie, refreshCurrentUser);

// กันลืม revoke ตอนออกจากหน้า
onUnmounted(() => {
  if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);
});
</script>

<template>
  <div class="bg-white rounded-xl p-4">
    <h3 class="font-semibold mb-3">ความคิดเห็น</h3>

    <div v-if="loading" class="text-gray-500">กำลังโหลด…</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else-if="comments.length === 0" class="text-gray-400">
      ยังไม่มีคอมเมนต์สำหรับโพสต์นี้
    </div>

    <ul v-else class="space-y-4">
      <li v-for="c in comments" :key="c.comment_id" class="flex gap-3">
        <div
          class="shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold"
        >
          {{ (c.user_name || "U").slice(0, 1).toUpperCase() }}
        </div>

        <div class="flex-1 relative">
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ c.user_name || "ไม่ทราบชื่อ" }}</span>
            <span class="text-xs text-gray-500">
              {{ new Date(c.comment_timestamp).toLocaleString() }}
            </span>

            <div class="ml-auto flex gap-2">
              <!-- แก้ไข: แสดงเฉพาะเจ้าของ -->
              <button
                v-if="isOwner(c) && editingId !== c.comment_id"
                class="rounded bg-purple-300 text-gray-800 hover:bg-purple-400 cursor-pointer p-1"
                @click="startEdit(c)"
                title="แก้ไข"
              >
                <!-- ไอคอนดินสอ -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-1.414.586H5v-4.364a2 2 0 01.586-1.414l8.486-8.486a2 2 0 012.828 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7l-1.5-1.5" />
                </svg>
              </button>

              <button
                v-if="isOwner(c) && editingId === c.comment_id"
                class="text-green-600 hover:bg-green-100 rounded p-1 cursor-pointer"
                @click="saveEdit(c)"
                title="บันทึก"
              >
                <!-- ไอคอนติ๊กถูก -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button
                v-if="isOwner(c) && editingId === c.comment_id"
                class="text-gray-500 hover:bg-gray-200 rounded p-1 cursor-pointer"
                @click="cancelEdit"
                title="ยกเลิก"
              >
                <!-- ไอคอนกากบาท -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- ลบคอมเมนต์: แสดงเฉพาะเจ้าของ -->
              <CommonButtonDeletebutton
                v-if="isOwner(c)"
                type="comment"
                path="comment"
                :params="c.comment_id"
                @deleted="fetchComments"
              />
            </div>
          </div>

          <!-- โหมดแก้ไข (เข้าได้เฉพาะเจ้าของอยู่แล้วจากปุ่มด้านบน) -->
          <div v-if="editingId === c.comment_id">
            <textarea
              v-model="editingText"
              class="w-full border rounded p-2 mt-2"
              rows="2"
            />

            <!-- ปุ่มอัปโหลดภาพแบบไอคอนกล้อง -->
            <div class="mt-2 flex items-center gap-2">
              <input
                :id="'edit-file-' + c.comment_id"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onEditImageChange($event)"
              />
              <label
                :for="'edit-file-' + c.comment_id"
                class="cursor-pointer"
                title="อัปโหลดรูปภาพ"
              >
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

              <span v-if="editImageName" class="text-xs text-gray-500 truncate max-w-[160px]">
                {{ editImageName }}
              </span>
            </div>

            <!-- รูป preview + ปุ่มลบแบบกากบาทมุมขวาบน -->
            <div v-if="editPreviewUrl" class="mt-2 relative inline-block">
              <img
                :src="editPreviewUrl"
                alt="preview"
                class="max-h-40 rounded border object-contain shadow-sm"
              />
              <button
                type="button"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600"
                @click="removeEditImage"
                title="ลบภาพ"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- โหมดปกติ -->
          <p v-else class="text-gray-800 whitespace-pre-line">
            {{ c.comment_text }}
          </p>

          <!-- รูปเดิมของคอมเมนต์ + ปุ่มลบ (เฉพาะเจ้าของ) -->
          <div v-if="c.comment_image_path" class="mt-2 relative inline-block">
            <img
              :src="getImageUrl(c.comment_image_path)"
              alt="comment image"
              class="max-h-56 rounded border object-contain shadow-sm"
              loading="lazy"
            />
            <button
              v-if="isOwner(c)"
              type="button"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600 cursor-pointer"
              @click="removeImage(c)"
              title="ลบภาพ"
            >
              ✕
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

