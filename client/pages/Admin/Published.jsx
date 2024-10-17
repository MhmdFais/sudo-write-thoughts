import api from "../../axios";
import { useState, useEffect } from "react";

function Published() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Published Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>Author: {post.author}</p>
          <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <h3>Comments ({post.comments.length})</h3>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>
                By: {comment.author} at{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Published;
