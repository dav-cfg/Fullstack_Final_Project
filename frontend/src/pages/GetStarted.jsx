import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../index.css'
import axiosInstance from "../utils/axiosinstance"
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function GetStarted() {

  const dispatch = useDispatch();

//   useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const res = await axiosInstance.get("api/auth/getUser");
//       dispatch(setUser(res.data));
//     } catch (error) {
//       console.log(error); 
//     }
//   };

//   fetchUser();
// }, []);


  return (
    <div
      className="relative w-full min-h-[calc(100vh-70px)] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center text-white overflow-hidden"
    
    >
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-[#0F0F23]/80 to-pink-900/60"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fadeUp">
        <div className="mb-6 inline-block px-6 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30 rounded-full backdrop-blur-sm">
          <p className="text-sm md:text-base text-purple-200 font-medium">✨ Professional Design Tool</p>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to Novy Grafyniq
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-12 text-gray-200 leading-relaxed max-w-2xl mx-auto">
          Create stunning graphics with professional tools. Design posters, social media content, and more with our intuitive canvas editor.
        </p>

        {/* Enhanced Buttons */}
        <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
          <Link
            to="/register"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-4 rounded-xl border-2 border-purple-400/50 bg-white/5 backdrop-blur-md font-semibold text-lg hover:bg-white/10 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Learn More
          </Link>
        </div>
        
        {/* Feature Pills */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium">🎨 Drag & Drop Editor</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium">☁️ Cloud Storage</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium">📱 Templates Library</span>
          </div>
        </div>
      </div>
    </div>
  );
}
