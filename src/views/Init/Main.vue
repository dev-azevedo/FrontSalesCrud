<template>
  <section
    id="mobile-login"
    class="lg:hidden trasition-all ease duration-300 flex flex-col justify-center items-center bg-emerald-50"
    :class="{ '-translate-y-1/2': styleInit }"
  >
    <div class="flex justify-center items-center w-full h-screen">
      <SignIn @styleInit="styleInit = $event" />
    </div>

    <div class="flex justify-center items-center w-full h-screen">
      <SignUp @styleInit="styleInit = $event" />
    </div>
  </section>

  <section
    id="desktop-login"
    class="hidden lg:block base trasition-all ease duration-300"
    :class="{ 'lg:-translate-x-1/3 -translate-x-2/4': styleInit }"
  >
    <div class="flex justify-center items-center w-1/3 flex-shrink-0 p-20">
      <SignIn @styleInit="styleInit = $event" />
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
      <SignUp @styleInit="styleInit = $event" />
    </div>
  </section>
</template>
  
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import SignIn from "./SignIn/Main.vue";
import SignUp from "./SignUp/Main.vue";

const styleInit = ref("");

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>
  
<style scoped>
#desktop-login {
  height: 100vh;
}

.base {
  display: flex;
  width: 150%; /* Certifique-se de que a largura total seja suficiente para conter os elementos */
}
</style>