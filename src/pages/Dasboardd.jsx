// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from "../layouts/DashboardLayout";
import axios from 'axios';

function Dashboard() {
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    category_id: "",
  });

  const [jobList, setJobList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const company_id = user?.id;

  useEffect(() => {
    if (!user || user.role !== "company") {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

const handleEdit = (job) => {
  navigate("/tambah-lowongan", { state: { job } });
};


  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus lowongan ini?")) {
      try {
        await axios.delete(`https://lokerbima.vercel.app/api/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        console.error("Gagal menghapus lowongan:", err);
      }
    }
  };

  const handleShowApplicants = (jobId) => {
    navigate(`/pelamar/${jobId}`);
  };


  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://lokerbima.vercel.app/api/jobs");
      const jobsByCompany = res.data.filter((job) => job.company_id === company_id);
      setJobList(jobsByCompany);
    } catch (err) {
      console.error("Gagal memuat lowongan:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://lokerbima.vercel.app/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...jobForm, company_id };

      if (jobForm.id) {
        await axios.put(`https://lokerbima.vercel.app/api/jobs/${jobForm.id}`, payload);
      } else {
        await axios.post("https://lokerbima.vercel.app/api/jobs", payload);
      }

      setMessage("Lowongan berhasil disimpan!");
      setJobForm({ title: "", description: "", location: "", salary: "", category_id: "" });
      fetchJobs();
    } catch (err) {
      console.error("Gagal menyimpan lowongan:", err);
      setMessage("Gagal menyimpan lowongan.");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
          <h3>Lowongan Anda</h3>
          <Link to="/tambah-lowongan" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Tambah Lowongan Baru
          </Link>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        <div className="row">
          {jobList.map((job) => (
            <div className="col-md-6 mb-3" key={job.id}>
              <div className="card">
                <div className="card-body">
                  <h5>{job.title}</h5>
                  <p>{job.location} • {job.salary}</p>
                  <p className="text-muted">{job.category_name || "Tidak ada kategori"}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(job)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(job.id)}>Hapus</button>
                    <button className="btn btn-sm btn-outline-info" onClick={() => handleShowApplicants(job.id)}>Lihat Pelamar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
