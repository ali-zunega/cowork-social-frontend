import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";
import FollowButton from "../components/FollowButton";
// Usamos el mismo css para ambas paginas
import "./FollowList.css";

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("followers");

    let followersIds = [];

    if (!stored) {
      // Generamos la lista aleatoria solo una vez al cargar el componente
      const random = [...mockUsers]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((u) => u.id);

      localStorage.setItem("followers", JSON.stringify(random));
      followersIds = random;
    } else {
      followersIds = JSON.parse(stored);
    }

    const normalizedIds = followersIds.map((id) => id.toString());

    const filtered = mockUsers.filter((user) =>
      normalizedIds.includes(user.id.toString()),
    );

    setFollowers(filtered);

    // console.log("followersIds:", followersIds);
    // console.log("filtered:", filtered);
  }, []);

  return (
    <div className="follow-list-page container main-content">
      <div className="list-header">
        <Link to="/profile/me" className="back-link">
          <FaArrowLeft /> <span> Volver</span>
        </Link>
        <h1>Seguidores</h1>
        <p className="text-secondary">Gente que te sigue</p>
      </div>

      {followers.length === 0 ? (
        <div className="empty-state">
          <p>Aún no tienes seguidores.</p>
        </div>
      ) : (
        <div className="users-grid">
          {followers.map((user) => (
            <div key={user.id} className="user-card card">
              <div className="user-info">
                {/* mockUsers no tiene avatar cargado */}
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
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersList;
