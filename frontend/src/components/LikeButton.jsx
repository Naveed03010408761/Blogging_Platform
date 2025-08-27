import React from 'react';
import { useLike } from '../contexts/likeContext';

const LikeButton = ({ postId, initialLiked = false, initialCount = 0 }) => {
  const { isLiked, getLikeCount, toggleLike, isLoading } = useLike();

  const liked = isLiked(postId);
  const likeCount = getLikeCount(postId) || initialCount;
  const loading = isLoading(postId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading) {
      toggleLike(postId);
    }
  };

  return (
    <button
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium transition-all duration-200
        ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        ${
          liked
            ? 'border-rose-500 text-rose-500 bg-rose-50'
            : 'border-gray-200 text-gray-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50'
        }
      `}
      onClick={handleClick}
      disabled={loading}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-t-rose-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      ) : (
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${liked ? 'scale-125' : 'scale-100'} hover:scale-110`}
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
      <span
        className={`text-sm min-w-[1.5rem] text-center ${liked ? 'animate-pulse' : ''}`}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default LikeButton;
