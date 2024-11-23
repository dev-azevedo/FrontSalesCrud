<template>
  <section class="flex flex-col lg:flex-row h-screen">
    <Menu class="w-full lg:w-2/12"></Menu>
    <div id="base" class="w-full lg:w-10/12 bg-slate-100 overflow-auto pb-10">
      <router-view />
    </div>
  </section>
</template>

<script setup>
import Menu from "@/components/Menu/Main.vue";
import { computed } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { salesCrudStore } from "@/store/SalesCrudStore.js";

const route = useRoute();
const fullPath = computed(() => route.fullPath);
const store = salesCrudStore();

watch(fullPath, () => {
  store.resetScroll();
});
</script>

<style lang="scss" scoped></style>
