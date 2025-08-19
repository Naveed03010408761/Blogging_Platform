import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAuthors: 0,
    latestPost: null,
  });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch posts
        const response = await fetch("http://localhost:5000/api/v1/posts");
        const data = await response.json();

        // Calculate stats
        const totalPosts = data.length;
        const totalAuthors = new Set(data.map((post) => post.author?._id || post.author)).size;
        const latestPost = data[0]; // assuming API returns sorted by latest

        setStats({ totalPosts, totalAuthors, latestPost });
        setRecentPosts(data.slice(0, 5)); // show 5 recent posts
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg">Total Posts</h2>
          <p className="text-3xl font-bold">{stats.totalPosts}</p>
        </div>
        <div className="p-6 bg-green-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg">Unique Authors</h2>
          <p className="text-3xl font-bold">{stats.totalAuthors}</p>
        </div>
        <div className="p-6 bg-purple-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg">Latest Post</h2>
          <p className="font-semibold">{stats.latestPost?.title || "No posts yet"}</p>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Author</th>
              <th className="border px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <tr key={post._id}>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">
                    {post.author?.name || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
