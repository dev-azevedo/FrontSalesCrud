<template>
  <section class="mt-5 font-medium">
    <div class="w-full mt-5 text-start flex justify-between items-center px-10">
      <h1 class="w-1/2 text-2xl font-semibold text-slate-900">
        <i class="bi bi-columns-gap"></i> Dashboard
      </h1>
    </div>

    <hr class="border-b mt-5 w-fill" />

    <div class="px-10 flex-col justify-center mt-10">
      <!-- 3 Clientes com mais vendas -->
      <!-- 3 Produtos com mais vendas -->
      <!-- venda mais cara cadastrada -->
      <!-- total de cliente -->
      <!-- total de produto -->
      <!-- total de vendas -->
      {{ clientBestSeller.client?.name }}
      {{ clientBestSeller.saleCount }}
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
