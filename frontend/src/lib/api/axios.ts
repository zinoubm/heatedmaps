import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";
// remove
console.log(BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
});
