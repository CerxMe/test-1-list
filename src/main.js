import { createApp } from "vue";
import App from './App.vue'
import plugin from './plugin.js';

createApp(App)
    .use(plugin)
    .mount('#app')