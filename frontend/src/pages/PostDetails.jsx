import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams(); // post id from route like /posts/:id
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
        <p>Author: {post.author?.username || "Unknown"}</p>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="text-lg leading-relaxed whitespace-pre-line">
        {post.content}
      </p>
    </div>
  );
}
