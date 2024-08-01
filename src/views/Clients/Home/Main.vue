<template>
  <section class="container mt-3">
    <BaseHome
      title="Clientes"
      icon="bi-people"
      placeholder="Busque pelo nome do cliente"
      :newItem="addNewClient"
      :searchItem="getClientByName"
      @resetGet="getClients"
    >
      <template v-slot:lista>
        <SkeletonLoading v-if="isLoading" :heightCard="'h-56'" />
        <div
          v-else-if="clients.length == 0"
          class="w-full bg-white p-2 mb-3 flex justify-center items-center"
        >
          <i class="bi bi-x-circle"></i> Nenhum cliente cadastrado
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5"
        >
          <div
            v-for="client in clients"
            :key="client.id"
            class="rounded-md bg-white flex flex-col justify-between shadow-xl"
          >
            <div
              class="w-full h-56 truncate flex items-center justify-center rounded-t-md"
            >
              <img
                v-if="client.pathImage"
                :src="client.pathImage"
                alt="quebrou"
                class="bg-center h-56 bg-gray-300 w-full"
              />

              <div
                v-else
                class="flex justify-center items-center w-full h-56 bg-gray-300"
              >
                <i class="bi bi-people text-6xl text-gray-100 m-16"></i>
              </div>
            </div>

            <div class="grid grid-cols-3 mb-5 -mt- divide-x divide-slate-300">
              <button
                type="button"
                class="bg-slate-100"
                @click="addNewSale(client.id)"
              >
                <i class="bi bi-basket text-emerald-400"></i>
              </button>
              <button
                type="button"
                class="bg-slate-100 p-2"
                @click="updateClient(client.id)"
              >
                <i class="bi bi-pencil-square text-yellow-400"></i>
              </button>
              <button
                type="button"
                class="bg-slate-100"
                @click="deleteClient(client.id)"
              >
                <i class="bi bi-trash text-red-600"></i>
              </button>
            </div>

            <div class="flex flex-col justify-start items-start px-5">
              <div
                class="truncate cursor-pointer flex justify-center"
                :title="client.name"
              >
                <span class="text-lg text-center">
                  {{ client.name }}
                </span>
              </div>
              <div
                class="truncate cursor-pointer flex justify-center"
                :title="client.email"
              >
                <span class="text-sm text-center text-slate-500">
                  {{ client.email || "Email não cadastrado" }}
                </span>
              </div>

              <div class="mb-3 items-center flex justify-center">
                <span class="text-sm text-slate-500">{{ client.city }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseHome>

    <Pagination
      v-if="clients.length > 0 && totalPages > 1"
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
import Pagination from "@/components/Pagination/Main.vue";
import SkeletonLoading from "@/components/SkeletonLoading/Main.vue";
import toast from "@/services/Toast";

const router = useRouter();
const clients = ref([]);
const totalItems = ref(0);
const totalPages = ref(0);
const pageNumber = ref(1);
const pageSize = ref(10);
const isLoading = ref(false);

onMounted(() => {
  getClients();
});

watch(pageNumber, () => {
  getClients();
});

watch(pageSize, () => {
  pageNumber.value = 1;
  getClients();
});

const getClientByName = async (name) => {
  if (!name) return;

  try {
    isLoading.value = true;
    clients.value = [];
    const { data } = await api.get(`/client/${name}`);
    if (data) clients.value = data;
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

const getClients = async () => {
  try {
    isLoading.value = true;
    clients.value = [];
    const { data } = await api.get(
      `/client?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`
    );
    if (data) {
      totalItems.value = data.totalItems;
      totalPages.value = data.totalPages;
      pageNumber.value = data.pageNumber;
      clients.value = data.items;
    }
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

const addNewClient = () => {
  router.push({ name: "formClients" });
};

const updateClient = (idUpdate) => {
  router.push({ name: "formClients", params: { id: idUpdate } });
};

const deleteClient = async (id) => {
  Swal.fire({
    title: "Deletar cliente",
    text: "Deseja realmente apagar esse cliente?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#34d399",
    cancelButtonColor: "#0f172a",
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api.delete(`/client/${id}`);

      toast.success("Cliente apagado com sucesso!");
      getClients();
    }
  });
};

const addNewSale = (clientId) => {
  router.push({ name: "formSales", query: { clientId: clientId } });
};
</script>
