import VxeUIAll from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
export default (app) => {
  app.use(VxeUIAll);
  app.use(VxeUITable);
};
