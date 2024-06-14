<template>
  <section class="w-full">
    <BaseForm
      :title="titlePage"
      :register="registerProduct"
      :update="updateProduct"
      :disabledSendBtn="disabledSendBtn"
      :loadingRequest="isLoading"
    >
      <template v-slot:form>
        <div class="flex flex-col justify-start items-start">
          <label for="" class="text-start">Descrição</label>
          <input
            type="text"
            class="w-full p-2 rounded-md outline-0"
            placeholder="Informe a descrição do produto"
            v-model="description"
            :disabled="isLoading"
          />
        </div>

        <div class="flex flex-col justify-start items-start mt-5">
          <label for="" class="text-start">Valor</label>
          <input
            type="number"
            class="w-full p-2 rounded-md outline-0"
            placeholder="Informe o valoro do produto"
            v-model="unitaryValue"
            :disabled="isLoading"
          />
        </div>

        <section class="mt-5">
          <div
            class="intro-y flex flex-col sm:flex-row items-center pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <h2 class="">Importe a imagem do produto</h2>
          </div>
          <div>
            <Dropzone
              titleDropzone="Arraste ou clique aqui para importar imagem do produto"
              @onFileUpload="($event) => (listFilesUpload = $event)"
            />
            {{ listFilesUpload }}
          </div>
        </section>
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
import { getExtnsionFile } from "@/services/Helper";
import Dropzone from "@/components/Dropzone/Main.vue";

const route = useRoute();
const router = useRouter();
const idUpdate = computed(() => route.params.id);
const isLoading = ref(false);
const description = ref(null);
const unitaryValue = ref(null);

const listFilesUpload = ref([]);

const disabledSendBtn = computed(
  () => !description.value || !unitaryValue.value
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
    const { status, data } = await api.post("/product", {
      description: description.value,
      unitaryValue: unitaryValue.value,
    });

    if (status == 201) {
      if (listFilesUpload.value.length > 0) {
        const status = await sendImageProduct(data.id);

        if (status == 200) {
          Swal.fire({
            icon: "success",
            title: "Cadastrado com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });

          description.value = null;
          unitaryValue.value = null;

          return router.back();
        }
      }

      await removeImageProduct(data.id);

      description.value = null;
      unitaryValue.value = null;

      return router.back();
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

const sendImageProduct = async (id) => {
  const formData = new FormData();

  listFilesUpload.value.forEach((item) => {
    formData.append("File", item);
  });

  formData.append("Id", id);

  try {
    const { status } = await api.post("/product/file", formData);
    return status;
  } catch (err) {
    console.log(err);
  }
};

const removeImageProduct = async (id) => {
  try {
    await api.delete(`/product/file/${id}`);
  } catch (err) {
    console.log(err);
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
      if (listFilesUpload.value.length > 0) {
        try {
          const status = await sendImageProduct(idUpdate.value);
          console.log(status);

          if (status == 200) {
            Swal.fire({
              icon: "success",
              title: "Atualizado com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });

            description.value = null;
            unitaryValue.value = null;

            return router.back();
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
        }
      }

      await removeImageProduct(idUpdate.value);
      description.value = null;
      unitaryValue.value = null;

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

      if (data.pathImage != null) {
        let fileName = data.pathImage.split("/");
        fileName = fileName[fileName.length - 1];

        const result = await api.get(data.pathImage);
        const ext = getExtnsionFile(result.headers["content-type"]);
        const mimeType = result.headers["content-type"];

        const file = await urlToFile(data.pathImage, fileName + ext, mimeType);
        console.log(file);
        listFilesUpload.value = [file];
      }
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

const urlToFile = async (url, filename, mimeType) => {
  // Buscar a imagem
  const response = await fetch(url);
  // Converter a resposta em um Blob
  const blob = await response.blob();
  // Criar um arquivo a partir do Blob
  return new File([blob], filename, { type: mimeType });
};
</script>