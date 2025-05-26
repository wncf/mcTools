import { request } from "@/utils/request";
const gameId = 432;
export const modList = (params) => {
  return request.get(`/mods/search?gameId=${gameId}`, params);
};
// 获取模组类别
export const getMcClass = (params) => {
  return request.get(`/categories?gameId=${gameId}&classId=${6}`, params);
};
// 获取游戏版本
export const getMcVersion = (params) => {
  return request.get(`/minecraft/version`, params);
};