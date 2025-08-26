import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useComment } from '../contexts/CommentContext.jsx'; // Import the context hook

const EditComment = ({ comment }) => {
  const [content, setContent] = useState(comment.content || '');
  const [updating, setUpdating] = useState(false);

  // Use the comment context
  const { stopEditing } = useComment();

  // Pre-fill the form with current comment content
  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Comment content cannot be empty.');
      return;
    }

    setUpdating(true);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.put(
        `/api/v1/comments/${comment._id}`,
        { content }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Use context to stop editing instead of parent callback
        stopEditing();
        // You might want to refresh comments data here or use a callback
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    // Use context to stop editing instead of parent callback
    stopEditing();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        disabled={updating}
        placeholder="Edit your comment..."
      />
      <div className="flex space-x-2 mt-3">
        <button
          type="submit"
          disabled={updating || !content.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={updating}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditComment;
