import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Setting() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });


  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userData.id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("location", user.location || "");
    if (file) formData.append("photo", file);

    try {
      await axios.put(`http://localhost:5000/api/users/${userData.id}`, formData);
      alert("Profil berhasil diperbarui!");
      window.location.reload();
    } catch (err) {
      alert("Gagal memperbarui profil");
    }
  };

  if (!user) return <div>Loading...</div>;
const handlePasswordChange = (e) => {
  setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
};

const submitChangePassword = async () => {
  try {
    await axios.put(`http://localhost:5000/api/users/change-password/${userData.id}`, passwordForm);
    alert("Password berhasil diganti");
    setPasswordForm({ currentPassword: "", newPassword: "" });
  } catch (err) {
    alert(err.response?.data?.message || "Gagal mengganti password");
  }
};

const handleDeleteAccount = async () => {
  if (!window.confirm("Yakin ingin menghapus akun ini? Tindakan ini tidak bisa dibatalkan!")) return;

  try {
    await axios.delete(`http://localhost:5000/api/users/${userData.id}`);
    alert("Akun berhasil dihapus");
    localStorage.removeItem("user");
    window.location.href = "/";
  } catch (err) {
    alert("Gagal menghapus akun");
  }
};


  return (
    <DashboardLayout>
      <div className="card shadow-sm p-4">
        <div className="d-flex">
          <img
            src={preview || (user.photo ? `http://localhost:5000/uploads/users/${user.photo}` : "https://via.placeholder.com/150")}
            alt="Profile"
            className="rounded-circle me-4"
            width="120"
            height="120"
          />
          <div className="flex-grow-1">
            <div className="mb-2">
              <label>Nama</label>
              <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label>Lokasi</label>
              <input type="text" name="location" className="form-control" value={user.location || ""} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label>Foto Profil</label>
              <input type="file" onChange={handleFileChange} className="form-control" />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleSave}>Simpan</button>
          </div>
          
        </div>
        <div className="card mt-4 p-3">
  <h5>Ganti Password</h5>
  <div className="mb-2">
    <label>Password Lama</label>
    <input
      type="password"
      name="currentPassword"
      className="form-control"
      value={passwordForm.currentPassword}
      onChange={handlePasswordChange}
    />
  </div>
  <div className="mb-2">
    <label>Password Baru</label>
    <input
      type="password"
      name="newPassword"
      className="form-control"
      value={passwordForm.newPassword}
      onChange={handlePasswordChange}
    />
  </div>
  <button className="btn btn-warning" onClick={submitChangePassword}>Ganti Password</button>
</div>

<div className="mt-4">
  <button className="btn btn-outline-danger" onClick={handleDeleteAccount}>
    Hapus Akun
  </button>
</div>

      </div>

    </DashboardLayout>
  );
}

export default Setting;
