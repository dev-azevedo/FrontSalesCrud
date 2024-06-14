import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import { createPinia } from 'pinia'
import money from "v-money"
import Vue3Toasity from 'vue3-toastify';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueTheMask)
app.use(money, {precision: 4})
app.use(Vue3Toasity, {
    position: 'bottom-right',
    autoClose: 3000,
});

app.mount('#app')
