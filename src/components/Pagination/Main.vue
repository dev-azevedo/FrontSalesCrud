<template>
  <div class="w-100 d-flex justify-content-between align-items-center">
    <nav>
      <ul class="pagination">
        <li
          v-show="props.pageNumber > 1"
          class="page-item btn shadow-lg me-1"
          @click="firstPage()"
        >
          <i class="bi bi-chevron-double-left"></i>
        </li>
        <li
          v-show="props.pageNumber > 1"
          class="page-item btn shadow-lg me-1"
          @click="backPage()"
        >
          <i class="bi bi-chevron-left"></i>
        </li>

        <li
          v-show="props.pageNumber > 1"
          class="page-item btn shadow-lg me-1"
          @click="backPage()"
        >
          {{ props.pageNumber - 1 }}
        </li>

        <li class="page-item btn shadow-lg me-1 text-warning fw-bold">
          {{ props.pageNumber }}
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="page-item btn shadow-lg me-1"
          @click="nextPage()"
        >
          {{ props.pageNumber + 1 }}
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="page-item btn shadow-lg me-1"
          @click="nextPage()"
        >
          <i class="bi bi-chevron-right"></i>
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="page-item btn shadow-lg me-1"
          @click="lastPage()"
        >
          <i class="bi bi-chevron-double-right"></i>
        </li>
      </ul>
    </nav>

    <div class="">Total de items: {{ props.totalItems }}</div>

    <select
      class="form-control shadow-none"
      style="width: 60px !important"
      v-model="pageSize"
      @change="changePageSize()"
    >
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const pageSize = ref(10);

const props = defineProps(["pageNumber", "totalPages", "totalItems"]);
const emits = defineEmits(["changePageNumber", "changePageSize"]);

const firstPage = () => {
  emits("changePageNumber", 1);
};

const nextPage = () => {
  let page = props.pageNumber;

  page = parseInt(page + 1);
  emits("changePageNumber", page);
};

const lastPage = () => {
  emits("changePageNumber", props.totalPages);
};

const backPage = () => {
  let page = props.pageNumber;
  page = parseInt(page - 1);
  emits("changePageNumber", page);
};

const changePageSize = () => {
  emits("changePageSize", pageSize.value);
};
</script>

<style lang="scss" scoped></style>
