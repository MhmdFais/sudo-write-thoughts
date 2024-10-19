import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import api from "../../axios";

function EditBlogs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state?.post);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const API_KEY = import.meta.env.VITE_MCE_API_KEY;

  useEffect(() => {
    if (!post) {
      navigate("/admin/articles");
    }
  }, [post, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (content) => setContent(content);

  const handleSave = async (postId) => {
    try {
      await api.patch(`/admin/posts/${postId}/update`, {
        title,
        content,
      });

      navigate("/admin/articles");
    } catch (error) {
      console.error(
        "Error editing post:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log("Deleting comment:", commentId);
    setPost({
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    });
  };

  return (
    <div className="min-h-screen pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <div className="font-bold text-4xl text-white">
          <NavLink to="/">
            <span className="text-yellow-300">$</span> sudo write{" "}
            <span className="text-yellow-300">{"{"}</span>thoughts
            <span className="text-yellow-300">{"}"}</span>
          </NavLink>
        </div>
        <NavLink
          className="text-yellow-300 font-bold text-4xl"
          to="/admin/articles"
        >
          Admin Board
        </NavLink>
      </div>

      <div className="space-y-6 pl-6 pr-6">
        <div className="mt-6">
          <label
            className="block text-gray-300 text-4xl font-bold mb-4"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-3xl"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="content"
            className="block text-gray-300 text-4xl font-bold mb-4"
          >
            Content
          </label>
          <Editor
            apiKey={API_KEY}
            value={content}
            onEditorChange={handleContentChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleSave(post.id)}
            className="bg-yellow-300 hover:bg-yellow-400 w-auto text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl mt-1"
          >
            Save Changes
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-4xl font-bold mb-4 text-slate-300">Comments</h2>
          {post.comments.length === 0 ? (
            <p className="text-2xl text-slate-300">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {post.comments.map((comment) => (
                <li
                  key={comment.id}
                  className="bg-gray-800 p-4 rounded flex justify-between items-start"
                >
                  <div>
                    <p className="font-bold">{comment.author}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditBlogs;
