// pages/Templates.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const url = category
          ? `/api/templates?category=${encodeURIComponent(category)}`
          : "/api/templates";
        const res = await axiosInstance.get(url);
        setTemplates(res.data);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [category]);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] text-white p-6 md:p-10">
      {/* Header with Search */}
      <div className="mb-8 animate-fadeUp">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Template Gallery</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <p className="text-gray-400 text-lg">Browse professional design templates</p>
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Search by category (e.g., Logos, Social Media)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-purple-900/30 text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading templates...</p>
          </div>
        </div>
      ) : templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <svg className="w-20 h-20 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">No templates found</h3>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slideIn">
          {templates.map((t) => (
            <div key={t._id} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-900/30 rounded-xl p-4 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
              <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 text-xs font-semibold rounded-full mb-3 border border-purple-500/30">
                {t.category}
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800 mb-3">
                {t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors truncate">{t.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
