import axios from "axios";

const api = axios.create({
   baseURL: "http://34.96.206.251:8080/api", //
  //baseURL: "http://34.96.206.251:8080/api", //

  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },

  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default api;
