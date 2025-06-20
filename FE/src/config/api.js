import axios from "axios";

const api = axios.create({
   baseURL: "https://hagworkshop.site/api", //
  // https://hagworkshop.site/

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
