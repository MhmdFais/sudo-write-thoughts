import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/AdminDash";
import AllArticles from "../pages/Admin/AllArticles";
import CreateArticle from "../pages/Admin/CreateArticle";
import Published from "../pages/Admin/Published";
import Unpublished from "../pages/Admin/Unpublished";

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="articles" element={<AllArticles />} />
            <Route path="published" element={<Published />} />
            <Route path="unpublished" element={<Unpublished />} />
            <Route path="create" element={<CreateArticle />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
