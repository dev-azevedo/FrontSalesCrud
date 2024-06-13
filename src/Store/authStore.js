import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import api from "@/services/Api.js";

export const authUser = defineStore("authUser", () => {
  const user = reactive({
    id: null,
    fullName: null,
    email: null,
    role: null,
    token: null,
  });

  const setUser = ({ id, fullName, email, role, token }) => {
    user.id = id;
    user.fullName = fullName;
    user.email = email;
    user.role = role;
    user.token = token;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setLocalStorage(token);
  };

  const setLocalStorage = (token) => {

    localStorage.setItem("@salesCrud", JSON.stringify(token));
  };

  const validateRefreshToken = () => {
    if (!user.value) {
      getTokenStorage();
    }
  };

  const getTokenStorage = () => {
    const storage = localStorage.getItem("@salesCrud");
    if (storage) {
      const token = JSON.parse(storage);
      console.log(token);
    }
  };

  const logout = () => {
    user.id = null;
    user.fullName = null;
    user.email = null;
    user.role = null;
    user.token = null;

    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("@salesCrud");
  };

  const getUser = computed(() => user);
  const getToken = computed(() => user.token);

  watch(
    () => localStorage.getItem("@salesCrud"),
    () => {
      getTokenStorage();
    },
    { immediate: true }
  );

  return {
    setUser,
    getUser,
    getToken,
    validateRefreshToken,
    logout,
  };
});
