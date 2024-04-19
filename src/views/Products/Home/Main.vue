<template>
  <section class="container mt-3">
    <BaseHome
      title="Produto"
      placeholder="Busque pelo nome do produto"
      :newItem="addNewProduct"
      :searchItem="getProductByDescription"
    >
      <template v-slot:thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col">Editar</th>
          <th scope="col">Deletar</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-if="products.length == 0">
          <td colspan="5">
            buscando...
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </td>
        </tr>
        <tr v-else v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.description }}</td>
          <td>{{ product.unitaryValue }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-warning"
              @click="updateProduct(product.id)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deleteProduct(product.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </template>
    </BaseHome>
  </section>
</template>

<script setup>
import BaseHome from "@/components/BaseHome/Main.vue";
import api from "@/services/Api.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const products = ref([]);
onMounted(() => {
  getProducts();
});

const getProductByDescription = async (description) => {
  products.value = [];
  const { data } = await api.get(`/product/${description}`);
  products.value = data;
};

const getProducts = async () => {
  products.value = [];
  const { data } = await api.get("/product/");
  products.value = data;
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
