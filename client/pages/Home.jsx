import AppBar from "../components/AppBar";
import api from "../axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
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
      const response = await api.get("/");
      console.log(response.data.posts);
      setPosts(response.data.posts);
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

  const handleDivCick = (post) => {
    navigate(`/post/${post.id}`, { state: { post } });
    // do something
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
    <div className="pt-8 pr-12 pl-12">
      <AppBar />
      <div className="container mx-auto p-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-300 shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 rounded-lg cursor-pointer"
              onClick={() => handleDivCick(post)}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-4xl">{post.title}</p>
              </div>
              <p className="text-2xl ">Written By - {post.author}</p>
              <p className="text-lg text-gray-500">
                Created at: {new Date(post.createdAt).toLocaleDateString()}
                {" , "}
                {new Date(post.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xl text-gray-700 mb-2">
                Comments: {post.comments.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
