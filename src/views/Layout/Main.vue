<template>
  <section>
    <Menu />

    <div>
      <router-view />
    </div>

    <data>Footer</data>
  </section>
</template>

<script setup>
import Menu from "@/components/Menu/Main.vue";
</script>

<style lang="scss" scoped></style>
