function AppBar() {
  return (
    <div className="flex justify-between items-center">
      <div className="left text-white font-bold text-4xl">
        <p>
          <span className="text-yellow-300">$</span> sudo write{" "}
          <span className="text-yellow-300">{"{"}</span>thoughts
          <span className="text-yellow-300">{"}"}</span>
        </p>
      </div>
      <div className="right text-white font-bold text-2xl flex justify-around items-center gap-6">
        <a>
          <img src="/icons/profile.png" alt="Login" className="h-7 mr-2" />
        </a>
        <a>
          <img src="/icons/log-in.png" alt="Login" className="h-7 mr-2" />
        </a>
        <a>
          <img src="/icons/log-out.png" alt="Login" className="h-7 mr-2" />
        </a>
      </div>
    </div>
  );
}

export default AppBar;
