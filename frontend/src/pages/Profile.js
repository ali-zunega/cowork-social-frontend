import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";
import "./Profile.css";

/**
 * Página de perfil de usuario
 *
 * TODO: FE-03 - Implementar:
 * - Modo edición del perfil
 * - Upload de foto de perfil
 * - Sección de skills
 * - Lista de publicaciones del usuario
 * - Botón de seguir/dejar de seguir
 */
const Profile = () => {
  const { userId } = useParams();

  const user = getUser();
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          {/* Header con cover y avatar */}
          <div className="profile-header">
            <div className="profile-cover"></div>
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              {userId === "me" && (
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/profile/edit")}
                >
                  ✏️ Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* Información del perfil */}
          <div className="profile-info card">
            <h2>{user.name}</h2>
            <p className="profile-location">📍 {user.location}</p>
            <p className="profile-bio">{user.bio}</p>

            {/* Stats */}
            <div className="profile-stats">
              <div className="stat-item">
                <strong>{user.posts || 0}</strong>
                <span>Publicaciones</span>
              </div>
              <div className="stat-item">
                <strong>{user.followers || 0}</strong>
                <span>Seguidores</span>
              </div>
              <div className="stat-item">
                <strong>{user.following || 0}</strong>
                <span>Siguiendo</span>
              </div>
            </div>

            {/* Skills */}
            <div className="profile-skills">
              <h3>Habilidades</h3>
              <div className="skills-list">
                {user.skills?.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Publicaciones del usuario */}
          <div className="profile-posts">
            <h3>Publicaciones</h3>
            <p className="coming-soon">
              Las publicaciones del usuario se mostrarán aquí...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
