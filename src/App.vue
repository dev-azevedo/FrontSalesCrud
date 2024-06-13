<template>
  <router-view />
</template>

<style>
/* slate-900 */
/* amber-500 */
/* emerald-400 */
/* amber-200 */

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box !important;
}

button:hover {
  opacity: 0.5 !important;
  transition: all ease 0.3s;
}

button:disabled{
  opacity: .5 !important;
  cursor: not-allowed !important;
}

.spicy-rice-regular {
  font-family: "Spicy Rice", serif;
  font-weight: 400;
  font-style: normal;
}

</style>
