<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand me-5 fs-2" href="#">CamposDalearCrud</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              exactActiveClass="text-primary fw-bold"
              class="nav-link"
              >Vendas</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/clientes"
              exactActiveClass="text-primary fw-bold"
              class="nav-link"
              >Clientes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/produtos"
              exactActiveClass="text-primary fw-bold"
              class="nav-link"
              >Produtos</router-link
            >
          </li>
        </ul>
        <div class="text-light d-flex align-items-center gap-2">
          Jhonatan Azevedo
          <a
            href="https://www.linkedin.com/in/dev-azevedo/"
            class="text-light fs-2"
            target="_blank"
          >
            <i class="bi bi-linkedin mx-2"></i
          ></a>
          <a
            href="https://github.com/dev-azevedo"
            class="text-light fs-2"
            target="_blank"
          >
            <i class="bi bi-github"></i
          ></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.router-link-active {
  /* Estilos para links ativos */
  color: blue;
}

.router-link-exact-active {
  /* Estilos para links ativos que correspondem exatamente à rota atual */
  font-weight: bold;
}
</style>
