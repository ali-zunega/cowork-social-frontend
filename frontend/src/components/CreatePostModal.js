import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
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
        {/* HEADER */}
        <div className="modal-header">
          <h3>Nueva Publicación</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="¿Qué estás pensando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

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
          </form>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-primary"
            disabled={!content.trim()}
            onClick={handleSubmit}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
