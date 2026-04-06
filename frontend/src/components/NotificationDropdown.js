import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { mockNotifications } from "../data/mockNotifications";
import { formatTimeAgo } from "../utils/dateFormatter";
import "./NotificationDropdown.css";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Cargar datos (localStorage o Mock) al montar el componente
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem("notifications", JSON.stringify(mockNotifications));
    }
  }, []);

  // 2. Calcular el total de no leídas para el Badge
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 3. Función para abrir el dropdown y marcar como leídas
  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    // dispara un delay para retardar el tiempo en que se muestra el contador
    if (!isOpen && unreadCount > 0) {
      setTimeout(() => {
        const updatedNotifications = notifications.map((n) => ({
          ...n,
          read: true,
        }));

        // Actualizamos estado y storage después de unos segundos
        setNotifications(updatedNotifications);
        localStorage.setItem(
          "notifications",
          JSON.stringify(updatedNotifications),
        );

        console.log("Notificaciones marcadas como leídas tras el delay");
      }, 3000);
    }
  };

  // Helper para generar el texto según el tipo
  const getNotificationText = (notif) => {
    switch (notif.type) {
      case "like":
        return `${notif.user} le gustó tu post`;
      case "comment":
        return `${notif.user} comentó en tu post`;
      case "follow":
        return `${notif.user} comenzó a seguirte`;
      default:
        return "Nueva notificación";
    }
  };

  return (
    <div className="notification-container">
      {/* Botón de la Campana */}
      <button className="notification-bell nav-icon" onClick={toggleDropdown}>
        <FiBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Menú Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          <h3>Notificaciones</h3>
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${!notif.read ? "unread" : ""}`}
                >
                  <p>{getNotificationText(notif)}</p>
                  <small>{formatTimeAgo(notif.date)}</small>{" "}
                </div>
              ))
            ) : (
              <p className="no-notifications">No hay notificaciones</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
