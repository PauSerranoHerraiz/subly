import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    console.log("📤 Sending request with token:", token ? "✅ exists" : "❌ missing");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token added to header");
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("📥 Response error:", error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      console.log("🔓 Token expired or invalid, redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default api;
