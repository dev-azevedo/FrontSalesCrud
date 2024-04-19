<template>
  <section class="container mt-3">
    <BaseHome
      title="Clientes"
      placeholder="Busque pelo nome do cliente"
      :newItem="addNewClient"
      :searchItem="getClientByName"
    >
      <template v-slot:thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Cidade</th>
          <th scope="col">Editar</th>
          <th scope="col">Deletar</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-if="clients.length == 0">
          <td colspan="5">
            buscando...
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </td>
        </tr>
        <tr v-else v-for="(client, index) in clients" :key="client.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ client.name }}</td>
          <td>{{ client.city }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-warning"
              @click="updateClient(client.id)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deleteClient(client.id)"
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
const clients = ref([]);
onMounted(() => {
  getClients();
});

const getClientByName = async (description) => {
  clients.value = [];
  const { data } = await api.get(`/client/${description}`);
  clients.value = data;
};

const getClients = async () => {
  clients.value = [];
  const { data } = await api.get("/client/");
  clients.value = data;
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
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#dc3545",
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
