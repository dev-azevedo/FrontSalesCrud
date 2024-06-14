<template>
  <section class="container mt-3">
    <BaseHome
      title="Clientes"
      icon="bi-person"
      placeholder="Busque pelo nome do cliente"
      :newItem="addNewClient"
      :searchItem="getClientByName"
       @resetGet="getClients"
    >
      <template v-slot:lista>
        <div
          v-if="isLoading"
          class="bg-white p-2 mb-3 flex justify-center items-center"
        >
          buscando...
        </div>

        <div
          v-else-if="clients.length == 0"
          class="w-full bg-white p-2 mb-3 flex justify-center items-center"
        >
          <i class="bi bi-x-circle"></i> Nenhum cliente cadastrado
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
        >
          <div
            v-for="client in clients"
            :key="client.id"
            class="rounded-md p-2 bg-white flex flex-col justify-between shadow-lg"
          >
            <div
              class="w-full max-h-48 truncate flex items-center justify-center cursor-pointer rounded-t-md mb-3"
            >
              <img
                v-if="client.pathImage"
                :src="client.pathImage"
                alt="quebrou"
                class="bg-center"
              />

              <div
                v-else
                class="flex justify-center items-center w-full h-48 bg-gray-300"
              >
                <i class="bi bi-box text-6xl text-gray-100 m-16"></i>
              </div>
            </div>

            <div class="">
              <div
                class="mb-3 truncate cursor-pointer"
                :title="client.name"
              >
              <span class="text-sm text-slate-500 me-1">Nome: </span>
              <span>
                {{ client.name }}
              </span>
              </div>

              <div class="mb-3 items-center gap-1">
                <span class="text-sm text-slate-500 me-1">Cidade: </span>
                <span>{{ client.city }}</span>
              </div>
              <div class="mb-3 flex justify-end gap-5">
                <button
                  type="button"
                  class="text-yellow-500 pe-2"
                  @click="updateClient(client.id)"
                >
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button
                  type="button"
                  class="text-red-600 me-2"
                  @click="deleteClient(client.id)"
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
  if (!name) return

  try {
    isLoading.value = true;
    clients.value = [];
    const { data } = await api.get(`/client/${name}`);
    if (data) clients.value = data;
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

const addNewClient = () => {
  router.push({ name: "formClients", params: { id: "novo" } });
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
      Swal.fire({
        icon: "success",
        title: "Cliente apagado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      getClients();
    }
  });
};
</script>
