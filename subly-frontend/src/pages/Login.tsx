import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("🔐 Sending login request...");
      const response = await api.post("/auth/login", { email, password });

      console.log("📦 Response data:", response.data);

      // ✅ Aquí está el cambio - busca authToken primero
      const token = response.data.authToken || response.data.token;

      if (!token) {
        console.error("❌ No token in response:", response.data);
        throw new Error("No token received from server");
      }

      console.log("✅ Login successful");
      console.log("📝 Token:", token.substring(0, 20) + "...");

      localStorage.setItem("token", token);
      console.log("✅ Token saved to localStorage");

      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Login error:", err.message);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
