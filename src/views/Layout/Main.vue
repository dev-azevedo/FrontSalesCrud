<template>
  <section>
    <Menu></Menu>
    <div class="mb-5">
      <router-view />
    </div>
  </section>
</template>

<script setup>
import Menu from "@/components/Menu/Main.vue";
</script>

<style lang="scss" scoped></style>
