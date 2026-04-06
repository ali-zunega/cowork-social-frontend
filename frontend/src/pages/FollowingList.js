import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";
import FollowButton from "../components/FollowButton";
import "./FollowList.css"; // Compartiremos estilos para ambas listas

const FollowingList = () => {
  const [followingUsers, setFollowingUsers] = useState([]);

  const loadFollowing = () => {
    const followingIds = JSON.parse(localStorage.getItem("following")) || [];

    // normalizar todos los ids a string
    const normalizedIds = followingIds.map((id) => id.toString());

    const filtered = mockUsers.filter((user) =>
      normalizedIds.includes(user.id.toString()),
    );

    setFollowingUsers(filtered);
  };

  useEffect(() => {
    loadFollowing();
  }, []);

  return (
    <div className="follow-list-page container main-content">
      <div className="list-header">
        <Link to="/profile/me" className="back-link">
          ← Volver
        </Link>
        <h1>Seguidos</h1>
        <p className="text-secondary">Gente a la que sigues</p>
      </div>

      <div className="users-grid">
        {followingUsers.length > 0 ? (
          followingUsers.map((user) => (
            <div key={user.id} className="user-card card">
              <div className="user-info">
                <div className="user-avatar-small">{user.name.charAt(0)}</div>
                <div className="user-details">
                  <h4>{user.name}</h4>
                  <div className="user-skills">
                    {user.skills.map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <FollowButton userId={user.id} onFollowChange={loadFollowing} />
            </div>
          ))
        ) : (
          <div className="empty-state card">
            <p>Aún no estas siguiendo a nadie.</p>
            <Link to="/search" className="btn btn-primary">
              Encuentra personas para seguir
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingList;
