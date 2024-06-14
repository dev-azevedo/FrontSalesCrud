<template>
  <section class="w-full">
    <BaseForm
      :title="titlePage"
      :register="registerClient"
      :update="updateClient"
      :disabledSendBtn="disabledSendBtn"
      :loadingRequest="isLoading"
    >
      <template v-slot:form>
        <div class="flex flex-col justify-start items-start">
          <label for="" class="test-start">Nome</label>
          <input
            type="text"
            class="w-full  p-2 rounded-md outline-0 border focus:border-b-emerald-400"
            placeholder="Informe o nome do cliente"
            v-model="name"
            :disabled="isLoading"
          />
        </div>

        <div class="flex flex-col justify-start items-start mt-5">
          <label for="" class="test-start">Cidade</label>
          <input
            type="text"
            class="w-full p-2 rounded-md outline-0 border focus:border-b-emerald-400"
            placeholder="Informe a cidade"
            v-model="city"
            :disabled="isLoading"
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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const idUpdate = computed(() => route.params.id);
const isLoading = ref(false);
const name = ref("");
const city = ref("");

onMounted(() => {
  if (idUpdate.value != "novo") {
    getClientBy();
  }
});

const disabledSendBtn = computed(() => name.value == "" || city.value == "");
const titlePage = computed(() =>
  idUpdate.value == "novo" ? "Cadastrar novo cliente" : "Editar cliente"
);

const registerClient = async () => {
  try {
    isLoading.value = true;

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

      router.back();
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

const updateClient = async () => {
  try {
    isLoading.value = true;

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

      router.back();
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

const getClientBy = async () => {
  try {
    isLoading.value = true;

    const { data } = await api.get(`/client/${idUpdate.value}`);

    if (data) {
      name.value = data.name;
      city.value = data.city;
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
</script>

<style lang="scss" scoped></style>
