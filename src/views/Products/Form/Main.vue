<template>
  <section>
    <BaseForm
      :title="titlePage"
      :register="registerProduct"
      :update="updateProduct"
      :disabledSendBtn="disabledSendBtn"
      :loadingRequest="isLoading"
    >
      <template v-slot:form>
        <div class="d-flex flex-column justify-content-start align-items-start">
          <label for="" class="test-start">Descrição</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a descrição do produto"
            v-model="description"
            :disabled="isLoading"
          />
        </div>

        <div
          class="d-flex flex-column justify-content-start align-items-start mt-3"
        >
          <label for="" class="test-start">Valor</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o valoro do produto"
            v-model="unitaryValue"
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
import { useRoute } from "vue-router";

const route = useRoute();
const idUpdate = computed(() => route.params.id);
const isLoading = ref(false);
const description = ref("");
const unitaryValue = ref(0);

const disabledSendBtn = computed(
  () => description.value == "" || unitaryValue.value == 0
);

const titlePage = computed(() =>
  idUpdate.value == "novo" ? "Cadastrar novo produto" : "Editar produto"
);

onMounted(() => {
  if (idUpdate.value != "novo") {
    getProductById();
  }
});

const registerProduct = async () => {
  try {
    isLoading.value = true;
    const { status } = await api.post("/product", {
      description: description.value,
      unitaryValue: unitaryValue.value,
    });

    if (status == 201) {
      Swal.fire({
        icon: "success",
        title: "Cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      description.value = "";
      unitaryValue.value = 0;
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

const updateProduct = async () => {
  try {
    isLoading.value = true;
    const { status } = await api.put("/product", {
      id: idUpdate.value,
      description: description.value,
      unitaryValue: unitaryValue.value,
    });

    if (status == 200) {
      Swal.fire({
        icon: "success",
        title: "Atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      description.value = "";
      unitaryValue.value = 0;
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

const getProductById = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/product/${idUpdate.value}`);

    if (data) {
      description.value = data.description;
      unitaryValue.value = data.unitaryValue;
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
