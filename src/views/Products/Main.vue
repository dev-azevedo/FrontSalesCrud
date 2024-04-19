<template>
  <section class="container mt-3">
    <div
      class="w-100 text-start d-flex justify-content-between align-items-center"
    >
      <h1 class="w-50">Produtos</h1>

      <div class="w-50 d-flex align-items-center justify-content-end gap-3">
        <input
          type="text"
          class="form-control"
          placeholder="Nome do produto..."
        />
        <button class="btn btn-primary">search</button>
      </div>
    </div>

    <div class="d-flex justify-content-end w-100">
      <button class="btn btn-primary mt-5">Adicionar novo produto</button>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
