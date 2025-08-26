import React, { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Content is required.');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        `/api/v1/comments/${postId}`,
        { content }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true, // If using cookies
        }
      );

      if (response.status === 201) {
        setContent('');
        onCommentAdded();
        alert('Comment created successfully!');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a Comment..."
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        disabled={submitting}
      />
      <button
        type="submit"
        disabled={submitting || !content.trim()}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CreateComment;
