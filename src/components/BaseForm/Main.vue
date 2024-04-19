<template>
  <section class="container mt-3">
    <div
      class="w-100 mt-5 text-start d-flex justify-content-between align-items-center"
    >
      <h1>{{ props.title }}</h1>

      <button class="btn btn-sm btn-secondary" @click="router.back()">
        <i class="bi bi-arrow-left-circle me-1"></i> Voltar
      </button>
    </div>
    <hr class="border-bottom border-secondary w-100" />

    <form class="mt-5">
      <slot name="form"></slot>
      <hr class="border-bottom border-secondary w-100" />
      <div class="d-flex justify-content-end">
        <button
          v-if="idUpdate == 'novo'"
          type="button"
          class="btn btn-success"
          @click="register"
          :disabled="disabledSendBtn"
        >
          <i class="bi bi-check-circle"></i> Cadastrar
        </button>

        <button
          v-else
          type="button"
          class="btn btn-warning"
          :disabled="disabledSendBtn"
          @click="update"
        >
          <i class="bi bi-check-circle"></i> Atualizar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const props = defineProps(["title", "register", "update", "disabledSendBtn"]);
const idUpdate = computed(() => route.params.id);
</script>

<style scoped></style>
