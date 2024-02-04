import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import './output.css'
import './telegram.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import routes from "./routes.js";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from "primevue/toastservice";

const router = createRouter({
  history: createWebHistory(), routes,
})

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .mount('#app')
