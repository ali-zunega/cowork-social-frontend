// Usamos useMemo para que no cambien en cada render
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";
import FollowButton from "../components/FollowButton";
// Usamos el mismo css para ambas paginas
import "./FollowList.css";

const FollowersList = () => {
  // Generamos la lista aleatoria solo una vez al cargar el componente
  const randomFollowers = useMemo(() => {
    //  Clonamos el array para no modificar el original
    const shuffled = [...mockUsers]

      .sort(() => 0.5 - Math.random())
      // Tomamos 5 usuarios aleatorios del mockUsers
      .slice(0, 5);
    return shuffled;
  }, []);

  return (
    <div className="follow-list-page container main-content">
      <div className="list-header">
        <Link to="/profile/me" className="back-link">
          ← Volver
        </Link>
        <h1>Seguidores</h1>
        <p className="text-secondary">Gente que te sigue</p>
      </div>

      <div className="users-grid">
        {randomFollowers.map((user) => (
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
    </div>
  );
};

export default FollowersList;
