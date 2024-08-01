<template>
  <section class="w-full">
    <BaseForm
      :title="titlePage"
      :register="registerSale"
      :update="updateSale"
      :disabledSendBtn="disabledSendBtn"
      :loadingRequest="isLoading"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-easing="ease-in-out"
    >
      <template v-slot:form>
        <div class="flex flex-col justify-start items-start mt-5 relative">
          <label for="" class="test-start">Cliente</label>
          <input
            type="text"
            class="w-full p-2 rounded-md outline-none border focus:border-b-emerald-400"
            placeholder="Informe o nome do cliente"
            v-model="inputSearchClient"
            :disabled="isLoading"
          />
          <div
            class="bg-slate-500 w-full absolute top-16 rounded-b p-2"
            style="z-index: 1000"
            v-if="showSugestClients"
          >
            <!-- v-if="" -->
            <div
              class="text-start w-full cursor-pointer p-2 text-white border-b border-white"
              v-for="client in clients"
              :key="client.id"
              @click="selectClient(client)"
            >
              <i class="bi bi-person-circle me-2"></i> {{ client.name }}
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-start items-start mt-5 relative">
          <label for="" class="test-start">Produto</label>
          <input
            type="text"
            class="w-full p-2 rounded-md outline-none border focus:border-b-emerald-400"
            placeholder="Informe o nome do produto"
            v-model="inputSearchProduct"
            :disabled="isLoading"
          />

          <div
            class="bg-slate-500 w-full absolute top-16 rounded-b p-2"
            style="z-index: 1000"
            v-if="showSugestProducts"
          >
            <div
              class="text-start w-full cursor-pointer p-2 text-white border-b border-white"
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
          class="w-100 flex flex-col justify-start items-start mt-5"
          v-show="product.unitaryValue"
        >
          <label for="" class="test-start">Valor do produto</label>
          <div class="w-full bg-white p-2 rounded-md outline-0 text-start">
            <div>
              {{ formatMoneyPtBr(product.unitaryValue) }}
            </div>
          </div>
        </div>

        <div class="w-100 flex flex-col justify-start items-start mt-5">
          <label for="" class="test-start">Quantidade</label>
          <input
            type="number"
            class="w-full p-2 rounded-md outline-none border focus:border-b-emerald-400"
            placeholder="Informe a quantidade de produto"
            v-model="quantityProduct"
            :disabled="isLoading"
          />
        </div>

        <div class="w-100 flex flex-col justify-start items-start mt-5">
          <label for="" class="test-start"
            >Total: {{ formatMoneyPtBr(totalSale) }}</label
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
import { useRoute, useRouter } from "vue-router";
import { formatMoneyPtBr } from "@/services/Helper";
import toast from "@/services/Toast";

const route = useRoute();
const router = useRouter();
const idUpdate = computed(() => route.params?.id);
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
  idUpdate.value ? "Editar venda" : "Cadastrar nova venda"
);

const disabledSendBtn = computed(
  () => clientId.value == "" || product.id == "" || quantityProduct.value == ""
);

onMounted(() => {
  if (idUpdate.value) {
    getSaleById();
  }

  if (route.query?.clientId) {
    getClientById(route.query.clientId);
  }
  if (route.query?.productId) {
    getProductById(route.query.productId);
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
  }
};

const selectClient = (client) => {
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

      router.back();
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

const getClientById = async (id) => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/client/${id}`);
    selectClient(data);
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) => {
        toast.error(error.message);
      });
    }

    toast.error("Algo deu errado. Tente novamente");
  } finally {
    isLoading.value = false;
  }
};

const getProductById = async (id) => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/product/${id}`);
    selectProduct(data);
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) => {
        toast.error(error.message);
      });
    }

    toast.error("Algo deu errado. Tente novamente");
  } finally {
    isLoading.value = false;
  }
};
</script>
