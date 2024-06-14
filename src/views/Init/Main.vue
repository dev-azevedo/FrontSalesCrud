<template>
  <section
    class="base trasition-all ease duration-300"
    :class="styleInit"
  >
    <div
      class="flex justify-center items-center w-1/3 flex-shrink-0"
    >
      <SignIn @styleInit="styleInit = $event" />
    </div>
    <div class="bg-emerald-400 w-1/3 flex-shrink-0 p-20">
      <div class="flex justify-center"><span class="text-xl text-white font-normal">Ganhe acesso a ofertas exclusivas e novidades.</span></div>
      <img src="@/assets/mobile-login.png" alt="logo" class="" />
      <div class="flex justify-center"><span class="text-xl text-white font-normal">Aproveite ofertas exclusivas e muito mais!</span></div>
    </div>
    <div class="flex justify-center items-center  w-1/3  flex-shrink-0">

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
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>
  
<style scoped>
section {
  height: 100vh;
}
.base {
  display: flex;
  width: 150%; /* Certifique-se de que a largura total seja suficiente para conter os elementos */
}
</style>