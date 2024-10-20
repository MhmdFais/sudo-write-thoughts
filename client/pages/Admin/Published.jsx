import api from "../../axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Published() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/published");
      setPosts(response.data);
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async (postId, event) => {
    event.stopPropagation();
    try {
      await api.patch(`/admin/posts/${postId}/unpublish`);
      fetchAllPosts(); // Refresh the posts after unpublishing
    } catch (error) {
      console.error(
        "Error unpublishing post:",
        error.response?.data || error.message
      );
      setError("Failed to unpublish the post.");
    }
  };

  const handleDivCick = (post) => {
    navigate(`/admin/post/${post.id}`, { state: { post } });
  };

  if (loading)
    return (
      <div className="container mx-auto p-4 text-2xl text-gray-400">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-4 text-2xl text-gray-400">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-300 shadow-lg rounded-lg p-6 cursor-pointer"
            onClick={() => handleDivCick(post)}
          >
            <h2 className="text-3xl font-semibold mb-2">{post.title}</h2>
            <p className="text-lg text-gray-500 mb-4">
              Created at: {new Date(post.createdAt).toLocaleDateString()}
              {" , "}
              {new Date(post.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h3 className="text-2xl font-semibold mb-2">
              Comments ({post.comments.length})
            </h3>
            {/* Unpublish Button */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
              onClick={(e) => handleUnpublish(post.id, e)}
            >
              Unpublish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Published;
