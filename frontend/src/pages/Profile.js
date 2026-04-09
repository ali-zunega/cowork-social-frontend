import React, { useState, useEffect } from "react";
import { FiEdit, FiMapPin } from "react-icons/fi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUser } from "../utils/getUser";
import FollowButton from "../components/FollowButton";
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
  // console.log("usuario", user);
  const navigate = useNavigate();

  const [followingCount, setFollowingCount] = useState(user.following || 0);

  useEffect(() => {
    // Si es mi perfil, actualizamos el contador de "Siguiendo" con el localStorage real
    if (userId === "me") {
      const savedFollowing =
        JSON.parse(localStorage.getItem("following")) || [];
      setFollowingCount(savedFollowing.length);
    }
  }, [userId]);

  const handleFollowChange = (isFollowing) => {
    console.log(`User ${userId} following status: ${isFollowing}`);
  };

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
              <div className="profile-actions">
                {userId === "me" ? (
                  <button
                    className="btn btn-secondary btn-with-icon"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <FiEdit />
                    <span>Editar Perfil</span>
                  </button>
                ) : (
                  <FollowButton
                    userId={userId}
                    onFollowChange={handleFollowChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Información del perfil */}
          <div className="profile-info card">
            <h2>{user.name}</h2>

            <p className="profile-location">
              <FiMapPin /> {user.location}
            </p>
            <p className="profile-bio">{user.bio}</p>

            {/* Publicaciones */}
            <div className="profile-stats">
              <div className="stat-item">
                <strong>{user.posts || 0}</strong>
                <span>Publicaciones</span>
              </div>
              {/* Seguidores */}
              <Link to="/followers" className="stat-link">
                <div className="stat-item">
                  <strong>{user.followers || 0}</strong>
                  <span>Seguidores</span>
                </div>
              </Link>
              {/* Seguidos */}
              <Link to="/following" className="stat-link">
                <div className="stat-item">
                  <strong>
                    {userId === "me" ? followingCount : user.following}
                  </strong>
                  <span>Siguiendo</span>
                </div>
              </Link>
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
