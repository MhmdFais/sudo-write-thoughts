// import api from "../../axios";
// import { useState, useEffect } from "react";

// function AllArticles() {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllPosts();
//   }, []);

//   const fetchAllPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/admin/articles");
//       setPosts(response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching posts:",
//         error.response?.data || error.message
//       );
//       setError("Failed to fetch posts. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <p>{post.title}</p>
//           <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
//           {/* <p>Author: {post.author}</p>
//           <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
//           <h3>Comments ({post.comments.length})</h3>
//           {/* {post.comments.map((comment) => (
//             <div key={comment.id}>
//               <p>{comment.content}</p>
//               <p>
//                 By: {comment.author} at{" "}
//                 {new Date(comment.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))} */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AllArticles;

import api from "../../axios";
import { useState, useEffect } from "react";

function AllArticles() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/articles");
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-slate-300 shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 rounded-lg cursor-pointer"
          onClick={() => console.log("Card clicked", post.id)}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-3xl">{post.title}</p>
            <p className="text-lg text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
              {" , "}
              {new Date(post.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p className="text-2xl text-gray-700">
            Comments: {post.comments.length}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllArticles;
