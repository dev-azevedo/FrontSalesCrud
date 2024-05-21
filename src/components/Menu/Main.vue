<template>
  <nav class="bg-slate-900 flex flex-col items-center">
    <router-link
      to="/"
      class="text-slate-900 text-4xl p-20 w-full flex items-center justify-center bg-emerald-400"
      >SalesCrud</router-link
    >
    <ul class="text-white mt-10 text-lg w-full px-2">
      <li class="border-b pt-5">
        <router-link
          to="/"
          exactActiveClass="text-emerald-400 font-bold"
          class="pl-5 hover:opacity-50 transition ease duration-300"
          ><i class="bi bi-basket"></i> Vendas</router-link
        >
      </li>
      <li class="border-b pt-5">
        <router-link
          to="/clientes"
          exactActiveClass="text-emerald-600 font-bold"
          class="pl-5 hover:opacity-50 transition ease duration-300"
          ><i class="bi bi-person"></i> Clientes</router-link
        >
      </li>
      <li class="border-b pt-5">
        <router-link
          to="/produtos"
          exactActiveClass="text-emerald-600 font-bold"
          class="pl-5 hover:opacity-50 transition ease duration-300"
          ><i class="bi bi-box-seam"></i> Produtos</router-link
        >
      </li>
    </ul>
    <div class="flex-col items-center justify-center gap-2 mt-10">
      <span class="text-xl text-white"> Jhonatan Azevedo </span>
      <div class="text-center">
        <a
          href="https://www.linkedin.com/in/dev-azevedo/"
          class="text-light fs-2"
          target="_blank"
        >
          <i
            class="bi bi-linkedin mx-2 text-white text-lg hover:text-emerald-400 transition ease duration-300"
          ></i
        ></a>
        <a
          href="https://github.com/dev-azevedo"
          class="text-light fs-2"
          target="_blank"
        >
          <i
            class="bi bi-github text-white text-lg hover:text-emerald-400 transition ease duration-300"
          ></i
        ></a>
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
