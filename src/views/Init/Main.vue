<template>
  <section
    id="mobile-login"
    class="lg:hidden flex flex-col justify-center items-center w-full h-screen"
  >
    <div v-if="!styleInit" class="flex justify-center items-center w-full">
      <SignIn @styleInit="styleInit = $event" />
    </div>

    <div v-else class="flex justify-center items-center w-full h-screen">
      <SignUp @styleInit="styleInit = $event" />
    </div>
  </section>

  <section
    class="hidden lg:flex trasition-all ease duration-300 h-screen"
    :style="{ width: `${widthReactive}%` }"
    :class="{ 'lg:-translate-x-1/3 -translate-x-2/4': styleInit }"
  >
    <div class="flex justify-center items-center w-1/3 flex-shrink-0 p-20">
      <SignIn v-if="!styleInit" @styleInit="styleInit = $event" />
    </div>

    <div
      class="flex flex-col justify-between bg-emerald-400 w-1/3 lg:flex-shrink-0 p-20"
    >
      <div class="flex justify-center">
        <span class="text-xl text-white font-normal"
          >Ganhe acesso a ofertas exclusivas e novidades.</span
        >
      </div>
      <img src="@/assets/mobile-login.png" alt="logo" class="" />
      <div class="flex justify-center">
        <span class="text-xl text-white font-normal"
          >Aproveite ofertas exclusivas e muito mais!</span
        >
      </div>
    </div>

    <div class="flex justify-center items-center w-1/3 flex-shrink-0 p-20">
      <SignUp v-if="styleInit" @styleInit="styleInit = $event" />
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import SignIn from "./SignIn/Main.vue";
import SignUp from "./SignUp/Main.vue";

const styleInit = ref(false);

const widthReactive = ref(150);

onMounted(() => {
  document.body.style.overflow = "hidden";
  window.innerWidth > 1024
    ? (widthReactive.value = 150)
    : (widthReactive.value = 0);
});

watch(window.innerWidth, () => {
  window.innerWidth > 1024
    ? (widthReactive.value = 150)
    : (widthReactive.value = 0);
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
#desktop-login {
  height: 100vh;
}

.baseDeskTop {
  width: 150%; /* Certifique-se de que a largura total seja suficiente para conter os elementos */
}
</style>
