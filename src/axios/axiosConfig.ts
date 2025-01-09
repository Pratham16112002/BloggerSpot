import { getSession, logout } from "@/actions";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const username = "admin";
const pass = "1234";

const encoded = Buffer.from(username + ":" + pass).toString("base64");

const axiosConfig = axios.create({
  baseURL: process.env.BACK_END_URL,
  headers: {
    Authorization: "Basic " + encoded,
  },
});

axiosConfig.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    if (session.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    if (error.response?.status == 401) {
      await logout();
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
