import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import Homepage from './pages/Homepage';
import MyServers from './pages/MyServers';
import MyProfile from './pages/MyProfile';
import AddHost from './pages/AddHost';
import HostDetail from './pages/HostDetail';
import './App.css';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page — no navbar */}
        <Route path="/" element={<LoginRegister />} />

        {/* Pages with navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/servers" element={<MyServers />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/add-host" element={<AddHost />} />
          <Route path="/host/:id" element={<HostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
