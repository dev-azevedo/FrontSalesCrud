<template>
  <section class="mt-5 font-medium">
    <div class="px-10 w-full my-5 text-start flex justify-between items-center">
      <h1 class="text-lg font-semibold">{{ props.title }}</h1>

      <button
        class="bg-slate-900 text-white px-2 py-1 rounded-md hover:opacity-50 ease duration-300"
        @click="router.back()"
        :disabled="loadingRequest"
      >
        <i class="bi bi-arrow-left-circle me-1"></i> Voltar
      </button>
    </div>
    <hr class="border-bottom border-secondary w-100" />

    <form class="mt-5 px-10">
      <slot name="form"></slot>
      <hr class="border-b border-emerald-400 w-full mt-5" />
      <div class="flex justify-between py-5">
        <div class="text-red-500">
          *Todos os campos são obrigatórios para cadastrar
        </div>
        <div>
          <button
            v-if="idUpdate == 'novo'"
            type="button"
            class="cursor-pointer px-2 py-1 bg-emerald-400 rounded-md flex justify-center items-center gap-1"
            @click="register"
            :disabled="disabledSendBtn || loadingRequest"
          >
            <Spinner v-if="loadingRequest" :size="'h-4 w-4'" />
            <i v-else class="bi bi-check-circle"></i>

            Cadastrar
          </button>

          <button
            v-else
            type="button"
            class="cursor-pointer px-2 py-1 bg-yellow-400 rounded-md flex justify-center items-center gap-1"
            :disabled="disabledSendBtn || loadingRequest"
            @click="update"
          >
            <Spinner v-if="loadingRequest" :size="'h-4 w-4'" />
            <i v-else class="bi bi-check-circle"></i>

            Atualizar
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Spinner from "@/components/Spinner/Main.vue";

const router = useRouter();
const route = useRoute();
const props = defineProps([
  "title",
  "register",
  "update",
  "disabledSendBtn",
  "loadingRequest",
]);
const idUpdate = computed(() => route.params.id);
</script>

<style scoped></style>
