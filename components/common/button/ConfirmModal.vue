<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "ยืนยันการกระทำ",
  },
  message: {
    type: String,
    default: "คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?",
  },
  confirmText: {
    type: String,
    default: "ยืนยัน",
  },
  cancelText: {
    type: String,
    default: "ยกเลิก",
  },
});

defineEmits(["confirm", "cancel"]);
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      @click.self="$emit('cancel')"
    ></div>
  </Transition>

  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform scale-90"
    enter-to-class="opacity-100 transform scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform scale-100"
    leave-to-class="opacity-0 transform scale-90"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 m-auto h-fit max-w-md rounded-2xl bg-white p-6 shadow-xl"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-8 w-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h3 class="mb-2 text-center text-2xl font-bold text-gray-800">
        {{ title }}
      </h3>

      <p class="mb-6 text-center text-gray-600">
        {{ message }}
      </p>

      <div class="grid grid-cols-2 gap-4">
        <button
          @click="$emit('cancel')"
          class="rounded-lg bg-gray-100 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-200"
        >
          {{ cancelText }}
        </button>
        <button
          @click="$emit('confirm')"
          class="rounded-lg bg-red-600 px-6 py-2.5 font-medium text-white shadow-md shadow-red-500/30 hover:bg-red-700"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </Transition>
</template>