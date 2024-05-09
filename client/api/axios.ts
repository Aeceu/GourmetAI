import axios from "axios";

const baseUrl = "https://gourmet-ai.vercel.app/api/v1";

export default axios.create({
  baseURL: baseUrl,
});
