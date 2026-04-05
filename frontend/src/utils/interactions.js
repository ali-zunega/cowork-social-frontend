export const getInteractions = () => {
  const data = localStorage.getItem("post_interactions");
  return data ? JSON.parse(data) : {};
};

export const saveInteractions = (data) => {
  localStorage.setItem("post_interactions", JSON.stringify(data));
};

export const getPostInteraction = (postId) => {
  const all = getInteractions();
  return (
    all[postId] || {
      postId,
      likes: 0,
      likedByMe: false,
      comments: [],
    }
  );
};

export const updatePostInteraction = (postId, newData) => {
  const all = getInteractions();
  all[postId] = newData;
  saveInteractions(all);
};
