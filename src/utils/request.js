import axios from "axios";
const required = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
});
required.interceptors.request.use(
  (config) => {
    config.headers = {
      "x-api-key": "$2a$10$5xh6SLITQJkV1/N4a73YNusSTCZMsV47K4.zs6MqyAwVi3pkd88je",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
required.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const request = {
  get(url, params) {
    return required.get(url, {
      params,
    });
  },
  post(url, data) {
    return required.post(url, {
      data: data,
    });
  },
};
