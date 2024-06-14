import { computed } from "vue";
import { authUser } from "@/store/authStore";

export default async (to, from, next) => {
  const auth = authUser();
  const token = computed(() => auth.getToken);
 
  console.log(to.fullPath);
  console.log(token.value);
  if (to.fullPath == "/inicio" && token.value) {
    console.log("dash");
    return next({ path: "/", replace: true });
  }

  if (!token.value && to.fullPath != "/inicio") {
    console.log("dash 2");
    auth.validateRefreshToken();
    if (!token.value) {
      return next({ name: "init" });
    }

    console.log("dash 3");
    return next({ path: "/", replace: true });
  }


  console.log("dash 4");
  return next();
};
