import { defineStore } from "pinia";
import { computed, reactive } from "vue";
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

  const getTokenStorage = () => {
    return new Promise((resolve, reject) => {
      const storage = localStorage.getItem("@salesCrud");

      if (storage) {
        const token = JSON.parse(storage);

        if (token)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return api
          .get("/auth/validate")
          .then(({data}) => {
            if (data.token) {
              setUser(data);
              resolve(token);
              return;
            }

            resolve(null);
          })
          .catch((error) => {
            logout();
            reject(error);
            return;
          });
      }

      resolve(null);
    });
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

  return {
    setUser,
    getUser,
    getToken,
    getTokenStorage,
    logout,
  };
});
