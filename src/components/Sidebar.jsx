import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title" onClick={()=>navigate("/home")}>📰 NewsHub</h1>

      <button className="sidebar-button" onClick={()=>navigate("/home")}>
        Home
      </button>

      <button className="sidebar-button" onClick={()=>navigate("/about")}>
        About Us
      </button>

      <button className="sidebar-button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
