import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null); // Untuk modal detail

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`https://lokerbima.vercel.app/api/jobs/applications/user/${user.id}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          Silakan <a href="/login">login</a> untuk melihat lamaran.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h2 className="mb-4 text-primary">Lamaran Saya</h2>

      {applications.length === 0 ? (
        <div className="alert alert-info">Belum ada lamaran.</div>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div className="col-md-6" key={app.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>{app.title}</h5>
                  <p>{app.company_name} • {app.location}</p>
                  <p><strong>Gaji:</strong> {app.salary}</p>
                  <p className="text-muted">
                    Dilamar pada {new Date(app.created_at).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setSelectedApp(app)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Lamaran */}
      {selectedApp && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setSelectedApp(null)}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedApp.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedApp(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Perusahaan:</strong> {selectedApp.company_name}</p>
                <p><strong>Lokasi:</strong> {selectedApp.location}</p>
                <p><strong>Gaji:</strong> {selectedApp.salary}</p>
                <hr />
                <p><strong>Pesan Lamaran:</strong></p>
                <pre style={{
                   whiteSpace: 'pre-wrap',
                   wordWrap: 'break-word',
                   overflowX: 'auto',
                   maxWidth: '100%'
                 }}>{selectedApp.message}</pre>
                <p className="text-muted">
                  Dilamar pada {new Date(selectedApp.created_at).toLocaleString()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedApp(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplications;
