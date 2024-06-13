<template>
  <form class="flex flex-col w-1/2 p-2">
    <div class="text-8xl spicy-rice-regular mb-16 flex justify-center">
      <span class="text-slate-900">Sales</span>
      <span class="text-emerald-400">Crud</span>
    </div>

    <div class="mb-5">
      <span>Digite seus dados abaixo para acessar sua conta.</span>
    </div>
    <input
      type="email"
      placeholder="Email"
      class="mb-3 rounded-md p-2 border outline-emerald-400"
      v-model="email"
    />

    <div class="focus-within:border-emerald-400 rounded-md p-2 border flex">
      <input
        :type="typeInputPassword"
        placeholder="Senha"
        class="outline-none w-full"
        v-model="password"
      />
        <button
           v-if="typeInputPassword === 'password'"
          type="button"
          @click="typeInputPassword = 'text'"
        >
          <i class="bi bi-eye text-xl"></i>
        </button>
        
        <button
        v-else
          type="button"
          @click.prevent="typeInputPassword = 'password'"
        >
          <i class="bi bi-eye-slash text-xl"></i>
        </button>
    </div>

    <div class="mb-10 flex justify-end">
      <span class="text-emerald-400 cursor-pointer">Esqueceu sua senha?</span>
    </div>
    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="bg-emerald-400 text-white rounded-md p-2"
        @click="signIn()"
        :disabled="disabledSendBtn"
      >
        Entrar
      </button>

      <button
        type="button"
        class="bg-slate-900 text-white rounded-md p-2"
        @click="emit('styleInit', '-translate-x-1/3')"
      >
        Não tem conta? Cadastre-se
      </button>
    </div>
  </form>
</template>

<script setup>
import api from "@/services/Api";
import { computed, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import toast from "@/services/Toast";
import { authUser } from "@/store/authStore";

const useAuthStore = authUser();
const router = useRouter();
const emit = defineEmits(["styleInit"]);
const email = ref("");
const password = ref("");
const typeInputPassword = ref("password");

const disabledSendBtn = computed(() => !email.value || !password.value);

const signIn = async () => {
  try {
    const { status, data } = await api.post("/auth/signin", {
      email: email.value,
      password: password.value,
    });

    useAuthStore.setUser(data);
    status === 200 && router.push("/");
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) => {
        toast.error(error.message, {
          autoClose: false,
        });
      });
    }
  }
};
</script>

<style scoped>
</style>