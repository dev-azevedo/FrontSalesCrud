import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import { setupInterceptors } from './services/Api'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(VueTheMask)
app.use(pinia)
setupInterceptors(router);

app.mount('#app')
