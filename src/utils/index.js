import { uniqueId } from "xe-utils";

export function bytesToMB(bytes, decimalPlaces = 1) {
  return (bytes / 1000000).toFixed(decimalPlaces) + " MB";
}
export function validateAddress(address) {
  const list = address.split(":");
  return (
    list.length !== 2 ||
    typeof Number(list[1]) !== "number" ||
    Number(list[1]) > 65535 ||
    Number(list[1]) < 0
  );
}

const themeColors = [
  "#3B5CF0",
  "#B6A2DE",
  "#5AB1EF",
  "#FFB980",
  "#D87A80",
  "#3FB1E3",
  "#6BE6C1",
  "#626C91",
  "#A0A7E6",
  "#A6EBAD",
];

export const serverListFormatter = (dataList) => {
  const servers = [];
  const groupserverList = dataList.filter((i) => i.groupServer);
  dataList.forEach((item) => {
    let params = {
      key: uniqueId(),
      pingStatus: "pending",
      pingLoading: false,
    };

    // 本地添加的地址
    if (typeof item === "string") {
      params.address = item;
      servers.push(params);
      // 远程地址
    } else {
      params.remote = true;
      item.groupId && Object.assign(params, { groupId: item.groupId });
      item.groupName && Object.assign(params, { groupName: item.groupName });

      if (!item.groupServer) {
        item.address && Object.assign(params, { address: item.address });
        servers.push(params);
      } else {
        // 取主题色
        const targetIndex = groupserverList.findIndex(
          (i) => i.groupName === item.groupName
        );
        params.themeColor = themeColors[targetIndex % themeColors.length];
        params.groupServer = true;

        const itemServer = Array.isArray(item.children);
        const serverChildren = itemServer ? item.children : [];
        serverChildren.forEach((citem) => {
          let itemParams = {
            themeColor: params.themeColor,
            groupName: params.groupName,
            remote: true,
            groupId: params.groupId,
            groupServerKey: params.key,
            key: uniqueId(),
            pingStatus: "pending",
            pingLoading: false,
          };
          citem.groupName &&
            Object.assign(itemParams, { groupName: citem.groupName });
          citem.address &&
            Object.assign(itemParams, { address: citem.address });
          servers.push(itemParams);
        });
      }
    }
  });
  return servers;
};
