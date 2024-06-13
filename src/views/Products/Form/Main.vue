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
            <form
              class="uploader w-full intro-y"
              @dragenter.prevent="OnDragEnter"
              @dragleave.prevent="OnDragLeave"
              @dragover.prevent
              @drop.prevent="onDrop"
              enctype="multipart/form-data"
            >
              <div>
                <div class="w-full flex">
                  <label
                    for="upload"
                    class="label-upload w-full p-4 rounded-md text-center"
                    :class="{ isDraggingStyle: isDragging }"
                  >
                    <div class="spinner-custom rounded" v-show="isLoading">
                      <span class="text-white"> Importando... </span>
                      <span class="text-white fs-12"
                        >Isso pode levar alguns minutos</span
                      >
                    </div>
                    <span class=""
                      >Arraste ou clique aqui para importar imagem do produto
                      <br />
                      <span class="text-sm"
                        >Aceitamos apenas arquivos '.jpg', '.jpeg' ou
                        '.png'</span
                      >
                    </span>
                    <div class="group-files w-full mt-3">
                      <p
                        v-for="(file, index) in listFilesUpload"
                        :key="index"
                        class="p-3 h-52 w-52 my-1 text-base text-slate-600 rounded-md flex flex-col justify-between"
                        @click.prevent=""
                      >
                        <span
                          class="nameFile cursor-pointer"
                          :title="file.name"
                          style="font-size: 18px"
                        >
                          {{ index + 1 }}. {{ file.name }}
                        </span>

                        <button
                          class="bg-red-500 p-2 rounded-md text-white"
                          @click.prevent="removeFile(index)"
                        >
                          Apagar
                        </button>
                      </p>
                    </div>
                  </label>
                  <input
                    :disabled="isLoading"
                    type="file"
                    id="upload"
                    :accept="acceptTypes"
                    @change.prevent="onInputChange($event)"
                  />
                </div>
              </div>
            </form>
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

const route = useRoute();
const router = useRouter();
const idUpdate = computed(() => route.params.id);
const isLoading = ref(false);
const description = ref(null);
const unitaryValue = ref(null);

const isDragging = ref(false);
const dragCount = ref(0);
const listFilesUpload = ref([]);
const acceptTypes = ref([".jpg", ".jpeg", ".png"]);

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

  formData.append("ProductId", id);

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
        const status = await sendImageProduct(idUpdate.value);

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
      }

      await removeImageProduct(idUpdate.value);
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

const OnDragEnter = () => {
  dragCount.value++;
  isDragging.value = true;

  return false;
};

const OnDragLeave = () => {
  dragCount.value--;
  if (dragCount.value <= 0) isDragging.value = false;
};

const onDrop = (e) => {
  const files = e.dataTransfer.files;

  isDragging.value = false;

  [...files].map((file) => {
    const ext = file?.name.split(".").pop();

    if (acceptTypes.value.includes("." + ext)) {
      return (listFilesUpload.value = [file]);
    }

    Swal.fire({
      icon: "error",
      title: "Tipo de arquivo não suportado",
      text: "Aceitamos apenas arquivos de extensão '.zip'",
      showConfirmButton: false,
      timer: 2500,
    });
  });
};

const removeFile = (pos) => {
  return listFilesUpload.value.splice(pos, 1);
};

const onInputChange = (e) => {
  const files = e.target.files;

  [...files].map((file) => {
    const ext = file?.name.split(".").pop();

    if (acceptTypes.value.includes("." + ext)) {
      return (listFilesUpload.value = [file]);
    }

    return Swal.fire({
      icon: "error",
      title: "Tipo de arquivo não suportado",
      text: "Aceitamos apenas arquivos de extensão '.zip'",
      showConfirmButton: false,
      timer: 2500,
    });
  });
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

<style scoped>
#uploader {
  width: 100% !important;
}

#upload {
  display: none;
}

.isDraggingStyle {
  background-color: #aaa !important;
  padding: 10px !important;
  color: #fff;
  transition: ease 0.2s;
  width: 100% !important;
}

.label-upload {
  background-color: #fff;
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 22px;
  color: #454545;
  transition: ease 0.2s;
  border: 1px dashed #777;
  position: relative;
}

.spinner-custom {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

label .group-files p {
  z-index: 1000 !important;
  background-color: rgba(0, 0, 0, 0.2);
}

.nameFile {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;
}

.fs-12 {
  font-size: 12px !important;
}

@keyframes example {
  0% {
    background-color: rgba(0, 0, 0, 0.8);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.3);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
