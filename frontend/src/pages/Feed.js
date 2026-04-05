import React from "react";
import { mockPosts } from "../data/mockPosts";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";

import "./Feed.css";

/**
 * Página del feed principal
 * Muestra las publicaciones de todos los usuarios
 *
 * TODO: FE-04 - Implementar scroll infinito
 * TODO: FE-06 - Agregar modal para crear publicaciones
 */
const initInteractions = (posts) => {
  const existing = localStorage.getItem("post_interactions");
  if (existing) return;

  const initialData = {};

  posts.forEach((post) => {
    initialData[post.id] = {
      postId: post.id,
      likes: post.likes || 0,
      likedByMe: false,
      comments: [],
    };
  });

  localStorage.setItem("post_interactions", JSON.stringify(initialData));
};

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));

    let initialPosts;

    if (savedPosts && savedPosts.length > 0) {
      initialPosts = savedPosts;
    } else {
      initialPosts = mockPosts;
      localStorage.setItem("posts", JSON.stringify(mockPosts));
    }

    setPosts(initialPosts);

    initInteractions(initialPosts);
  }, []);

  const handleAddPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="feed-page">
      <div className="container">
        <div className="feed-container">
          <div className="feed-header">
            <h2>Feed de Publicaciones</h2>
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              ✏️ Nueva Publicación
            </button>
          </div>
          {/* mapero de posts */}
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {/* LOADER */}
          <div className="feed-loader">
            <p>Cargando más publicaciones...</p>
          </div>

          {/* modal */}
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddPost={handleAddPost}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
