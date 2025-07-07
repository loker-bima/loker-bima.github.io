import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function RegisterPerusahaan() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "company", // role default untuk perusahaan
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registrasi berhasil! Silakan login.");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registrasi gagal.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center pt-5 mb-2 text-success">Daftar Akun Perusahaan</h2>
      <p className="text-center text-muted">Silakan isi data perusahaan Anda</p> 

      {/* Tombol navigasi jenis akun */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link to="/register" className="btn btn-outline-primary px-4 py-2">
          Pencari Kerja
        </Link>
        <Link to="/registerPerusahaan" className="btn btn-success px-4 py-2 disabled">
          Perusahaan
        </Link>
      </div>

      

      {/* Form */}
      <form onSubmit={handleRegister}>
        <div className="mb-3 mt-4">
          <label className="form-label">Nama Perusahaan</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Perusahaan</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Notifikasi */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}

        <button type="submit" className="mt-2 btn btn-success w-100">
          Daftar Sebagai Perusahaan
        </button>

        <p className="text-center mt-3">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPerusahaan;
