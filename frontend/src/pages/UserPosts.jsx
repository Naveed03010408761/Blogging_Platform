import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LikeButton from '../components/LikeButton';

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      setError('');

      let token = localStorage.getItem('accessToken');

      const response = await fetch('/api/v1/posts/my-posts', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newAccessToken = response.headers.get('x-new-access-token');
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setError('Session expired. Please login again.');
          return;
        }
        throw new Error(
          `Failed to fetch your posts. Status: ${response.status}`
        );
      }

      const result = await response.json();
      const userPosts = result.data || result;
      setPosts(Array.isArray(userPosts) ? userPosts : []);
    } catch (err) {
      console.error('Error fetching user posts:', err);
      setError('Failed to load your posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this post? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      setDeletingId(postId);
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newAccessToken = response.headers.get('x-new-access-token');
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setError('Session expired. Please login again.');
          return;
        }
        throw new Error(`Failed to delete post. Status: ${response.status}`);
      }

      // Remove the deleted post from the local state
      setPosts(posts.filter((post) => post._id !== postId));

      alert('Post deleted successfully!');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (post) => {
    setEditingId(post._id);
    setEditForm({
      title: post.title,
      content: post.content,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (postId) => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      alert('Title and content are required');
      return;
    }

    try {
      setEditingId(postId);
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const newAccessToken = response.headers.get('x-new-access-token');
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setError('Session expired. Please login again.');
          return;
        }
        throw new Error(`Failed to update post. Status: ${response.status}`);
      }

      const result = await response.json();

      // Update the post in local state
      setPosts(
        posts.map((post) =>
          post._id === postId ? result.data || result : post
        )
      );

      setEditingId(null);
      setEditForm({ title: '', content: '' });

      alert('Post updated successfully!');
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post. Please try again.');
    } finally {
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', content: '' });
  };

  const handleViewPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-xl">Loading your posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-4">
            You haven't created any posts yet.
          </p>
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              {editingId === post._id ? (
                // Edit Mode
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Post title"
                  />
                  <textarea
                    name="content"
                    value={editForm.content}
                    onChange={handleEditChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Post content"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSubmit(post._id)}
                      disabled={editingId === post._id}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      to={`/posts/${post._id}`} // ✅ Matches your route
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 whitespace-pre-line">
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Created: {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <LikeButton
                      postId={post._id}
                      initialCount={post.likes || 0}
                    />
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="text-green-600 hover:text-green-800 px-3 py-1 border border-green-600 rounded hover:bg-green-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleViewPost(post._id)}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        disabled={deletingId === post._id}
                        className={`text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition-colors ${
                          deletingId === post._id
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {deletingId === post._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
