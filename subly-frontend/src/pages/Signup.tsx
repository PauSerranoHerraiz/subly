import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const submit = async () => {
        try {
            // 1️⃣ crear usuario
            await api.post("/auth/signup", { email, password, companyName });

            // 2️⃣ login automático
            const res = await api.post("/auth/login", { email, password });

            login(res.data.authToken);
            navigate("/customers");
        } catch (error: any) {
            console.error("Signup error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error during signup");
        }
    };

    return (
        <div>
            <h1>Signup</h1>

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                placeholder="company name"
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <button onClick={submit}>Create account</button>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}
