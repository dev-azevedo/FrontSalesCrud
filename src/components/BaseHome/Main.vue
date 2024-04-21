<template>
  <section class="container mt-3">
    <div
      class="w-100 mt-5 text-start d-flex justify-content-between align-items-center"
    >
      <h1 class="w-50">{{ props.title }}</h1>

      <div class="w-50 d-flex align-items-center justify-content-end gap-1">
        <input
          type="text"
          class="form-control"
          :placeholder="placeholder"
          v-model="search"
          @keyup.enter="searchItem(search)"
        />
        <button class="btn btn-primary">
          <i class="bi bi-search" @click="searchItem(search)"></i>
        </button>
      </div>
    </div>

    <hr class="border-bottom border-secondary w-100" />
    <div class="d-flex justify-content-end w-100">
      <button class="btn btn-primary mt-5" @click="newItem()">
        <i class="bi bi-plus-square me-2"></i>
        Adicionar
      </button>
    </div>

    <table class="table table-striped mt-2 max-w-auto overflow-auto">
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

const props = defineProps(["title", "placeholder", "newItem", "searchItem"]);
const search = ref("");
</script>

<style scoped></style>
