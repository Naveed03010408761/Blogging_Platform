import { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [postsLikeCount, setPostsLikeCount] = useState({});
  const [loading, setLoading] = useState({});

  const revertOptimisticUpdate = (postId, wasLiked, originalCount) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.add(postId);
      } else {
        newSet.delete(postId);
      }
      return newSet;
    });

    setPostsLikeCount((prev) => ({
      ...prev,
      [postId]: originalCount,
    }));
  };

  const toggleLike = async (postId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login to like posts');
      return;
    }

    const currentlyLiked = likedPosts.has(postId);
    const currentCount = postsLikeCount[postId] || 0;

    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      currentlyLiked ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });

    setPostsLikeCount((prev) => ({
      ...prev,
      [postId]: currentlyLiked ? currentCount - 1 : currentCount + 1,
    }));

    setLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const response = await fetch(`/api/v1/likes/${postId}/toggle`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      const data = await response.json();
      setPostsLikeCount((prev) => ({
        ...prev,
        [postId]: data.data.likeCount,
      }));
    } catch (error) {
      console.error('Like error:', error);
      revertOptimisticUpdate(postId, currentlyLiked, currentCount);
      alert('Failed to update like. Please try again.');
    } finally {
      setLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const fetchLikes = async (postId) => {
    try {
      const response = await fetch(`/api/v1/likes/${postId}`);
      if (response.ok) {
        const data = await response.json();

        if (data.data.isLiked) {
          setLikedPosts((prev) => new Set([...prev, postId]));
        }
        setPostsLikeCount((prev) => ({
          ...prev,
          [postId]: data.data.likeCount,
        }));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const isLiked = (postId) => likedPosts.has(postId);
  const getLikeCount = (postId) => postsLikeCount[postId] || 0;
  const isLoading = (postId) => loading[postId] || false;

  const value = {
    likedPosts,
    postsLikeCount,
    loading,

    toggleLike,
    isLiked,
    getLikeCount,
    fetchLikes,
    isLoading,
  };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};
