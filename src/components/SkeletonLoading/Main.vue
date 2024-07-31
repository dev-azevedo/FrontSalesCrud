<template>
  <section>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5"
    >
      <div
        v-for="card in 12"
        :key="card"
        class="rounded-md bg-white flex flex-col justify-between shadow-xl animate-pulse"
      >
        <div
          class="w-full max-h-56 truncate flex items-center justify-center rounded-t-md"
        >
          <div
            class="flex justify-center items-center w-full bg-gray-300"
            :class="`${props.heightCard}`"
          >
            <i
              v-if="props.heightCard == 'h-56'"
              class="bi bi-arrow-clockwise text-6xl text-gray-100 m-16 opacity-75"
            ></i>
          </div>
        </div>
        <div class="grid grid-cols-3 mb-5 divide-x divide-slate-300">
          <button type="button" class="bg-slate-100 p-4"></button>
          <button type="button" class="bg-slate-100 p-4"></button>
          <button type="button" class="bg-slate-100 p-4"></button>
        </div>

        <div
          class="px-5"
          v-for="text in props.heightCard == 'h-56' ? 1 : 3"
          :key="text"
        >
          <div class="truncate flex">
            <span class="text-lg w-56 p-2 bg-slate-300 rounded-sm"></span>
          </div>

          <div class="mb-3 items-center flex">
            <span class="text-sm w-32 mt-2 p-2 bg-slate-300 rounded-sm"> </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["heightCard"]);
</script>
