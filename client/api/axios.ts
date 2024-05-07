import axios from "axios";

const baseUrl = "http://192.168.0.108:4200/api/v1";

export default axios.create({
  baseURL: baseUrl,
});
