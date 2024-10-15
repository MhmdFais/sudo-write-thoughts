import { NavLink, Outlet } from "react-router-dom";

function AdminDash() {
  return (
    <div className="flex flex-col h-screen pt-8 px-12">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-4xl">
          <NavLink to="/">
            <span className="text-yellow-300">$</span> sudo write{" "}
            <span className="text-yellow-300">{"{"}</span>thoughts
            <span className="text-yellow-300">{"}"}</span>
          </NavLink>
        </div>
        <NavLink className="text-yellow-300 font-bold text-4xl" to="/admin">
          Admin Board
        </NavLink>
      </div>

      {/* Navigation Section */}
      <nav className="flex gap-20 items-center pt-12 justify-center">
        <NavLink
          to="/admin/articles"
          className={({ isActive }) =>
            `relative group text-3xl transition-all ${
              isActive ? "text-yellow-300 scale-110" : "text-white"
            }`
          }
        >
          All Articles
          <span
            className={({ isActive }) =>
              `absolute bottom-[-2px] left-0 h-1 bg-yellow-300 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`
            }
          ></span>
        </NavLink>

        <NavLink
          to="/admin/published"
          className={({ isActive }) =>
            `relative group text-3xl transition-all ${
              isActive ? "text-yellow-300 scale-110" : "text-white"
            }`
          }
        >
          Published
          <span
            className={({ isActive }) =>
              `absolute bottom-[-2px] left-0 h-1 bg-yellow-300 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`
            }
          ></span>
        </NavLink>

        <NavLink
          to="/admin/unpublished"
          className={({ isActive }) =>
            `relative group text-3xl transition-all ${
              isActive ? "text-yellow-300 scale-110" : "text-white"
            }`
          }
        >
          Unpublished
          <span
            className={({ isActive }) =>
              `absolute bottom-[-2px] left-0 h-1 bg-yellow-300 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`
            }
          ></span>
        </NavLink>

        <NavLink
          to="/admin/create"
          className={({ isActive }) =>
            `relative group text-3xl transition-all ${
              isActive ? "text-yellow-300 scale-110" : "text-white"
            }`
          }
        >
          Create
          <span
            className={({ isActive }) =>
              `absolute bottom-[-2px] left-0 h-1 bg-yellow-300 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`
            }
          ></span>
        </NavLink>
      </nav>

      {/* Main Content Section */}
      <div className="flex-grow p-12">
        <Outlet /> {/* Renders the appropriate component based on the route */}
      </div>
    </div>
  );
}

export default AdminDash;
