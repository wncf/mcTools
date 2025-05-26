import { createPinia } from "pinia";
import vxeTable from "./vxeTable";
import antdv from "./antdv";
const pinia = createPinia();
export default (app) => {
  app.use(pinia);
  app.use(vxeTable);
  app.use(antdv);
};
