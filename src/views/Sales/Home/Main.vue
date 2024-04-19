<template>
  <section class="container mt-3">
    <BaseHome
      title="Vendas"
      placeholder="Busque pelo nome do cliente ou descrição do produto"
      :newItem="addNewSale"
      :searchItem="getClientOrProductByName"
    >
      <template v-slot:thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cliente</th>
          <th scope="col">Produto</th>
          <th scope="col">Total</th>
          <th scope="col">Editar</th>
          <th scope="col">Deletar</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-if="isLoading">
          <td colspan="6">
            buscando...
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </td>
        </tr>
        <tr v-else-if="sales.length == 0">
          <td colspan="6">
            <i class="bi bi-x-circle"></i> Nenhuma venda cadastrada
          </td>
        </tr>
        <tr v-else v-for="(sale, index) in sales" :key="sale.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ sale.client.name }}</td>
          <td>{{ sale.product.description }}</td>
          <td>{{ formatMoney(sale.valueSale) }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-warning"
              @click="updateSale(sale.id)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deleteSale(sale.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </template>
    </BaseHome>
    <div class="d-flex">Total de vendas: {{ sales.length }}</div>
  </section>
</template>

<script setup>
import BaseHome from "@/components/BaseHome/Main.vue";
import api from "@/services/Api.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { formatMoney } from "@/services/Helper";

const router = useRouter();
const sales = ref([]);
const isLoading = ref(false);

onMounted(() => {
  getSales();
});

const getClientOrProductByName = async (nameOrdescription) => {
  isLoading.value = true;
  sales.value = [];
  const { data } = await api.get(`/sale/${nameOrdescription}`);
  sales.value = data;
  isLoading.value = false;
};

const getSales = async () => {
  try {
    isLoading.value = true;
    sales.value = [];
    const { data } = await api.get("/sale/");
    if (data) {
      sales.value = data;
    }
  } catch (err) {
    console.log(err);
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const addNewSale = () => {
  router.push({ name: "formSales", params: { id: "novo" } });
};

const updateSale = (idUpdate) => {
  router.push({ name: "formSales", params: { id: idUpdate } });
};

const deleteSale = async (id) => {
  Swal.fire({
    title: "Deletar venda",
    text: "Deseja realmente apagar essa venda?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#dc3545",
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/sale/${id}`);
      Swal.fire({
        icon: "success",
        title: "Venda apagado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      getSales();
    }
  });
};
</script>
