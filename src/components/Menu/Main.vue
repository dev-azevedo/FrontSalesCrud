<template>
  <nav class="bg-slate-900 flex flex-col items-center justify-between">
    <div class="flex flex-col items-center w-full">
      <router-link
        to="/"
        class="text-slate-900 spicy-rice-regular text-6xl p-20 w-full flex items-center justify-center bg-emerald-400"
        >SalesCrud</router-link
      >

      <ul class="text-white mt-10 text-lg w-full px-2">
        <li class="">
          <span class="text-white pl-5"> Olá, {{userFullName}} </span>
        </li>
        <li class="pt-5 border-b border-slate-700"></li>
        <li class="pt-5">
          <router-link
            to="/"
            exactActiveClass="text-emerald-400 font-bold"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-columns-gap"></i> Dashboard</router-link
          >
        </li>
        <li class="pt-5">
          <router-link
            to="/vendas"
            exactActiveClass="text-emerald-400 font-bold"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-basket"></i> Vendas</router-link
          >
        </li>
        <li class="pt-5">
          <router-link
            to="/clientes"
            exactActiveClass="text-emerald-600 font-bold"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-people"></i> Clientes</router-link
          >
        </li>
        <li class="pt-5">
          <router-link
            to="/produtos"
            exactActiveClass="text-emerald-600 font-bold"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-box-seam"></i> Produtos</router-link
          >
        </li>
        <li class="pt-5 border-b border-slate-700"></li>
        <li class="pt-5">
          <router-link
            to="/perfil"
            exactActiveClass="text-emerald-600 font-bold"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-person-circle"></i> Perfil</router-link
          >
        </li>
        <li class="pt-5">
          <button
            type="button"
            @click="logout()"
            class="pl-5 hover:opacity-50 transition ease duration-300"
            ><i class="bi bi-door-open-fill"></i> Sair</button
          >
        </li>
      </ul>
    </div>
    <div class="flex-col items-center justify-center gap-2 my-10">
      <span class="text-xl text-white"> Jhonatan Azevedo </span>
      <div class="text-center">
        <a
          href="https://www.linkedin.com/in/dev-azevedo/"
          class="text-light fs-2"
          target="_blank"
        >
          <i
            class="bi bi-linkedin mx-2 text-white text-lg hover:text-emerald-400 transition ease duration-300"
          ></i
        ></a>
        <a
          href="https://github.com/dev-azevedo"
          class="text-light fs-2"
          target="_blank"
        >
          <i
            class="bi bi-github text-white text-lg hover:text-emerald-400 transition ease duration-300"
          ></i
        ></a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { authUser } from "@/store/authStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const useAuthStore = authUser();
const router = useRouter();
const userFullName = computed(() => useAuthStore.getUser.fullName);

const logout = () => {
  useAuthStore.logout(); 
  router.push("/inicio");
}
</script>

<style scoped>
.link-redes:hover {
  color: orange;
  transition: 0.3s ease;
}

.text-orange {
  color: orange !important;
}
</style>
