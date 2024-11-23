import { defineStore } from "pinia";

export const salesCrudStore = defineStore("salesCrudStore", () => {
  const resetScroll = () => {
    document.querySelector("#base").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return {
    resetScroll,
  };
});
