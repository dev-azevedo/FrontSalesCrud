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

  const getUser = computed(() => user);
  const getToken = computed(() => user.token);

  const setUser = ({ id, fullName, email, token }) => {
    user.id = id;
    user.fullName = fullName;
    user.email = email;
    user.token = token;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLocalStorage(token);
  };

  const setLocalStorage = (token) => {
    localStorage.setItem("@salesCrud", JSON.stringify(token));
  };



  const getTokenStorage = async () => {
    console.log("chamou");
    const storage = localStorage.getItem("@salesCrud");
 
    if (storage) {
      const token = JSON.parse(storage);

      if (token)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;


      try {
        const response = await api.get("/auth/validate");
        if (response.data.token) {
          setUser(response.data);
        } 
      } catch (error) {
        console.log("error", error);
      }
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



  watch(
    () => localStorage.getItem("@salesCrud"),
    async () => {
      await getTokenStorage();
    },
    { immediate: true }
  );

  return {
    setUser,
    getUser,
    getToken,
    getTokenStorage,
    logout,
  };
});
