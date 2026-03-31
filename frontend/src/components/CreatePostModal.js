import React, { useState } from "react";
import PostCard from "./PostCard";
import "./CreatePostModal.css";

const CreatePostModal = ({ isOpen, onClose, onAddPost }) => {
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

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
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Nueva Publicación</h3>
          <button className="close-btn fw-bold" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {/*  contador de caracteres  */}
          <span className="char-count">{content.length} caracteres</span>

          {/* Preview */}
          <div className="preview-container">
            <span className="preview-label">Vista Previa del Post</span>
            <div className="preview-scale-wrapper">
              <PostCard
                isPreview={true}
                post={{
                  id: "preview",
                  author: { name: "Anónimo", avatar: null },
                  content:
                    content || "Aquí se verá tu increíble publicación...",
                  createdAt: new Date().toISOString(),
                  likes: 0,
                  comments: 0,
                }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!content.trim()}
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
