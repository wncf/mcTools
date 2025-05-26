import { optionsApiByKey } from "@/config/options";
import { defineStore } from "pinia";
export const useAppBaseStore = defineStore("appBaseStore", {
  state: () => ({
    options: {
      classOptions: [],
      versionOptions: [],
    },
  }),
  actions: {
    fetchOptioons() {
      const apiList = optionsApiByKey.map((item) => {
        return item.api().then((res) => {
          const target = this.options[item.key];
          const list = item.getData(res.data);
          if (Array.isArray(target)) {
            target.splice(0, target.length, ...list);
          } else {
            this.options[item.key] = list;
          }
        });
      });
      Promise.allSettled(apiList);
    },
  },
});
