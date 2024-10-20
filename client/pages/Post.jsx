import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import api from "../axios";
import { Editor } from "@tinymce/tinymce-react";

function Post() {
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  const API_KEY = import.meta.env.VITE_MCE_API_KEY;

  useEffect(() => {
    if (!post) {
      navigate("/");
    }
  }, [post, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }

    try {
      const response = await api.post(`/posts/${post.id}/comment`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
    }
  };

  if (!post) {
    return (
      <div className="container mx-auto p-4 text-2xl text-gray-400">
        Loading post details...
      </div>
    );
  }

  return (
    <div className="pt-8 pr-12 pl-12">
      <div>
        <AppBar />
      </div>

      <div className="mt-16 pr-10 pl-10">
        {/* Post Details */}
        <div className="post-details">
          <h1 className="text-5xl font-bold mb-4 text-slate-200 flex items-center justify-center">
            {post.title}
          </h1>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <p className="text-xl text-slate-300">{post.author}</p>
            <span className="text-xl text-slate-300">|</span>
            <p className="text-slate-300 text-xl">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Displaying the post content using TinyMCE in read-only mode */}
          <Editor
            apiKey={API_KEY}
            value={post.content}
            init={{
              menubar: false,
              toolbar: false,
              readonly: true,
              height: 400,
              content_css: false, // Remove TinyMCE default styles
            }}
          />
        </div>

        {/* Comments Section */}
        <div className="comments-section mt-10">
          <h2 className="text-3xl font-bold text-slate-200 mb-6">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-lg text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 p-6 mt-4 rounded-lg shadow-md"
              >
                <p className="text-lg text-slate-100 mb-2">{comment.content}</p>
                <p className="text-sm text-gray-400">
                  Commented by:{" "}
                  <span className="font-semibold">{comment.author}</span> on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                  {new Date(comment.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-200 mb-4">
            Add a Comment
          </h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full p-4 border border-gray-500 rounded-lg bg-gray-800 text-slate-100"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows="5"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-500 transition-colors duration-200"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
