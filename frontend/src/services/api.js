import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const shortenUrl = (url) =>
  API.post("/shorten", { url });

export const getUrlStats = (shortCode) =>
  API.get(`/stats/${shortCode}`);