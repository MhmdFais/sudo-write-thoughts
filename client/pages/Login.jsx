import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, isAuthor } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isAuthor", isAuthor);

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-white font-bold text-4xl mb-2 text-center">
        <span className="text-yellow-300">$</span> sudo write{" "}
        <span className="text-yellow-300">{"{"}</span>thoughts
        <span className="text-yellow-300">{"}"}</span>
      </div>
      <div className="text-xl text-gray-400 italic mb-8">
        Where Thoughts Become Commands
      </div>
      <div className="login-form w-full max-w-md">
        <form
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-300 text-2xl font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-2xl font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xl"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-300 hover:bg-yellow-400 w-full text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="text-gray-400 text-2xl">
        Haven&apos;t got an account?{" "}
        <Link to="/register" className="text-yellow-300 hover:text-yellow-400">
          Register Here
        </Link>
      </div>
    </div>
  );
}

export default Login;
