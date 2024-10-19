import { useLocation } from "react-router-dom";

function EditBlogs() {
  const location = useLocation();
  const post = location.state?.post; // Get post data from state

  if (!post) {
    return <div>No post found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Comments: {post.comments.length}</p>
      <p>Published: {post.published ? "Yes" : "No"}</p>

      {/* Display additional post content or allow editing */}
      <div className="mt-4">{/* Implement post editing UI here */}</div>
    </div>
  );
}

export default EditBlogs;
