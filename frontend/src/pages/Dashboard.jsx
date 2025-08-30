import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLike } from '../contexts/likeContext';

// Like Button Component
const LikeButton = ({ postId, initialLiked = false, initialCount = 0 }) => {
  const { isLiked, getLikeCount, toggleLike, isLoading } = useLike();

  const liked = isLiked(postId);
  const likeCount = getLikeCount(postId) || initialCount;
  const loading = isLoading(postId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!loading) {
      try {
        await toggleLike(postId);
      } catch (error) {
        console.error('Error in like operation:', error);
        alert(`Failed to like post: ${error.message}`);
      }
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
          className={`w-5 h-5 transition-transform duration-300 ${
            liked ? 'scale-125' : 'scale-100'
          } hover:scale-110`}
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
      <span
        className={`text-sm min-w-[1.5rem] text-center ${
          liked ? 'animate-pulse' : ''
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAuthors: 0,
    latestPost: null,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/v1/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        let posts = [];

        if (Array.isArray(result)) {
          posts = result;
        } else if (result.data && Array.isArray(result.data)) {
          posts = result.data;
        } else if (result.posts && Array.isArray(result.posts)) {
          posts = result.posts;
        } else if (result.success && Array.isArray(result.data)) {
          posts = result.data;
        }

        const totalPosts = posts.length;
        const totalAuthors = new Set(
          posts.map((post) =>
            post.author && typeof post.author === 'object'
              ? post.author._id || post.author
              : post.author
          )
        ).size;

        const latestPost = posts.length > 0 ? posts[0] : null;

        setStats({ totalPosts, totalAuthors, latestPost });
        setRecentPosts(posts.slice(0, 10));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create New Post
        </Link>
        <Link
          to="/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          profile
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-3xl font-bold">{stats.totalPosts}</p>
        </div>

        <div className="p-6 bg-green-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Unique Authors</h2>
          <p className="text-3xl font-bold">{stats.totalAuthors}</p>
        </div>

        <div className="p-6 bg-purple-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Latest Post</h2>
          <p className="font-semibold truncate">
            {stats.latestPost?.title || 'No posts yet'}
          </p>
          {stats.latestPost && (
            <p className="text-sm opacity-90 mt-1">
              {new Date(stats.latestPost.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

        {recentPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Author</th>
                  <th className="border px-4 py-2 text-left">Created At</th>
                  <th className="border px-4 py-2 text-left">Likes</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-medium">
                      {post.title}
                    </td>
                    <td className="border px-4 py-2">
                      {post.author?.userName || post.author?.name || 'Unknown'}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      <LikeButton
                        postId={post._id}
                        initialCount={post.likes || 0}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No posts available yet.</p>
            <Link
              to="/create-post"
              className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
