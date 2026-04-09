import React, { useState } from "react";
import { FiPlus, FiMinus, FiSearch } from "react-icons/fi";
import normalizeText from "../utils/normalizeText";
import "./Search.css";
import { mockUsers } from "../data/mockUsers";

const Search = () => {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 1. Obtener todas las skills únicas
  const allSkills = [...new Set(mockUsers.flatMap((user) => user.skills))];

  // 2. Lógica para mostrar solo algunas o todas
  const VISIBLE_FIELDS = 5;
  const displayedSkills = showAllFilters
    ? allSkills
    : allSkills.slice(0, VISIBLE_FIELDS);

  // Filtrado de usuarios (limpiado de redundancias)
  const filteredUsers = mockUsers.filter((user) => {
    const searchLower = normalizeText(search);
    const matchesSearch =
      normalizeText(user.name).includes(searchLower) ||
      user.skills.some((skill) => normalizeText(skill).includes(searchLower));

    const matchesSkill = !selectedSkill || user.skills.includes(selectedSkill);

    return matchesSearch && matchesSkill;
  });

  return (
    <div className="search-container">
      <h1 className="search-title">Explorar Comunidad</h1>

      <div className="search-input-wrapper">
        <FiSearch className="search-icon-inside" />
        <input
          type="text"
          placeholder="Buscar por nombre o tecnología..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters-section">
        <div
          className={`skills-filter ${showAllFilters ? "expanded" : "collapsed"}`}
        >
          <button
            onClick={() => setSelectedSkill(null)}
            className={!selectedSkill ? "active" : ""}
          >
            Todas
          </button>

          {displayedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={selectedSkill === skill ? "active" : ""}
            >
              {skill}
            </button>
          ))}
        </div>

        {allSkills.length > VISIBLE_FIELDS && (
          <button
            className="expand-filters-btn"
            onClick={() => setShowAllFilters(!showAllFilters)}
          >
            {showAllFilters ? (
              <>
                <FiMinus /> Ver menos
              </>
            ) : (
              <>
                <FiPlus /> Ver más ({allSkills.length - VISIBLE_FIELDS})
              </>
            )}
          </button>
        )}
      </div>

      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <div className="user-avatar-small">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="user-details">
                  <h3>{user.name}</h3>
                  <div className="user-skills">
                    {user.skills.slice(0, 3).map(
                      (
                        skill, // Limitamos a 3 badges para que no explote la card
                      ) => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ),
                    )}
                    {user.skills.length > 3 && (
                      <span className="skill-badge-more">
                        +{user.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron colaboradores con esos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
