import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AppBar() {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const authorStatus = localStorage.getItem("isAuthor") === "true";
    setIsLoggedIn(!!accessToken);
    setIsAuthor(authorStatus);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post(`${API_URL}/logout`, {
        refreshToken,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAuthor");

      setIsLoggedIn(false);
      setIsAuthor(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout error: ", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="left text-white font-bold text-4xl">
        <Link to="/">
          <span className="text-yellow-300">$</span> sudo write{" "}
          <span className="text-yellow-300">{"{"}</span>thoughts
          <span className="text-yellow-300">{"}"}</span>
        </Link>
      </div>

      <div className="right text-white font-bold text-2xl flex justify-around items-center gap-6">
        {isLoggedIn ? (
          <>
            {isAuthor && (
              <Link to="/admin" className="flex items-center gap-2">
                <img src="/icons/profile.png" alt="Admin" className="h-7" />
                <span>Admin</span>
              </Link>
            )}

            <button onClick={handleLogout} className="flex items-center gap-2">
              <img src="/icons/log-out.png" alt="Logout" className="h-7" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="flex items-center gap-2">
            <img src="/icons/log-in.png" alt="Login" className="h-7" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AppBar;
