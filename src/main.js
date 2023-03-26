import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import Provider from "@/components/provider.vue";
import router from "./router";

document.title = import.meta.env.VITE_PROJECT_NAME;
const app = createApp(Provider);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");
