import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        isAuthor,
      });

      const data = response.data;

      console.log("Registered user:", data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Error registering the user:",
        error.response?.data || error.message
      );
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
              htmlFor="email"
              className="block text-gray-300 text-2xl font-bold mb-2"
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

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 text-2xl font-bold mb-2"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 text-2xl font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
              type="password"
              id="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 flex items-center">
            <label
              htmlFor="isAuthor"
              className="text-2xl text-gray-300 ml-2 mr-4"
            >
              Want to Write?
            </label>
            <input
              type="checkbox"
              id="isAuthor"
              checked={isAuthor}
              onChange={() => setIsAuthor((prev) => !prev)}
              className="w-6 h-6"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-300 hover:bg-yellow-400 w-full text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="text-gray-400 text-2xl">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-300 hover:text-yellow-400">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
