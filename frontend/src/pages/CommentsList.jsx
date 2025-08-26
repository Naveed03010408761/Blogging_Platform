import React, { useState } from 'react';
import { useComment } from '../contexts/CommentContext';
import EditComment from './EditComment';
import axios from 'axios';

const CommentsList = ({ comments, onCommentDeleted }) => {
  const { isEditingComment, startEditing, stopEditing } = useComment();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteComment = async (commentId) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this comment? This action cannot be undone.'
      )
    ) {
      return;
    }

    setDeletingId(commentId);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.delete(`/api/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Call the callback to refresh comments
        if (onCommentDeleted) {
          onCommentDeleted();
        }
        alert('Comment deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);

      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      } else {
        alert('Failed to delete comment. Please try again.');
      }
    } finally {
      setDeletingId(null);
      stopEditing(); // Exit edit mode if active
    }
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            {isEditingComment(comment._id) ? (
              <EditComment
                comment={comment}
                onCommentUpdated={onCommentDeleted} // Refresh after edit
              />
            ) : (
              <>
                <p className="text-gray-800 mb-3">{comment.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">
                      By {comment.author?.userName || 'Unknown'}
                    </span>
                    <span className="text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      disabled={deletingId === comment._id}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      disabled={deletingId === comment._id}
                      className={`text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors ${
                        deletingId === comment._id
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {deletingId === comment._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;
