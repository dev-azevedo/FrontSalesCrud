<template>
  <section class="container mt-3">
    <BaseHome
      title="Vendas"
      icon="bi-basket"
      placeholder="Busque pelo nome do cliente ou descrição do produto"
      :newItem="addNewSale"
      :searchItem="getClientOrProductByName"
      @resetGet="getSales"
    >
      <template v-slot:lista>
        <SkeletonLoading v-if="isLoading" :heightCard="'h-8'" />
        <div
          v-else-if="sales.length == 0"
          class="w-full bg-white p-2 mb-3 flex justify-center items-center"
        >
          <i class="bi bi-x-circle"></i> Nenhuma venda cadastrado
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5"
        >
          <div
            v-for="sale in sales"
            :key="sale.id"
            class="rounded-md bg-white flex flex-col justify-between shadow-xl"
          >
            <div
              class="w-full max-h-56 truncate flex items-center justify-center cursor-pointer rounded-t-md"
            ></div>

            <div class="flex flex-col justify-start items-start px-5 py-3">
              <div class="truncate cursor-pointer flex justify-center">
                <div>
                  <span class="text-sm text-slate-500">Cliente: </span>
                  <span>
                    {{ sale.client.name }}
                  </span>
                </div>
              </div>
              <div>
                <span
                  class="text-sm text-slate-500 me-2 cursor-pointer"
                  title="Data da venda"
                >
                  <i class="bi bi-calendar3"></i>
                </span>
                <span>
                  {{ formatDateTimePtBr(sale.createdOn) }}
                </span>
              </div>

              <div>
                <span class="text-sm text-slate-500">Produto: </span>
                <span>
                  {{ sale.product.description }}
                </span>
              </div>
              <div>
                <span class="text-sm text-slate-500">Quantidade: </span>
                <span>{{ sale.productQuantity }}</span>
              </div>

              <div>
                <span class="text-sm text-slate-500">Unidade: </span>
                <span class="fs-5">
                  {{ formatMoneyPtBr(sale.product.unitaryValue) }}
                </span>
              </div>
              <div>
                <span class="text-sm text-slate-500"> Total: </span>
                <span class="fs-5">
                  {{ formatMoneyPtBr(sale.valueSale) }}
                </span>
              </div>
            </div>
            <div
              class="grid grid-cols-2 divide-x divide-slate-300 rounded-b-md"
            >
              <button
                type="button"
                class="bg-slate-100 p-2 rounded-bl-md"
                @click="updateSale(sale.id)"
              >
                <i class="bi bi-pencil-square text-yellow-400"></i>
              </button>
              <button
                type="button"
                class="bg-slate-100 rounded-br-md"
                @click="deleteSale(sale.id)"
              >
                <i class="bi bi-trash text-red-600"></i>
              </button>
            </div>
          </div>
        </div>
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
import { formatMoneyPtBr, formatDateTimePtBr } from "@/services/Helper";
import Pagination from "@/components/Pagination/Main.vue";
import SkeletonLoading from "@/components/SkeletonLoading/Main.vue";

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
  if (!nameOrdescription) return;

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
  router.push({ name: "formSales" });
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
    confirmButtonColor: "#34d399",
    cancelButtonColor: "#0f172a",
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
