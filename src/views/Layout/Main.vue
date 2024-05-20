<template>
  <section class="flex h-screen">
    <Menu class="w-1/6"></Menu>
    <div class="w-5/6">
      <router-view />
    </div>
  </section>
</template>

<script setup>
import Menu from "@/components/Menu/Main.vue";
</script>

<style lang="scss" scoped></style>
