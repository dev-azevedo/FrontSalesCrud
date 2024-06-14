import { computed } from "vue";
import { authUser } from "@/store/authStore";

export default async (to, from, next) => {
  const auth = authUser();
  const token = computed(() => auth.getToken);
 
  console.log(to.fullPath);
  console.log(token.value);

  if (!token.value) {
    console.log("Passo 1")
    await auth.getTokenStorage();
  }

  if (to.fullPath == "/inicio" && token.value) {
    console.log("Passo 2")
    return next({ path: "/", replace: true });
  }

  if (to.fullPath != "/inicio" && !token.value) {
    console.log("Passo 3");
    const newToken = await auth.getTokenStorage();
    console.log("newToken: ", newToken);

    if (!newToken) {
      return next({ name: "init" });
    }

   console.log("Passo 4");
    return next();
  }


  console.log("Passo 5");
  return next();
};
