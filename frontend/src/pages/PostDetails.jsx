import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateComment from '../pages/CreateComment';
import CommentsList from '../pages/CommentsList';
import LikeButton from '../components/LikeButton';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  // Fetch post details
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/v1/posts/${id}`);
      const result = await response.json();
      setPost(result.data || result);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/v1/comments/post/${id}`);
      const result = await response.json();
      setComments(result.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 1. POST HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
          <p className="font-medium">By {post.author?.userName || 'Unknown'}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* 2. POST CONTENT */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-8 border">
        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
        <LikeButton postId={post._id} initialCount={post.likes || 0} />
      </div>

      {/* 3. COMMENTS SECTION HEADER */}
      <div className="border-t border-gray-200 pt-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Comments ({comments.length})
        </h2>
      </div>

      {/* 4. CREATE COMMENT FORM - RIGHT BELOW POST */}
      <CreateComment
        postId={post._id}
        onCommentAdded={fetchComments} // This will refresh the comments list
      />

      {/* 5. COMMENTS LIST - BELOW THE FORM */}
      <CommentsList comments={comments} />
    </div>
  );
}
