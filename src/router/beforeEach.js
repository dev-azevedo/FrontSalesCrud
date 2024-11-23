import { computed } from "vue";
import { authUser } from "@/store/authStore";

export default async (to, from, next) => {
  const auth = authUser();
  const token = computed(() => auth.getToken);

  if (to.meta?.auth) {
    if (!token.value) {
      try {
        await auth.getTokenStorage();
      } catch (error) {
        console.log("error: ", error);
      }
    }
      

    if (to.fullPath == "/inicio" && token.value) 
      return next({ path: "/", replace: true });

    if (to.fullPath != "/inicio" && !token.value) {
      try {
        await auth.getTokenStorage();

        if (!token.value)
          return next({ name: "init", params: { callback: to.fullPath } });
        return next();

      } catch (error) {
        return next({ name: "init", params: { callback: to.fullPath } });
      }
    }
  }

  return next();
};
