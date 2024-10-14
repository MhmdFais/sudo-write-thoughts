import { Link } from "react-router-dom";

function AppBar() {
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
        <Link to="/">
          <img src="/icons/profile.png" alt="Profile" className="h-7" />
        </Link>
        <Link to="/login">
          <img src="/icons/log-in.png" alt="Login" className="h-7" />
        </Link>
        <Link to="/">
          <img src="/icons/log-out.png" alt="Logout" className="h-7" />
        </Link>
      </div>
    </div>
  );
}

export default AppBar;
