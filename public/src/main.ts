import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import 'aos/dist/aos.css';

import { createApp } from 'vue'
import App from './App.vue';
import router from './router';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createHead } from '@unhead/vue';
const head = createHead

const app = createApp(App)

app.use(router);
app.use(head);
app.use(ToastPlugin,{
    position: 'bottom'
});

app.mount('#app')
