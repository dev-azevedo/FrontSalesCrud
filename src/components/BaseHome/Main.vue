<template>
  <section class="container mt-3">
    <div class="w-full mt-5 text-start flex justify-between items-center px-10">
      <h1 class="w-1/2 text-2xl font-semibold text-slate-900">
        <i :class="['bi', props.icon]"></i> {{ props.title }}
      </h1>

      <div class="w-1/2 flex items-center justify-end gap-1">
        <input
          type="text"
          class="border w-full p-2 rounded-md"
          :placeholder="placeholder"
          v-model="search"
          @keyup.enter="searchItem(search)"
        />
        <button
          class="bg-emerald-400 p-2 rounded-md text-white hover:opacity-50 ease duration-300"
        >
          <i class="bi bi-search" @click="searchItem(search)"></i>
        </button>

        <button
          class="bg-slate-900 text-white p-2 rounded-md hover:opacity-50 ease duration-300"
          @click="newItem()"
        >
          <i class="bi bi-plus-square"></i>
        </button>
      </div>
    </div>

    <hr class="border-b mt-5 w-fill" />

    <div class="px-10 flex-col justify-center mt-10">
      <table>
        <thead>
          <slot name="thead"></slot>
        </thead>
        <tbody class="bg-white">
          <slot name="tbody"></slot>
        </tbody>
      </table>

      <slot name="lista"></slot>
    </div>
  </section>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps([
  "title",
  "placeholder",
  "newItem",
  "searchItem",
  "icon",
]);
const search = ref("");
</script>

<style scoped></style>
