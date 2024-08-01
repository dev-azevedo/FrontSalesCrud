<template>
  <form
    class="flex flex-col w-full lg:w-1/2 p-10 lg:p-2"
    data-aos="zoom-in"
    data-aos-offset="200"
    data-aos-easing="ease-in-out"
  >
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
      class="mb-3 rounded-md p-2 outline-none border focus:border-b-emerald-400"
      v-model="email"
    />

    <div class="focus-within:border-b-emerald-400 rounded-md border flex">
      <input
        :type="typeInputPassword"
        placeholder="Senha"
        class="outline-none w-full p-2"
        v-model="password"
      />
      <button
        v-if="typeInputPassword === 'password'"
        type="button"
        @click="typeInputPassword = 'text'"
        class="p-1"
      >
        <i class="bi bi-eye text-xl"></i>
      </button>

      <button
        v-else
        type="button"
        @click.prevent="typeInputPassword = 'password'"
        class="p-1"
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
        class="bg-emerald-400 text-white rounded-md p-2 flex justify-center"
        @click="signIn()"
        :disabled="disabledSendBtn || loading"
      >
        <Spinner v-if="loading" :size="'h-6 w-6'" />
        <span v-else>Entrar</span>
      </button>

      <button
        type="button"
        class="bg-slate-900 text-white rounded-md p-2"
        @click="emit('styleInit', true)"
      >
        Não tem conta? Cadastre-se
      </button>
      <button
        type="button"
        class="bg-slate-100 text-slate-900 border rounded-md p-2"
        @click="router.back()"
      >
        Voltar
      </button>
    </div>
  </form>
</template>

<script setup>
import api from "@/services/Api";
import { computed, defineEmits, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import toast from "@/services/Toast";
import { authUser } from "@/store/authStore";
import Spinner from "@/components/Spinner/Main.vue";

const useAuthStore = authUser();
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["styleInit"]);
const email = ref("");
const password = ref("");
const typeInputPassword = ref("password");
const loading = ref(false);

const disabledSendBtn = computed(() => !email.value || !password.value);

const signIn = async () => {
  try {
    loading.value = true;
    const { status, data } = await api.post("/auth/signin", {
      email: email.value,
      password: password.value,
    });

    useAuthStore.setUser(data);
    if (status === 200) {
      if (route.params?.callback) {
        return router.push(route.params.callback);
      }

      router.push("/");
    }
  } catch (err) {
    if (err?.response && err?.response?.data) {
      err.response.data.errors.map((error) =>
        toast.error(error.message, {
          autoClose: false,
        })
      );
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
