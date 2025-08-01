import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'
import './assets/css/global.css' 


const app = createApp(App)
app.use(router) 
app.mount('#app')