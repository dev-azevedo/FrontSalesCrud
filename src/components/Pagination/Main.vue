<template>
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
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["pageNumber", "totalPages"]);
const emits = defineEmits(["changePage"]);

const firstPage = () => {
  emits("changePage", 1);
};

const nextPage = () => {
  let page = props.pageNumber;

  page = parseInt(page + 1);
  emits("changePage", page);
};

const lastPage = () => {
  emits("changePage", props.totalPages);
};

const backPage = () => {
  let page = props.pageNumber;
  page = parseInt(page - 1);
  emits("changePage", page);
};
</script>

<style lang="scss" scoped></style>
