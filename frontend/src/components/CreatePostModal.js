import React, { useState } from "react";
import PostCard from "./PostCard";
import "./CreatePostModal.css";

const CreatePostModal = ({ isOpen, onClose, onAddPost }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      author: { name: "Anónimo", avatar: null },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };

    onAddPost(newPost);
    setContent("");
    setError(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Post</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Preview */}

          <div className="preview">
            <h4>Preview</h4>
            <PostCard
              isPreview={true}
              post={{
                id: "preview",
                author: { name: "Anónimo", avatar: null },
                content: content || "Tu publicación aparecerá aquí...",
                createdAt: new Date().toISOString(),
                likes: 0,
                comments: 0,
              }}
            />
          </div>
          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
