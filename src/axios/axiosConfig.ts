import axios, { InternalAxiosRequestConfig } from "axios";

const username = "admin";
const pass = "1234";

const encoded = Buffer.from(username + ":" + pass).toString("base64");

export default axios.create({
  baseURL: "http://localhost:3001/v1/",
  headers: {
    Authorization: "Basic " + encoded,
  },
});

axios.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  config.headers.Authorization = "Basic " + encoded;
  return config;
});
