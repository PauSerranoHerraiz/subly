import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Customers", to: "/customers" },
    { name: "Plans", to: "/plans" },
    { name: "Subscriptions", to: "/subscriptions" },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/dashboard" className="flex items-center">
            <img src="/subly-navbar.svg" alt="Subly" className="h-12" />
          </Link>

          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`inline-flex items-center px-1 pt-1 transition ${
                  isActive(link.to)
                    ? "text-lime-400 border-b-2 border-lime-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 p-1 rounded"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-2 ${
                  isActive(link.to) ? "text-lime-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 hover:text-red-400 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
