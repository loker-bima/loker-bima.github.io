import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        const selected = res.data.find((j) => j.id.toString() === id);
        setJob(selected);
      } catch (err) {
        console.error("Gagal ambil data job:", err);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobs/apply", {
        job_id: job.id,
        applicant_id: user.id,
        message,
      });
      setFeedback("Lamaran berhasil dikirim!");
      setMessage("");
    } catch (err) {
      const msg = err.response?.data?.error || "Gagal mengirim lamaran.";
      setFeedback(msg);
    }
  };

  if (!job) return <div className="container py-5 text-center">Memuat...</div>;

  return (
    <div className="container py-5 mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-primary">{job.title}</h2>
      <h5 className="text-muted mb-3">{job.company_name}</h5>

      <p><strong>Lokasi:</strong> {job.location}</p>
      <p><strong>Gaji:</strong> {job.salary}</p>
      <p><strong>Kategori:</strong> {job.category_name}</p>
      <hr />
      <p>{job.description}</p>

      {user?.role === "jobseeker" && (
        <div className="mt-4">
          <h5>Lamar Pekerjaan Ini</h5>
          {feedback && <div className="alert alert-info">{feedback}</div>}
          <form onSubmit={handleApply}>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Tulis pesan untuk perusahaan..."
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Kirim Lamaran</button>
          </form>
        </div>
      )}

      {!user && (
        <div className="alert alert-warning mt-4">
          Silakan <a href="/login">login</a> untuk melamar pekerjaan.
        </div>
      )}
    </div>
  );
}

export default JobDetail;
