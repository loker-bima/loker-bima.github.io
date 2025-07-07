// src/pages/Pelamar.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";

function Pelamar() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "company") {
      navigate("/login");
    }
  }, [navigate]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`https://lokerbima.vercel.app/api/jobs/${jobId}/applicants`);
      setApplicants(res.data);

      // Ambil juga info job-nya (judul)
      const jobRes = await axios.get(`https://lokerbima.vercel.app/api/jobs/${jobId}`);
      setJobTitle(jobRes.data.title);
    } catch (err) {
      console.error("Gagal memuat pelamar:", err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  return (
    <DashboardLayout>
      <div className="container mt-4">

        {applicants.length === 0 ? (
          <p className="text-muted">Belum ada pelamar.</p>
        ) : (
          <div className="list-group mt-3">
            {applicants.map((a, index) => (
              <div key={index} className="list-group-item">
                <h5>{a.name}</h5>
                <p><strong>Email:</strong> {a.email}</p>
                <pre style={{
                   whiteSpace: 'pre-wrap',
                   wordWrap: 'break-word',
                   overflowX: 'auto',
                   maxWidth: '100%'
                 }}>{a.message}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Pelamar;
