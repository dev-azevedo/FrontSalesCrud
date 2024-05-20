<template>
  <section class="container mt-3">
    <div class="w-full mt-5 text-start flex justify-between items-center px-10">
      <h1 class="w-1/2 text-2xl">
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
        <button class="btn btn-primary bg-red-600 p-2 rounded-md">
          <i class="bi bi-search" @click="searchItem(search)"></i>
        </button>
      </div>
    </div>

    <hr class="border-b mt-5 w-fill" />
    <div class="d-flex justify-content-end w-100">
      <button class="btn btn-primary mt-5" @click="newItem()">
        <i class="bi bi-plus-square me-2"></i>
        Adicionar
      </button>
    </div>

    <table class="table mt-2 max-w-auto overflow-auto">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
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
