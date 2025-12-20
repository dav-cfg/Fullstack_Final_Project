// Header/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAdmin } from "../store/userSlice";
import NovyGrafyniqLogo from "../assets/novylogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setAdmin(false));
    navigate("/");
  };

  const navItems = [
    { name: "Editor", route: "/editor", active: !!authStatus || isAdmin },
    { name: "Templates", route: "/templates", active: true },
    {
      name: "Dashboard",
      route: "/dashboard",
      active: !!authStatus && !isAdmin,
    },
    { name: "Admin Dashboard", route: "/admindashboard", active: isAdmin },
    { name: "Users", route: "/users", active: isAdmin },
    { name: "Login", route: "/signin", active: !authStatus && !isAdmin },
    { name: "AdminLogin", route: "/admin", active: !authStatus && !isAdmin },
    { name: "Signup", route: "/register", active: !authStatus && !isAdmin },
    { name: "About", route: "/about", active: true },
  ];

  return (
    <nav className="w-full h-[70px] bg-gradient-to-r from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] border-b border-purple-900/30 flex justify-between items-center shadow-lg">
      <div className="h-[70px] flex items-center py-2 px-4 md:px-6">
        <img
          src={NovyGrafyniqLogo}
          alt="Novy Grafyniq Logo"
          className="mr-3 h-[45px] md:h-[50px] w-auto drop-shadow-lg"
        />
        <Link
          to="/"
          className="md:text-3xl text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-bold tracking-tight hover:scale-105 transition-transform duration-200"
        >
          Novy Grafyniq
        </Link>
      </div>
      <div className="h-[70px] flex items-center py-2 px-4 md:px-6">
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) =>
            item.active ? (
              <NavLink
                key={item.name}
                to={item.route}
                className={({ isActive }) =>
                  `${
                    isActive 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
                      : "text-gray-300 hover:bg-white/5"
                  } inline-flex items-center px-3 md:px-4 py-2 text-sm md:text-base font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105`
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}
          {(authStatus || isAdmin) && (
            <button
              className="ml-2 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
