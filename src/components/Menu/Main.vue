<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand me-5 fs-2 text-orange"
        >CamposDalearCrud</router-link
      >

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
              exactActiveClass="text-orange fw-bold"
              class="nav-link"
              >Vendas</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/clientes"
              exactActiveClass="text-orange fw-bold"
              class="nav-link"
              >Clientes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/produtos"
              exactActiveClass="text-orange fw-bold"
              class="nav-link"
              >Produtos</router-link
            >
          </li>
        </ul>
        <div
          class="text-light d-flex align-items-center justify-content-center gap-2"
        >
          Jhonatan Azevedo
          <a
            href="https://www.linkedin.com/in/dev-azevedo/"
            class="text-light fs-2"
            target="_blank"
          >
            <i class="bi bi-linkedin mx-2 link-redes"></i
          ></a>
          <a
            href="https://github.com/dev-azevedo"
            class="text-light fs-2"
            target="_blank"
          >
            <i class="bi bi-github link-redes"></i
          ></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.link-redes:hover {
  color: orange;
  transition: 0.3s ease;
}

.text-orange {
  color: orange !important;
}
</style>
