<template>
  <section class="container mt-3">
    <BaseHome
      title="Vendas"
      icon="bi-basket"
      placeholder="Busque pelo nome do cliente ou descrição do produto"
      :newItem="addNewSale"
      :searchItem="getClientOrProductByName"
    >
      <template v-slot:thead>
        <tr class="text-start">
          <th scope="col">Cliente</th>
          <th scope="col">Produto</th>
          <th scope="col">Quantidade pedidos</th>
          <th scope="col">Preço</th>
          <th scope="col">Data e hora da venda</th>
          <th scope="col"></th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-if="isLoading">
          <td colspan="9" class="p-5">
            buscando...
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </td>
        </tr>
        <tr v-else-if="sales.length == 0">
          <td colspan="9" class="p-5 text-danger">
            <i class="bi bi-x-circle"></i> Nenhuma venda cadastrada
          </td>
        </tr>
        <tr v-else v-for="sale in sales" :key="sale.id" class="text-start">
          <td>{{ sale.client.name }}</td>
          <td>{{ sale.product.description }}</td>
          <td>{{ sale.productQuantity }}</td>
          <td class="text-start">
            <div>
              <span class="text-secondary fs-6">Valor por unidade: </span>
              <span class="fs-5">
                {{ formatMoneyPtBr(sale.product.unitaryValue) }}
              </span>
            </div>
            <div>
              <span class="text-secondary fs-6"> Valor total: </span>
              <span class="fs-5">
                {{ formatMoneyPtBr(sale.valueSale) }}
              </span>
            </div>
          </td>
          <td>{{ FormatDateTimePtBr(sale.createdOn) }}</td>
          <td>
            <button
              type="button"
              class="btn text-warning fw-bold border-end"
              @click="updateSale(sale.id)"
            >
              <i class="bi bi-pencil-square"></i> Editar
            </button>
            <button
              type="button"
              class="btn text-danger fw-bold"
              @click="deleteSale(sale.id)"
            >
              <i class="bi bi-trash"></i> Deletar
            </button>
          </td>
        </tr>
      </template>
    </BaseHome>

    <Pagination
      v-if="sales.length > 0 && totalPages > 1"
      :pageNumber="pageNumber"
      :totalPages="totalPages"
      :totalItems="totalItems"
      @changePageNumber="pageNumber = $event"
      @changePageSize="pageSize = $event"
    />
  </section>
</template>

<script setup>
import BaseHome from "@/components/BaseHome/Main.vue";
import api from "@/services/Api.js";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { formatMoneyPtBr, FormatDateTimePtBr } from "@/services/Helper";
import Pagination from "@/components/Pagination/Main.vue";

const router = useRouter();
const sales = ref([]);
const totalItems = ref(0);
const totalPages = ref(0);
const pageNumber = ref(1);
const pageSize = ref(10);
const isLoading = ref(false);

onMounted(() => {
  getSales();
});

watch(pageNumber, () => {
  getSales();
});

watch(pageSize, () => {
  pageNumber.value = 1;
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
    const { data } = await api.get(
      `/sale?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`
    );
    if (data) {
      totalItems.value = data.totalItems;
      totalPages.value = data.totalPages;
      pageNumber.value = data.pageNumber;
      sales.value = data.items;
      console.log(sales.value);
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
