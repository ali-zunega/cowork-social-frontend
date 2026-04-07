import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../utils/getUser";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const [success, setSuccess] = useState(false);
  const routerLocation = useLocation();
  const userFromState = routerLocation.state?.user;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
    skills: "",
    avatar: "",
  });

  const [error, setError] = useState("");

  const user = React.useMemo(() => {
    return getUser(userFromState);
  }, [userFromState]);

  useEffect(() => {
    setFormData({
      name: user.name || "",
      location: user.location || "Sin ubicación",
      bio: user.bio || "",
      avatar: user.avatar || "",
      skills: user.skills ? user.skills.join(", ") : "",
      followers: user.followers || 0,
      following: user.following || 0,
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    // Inicializar sistema de follows si no existe
    if (!localStorage.getItem("following")) {
      localStorage.setItem("following", JSON.stringify([]));
    }

    if (!localStorage.getItem("followers")) {
      localStorage.setItem("followers", JSON.stringify([]));
    }

    const userToSave = {
      id: "user-1",
      name: formData.name,
      location: formData.location,
      bio: formData.bio,
      avatar: formData.avatar,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      followers: 0,
      following: 0,
    };

    localStorage.setItem("followers", JSON.stringify([]));
    localStorage.setItem("following", JSON.stringify([]));

    localStorage.setItem("user", JSON.stringify(userToSave));

    setError("");
    setSuccess(true);

    setTimeout(() => {
      navigate("/profile/me");
    }, 2000);
  };

  return (
    <div className="container-profile">
      <form onSubmit={handleSubmit} className="profile-form card">
        <h2>Editar perfil</h2>
        {success && (
          <p className="form-success">Perfil actualizado correctamente ✅</p>
        )}

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {error && <p className="form-error">{error}</p>}
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={200}
          />
          <span
            className={`char-count ${formData.bio.length > 180 ? "limit" : ""}`}
          >
            {formData.bio.length}/200
          </span>
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="React, Node, CSS..."
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Avatar (URL)</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
          {formData.avatar && (
            <div className="avatar-preview">
              <img src={formData.avatar} alt="preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
