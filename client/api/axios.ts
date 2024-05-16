import axios from "axios";

const baseUrl = "https://gourmet-ai.vercel.app/api/v1";
const localUrl = "http://192.168.0.108:4200/api/v1";
export default axios.create({
  baseURL: baseUrl,
});
