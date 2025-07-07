import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {
  const [user, setUser] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`https://lokerbima.vercel.app/api/users/${userData.id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [userData.id]);

  if (!user) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center">
          <img
            src={
              user.photo
                ? `https://lokerbima.vercel.app/uploads/users/${user.photo}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="rounded-circle me-4"
            width="120"
            height="120"
          />
          <div>
            <h4 className="mb-1">{user.name}</h4>
            <p className="text-muted mb-1">
              <i className="bi bi-envelope me-2"></i>{user.email}
            </p>
            <p className="text-muted">
              <i className="bi bi-geo-alt me-2"></i>{user.location || "Belum diatur"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
