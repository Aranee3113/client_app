<script setup>
import { Shirt, Search } from "lucide-vue-next";
</script>
<template>
  <nav class="bg-[#fdfdfd] shadow-md shadow-gray-500">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-20 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            -->
            <svg
              class="block size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <svg
              class="hidden size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start space-x-6"
        >
          <div class="flex items-center space-x-6">
            <a
              href="#"
              class="rounded-md px-3 py-2 text-3xl font-medium text-[#ff5a5f] hover:text-black flex items-center space-x-2"
              aria-current="page"
            >
              <Shirt />
              <span>Mai Khmer</span>
            </a>
            <NuxtLink
              to="/editor/home"
              class="rounded-md px-3 py-2 text-sm font-medium text-black hover:text-[#ff5a5f]"
            >
              หน้าหลัก
            </NuxtLink>

            <NuxtLink
              to="/editor/managetextile"
              class="rounded-md px-3 py-2 text-sm font-medium text-black hover:text-[#ff5a5f]"
              >ชุมชนผ้าทอ
            </NuxtLink>
            <NuxtLink
              to="/editor/managepost"
              class="rounded-md px-3 py-2 text-sm font-medium text-black hover:text-[#ff5a5f]"
              >จัดการโพสต์
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="text"
              placeholder="ค้นหา..."
              class="w-full max-w-xs sm:w-48 rounded-md border border-gray-300 bg-white py-1.5 px-3 text-sm text-gray-900 shadow-md shadow-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-sm"
            />
            <button
              type="button"
              class="rounded-md bg-[#ff5a5f] shadow-md shadow-gray-500 px-4 py-1.5 text-sm font-medium text-black hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Search />
            </button>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="relative rounded-full bg-[#fefefe] shadow-md shadow-gray-500 p-1 text-[#ff5a5f] hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <svg
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
              </button>
            </div>

            <div
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >แก้ไขโปรไฟล์</a
              >
          
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-3"
                >ออกจากระบบ</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          href="#"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
          >Dashboard</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Team</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Projects</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Calendar</a
        >
      </div>
    </div>
  </nav>
</template>
