<template>
  <section class="flex h-screen">
    <Menu class="w-2/12"></Menu>
    <div class="w-10/12 bg-slate-100 overflow-auto pb-10">
      <router-view />
    </div>
  </section>
</template>

<script setup>
import Menu from "@/components/Menu/Main.vue";
</script>

<style lang="scss" scoped></style>
