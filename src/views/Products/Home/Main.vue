<template>
  <section class="container mt-3">
    <BaseHome
      title="Produto"
      icon="bi-box-seam"
      placeholder="Busque pelo nome do produto"
      :newItem="addNewProduct"
      :searchItem="getProductByDescription"
    >
      <template v-slot:lista>
        <div
          v-if="isLoading"
          class="bg-white p-2 mb-3 flex justify-center items-center"
        >
          buscando...
        </div>
        <div
          v-else-if="products.length == 0"
          class="w-full bg-white p-2 mb-3 flex justify-center items-center"
        >
          <i class="bi bi-x-circle"></i> Nenhum produto cadastrado
        </div>

        <div v-else class="grid grid-cols-3 gap-5">
          <div
            v-for="product in products"
            :key="product.id"
            class="rounded-md p-2 flex flex-col shadow-lg"
          >
            <div class="w-full h-1/2 truncate cursor-pointer rounded-t-md mb-3">
              <img
                v-if="product.imageUrl"
                :src="product.imageUrl"
                alt="quebrou"
              />

              <div
                v-else
                class="py-20 flex justify-center items-center bg-gray-300"
              >
                <i class="bi bi-box"></i>
              </div>
            </div>

            <div class="">
              <div
                class="mb-3 truncate cursor-pointer"
                :title="product.description"
              >
                <span class="text-sm text-slate-500">Descrição: </span>
                <span>
                  {{ product.description }}
                </span>
              </div>

              <div class="mb-3 items-center gap-1">
                <span class="text-sm text-slate-500">Preço: </span>
                <span>
                  {{ formatMoneyPtBr(product.unitaryValue) }}
                </span>
              </div>
              <div class="mb-3 flex justify-between">
                <button
                  type="button"
                  class="text-yellow-500 pe-2"
                  @click="updateProduct(product.id)"
                >
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button
                  type="button"
                  class="text-red-600 me-2"
                  @click="deleteProduct(product.id)"
                >
                  <i class="bi bi-trash"></i> Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseHome>

    <Pagination
      v-if="products.length > 0 && totalPages > 1"
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
import { formatMoneyPtBr } from "@/services/Helper";
import Pagination from "@/components/Pagination/Main.vue";

const router = useRouter();
const products = ref([]);
const totalItems = ref(0);
const totalPages = ref(0);
const pageNumber = ref(1);
const pageSize = ref(10);
const isLoading = ref(false);

onMounted(() => {
  getProducts();
});

watch(pageNumber, () => {
  getProducts();
});

watch(pageSize, () => {
  pageNumber.value = 1;
  getProducts();
});

const getProductByDescription = async (description) => {
  try {
    isLoading.value = true;
    products.value = [];
    const { data } = await api.get(`/product/${description}`);
    products.value = data;
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

const getProducts = async () => {
  try {
    isLoading.value = true;
    products.value = [];
    const { data } = await api.get(
      `/product?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`
    );

    totalItems.value = data.totalItems;
    totalPages.value = data.totalPages;
    pageNumber.value = data.pageNumber;
    products.value = data.items;
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

const addNewProduct = () => {
  router.push({ name: "formProducts", params: { id: "novo" } });
};

const updateProduct = (idUpdate) => {
  router.push({ name: "formProducts", params: { id: idUpdate } });
};

const deleteProduct = async (id) => {
  Swal.fire({
    title: "Deletar produto",
    text: "Deseja realmente apagar esse produto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#34d399",
    cancelButtonColor: "#0f172a",
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/product/${id}`);
      Swal.fire({
        icon: "success",
        title: "Produto apagado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      getProducts();
    }
  });
};
</script>

<style lang="scss" scoped></style>
