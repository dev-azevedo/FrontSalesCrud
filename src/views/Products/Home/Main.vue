<template>
  <section class="container mt-3">
    <BaseHome
      title="Produto"
      icon="bi-box-seam"
      placeholder="Busque pelo nome do produto"
      :newItem="addNewProduct"
      :searchItem="getProductByDescription"
    >
      <template v-slot:thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col"></th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-if="isLoading">
          <td colspan="5">
            buscando...
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </td>
        </tr>
        <tr v-else-if="products.length == 0">
          <td colspan="5">
            <i class="bi bi-x-circle"></i> Nenhuma produto cadastrado
          </td>
        </tr>
        <tr v-else v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.description }}</td>
          <td>{{ formatMoneyPtBr(product.unitaryValue) }}</td>
          <td>
            <button
              type="button"
              class="btn text-warning fw-bold border-end"
              @click="updateProduct(product.id)"
            >
              <i class="bi bi-pencil-square"></i> Editar
            </button>
            <button
              type="button"
              class="btn text-danger fw-bold"
              @click="deleteProduct(product.id)"
            >
              <i class="bi bi-trash"></i> Deletar
            </button>
          </td>
        </tr>
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
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#dc3545",
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
