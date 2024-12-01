import { registerPlugins } from '@/plugins';
import { createApp } from 'vue';
import App from './App.vue';

const app = registerPlugins(createApp(App));
app.mount('#app');
