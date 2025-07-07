import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useLocation } from "react-router-dom";


function TambahLowongan() {
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
  
  const location = useLocation();
  const jobToEdit = location.state?.job;

  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (jobToEdit) {
      setJobForm({
        title: jobToEdit.title,
        description: jobToEdit.description,
          location: jobToEdit.location,
        salary: jobToEdit.salary,
        category_id: jobToEdit.category_id,
        id: jobToEdit.id, // penting agar bisa dipakai saat PUT
      });
    }
  }, [jobToEdit]);


  const company_id = user?.id;

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleEdit = (job) => {
  setJobForm({
    ...job,
    category_id: job.category_id || "",
  });
};

const handleDelete = async (id) => {
  if (confirm("Yakin ingin menghapus lowongan ini?")) {
    await axios.delete(`https://lokerbima.vercel.app/api/jobs/${id}`);
    fetchJobs();
  }
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
      const res = await axios.get("https://lokerbima.vercel.app/api/categories"); // buat route ini nanti
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

const handleShowApplicants = async (jobId) => {
  const res = await axios.get(`https://lokerbima.vercel.app/api/jobs/${jobId}/applicants`);
  alert(
    res.data.length > 0
      ? res.data.map(a => `${a.name} (${a.email})\n${a.message}`).join("\n\n")
      : "Belum ada pelamar."
  );
};


  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
    <div className="container mt-4">
      

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card mb-4">
        <div className="card-header text-center">Tambah Lowongan Baru</div>
        <div className="card-body">
          <form onSubmit={handlePostJob}>
            <div className="mb-3">
              <label>Judul</label>
              <input type="text" name="title" className="form-control" value={jobForm.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Deskripsi</label>
              <textarea name="description" className="form-control" value={jobForm.description} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Lokasi</label>
              <input type="text" name="location" className="form-control" value={jobForm.location} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Gaji</label>
              <input type="text" name="salary" className="form-control" value={jobForm.salary} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Kategori</label>
              <select name="category_id" className="form-select" value={jobForm.category_id} onChange={handleChange} required>
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary ">
              {jobForm.id ? "Simpan Perubahan" : "Posting Lowongan"}
            </button>

          </form>
        </div>
      </div>

      </div>
    </DashboardLayout>
  );
}

export default TambahLowongan;
