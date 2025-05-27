import { compareTime } from "@/utils/date";
import { modLoaderType } from "@/config/enumOptions";
import { find, map } from "xe-utils";
import modTypes from "@/locale/modTypes";
export const initQueryList = () => {
  return {
    classId: 6, //传6就对了 6是模组
    categoryId: 0, //类型，如魔法，api
    index: 0, //从index开始计算
    pageSize: 40,
    sortField: 2,
    sortOrder: "desc",
  };
};
export const columns = [
  {
    title: "模组名称",
    field: "name",
    slots: { default: "modName" },
    width: "260",
  },
  {
    title: "版本支持",
    field: "version",
    minWidth: "120",
    slots: { default: "version" },
  },
  {
    title: "模组类型",
    field: "type",
    minWidth: "120",
    slots: { default: "types" },
  },
  {
    title: "最后更新时间",
    field: "dateReleased",
    minWidth: "160",
    formatter: ({ row }) => {
      return compareTime(row.dateReleased);
    },
  },
  {
    title: "作者信息",
    field: "authors",
    minWidth: "120",
    slots: { default: "authors" },
  },
  {
    title: "操作",
    field: "opt",
    fixed: "right",
    width: "120px",
    slots: { default: "opt" },
  },
];
export function formatterData(data) {
  return map(data, (row) => {
    const versionList =
      row.latestFilesIndexes.filter((item, index) => index < 2) || [];
    const tags = [];
    const categories = row.categories
      .map((item) => {
        return modTypes[item.id];
      })
      .filter((i) => Boolean(i));
    for (let key in modLoaderType) {
      const value = modLoaderType[key];
      const target = find(
        versionList,
        (item) => item.modLoader === Number(key)
      );
      if (target) {
        tags.push({
          name: value,
          value: target.gameVersion,
          item: target,
        });
      }
    }
    return {
      ...row,
      tagInfo: tags,
      categories: categories,
    };
  });
}
