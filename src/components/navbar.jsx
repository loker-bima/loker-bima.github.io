import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Loker Bima</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Beranda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  {user.role === "company" ? (
                    <a href="/dasboardd" className="nav-link">
                      <FaUser /> {user.name || "User"}
                    </a>
                  ) : (
                    <a href="/lamaran" className="nav-link">
                      <FaUser /> {user.name || "User"}
                    </a>
                  )}
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn nav-link text-white bg-transparent border-0">
                    <FiLogOut /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
