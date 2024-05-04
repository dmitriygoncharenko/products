import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/assets/styles/normalize.scss";
import {pinia} from "@/pinia";

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
