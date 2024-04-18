import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './output.css'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { router } from './router.js'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .mount('#app')
