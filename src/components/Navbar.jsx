import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen w-60 bg-gray-800 text-white flex flex-col items-start p-6 space-y-6 fixed">
      <h1 className="text-2xl font-bold mb-6">NewsHub</h1>

      <button
        onClick={() => navigate("/home")}
        className="flex items-center space-x-2 text-left hover:text-blue-400"
      >
        <span>Home</span>
      </button>

      <button
        onClick={() => navigate("/about")}
        className="flex items-center space-x-2 text-left hover:text-blue-400"
      >
        <span>About Us</span>
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-left mt-auto hover:text-red-400"
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
