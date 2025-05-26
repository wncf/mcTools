import { createApp } from "vue";
import router from "@/router/index";
import "./style/main.css";
import App from "./App.vue";
import plugins from "./plugins";
const app = createApp(App);
app.config.errorHandler = (err, instance, info) => {
  console.log(`---${info}---`);
  console.error(err.message);
  console.log(`------`);
};

app.use(router).use(plugins).mount("#app");
