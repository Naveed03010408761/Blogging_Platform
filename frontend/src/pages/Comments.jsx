import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/v1/comments/post/${postId}`);
        setComments(data.data || []); // extract array from response
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    if (postId) fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!content.trim()) return;
    try {
      const { data } = await axios.post(
        `/api/v1/comments/${postId}`,
        { content }, // backend expects "content"
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setComments([data.data, ...comments]); // append new comment
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="p-4 border-t">
      <h3 className="font-semibold">Comments</h3>
      <div className="flex gap-2 my-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Post
        </button>
      </div>
      <ul>
        {comments.map((c) => (
          <li key={c._id} className="border-b py-2">
            <strong>{c.user?.name || 'Unknown'}:</strong> {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
