<template>
  <router-view />
</template>

<script setup>
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted } from "vue";

onMounted(() => {
  AOS.init();
});
</script>

<style>
/* slate-900 */
/* amber-500 */
/* emerald-400 */
/* amber-200 */

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box !important;
}

html {
  scroll-behavior: smooth;
}

button:hover {
  opacity: 0.5 !important;
  transition: all ease 0.3s;
}

button:disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

.spicy-rice-regular {
  font-family: "Spicy Rice", serif;
  font-weight: 400;
  font-style: normal;
}
</style>
