import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
import router from './router'
// import Loading from 'vue3-loading-overlay';
// import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const app = createApp(App)
// app.component("VueLoader", Loading)
app.use(createPinia())

app.use(router) 

app.mount('#app')
