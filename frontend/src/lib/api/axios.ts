import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

export default axios.create({
  baseURL: BASE_URL,
});
