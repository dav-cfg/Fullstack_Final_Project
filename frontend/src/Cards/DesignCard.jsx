// Cards/DesignCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDesign,
  updateDesignInList,
  fetchDesigns,
} from "../store/designSlice";
import axiosInstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function DesignCard({ design }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(design.name || "Untitled Design");

  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user?._id;
  const token = sessionStorage.getItem("token");

  const handleOpenDesign = () => {
    dispatch(setSelectedDesign(design));
    navigate("/editor");
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/api/designs/${design._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (userId) dispatch(fetchDesigns(userId));
    } catch (err) {
      console.error("Error deleting design:", err);
      alert("Delete failed");
    }
  };

  const handleNameUpdate = async (e) => {
    e.stopPropagation();
    if (!name.trim()) {
      alert("Design name cannot be empty");
      setName(design.name);
      setIsEditing(false);
      return;
    }
    try {
      const res = await axiosInstance.put(
        `/api/designs/${design._id}`,
        { name: name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update Redux store immediately with the server response
      dispatch(updateDesignInList(res.data));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating design name:", err);
      alert("Rename failed: " + (err.response?.data?.message || err.message));
      setName(design.name); // Revert to original name on error
    }
  };

  // Check for 'thumbnailUrl' first, fallback to other potential fields
  const imgSrc =
    design.thumbnailUrl || design.assetUrl || design.thumbnail || "";

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-900/30 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer p-5 flex flex-col gap-4 backdrop-blur-sm hover:scale-[1.02] hover:border-purple-500/50"
      onClick={handleOpenDesign}
    >
      {/* thumbnail with overlay effect */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden">
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt={design.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white font-semibold text-sm bg-purple-600 px-4 py-1 rounded-full">Open Design</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-500 text-sm">No Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* meta + actions */}
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full border-2 border-purple-500 bg-gray-800 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <h2 className="font-bold text-lg text-white truncate group-hover:text-purple-300 transition-colors">
              {design.name}
            </h2>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {new Date(design.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleNameUpdate}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Rename
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
