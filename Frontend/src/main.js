import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n'


const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')