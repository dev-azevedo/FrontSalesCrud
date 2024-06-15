<template>
  <nav class="bg-slate-900 flex flex-col items-center justify-between">
    <div class="flex flex-col items-center w-full h-full">
      <div
        class="bg-emerald-400 w-full h-16 lg:h-48 flex  justify-between lg:justify-center items-center px-10 "
      >
        <router-link
          @click="showMenuMobile = false"
          to="/"
          class="text-slate-900 spicy-rice-regular text-4xl 2xl:text-6xl lg:w-full flex items-center justify-center"
          >SalesCrud</router-link
        >

        <button class="lg:hidden" @click="showMenuMobile = !showMenuMobile">
          <i class="bi bi-list text-2xl"></i>
        </button>
      </div>

      <div
        class="lg:flex flex-col items-center justify-between w-full h-full"
        :class="{ hidden: !showMenuMobile }"
      >
        <ul class="text-white mt-10 text-lg w-full px-2">
          <li class="" v-show="userFullName">
            <span class="text-white pl-5"> Olá, {{ userFullName }} </span>
          </li>
          <li v-show="userFullName" class="pt-5 border-b border-slate-700"></li>
          <li class="pt-5">
            <router-link
              @click="showMenuMobile = false"
              to="/"
              exactActiveClass="text-emerald-400 font-bold"
              class="pl-5 hover:opacity-50 transition ease duration-300"
              ><i class="bi bi-columns-gap"></i> Dashboard</router-link
            >
          </li>
          <li class="pt-5">
            <router-link
              @click="showMenuMobile = false"
              to="/vendas"
              exactActiveClass="text-emerald-400 font-bold"
              class="pl-5 hover:opacity-50 transition ease duration-300"
              ><i class="bi bi-basket"></i> Vendas</router-link
            >
          </li>
          <li class="pt-5">
            <router-link
              @click="showMenuMobile = false"
              to="/clientes"
              exactActiveClass="text-emerald-600 font-bold"
              class="pl-5 hover:opacity-50 transition ease duration-300"
              ><i class="bi bi-people"></i> Clientes</router-link
            >
          </li>
          <li class="pt-5">
            <router-link
              @click="showMenuMobile = false"
              to="/produtos"
              exactActiveClass="text-emerald-600 font-bold"
              class="pl-5 hover:opacity-50 transition ease duration-300"
              ><i class="bi bi-box-seam"></i> Produtos</router-link
            >
          </li>
          <li class="pt-5 border-b border-slate-700"></li>
          <li class="pt-5" v-show="token">
            <router-link
              @click="showMenuMobile = false"
              to="/perfil"
              exactActiveClass="text-emerald-600 font-bold"
              class="pl-5 hover:opacity-50 transition ease duration-300"
              ><i class="bi bi-person-circle"></i> Perfil</router-link
            >
          </li>
          <li class="pt-5">
            <button
              v-if="token"
              type="button"
              @click="logout()"
              class="pl-5 hover:opacity-50 transition ease duration-300"
            >
              <i class="bi bi-door-open-fill"></i> Sair
            </button>
            <button
              v-else
              type="button"
              @click="router.push('/inicio')"
              class="pl-5 hover:opacity-50 transition ease duration-300"
            >
              <i class="bi bi-door-closed-fill"></i> Entrar
            </button>
          </li>
        </ul>

        <div class="flex-col items-center justify-center gap-2 my-10">
          <span class="text-xl text-white w-full flex justify-center"
            >Jhonatan Azevedo</span
          >
          <div class="flex justify-center gap-5">
            <a
              href="https://www.linkedin.com/in/dev-azevedo/"
              class="text-light fs-2"
              target="_blank"
            >
              <i
                class="bi bi-linkedin text-white text-lg hover:text-emerald-400 transition ease duration-300"
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

            <a
              href="https://github.com/dev-azevedo/FrontSalesCrud"
              class="text-light fs-2"
              target="_blank"
              title="Github do projeto - Front-end"
            >
              <i
                class="bi bi-file-earmark-code text-white text-lg hover:text-emerald-400 transition ease duration-300"
              ></i
            ></a>

            <a
              href="https://github.com/dev-azevedo/ApiSalesCrud"
              class="text-light fs-2"
              target="_blank"
              title="Github do projeto - API"
            >
              <i
                class="bi bi-file-earmark-code-fill text-white text-lg hover:text-emerald-400 transition ease duration-300"
              ></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { authUser } from "@/store/authStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const useAuthStore = authUser();
const userFullName = computed(() => useAuthStore.getUser.fullName);
const token = computed(() => useAuthStore.getToken);
const showMenuMobile = ref(false);

const logout = () => {
  useAuthStore.logout();
};
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
