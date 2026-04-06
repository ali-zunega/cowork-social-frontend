import React, { useState } from "react";
import normalizeText from "../utils/normalizeText";
import "./Search.css";
import { mockUsers } from "../data/mockUsers";

const Search = () => {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const allSkills = [...new Set(mockUsers.flatMap((user) => user.skills))];

  const filteredUsers = mockUsers.filter((user) => {
    const matchesNameOrSkill =
      normalizeText(user.name).includes(normalizeText(search)) ||
      user.skills.some((skill) =>
        normalizeText(skill).includes(normalizeText(search)),
      );

    return (
      matchesNameOrSkill &&
      matchesNameOrSkill &&
      (!selectedSkill || user.skills.includes(selectedSkill))
    );
  });
  return (
    <div className="container">
      <h1>Buscar Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="skills-filter">
        <button
          onClick={() => setSelectedSkill(null)}
          className={!selectedSkill ? "active" : ""}
        >
          Todas
        </button>

        {allSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => setSelectedSkill(skill)}
            className={selectedSkill === skill ? "active" : ""}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Users grid */}
      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card user-card">
            <div className="user-info">
              <div className="user-avatar-small">{user.name.charAt(0)}</div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <div className="user-skills">
                  {user.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
