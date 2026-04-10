import React, { useState, useEffect } from "react";
import SettingsSection from "../components/SettingsSection";
import { useNavigate } from "react-router-dom";
import {
  MdNotifications,
  MdLock,
  MdLanguage,
  MdAccountCircle,
  MdSave,
  MdWarning,
  MdEmail,
  MdVpnKey,
  MdCheckCircle,
  MdLogout,
} from "react-icons/md";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("cowork-settings");
    return saved
      ? JSON.parse(saved)
      : {
          username: "alita_dev",
          email: "alicia@example.com",
          notifications: true,
          emailAlerts: true,
          privacy: "public",
          language: "es",
        };
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    account: "",
    password: "",
  });

  const [successType, setSuccessType] = useState(null);

  const successMessages = {
    account: "Perfil actualizado correctamente",
    password: "Contraseña actualizada correctamente",
    delete: "Cuenta eliminada correctamente",
  };

  // guarda automaticamente las preferencias seleccionadas
  useEffect(() => {
    const currentData =
      JSON.parse(localStorage.getItem("cowork-settings")) || {};

    const newData = {
      ...currentData,
      notifications: settings.notifications,
      emailAlerts: settings.emailAlerts,
      privacy: settings.privacy,
      language: settings.language,
    };

    localStorage.setItem("cowork-settings", JSON.stringify(newData));
  }, [
    settings.notifications,
    settings.emailAlerts,
    settings.privacy,
    settings.language,
  ]);

  // validación simple email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // actualizar cuenta
  const handleUpdateAccount = () => {
    setErrors((prev) => ({ ...prev, account: "" }));

    const username = settings.username.trim();
    const email = settings.email.trim();

    if (!username) {
      setErrors((prev) => ({
        ...prev,
        account: "El nombre de usuario no puede estar vacío.",
      }));
      return;
    }

    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        account: "Por favor, ingresa un email válido.",
      }));
      return;
    }

    const currentData =
      JSON.parse(localStorage.getItem("cowork-settings")) || {};

    localStorage.setItem(
      "cowork-settings",
      JSON.stringify({
        ...currentData,
        username,
        email,
      }),
    );

    setSuccessType("account");
    setTimeout(() => setSuccessType(null), 3000);
  };

  // Cambios generales
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Actualizar contraseña
  const handleUpdatePassword = () => {
    setErrors((prev) => ({ ...prev, password: "" }));

    if (!passwords.current) {
      setErrors((prev) => ({
        ...prev,
        password: "Debes ingresar la contraseña actual.",
      }));
      return;
    }

    if (passwords.new.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "La contraseña debe tener al menos 8 caracteres.",
      }));
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setErrors((prev) => ({
        ...prev,
        password: "Las nuevas contraseñas no coinciden.",
      }));
      return;
    }

    if (passwords.current === passwords.new) {
      setErrors((prev) => ({
        ...prev,
        password: "La nueva contraseña no puede ser igual a la actual.",
      }));
      return;
    }

    // OK
    setPasswords({ current: "", new: "", confirm: "" });
    setSuccessType("password");

    setTimeout(() => setSuccessType(null), 4000);
  };

  const [confirmAction, setConfirmAction] = useState(null);
  const handleConfirm = (type) => {
    setConfirmAction({ type });
  };

  const handleCancel = () => {
    setConfirmAction(null);
  };

  const handleAccept = () => {
    if (confirmAction.type === "delete") {
      localStorage.removeItem("cowork-settings");

      // resetear estado (mock)
      setSettings({
        username: "Alicia Dev",
        email: "alicia@example.com",
        notifications: true,
        emailAlerts: true,
        privacy: "public",
        language: "es",
      });

      // exito eliminando usuario
      setSuccessType("delete");
      setTimeout(() => {
        setSuccessType(null);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 2500);
    }

    if (confirmAction.type === "logout") {
      handleLogout();
    }

    setConfirmAction(null);
  };
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // función para mostrar el icono correcto en el modal de confirmación
  const getIcon = () => {
    if (confirmAction.type === "delete")
      return <MdWarning className="warning-icon" />;
    if (confirmAction.type === "logout")
      return <MdLogout className="logout-icon" />;
  };

  return (
    <div className="settings-container container">
      <header className="settings-hero">
        <h1>Configuración</h1>
        <p>Seguridad y preferencias de tu cuenta</p>
      </header>

      <div className="settings-layout">
        {/* Cuenta */}
        <div className="section-user">
          <SettingsSection title="Cuenta y Seguridad" icon={<MdVpnKey />}>
            <div className="account-info-block">
              <div className="user-fields-grid">
                <div className="setting-item">
                  <label>
                    <MdAccountCircle /> Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={settings.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="setting-item">
                  <label>
                    <MdEmail /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </div>

                {errors.account && (
                  <p className="error-message">{errors.account}</p>
                )}
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={handleUpdateAccount}
              >
                Actualizar Perfil
              </button>
            </div>

            <hr className="settings-divider" />

            {/* Password */}
            <div className="password-fields">
              <label>Cambiar Contraseña</label>

              <div className="password-grid">
                <input
                  type="password"
                  placeholder="Actual"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      current: e.target.value,
                    }))
                  }
                />
                <input
                  type="password"
                  placeholder="Nueva"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      new: e.target.value,
                    }))
                  }
                />
                <input
                  type="password"
                  placeholder="Confirmar"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="password-actions">
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}

                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleUpdatePassword}
                >
                  Actualizar Password
                </button>
              </div>
            </div>
          </SettingsSection>
        </div>

        {/* Notificaciones */}

        <div className="section-notifications preferences">
          <SettingsSection title="Notificaciones" icon={<MdNotifications />}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Alertas
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
              />
              Email
            </label>
          </SettingsSection>
        </div>

        {/* Privacidad */}
        <div className="section-privacy preferences">
          <SettingsSection title="Privacidad" icon={<MdLock />}>
            <select
              name="privacy"
              value={settings.privacy}
              onChange={handleChange}
            >
              <option value="public">Público</option>
              <option value="private">Privado</option>
            </select>
          </SettingsSection>
        </div>

        {/* Idioma */}
        <div className="section-language preferences">
          <SettingsSection title="Idioma" icon={<MdLanguage />}>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </SettingsSection>
        </div>

        {/* Danger zone */}
        <div className="section-danger">
          <SettingsSection
            title="Zona de Peligro"
            icon={<MdWarning className="danger-icon" />}
          >
            <div className="danger-actions">
              <button
                className="btn btn-secondary"
                onClick={() => handleConfirm("logout")}
              >
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
              </button>

              <button
                className="btn-danger-minimal"
                onClick={() => handleConfirm("delete")}
              >
                Eliminar cuenta
              </button>
            </div>
          </SettingsSection>
        </div>
      </div>

      {/* Modal Exito */}
      {successType && (
        <div
          className={`success-toast ${successType === "delete" ? "danger" : ""}`}
        >
          <MdCheckCircle />
          <span>{successMessages[successType]}</span>
        </div>
      )}
      {/* modal confirmacion */}
      {confirmAction && (
        <div className="confirm-overlay">
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">{getIcon()}</div>
            <p>¿Estás seguro?</p>
            <div className="confirm-actions">
              <button onClick={handleAccept}>Sí</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}

      <footer className="settings-footer">
        <MdSave /> Los cambios de preferencia se guardan automáticamente
      </footer>
    </div>
  );
};

export default Settings;
