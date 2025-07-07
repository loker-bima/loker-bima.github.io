// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init();
AOS.refresh();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/"> {/* Ganti sesuai nama repo GitHub */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
