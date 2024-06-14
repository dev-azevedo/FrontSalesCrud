import { computed } from "vue";
import { authUser } from "@/store/authStore";

export default async (to, from, next) => {
  const auth = authUser();
  const token = computed(() => auth.getToken);

  if (to.meta?.auth) {
    if (!token.value) 
      await auth.getTokenStorage();

    if (to.fullPath == "/inicio" && token.value) 
      return next({ path: "/", replace: true });

    if (to.fullPath != "/inicio" && !token.value) {
      const newToken = await auth.getTokenStorage();

      if (!newToken) 
        return next({ name: "init", params: { callback: to.fullPath } });
      
      return next();
    }
  }

  return next();
};
