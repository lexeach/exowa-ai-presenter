import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://exowa-presenter-backend.onrender.com",
  headers: {
    "Content-Type":
      "application/json"
  }
});

export default apiClient;
