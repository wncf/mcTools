import { getMcClass, getMcVersion } from "@/api/mc";
import modTypes from "@/locale/modTypes";

import { toArrayTree } from "xe-utils";
export const optionsApiByKey = [
  {
    key: "classOptions",
    api: getMcClass,
    getData: (data) => {
      const list = data || [];
      const localList = list.map((i) => {
        return {
          ...i,
          name: modTypes[i.id],
        };
      });
      const sortList = toArrayTree(localList, {
        key: "id",
        parentKey: "parentCategoryId",
      });
      return sortList;
    },
  },
  {
    key: "versionOptions",
    api: getMcVersion,
    getData: (data) => {
      const list = data || [];
      return list.map((i) => {
        return {
          label: i.versionString,
          value: i.versionString,
        };
      });
    },
  },
];
