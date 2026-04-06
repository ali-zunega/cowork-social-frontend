import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import NotificationDropdown from "./NotificationDropdown";
import "./Navbar.css";

/**
 * Componente de barra de navegación
 * TODO: FE-05 - Mejorar responsive con menú hamburguesa en mobile
 */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <h2>CoWork Social</h2>
        </Link>
        {/* Contenedor de elementos de accion */}
        <div className="navbar-actions">
          {/* Toggle de modo */}
          <div className="theme-switch-wrapper">
            <span className="icon">{theme === "light" ? "🌞" : "🌙"}</span>

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
          {/* Componente de Notificaciones */}
          <NotificationDropdown />
        </div>

        <ul className="navbar-menu">
          <li>
            <Link to="/search">Buscar</Link>
          </li>
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link to="/profile/me">Perfil</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
