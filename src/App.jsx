import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import JobDetail from './pages/JobDetail';
import MyApplications from './pages/MyApplications';
import RegisterPerusahaan from './pages/RegisterPerusahaan';
import Profile from './pages/Profile';
import Dasboardd from './pages/Dasboardd';
import TambahLowongan from './pages/TambahLowongan';
import Pelamar from './pages/Pelamar';
import Setting from './pages/Setting';
import AboutUs from './pages/AboutUs';

// Komponen wrapper untuk mengatur tampilan layout
function LayoutWrapper({ children }) {
  const location = useLocation();

  const hideLayoutOn = [
    '/dashboard',
    '/profile',
    '/dasboardd',
    '/tambah-lowongan',
    '/pelamar/:jobId',
    '/setting',
  ];

  const matchDynamicRoute = (routePattern, currentPath) => {
    const pattern = "^" + routePattern.replace(/:\w+/g, "[^/]+") + "$";
    return new RegExp(pattern).test(currentPath);
  };

  const shouldHideLayout = hideLayoutOn.some(path =>
    path.includes(":")
      ? matchDynamicRoute(path, location.pathname)
      : path === location.pathname
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}


// Gunakan wrapper ini agar <useLocation /> berfungsi
function AppContent() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/lamaran" element={<MyApplications />} />
        <Route path="/RegisterPerusahaan" element={<RegisterPerusahaan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dasboardd" element={<Dasboardd />} />
        <Route path="/tambah-lowongan" element={<TambahLowongan />} />
        <Route path="/pelamar/:jobId" element={<Pelamar />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/about" element={<AboutUs />} />



      </Routes>
    </LayoutWrapper>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
