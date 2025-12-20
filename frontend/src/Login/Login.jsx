import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GLogin from "../Login/GLogin.jsx";
import axiosInstance from "../utils/axiosinstance.js";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!CLIENT_ID) {
  console.error("❌ VITE_GOOGLE_CLIENT_ID not configured in .env file");
}

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/auth/login",{ username, password });
      //   (import.meta.env.VITE_API_URL || "https://Novy Grafyniq-design-tool-uh85.onrender.com") +
      //     "/api/auth/login",
      //   { username, password }
      // );
      // const res = await axios.post(
      //   (import.meta.env.VITE_API_URL || "https://Novy Grafyniq-design-tool-uh85.onrender.com") +
      //     "/api/auth/login",
      //   { username, password }
      // );

      const { token, _id, username: userName, role } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ _id, username: userName, role, token })
      );
      dispatch(setUser({ _id, username: userName, role, token }));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fadeUp">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-purple-900/30 rounded-2xl shadow-2xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Novy Grafyniq
            </h1>
            <h2 className="text-2xl text-white font-semibold">Welcome Back</h2>
            <p className="text-gray-400 mt-2">Sign in to continue creating</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-gray-300 font-medium text-sm"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-gray-300 font-medium text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Register here
            </Link>
          </p>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GLogin />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
