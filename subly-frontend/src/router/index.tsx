import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../auth/ProtectedRoute"
import Customers from "../pages/Customers";
import Plans from "../pages/Plans";
import Subscriptions from "../pages/Subscriptions";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customers" element={<ProtectedRoute> <Customers /> </ProtectedRoute>} />
                <Route path="/plans" element={<ProtectedRoute> <Plans /> </ProtectedRoute> } />
                <Route path="/subscriptions" element={ <ProtectedRoute> <Subscriptions /> </ProtectedRoute> }/> 
                <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /> </ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
