import { request } from "@/utils/request";
import axios from "axios";
const gameId = 432;
export const modList = (params) => {
  return request.get(`/mods/search?gameId=${gameId}`, params);
};
// 获取模组类别
export const getMcClass = (params) => {
  return request.get(`/categories?gameId=${gameId}&classId=${6}`, params);
};

// 获取游戏mod文件
export const getMcModFiles = ({ modeId, ...args }) => {
  return request.get(`/mods/${modeId}/files`, args);
};

// 获取游戏版本
export const getMcVersion = (params) => {
  return request.get(`/minecraft/version`, params);
};

export const pingJavaMc = (params) => {
  return axios
    .get(`https://getmc.9876123.xyz/api/ping`, {
      params: params,
    })
    .then((res) => res.data);
};

export const getMcList = (params) => {
  return axios
    .get(`https://getmc.9876123.xyz/api/servers`, {
      params: params,
    })
    .then((res) => res.data);
};
