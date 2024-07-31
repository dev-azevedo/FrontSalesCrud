<template>
  <section
    class="mt-10 font-medium px-10"
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-easing="ease-in-out"
  >
    <div class="w-full mt-5 text-start flex justify-between items-center px-10">
      <h1 class="w-1/2 text-2xl font-semibold text-slate-900">
        <i class="bi bi-columns-gap"></i> Dashboard
      </h1>
    </div>

    <hr class="border-b mt-5 w-fill" />

    <div
      class="p-3 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-5 place-items-stretch"
    >
      <!-- 3 Clientes com mais vendas -->
      <!-- 3 Produtos com mais vendas -->
      <!-- venda mais cara cadastrada -->
      <!-- total de cliente -->
      <!-- total de produto -->
      <!-- total de vendas -->
      <!-- {{ clientBestSeller.client?.name }}
      {{ clientBestSeller.saleCount }} -->

      <div
        class="bg-teal-500 flex flex-col justify-between text-white rounded-md"
      >
        <div class="flex p-5 justify-between">
          <div class="flex flex-col">
            <span class="text-8xl">0</span>
            <span>Total de Produtos</span>
          </div>

          <i class="bi bi-box-seam text-8xl mr-5 text-teal-900"></i>
        </div>

        <div class="w-full flex justify-center bg-teal-900 p-3 rounded-b-md">
          <router-link to="/produtos" class="w-full text-center">
            <span class="text-center">Visualizar</span></router-link
          >
        </div>
      </div>

      <div
        class="bg-amber-500 flex flex-col justify-between text-white rounded-md"
      >
        <div class="flex p-5 justify-between">
          <div class="flex flex-col">
            <span class="text-8xl">0</span>
            <span>Total de clientes</span>
          </div>

          <i class="bi bi-people text-8xl mr-5 text-amber-900"></i>
        </div>

        <div class="w-full flex justify-center bg-amber-900 p-3 rounded-b-md">
          <router-link to="/clientes" class="w-full text-center">
            <span class="text-center">Visualizar</span></router-link
          >
        </div>
      </div>

      <div
        class="bg-blue-500 flex flex-col justify-between text-white rounded-md"
      >
        <div class="flex p-5 justify-between">
          <div class="flex flex-col">
            <span class="text-8xl">0</span>
            <span>Total de vendas</span>
          </div>

          <i class="bi bi-basket text-8xl mr-5 text-blue-900"></i>
        </div>

        <div class="w-full flex justify-center bg-blue-900 p-3 rounded-b-md">
          <router-link to="/vendas" class="w-full text-center">
            <span class="text-center">Visualizar</span>
          </router-link>
        </div>
      </div>

      <div
        class="bg-red-500 flex flex-col justify-between text-white rounded-md"
      >
        <div class="flex p-5 justify-between">
          <div class="flex flex-col">
            <span class="text-8xl">0</span>
            <span>Produto mais vendido</span>
          </div>

          <i class="bi bi-box2-heart text-8xl mr-5 text-red-900"></i>
        </div>

        <div class="w-full flex justify-center bg-red-900 p-3 rounded-b-md">
          <router-link to="/" class="w-full text-center"
            ><span class="text-center w-full">Visualizar</span></router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from "@/services/Api";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";

const isLoading = ref(false);
const clientBestSeller = reactive({
  client: null,
  saleCount: null,
});

onMounted(() => {
  getClientBestSeller();
});

const getClientBestSeller = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/client/bestSeller`);
    if (data) {
      clientBestSeller.client = data.client;
      clientBestSeller.saleCount = data.saleCount;
    }
  } catch (err) {
    if (err?.response && err?.response?.data) {
      let errors = "";
      err.response.data.errors.map((error) => {
        errors += error.message + "<br />";
      });

      return Swal.fire({
        icon: "error",
        html: errors,
        showConfirmButton: false,
        timer: err.response.data.errors.lenght > 1 ? 3000 : 2500,
      });
    }

    Swal.fire({
      icon: "error",
      text: "Algo deu errado. Tente novamente",
      showConfirmButton: false,
      timer: 2500,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
