import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "../utils/dateFormatter";
import "./PostCard.css";
import {
  getPostInteraction,
  updatePostInteraction,
} from "../utils/interactions";

const PostCard = ({ post, isPreview = false }) => {
  const [interaction, setInteraction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!post?.id) return;
    const data = getPostInteraction(post.id);
    setInteraction(data);
  }, [post?.id]);

  if (!interaction) return null;

  const handleLike = () => {
    if (isPreview) return;

    const updated = {
      ...interaction,
      likedByMe: !interaction.likedByMe,
      likes: interaction.likedByMe
        ? interaction.likes - 1
        : interaction.likes + 1,
    };

    setInteraction(updated);
    updatePostInteraction(post.id, updated);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: "Tú",
      text: commentText,
      date: new Date().toISOString(),
    };

    const updated = {
      ...interaction,
      comments: [...interaction.comments, newComment],
    };

    setInteraction(updated);
    updatePostInteraction(post.id, updated);
    setCommentText("");
  };

  return (
    <div className="post-card card">
      {/* HEADER ORIGINAL */}
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            <span>{post?.author?.name?.charAt(0) || "A"}</span>
          </div>
          <div className="author-info">
            <h4>{post?.author?.name || "Anónimo"}</h4>
            <span className="post-date">
              {post?.createdAt ? formatTimeAgo(post.createdAt) : "Ahora"}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENIDO ORIGINAL */}
      <div className="post-content">
        <p>
          {post?.content ||
            "Esta es una publicación de ejemplo. ¡Bienvenido a CoWork Social!"}
        </p>

        {post?.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      {/* ACCIONES MEJORADAS */}
      <div className="post-actions">
        <button className="action-btn" onClick={handleLike}>
          {interaction.likedByMe ? "💙" : "🤍"} {interaction.likes}
        </button>

        <button
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {interaction.comments.length}
        </button>

        <button className="action-btn" disabled>
          📤 Compartir
        </button>
      </div>

      {/* COMENTARIOS */}
      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {interaction.comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-avatar">
                  <span>{c.author.charAt(0)}</span>
                </div>

                <div className="comment-body">
                  <div className="comment-header">
                    <strong>{c.author}</strong>
                    <span className="comment-date">
                      {formatTimeAgo(c.date)}
                    </span>
                  </div>

                  <div className="comment-bubble">
                    <p>{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="comment-form">
            <input
              type="text"
              placeholder="Escribí un comentario aquí..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddComment}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
