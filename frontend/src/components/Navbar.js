import React, { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import NotificationDropdown from "./NotificationDropdown";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <h2>CoWork Social</h2>
        </Link>

        <div className="navbar-actions">
          {/* BOTÓN SOLO ICONO (Visible en mobile por CSS) */}
          <button
            className="theme-icon-button mobile-only"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiSun /> : <FiMoon />}
          </button>

          {/* TOGGLE COMPLETO (Visible en desktop por CSS) */}
          <div className="theme-switch-wrapper desktop-only">
            <span className="nav-icon">
              {theme === "light" ? <FiSun /> : <FiMoon />}
            </span>
            <label className="theme-switch">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
                aria-label="Toggle dark mode"
              />
              <div className="slider round"></div>
            </label>
          </div>

          <NotificationDropdown />

          <FiSettings
            className="settings-icon"
            onClick={() => navigate("/settings")}
          />

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/search" onClick={closeMenu}>
              Buscar
            </Link>
          </li>
          <li>
            <Link to="/feed" onClick={closeMenu}>
              Feed
            </Link>
          </li>
          <li>
            <Link to="/profile/me" onClick={closeMenu}>
              Perfil
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
