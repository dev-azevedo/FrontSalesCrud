<template>
  <section class="container mt-3">
    <BaseHome
      title="Produto"
      icon="bi-box-seam"
      placeholder="Busque pelo nome do produto"
      :newItem="addNewProduct"
      :searchItem="getProductByDescription"
      @resetGet="getProducts"
    >
      <template v-slot:lista>
        <SkeletonLoading v-if="isLoading" :heightCard="'h-56'" />

        <div
          v-else-if="products.length == 0"
          class="w-full bg-white p-2 mb-3 flex justify-center items-center"
        >
          <i class="bi bi-x-circle"></i> Nenhum produto cadastrado
        </div>

        <div
          v-else
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5"
        >
          <div
            v-for="product in products"
            :key="product.id"
            class="rounded-md bg-white flex flex-col justify-between shadow-xl"
          >
            <div
              class="w-full max-h-56 truncate flex items-center justify-center rounded-t-md"
            >
              <img
                v-if="product.pathImage"
                :src="product.pathImage"
                alt="quebrou"
                class="bg-center h-56 bg-gray-300 w-full"
              />

              <div
                v-else
                class="flex justify-center items-center w-full h-56 bg-gray-300"
              >
                <i class="bi bi-box text-6xl text-gray-100 m-16"></i>
              </div>
            </div>
            <div
              v-show="token"
              class="grid grid-cols-3 divide-x divide-slate-300"
            >
              <button
                type="button"
                class="bg-slate-100"
                @click="addNewSale(product.id)"
              >
                <i class="bi bi-basket text-emerald-400"></i>
              </button>
              <button
                type="button"
                class="bg-slate-100 p-2"
                @click="updateProduct(product.id)"
              >
                <i class="bi bi-pencil-square text-yellow-400"></i>
              </button>
              <button
                type="button"
                class="bg-slate-100"
                @click="deleteProduct(product.id)"
              >
                <i class="bi bi-trash text-red-600"></i>
              </button>
            </div>

            <div class="px-5 mt-5">
              <div
                class="truncate flex cursor-pointer"
                :title="product.description"
              >
                <span class="text-lg truncate">
                  {{ product.description.toUpperCase() }}
                </span>
              </div>

              <div class="mb-3 items-center flex">
                <span class="text-sm text-slate-500">
                  {{ formatMoneyPtBr(product.unitaryValue) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseHome>

    <Pagination
      @click="store.resetScroll()"
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
import SkeletonLoading from "@/components/SkeletonLoading/Main.vue";
import { toast } from "vue3-toastify";
import { salesCrudStore } from "@/store/SalesCrudStore.js";
import { authUser } from "@/store/authStore";
import { computed } from "vue";

const router = useRouter();
const store = salesCrudStore();
const authStore = authUser();

const products = ref([]);
const totalItems = ref(0);
const totalPages = ref(0);
const pageNumber = ref(1);
const pageSize = ref(20);
const isLoading = ref(false);

const token = computed(() => authStore.getToken);

onMounted(() => {
  window.scrollTo(0, 0);
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
  if (!description) return;

  try {
    isLoading.value = true;
    products.value = [];
    const { data } = await api.get(`/products/${description}`);
    products.value = data;
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) => toast.error(error.message));
      return;
    }

    return toast.error("Algo deu errado. Tente novamente");
  } finally {
    isLoading.value = false;
  }
};

const getProducts = async () => {
  try {
    isLoading.value = true;
    products.value = [];
    const { data } = await api.get(
      `/products?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`
    );



    totalItems.value = data.totalItems;
    totalPages.value = data.totalPages;
    pageNumber.value = data.pageNumber;
    products.value = data.items;
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) => toast.error(error.message));
      return;
    }

    return toast.error("Algo deu errado. Tente novamente");
  } finally {
    isLoading.value = false;
  }
};

const addNewProduct = () => {
  router.push({ name: "formProducts" });
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
      await api.delete(`/products/${id}`);

      toast.success("Produto apagado com sucesso!");
      getProducts();
    }
  });
};

const addNewSale = (productId) => {
  router.push({ name: "formSales", query: { productId: productId } });
};
</script>

<style lang="scss" scoped></style>
