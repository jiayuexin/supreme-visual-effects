import { createApp } from 'vue';
import App from './App.vue';
import SupremeVisualEffects from './index';

const app = createApp(App);

app.use(SupremeVisualEffects);

app.mount('#app');
