import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.GATSBY_WPGRAPHQL_URL}`,
});

api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
