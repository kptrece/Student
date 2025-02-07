
import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/assets/vendor/aos/aos.css";
import "@/assets/vendor/glightbox/css/glightbox.min.css";
import "@/assets/vendor/swiper/swiper-bundle.min.css";
import "@/assets/css/main.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
