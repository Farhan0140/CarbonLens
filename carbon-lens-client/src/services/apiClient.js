import axios from "axios";

const apiClient = axios.create({
  baseURL:"https://carbon-lens.vercel.app/api/v1",
});

export default apiClient;

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");

    if(token) {
      config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
  },
  
  (error) => Promise.reject(error)
)