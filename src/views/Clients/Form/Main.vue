<template>
  <section>
    <BaseForm
      title="Cadastrar novo cliente"
      :register="registerClient"
      :update="updateClient"
    >
      <template v-slot:form>
        <div class="d-flex flex-column justify-content-start align-items-start">
          <label for="" class="test-start">Nome</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o nome do cliente"
            v-model="name"
          />
        </div>

        <div
          class="d-flex flex-column justify-content-start align-items-start mt-3"
        >
          <label for="" class="test-start">Cidade</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a cidade"
            v-model="city"
          />
        </div>
      </template>
    </BaseForm>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseForm from "@/components/BaseForm/Main.vue";
import api from "@/services/Api";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

const route = useRoute();
const idUpdate = computed(() => route.params.id);
const name = ref("");
const city = ref("");

onMounted(() => {
  if (idUpdate.value != "novo") {
    getClientBy();
  }
});

const registerClient = async () => {
  const { status } = await api.post("/client", {
    name: name.value,
    city: city.value,
  });

  if (status == 201) {
    Swal.fire({
      icon: "success",
      title: "Cadastrado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });

    name.value = "";
    city.value = "";
  }
};

const updateClient = async () => {
  const { status } = await api.put("/client", {
    id: idUpdate.value,
    name: name.value,
    city: city.value,
  });

  if (status == 200) {
    Swal.fire({
      icon: "success",
      title: "Atualizado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });

    name.value = "";
    city.value = "";
  }
};

const getClientBy = async () => {
  const { data } = await api.get(`/client/${idUpdate.value}`);

  if (data) {
    name.value = data.name;
    city.value = data.city;
  }
};
</script>

<style lang="scss" scoped></style>
