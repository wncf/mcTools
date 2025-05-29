const key = "PING_MC_LIST";
export const getStore = () => {
  return JSON.parse(window.localStorage.getItem(key)) || [];
};
export const asyncStore = (pingList = []) => {
  window.localStorage.setItem(key, JSON.stringify(pingList));
};
