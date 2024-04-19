<template>
  <section>
    <BaseForm
      :title="titlePage"
      :register="registerSale"
      :update="updateSale"
      :disabledSendBtn="disabledSendBtn"
      :loadingRequest="isLoading"
    >
      <template v-slot:form>
        <div
          class="d-flex flex-column justify-content-start align-items-start position-relative"
        >
          <label for="" class="test-start">Cliente</label>
          <input
            type="text"
            class="form-control shadow-none"
            placeholder="Informe o nome do cliente"
            v-model="inputSearchClient"
            :disabled="isLoading"
          />
          <div
            class="bg-secondary w-100 position-absolute top-100 rounded-bottom pb-1"
            style="z-index: 1000"
            v-if="showSugestClients"
          >
            <div
              class="text-start w-100 cursor-pointer p-2 text-white bg-secondary border-bottom border-white"
              v-for="client in clients"
              :key="client.id"
              @click="selectClient(client)"
            >
              <i class="bi bi-person-circle me-2"></i> {{ client.name }}
            </div>
          </div>
        </div>

        <div
          class="d-flex flex-column justify-content-start align-items-start position-relative mt-3"
        >
          <label for="" class="test-start">Produto</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o nome do produto"
            v-model="inputSearchProduct"
            :disabled="isLoading"
          />

          <div
            class="bg-secondary w-100 position-absolute top-100 rounded-bottom pb-1"
            style="z-index: 1000"
            v-if="showSugestProducts"
          >
            <div
              class="text-start w-100 cursor-pointer p-2 text-white bg-secondary border-bottom border-white"
              v-for="product in products"
              :key="product.id"
              @click="selectProduct(product)"
            >
              <i class="bi bi-bag-dash-fill"></i>
              {{ product.description }}
            </div>
          </div>
        </div>
        <div
          class="w-100 d-flex flex-column justify-content-start align-items-start mt-3"
        >
          <label for="" class="test-start">Valor do produto</label>
          <div class="form-control p-1 text-start">
            <div v-if="!product.unitaryValue" class="text-secondary px-2 py-1">
              Valor do produto...
            </div>
            <div v-else class="px-2 py-1">
              {{ formatMoney(product.unitaryValue) }}
            </div>
          </div>
        </div>

        <div
          class="w-100 d-flex flex-column justify-content-start align-items-start mt-3"
        >
          <label for="" class="test-start">Quantidade</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe a quantidade de produto"
            v-model="quantityProduct"
            :disabled="isLoading"
          />
        </div>

        <div
          class="w-100 d-flex flex-column justify-content-start align-items-start mt-3"
        >
          <label for="" class="test-start"
            >Total: {{ formatMoney(totalSale) }}</label
          >
        </div>
      </template>
    </BaseForm>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import BaseForm from "@/components/BaseForm/Main.vue";
import api from "@/services/Api";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
import { formatMoney } from "@/services/Helper";

const route = useRoute();
const idUpdate = computed(() => route.params.id);
const isLoading = ref(false);

const quantityProduct = ref(0);

const inputSearchClient = ref([]);
const clients = ref([]);
const clientId = ref("");
const showSugestClients = ref(false);

const inputSearchProduct = ref([]);
const products = ref([]);
const product = reactive({ id: "", description: "", unitaryValue: "" });
const showSugestProducts = ref(false);

const totalSale = computed(() => quantityProduct.value * product.unitaryValue);
const titlePage = computed(() =>
  idUpdate.value == "novo" ? "Cadastrar nova venda" : "Editar venda"
);

const disabledSendBtn = computed(
  () => clientId.value == "" || product.id == "" || quantityProduct.value == ""
);

onMounted(() => {
  if (idUpdate.value != "novo") {
    getSaleById();
  }
});

watch(inputSearchClient, (newValue) => {
  if (newValue.length >= 2 && clientId.value == "") {
    showSugestClients.value = true;
    return getClientByName();
  } else if (newValue.length < 2) {
    clientId.value = "";
  }
  showSugestClients.value = false;
});

watch(clientId, () => {
  showSugestClients.value = false;
});

watch(inputSearchProduct, (newValue) => {
  if (newValue.length >= 2 && product.id == "") {
    showSugestProducts.value = true;
    return getProductByDescription();
  }

  showSugestProducts.value = false;
  product.value = { id: "", description: "", unitaryValue: "" };
});

watch(product.id, () => {
  showSugestProducts.value = false;
});

const getClientByName = async () => {
  try {
    clients.value = [];
    const { data } = await api.get(`/client/${inputSearchClient.value}`);
    clients.value = data;
  } catch (err) {
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
};

const selectClient = (client) => {
  console.log(client);
  inputSearchClient.value = client.name;
  clientId.value = client.id;
  showSugestClients.value = false;
  clients.value = [];
};

const getProductByDescription = async () => {
  try {
    products.value = [];
    const { data } = await api.get(`/product/${inputSearchProduct.value}`);
    products.value = data;
  } catch (err) {
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
};

const selectProduct = (productSelect) => {
  inputSearchProduct.value = productSelect.description;
  product.id = productSelect.id;
  product.unitaryValue = productSelect.unitaryValue;
  showSugestProducts.value = false;
  products.value = [];
};

const registerSale = async () => {
  try {
    isLoading.value = true;
    const { status } = await api.post("/sale", {
      clientId: clientId.value,
      productId: product.id,
      productQuantity: quantityProduct.value,
    });

    if (status == 201) {
      Swal.fire({
        icon: "success",
        title: "Cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      inputSearchClient.value = "";
      clientId.value = "";
      inputSearchProduct.value = "";
      product.id = "";
      product.description = "";
      product.unitaryValue = "";
      quantityProduct.value = 0;
    }
  } catch (err) {
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const updateSale = async () => {
  isLoading.value = true;

  try {
    const { status } = await api.put("/sale", {
      id: idUpdate.value,
      clientId: clientId.value,
      productId: product.id,
      productQuantity: quantityProduct.value,
    });

    if (status == 200) {
      Swal.fire({
        icon: "success",
        title: "Atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });

      clientId.value = "";
      product.id = "";
      product.unitaryValue = 0;

      inputSearchClient.value = "";
      inputSearchProduct.value = "";
      quantityProduct.value = 0;
    }
  } catch (err) {
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const getSaleById = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/sale/${idUpdate.value}`);
    clientId.value = data.client.id;
    product.id = data.product.id;
    product.unitaryValue = data.product.unitaryValue;

    inputSearchClient.value = data.client.name;
    inputSearchProduct.value = data.product.description;
    quantityProduct.value = data.productQuantity;
  } catch (err) {
    if (
      err?.response &&
      err?.response?.data &&
      !err?.response?.data.includes("!DOCTYPE")
    ) {
      Swal.fire({
        icon: "error",
        text: err.response.data,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
