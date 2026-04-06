import React, { useState, useEffect } from "react";
import "./FollowButton.css";

const FollowButton = ({ userId, onFollowChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const normalizedId = userId.toString();
  const [isFollowing, setIsFollowing] = useState(() => {
    const following = JSON.parse(localStorage.getItem("following")) || [];
    return following.includes(normalizedId);
  });

  useEffect(() => {
    const following = JSON.parse(localStorage.getItem("following")) || [];
    setIsFollowing(following.includes(normalizedId));
  }, [normalizedId]);

  const handleFollow = () => {
    const following = JSON.parse(localStorage.getItem("following")) || [];
    let updatedFollowing;

    if (isFollowing) {
      updatedFollowing = following.filter((id) => id !== normalizedId);
    } else {
      updatedFollowing = [...following, normalizedId];
    }

    localStorage.setItem("following", JSON.stringify(updatedFollowing));
    setIsFollowing(!isFollowing);

    //
    if (onFollowChange) onFollowChange();
  };

  return (
    <button
      className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"} follow-btn`}
      onClick={handleFollow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFollowing ? (isHovered ? "Dejar de seguir" : "Siguiendo") : "Seguir"}
    </button>
  );
};

export default FollowButton;
