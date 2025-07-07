
import React, { useState, useEffect } from 'react';


function AboutUs() {


  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white text-center py-5 mt-5">
        <div className="container" data-aos="zoom-in">
          <h1 className="display-4 fw-bold">Tentang Loker Bima</h1>
          <p className="lead">Membuka Jalan Menuju Masa Depan Karier Anda</p>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1170&q=80"
                alt="Loker Bima"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6 mt-3" data-aos="fade-left">
              <h2 className="text-primary fw-bold">Siapa Kami?</h2>
              <p className="mt-3">
                <strong>Loker Bima</strong> adalah platform pencarian kerja inovatif yang mempertemukan pencari kerja dengan perusahaan secara langsung dan efisien.
              </p>
              <p>
                Dibuat dengan teknologi modern, kami bertujuan membantu masyarakat Bima dan sekitarnya menemukan pekerjaan impian dengan cepat dan mudah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Kami */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="text-secondary fw-bold">Misi Kami</h2>
            <p className="text-muted">Membangun koneksi antara perusahaan dan pencari kerja dengan efisiensi dan transparansi.</p>
          </div>
          <div className="row text-center">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <i className="bi bi-search text-primary" style={{ fontSize: "2rem" }}></i>
              <h5 className="mt-3">Pencarian Mudah</h5>
              <p>Cari lowongan berdasarkan lokasi, kategori, dan keahlian dengan antarmuka yang simpel.</p>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-building text-success" style={{ fontSize: "2rem" }}></i>
              <h5 className="mt-3">Kemitraan dengan Perusahaan</h5>
              <p>Perusahaan lokal hingga nasional dapat memposting lowongan dan mengelola pelamar secara langsung.</p>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-person-check text-warning" style={{ fontSize: "2rem" }}></i>
              <h5 className="mt-3">Proses Lamaran Cepat</h5>
              <p>Pelamar cukup daftar, lengkapi profil, dan lamar pekerjaan hanya dalam beberapa klik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container" data-aos="zoom-in-up">
          <h2 className="fw-bold mb-3">Bergabung Bersama Kami</h2>
          <p className="mb-4">Mulai karier Anda hari ini bersama Loker Bima</p>
          <a href="/register" className="btn btn-light btn-lg">
            Daftar Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
