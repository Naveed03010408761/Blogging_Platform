import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
          posts.map((post) => {
            if (post.author && typeof post.author === 'object') {
              return post.author._id || post.author;
            }
            return post.author;
          })
        ).size;

        const latestPost = posts.length > 0 ? posts[0] : null;

        setStats({ totalPosts, totalAuthors, latestPost });
        setRecentPosts(posts.slice(0, 5));
      } catch (err) {
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
