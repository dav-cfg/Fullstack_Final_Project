// pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDesigns } from "../store/designSlice";
import DesignCard from "../Cards/DesignCard";

export default function Dashboard() {
  const dispatch = useDispatch();

  // ✅ safe defaults to avoid "undefined.length"
  const { list: designs = [], status } = useSelector(
    (state) => state.designs || {}
  );

  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchDesigns(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 animate-fadeUp">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">My Designs</h1>
        <p className="text-gray-400 text-lg">Manage and edit your creative projects</p>
      </div>

      {status === "loading" ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading your designs...</p>
          </div>
        </div>
      ) : designs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeUp">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No designs yet</h3>
          <p className="text-gray-400 mb-6 max-w-md">Start creating amazing graphics with our canvas editor</p>
          <Link to="/editor" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
            Create New Design
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slideIn">
          {designs.map((design) => (
            <DesignCard key={design._id} design={design} />
          ))}
        </div>
      )}
    </div>
  );
}
