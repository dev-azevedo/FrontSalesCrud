import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import { setupInterceptors } from './services/Api'

const app = createApp(App)
app.use(router)
app.use(VueTheMask)

setupInterceptors(router);

app.mount('#app')
