import axios from "axios";

const api = axios.create({
  baseURL: "https://api-challenge.blockinar.io",
});

export { api };