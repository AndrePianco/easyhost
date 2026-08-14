import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        <span className="logo-easy">EASY</span>
        <span className="logo-host">HOST</span>
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/servers"
          className={`navbar-link ${isActive('/servers') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Meus servidores
        </Link>
        <Link
          to="/profile"
          className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Meu perfil
        </Link>
        <button className="navbar-lang">
          PT
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </nav>
  );
}
