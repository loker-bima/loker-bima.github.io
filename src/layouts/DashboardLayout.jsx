// src/layouts/DashboardLayout.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Pindahkan handleLogout ke luar useEffect
  const handleLogout = () => {
    localStorage.removeItem("user"); // atau sesuai key login kamu
    navigate("/");
  };

useEffect(() => {
  // ✅ Cek login
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
    return;
  }

  const toggleBtn = document.getElementById("toggleBtn");
  const closeBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  const isMobile = () => window.innerWidth < 768;

  const handleToggle = () => {
    if (isMobile()) {
      sidebar.classList.toggle("show");
    } else {
      sidebar.classList.toggle("hidden");
      mainContent.classList.toggle("full");
    }
  };

  const handleClose = () => {
    if (isMobile()) {
      sidebar.classList.remove("show");
    } else {
      sidebar.classList.add("hidden");
      mainContent.classList.add("full");
    }
  };

  toggleBtn?.addEventListener("click", handleToggle);
  closeBtn?.addEventListener("click", handleClose);

  const resizeHandler = () => {
    if (isMobile()) {
      sidebar?.classList.remove("hidden");
      mainContent?.classList.remove("full");
    } else {
      sidebar?.classList.remove("show");
    }
  };

  window.addEventListener("resize", resizeHandler);

  return () => {
    toggleBtn?.removeEventListener("click", handleToggle);
    closeBtn?.removeEventListener("click", handleClose);
    window.removeEventListener("resize", resizeHandler);
  };
}, []);


  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <button id="toggleBtn" className="btn btn-outline-dark me-2">
          <i className="bi bi-list"></i>
        </button>
        <h5 className="mb-0">Dashboard</h5>
      </div>

      {/* Sidebar */}
      <div id="sidebar">
        <button id="closeSidebarBtn" className="close-btn">
          <i className="bi bi-x-lg"></i>
        </button>
        <Link to="/dasboardd" className="sidebar-link active">
          <i className="bi bi-speedometer2"></i> Dashboard
        </Link>
        <Link to="/profile" className="sidebar-link">
          <i className="bi bi-person"></i> Profile
        </Link>
        <Link to="/setting" className="sidebar-link">
          <i className="bi bi-gear"></i> Settings
        </Link>
        <hr className="text-secondary" />
        <button
          className="btn btn-danger btn-sm ms-3"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      {/* Main Content */}
      <div id="main-content">
        <div className="container-fluid pt-4 mt-4">{children}</div>
      </div>

      {/* CSS internal tetap sama */}
      <style>{`
        .topbar {
          height: 60px;
          background-color: #fff;
          display: flex;
          align-items: center;
          padding: 0 20px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          z-index: 998;
        }

        #sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #212529;
          color: white;
          padding-top: 60px;
          transition: left 0.3s;
          z-index: 999;
        }

        #sidebar.hidden {
          left: -250px;
        }

        .sidebar-link {
          padding: 12px 20px;
          display: block;
          color: #adb5bd;
          text-decoration: none;
        }

        .sidebar-link:hover,
        .sidebar-link.active {
          background-color: #343a40;
          color: #fff;
        }

        #main-content {
          margin-left: 250px;
          padding: 20px;
          transition: margin-left 0.3s;
        }

        #main-content.full {
          margin-left: 0;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 20px;
          color: #ffffffcc;
          background: none;
          border: none;
        }

        @media (max-width: 768px) {
          #sidebar {
            left: -250px;
          }
          #sidebar.show {
            left: 0;
          }
          #main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
