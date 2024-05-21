<template>
  <div class="w-100 flex justify-between items-center px-10 mt-5">
    <nav>
      <ul class="flex">
        <li
          v-show="props.pageNumber > 1"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="firstPage()"
        >
          <i class="bi bi-chevron-double-left"></i>
        </li>
        <li
          v-show="props.pageNumber > 1"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="backPage()"
        >
          <i class="bi bi-chevron-left"></i>
        </li>

        <li
          v-show="props.pageNumber > 1"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="backPage()"
        >
          {{ props.pageNumber - 1 }}
        </li>

        <li
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer text-emerald-400 font-bold"
        >
          {{ props.pageNumber }}
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="nextPage()"
        >
          {{ props.pageNumber + 1 }}
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="nextPage()"
        >
          <i class="bi bi-chevron-right"></i>
        </li>

        <li
          v-show="props.pageNumber < props.totalPages"
          class="p-2 bg-white rounded-md shadow-lg me-1 cursor-pointer"
          @click="lastPage()"
        >
          <i class="bi bi-chevron-double-right"></i>
        </li>
      </ul>
    </nav>

    <div class="">Total de items: {{ props.totalItems }}</div>

    <select
      class="bg-white rounded-md p-1 cursor-pointer"
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

const pageSize = ref(null);

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
