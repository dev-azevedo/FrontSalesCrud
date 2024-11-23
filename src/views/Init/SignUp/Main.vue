<template>
  <form
    class="flex flex-col w-full lg:w-1/2 p-10 lg:p-2"
    data-aos="zoom-in"
    data-aos-offset="200"
    data-aos-easing="ease-in-out"
  >
    <div
      class="text-6xl lg:text-8xl spicy-rice-regular mb-16 flex justify-center"
    >
      <span class="text-emerald-400">Sales</span>
      <span class="text-slate-900">Crud</span>
    </div>

    <div class="mb-5">
      <span>Junte-se a nós e aproveite os melhores produtos.</span>
    </div>

    <input
      type="text"
      placeholder="Nome completo"
      class="mb-3 rounded-md p-2 outline-none border focus:border-b-emerald-400"
      v-model="fullName"
    />

    <input
      type="email"
      placeholder="Email"
      class="mb-3 rounded-md p-2 outline-none border focus:border-b-emerald-400"
      v-model.lazy="email"
    />

    <div class="border focus-within:border-b-emerald-400 rounded-md flex mb-3">
      <input
        :type="typeInputPassword"
        placeholder="Senha"
        class="outline-none w-full p-2"
        v-model.lazy="password"
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

    <div class="border focus-within:border-b-emerald-400 rounded-md flex mb-3">
      <input
        :type="typeInputConfirmPassword"
        placeholder="Confirme sua senha"
        class="outline-none w-full p-2"
        v-model.lazy="confirmPassword"
      />
      <button
        v-if="typeInputConfirmPassword === 'password'"
        type="button"
        @click="typeInputConfirmPassword = 'text'"
        class="p-1"
      >
        <i class="bi bi-eye text-xl"></i>
      </button>

      <button
        v-else
        type="button"
        @click.prevent="typeInputConfirmPassword = 'password'"
        class="p-1"
      >
        <i class="bi bi-eye-slash text-xl"></i>
      </button>
    </div>

    <input
      type="text"
      placeholder="Data de nascimento"
      class="mb-1 rounded-md p-2 outline-none border focus:border-b-emerald-400"
      :class="{ 'mb-5': !disabledSendBtn }"
      v-mask="'##/##/####'"
      v-model="birthOfDate"
    />

    <Transition>
      <div
        v-show="disabledSendBtn"
        class="mb-5 flex justify-center transition-all ease-in-out duration-200"
      >
        <span class="text-red-500"
          >*Todos os campos são obrigatórios para cadastrar</span
        >
      </div>
    </Transition>

    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="bg-emerald-400 text-white rounded-md p-2 flex justify-center"
        @click="register()"
        :disabled="disabledSendBtn || loading"
      >
        <Spinner v-if="loading" :size="'h-6 w-6'" />
        <span v-else>Cadastrar</span>
      </button>

      <button
        type="button"
        class="bg-slate-900 text-white rounded-md p-2"
        @click="emit('styleInit', false), resetForm()"
      >
        Já tenho conta
      </button>
    </div>
  </form>
</template>

<script setup>
import api from "@/services/Api";
import { computed, defineEmits, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { validateEmail, formatDate } from "@/services/Helper";
import Spinner from "@/components/Spinner/Main.vue";

const emit = defineEmits(["styleInit"]);

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const birthOfDate = ref("");

const typeInputPassword = ref("password");
const typeInputConfirmPassword = ref("password");
const loading = ref(false);

const disabledSendBtn = computed(
  () =>
    !fullName.value ||
    fullName.value.split(" ").length < 2 ||
    !email.value ||
    !realEmail.value ||
    !password.value ||
    !confirmPassword.value ||
    !!passwordNotMatch.value ||
    !birthOfDate.value
);

const realEmail = computed(() => validateEmail(email.value));

const passwordNotMatch = computed(
  () =>
    password.value &&
    confirmPassword.value &&
    password.value !== confirmPassword.value
);

watch(email, () => {
  if (email.value && !realEmail.value) {
    toast.error("Email inválido. Preencha corretamente.", {
      autoClose: false,
    });
  }
});

watch([password, passwordNotMatch], () => {
  if (password.value && password.value.length < 8) {
    return toast.error(
      `Senha muito curta. Informe uma senha de pelo menos 8 caracteres.`,
      {
        autoClose: false,
      }
    );
  }

  if (passwordNotMatch.value) {
    return toast.error(`Senha incompativel. Preencha corretamente.`, {
      autoClose: false,
    });
  }
});

watch(birthOfDate, (newValue) => {
  if (newValue.includes("/")) {
    const [day, month, year] = newValue.split("/");

    if (!day || !month || !year) return false;

    if (month < 1 || month > 12) {
      birthOfDate.value = "";
      return toast.error(
        `Data inválida. Informe uma data de nascimento válida.`,
        {
          autoClose: false,
        }
      );
    }

    const daysInMonth = year && month && new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      birthOfDate.value = "";
      return toast.error(
        `Data inválida. Informe uma data de nascimento válida.`,
        {
          autoClose: false,
        }
      );
    }

    // Validação do ano
    const currentYear = new Date().getFullYear();
    if ((year.length == 4 && year < 1900) || year > currentYear) {
      birthOfDate.value = "";
      return toast.error(
        `Data inválida. Informe uma data de nascimento válida.`,
        {
          autoClose: false,
        }
      );
    }
  }
});

const register = async () => {
  try {
    loading.value = true;

    const { status } = await api.post("/auth/signup", {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      dateOfBirth: formatDate(birthOfDate.value),
      userRole: 2,
      fullName: fullName.value,
    });

    if (status === 200) {
      toast.success(`Cadastrado realizado com sucesso!`, {
        autoClose: 3000,
      });
      emit("styleInit", false);
      return resetForm();
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  fullName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  birthOfDate.value = "";
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
