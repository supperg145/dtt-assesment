import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/scss/main.scss";

const pinia = createPinia();

// Create the Vue app and use Pinia and the router
createApp(App).use(pinia).use(router).mount("#app");
