import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch jobs with filters
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://lokerbima.vercel.app/api/jobs", {
        params: {
          keyword,
          location,
          category_id: categoryId, // Sesuai backend
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Gagal memuat lowongan:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://lokerbima.vercel.app/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleReset = () => {
    setKeyword("");
    setLocation("");
    setCategoryId("");
    fetchJobs();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5 text-center mt-5">
        <div className="container">
          <h1 className="display-5 fw-bold text-primary">Temukan Pekerjaan Impianmu</h1>
          <p className="lead">Cari pekerjaan berdasarkan lokasi, kategori, dan keahlianmu</p>
        </div>
      </section>

      {/* Filter Form */}
      <div className="container py-3">
        <form onSubmit={handleSearch}>
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Kata kunci..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Lokasi..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-primary w-100">Cari</button>
            </div>
          </div>
        </form>
      </div>

      {/* Job List */}
      <div className="container py-4">
        <div className="row">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="alert alert-warning text-center">
              Belum ada lowongan tersedia.
            </div>
          ) : (
            jobs.map((job) => (
              <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {job.company_name}
                    </h6>
                    <p className="mb-1">
                      <i className="bi bi-geo-alt"></i> {job.location}
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-cash"></i> {job.salary}
                    </p>
                    <span className="badge bg-secondary">
                      {job.category_name}
                    </span>
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    <a
                      href={`/job/${job.id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      Lihat Detail
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
