// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../store/userSlice";

export default function AdminDashboard() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);

  // Template form (image upload)
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateCategory, setNewTemplateCategory] = useState("");
  const [imageData, setImageData] = useState(null);
  const [tplError, setTplError] = useState("");
  const [tplLoading, setTplLoading] = useState(false);

  const dispatch = useDispatch();

  // fetch designs (admin)
  useEffect(() => {
    const fetchAllDesigns = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/admin/designs");
        setDesigns(res.data);
      } catch (err) {
        console.error("Error fetching all designs:", err);
        setDesigns([]);
      }
      setLoading(false);
    };
    fetchAllDesigns();
  }, []);

  useEffect(()=>{
    async function fetchUsers(){
      try {
        const res = await axiosInstance.get("/api/admin/getUsers");
        if(res){
          dispatch(setAllUsers(res.data));
          console.log(res.data);
        }
      } catch (error) { 
        console.error('Error fetching allUsers',error);
      }
    }
    fetchUsers();
  },[dispatch])

  // fetch users -> redux
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axiosInstance.get("/api/admin/getUsers");
  //       if (res) dispatch(setAllUsers(res.data));
  //     } catch (error) {
  //       console.log("Error fetching allUsers", error);
  //     }
  //   };
  //   fetchUsers();
  // }, [dispatch]);

  // delete a design (admin)
  const handleDelete = async (designId) => {
    if (!window.confirm("Delete this design?")) return;
    try {
      await axiosInstance.delete(`/api/admin/designs/${designId}`);
      setDesigns((prev) => prev.filter((d) => d._id !== designId));
      alert("Design deleted.");
    } catch (err) {
      alert("Failed to delete design.");
      console.error(err);
    }
  };

  // image input -> base64
  const onPickImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageData(reader.result);
    reader.readAsDataURL(f);
  };

  // add template by image upload
  const handleAddTemplate = async (e) => {
    e.preventDefault();
    setTplError("");
    if (!newTemplateName || !newTemplateCategory || !imageData) {
      setTplError("Please fill all fields and upload an image.");
      return;
    }
    setTplLoading(true);
    try {
      await axiosInstance.post("/api/admin/templates", {
        name: newTemplateName,
        category: newTemplateCategory,
        imageData,
      });
      alert("Template added!");
      setNewTemplateName("");
      setNewTemplateCategory("");
      setImageData(null);
    } catch (err) {
      console.error(err);
      setTplError("Failed to add template.");
    } finally {
      setTplLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fadeUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg">Manage designs and templates</p>
        </div>

        {/* Designs */}
        <section className="mb-12 animate-slideIn">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            All Users' Designs
          </h2>
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading designs...</p>
              </div>
            </div>
          ) : designs.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-900/30 rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-400 text-lg">No designs found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div
                  key={design._id}
                  className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-900/30 rounded-xl p-5 flex flex-col hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                >
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">{design.name}</h3>
                        <p className="text-sm text-purple-400 mt-1">
                          By: {design.username || "Unknown"}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                        {Array.isArray(design.Shapes) ? design.Shapes.length : 0} shapes
                      </span>
                    </div>
                    {design.thumbnailUrl ? (
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          src={design.thumbnailUrl}
                          alt={design.name}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video rounded-lg border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(design._id)}
                    className="mt-4 w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50"
                  >
                    Delete Design
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Template Uploader */}
        <section className="animate-fadeUp">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            Add Official Template
          </h2>
          
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-900/30 rounded-2xl p-8 backdrop-blur-sm">
            {tplError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tplError}
              </div>
            )}
            
            <form
              onSubmit={handleAddTemplate}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div>
                <label
                  className="block mb-2 font-medium text-gray-300 text-sm"
                  htmlFor="templateName"
                >
                  Template Name
                </label>
                <input
                  id="templateName"
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="e.g., Modern Business Card"
                  required
                />
              </div>
              
              <div>
                <label
                  className="block mb-2 font-medium text-gray-300 text-sm"
                  htmlFor="templateCategory"
                >
                  Category
                </label>
                <input
                  id="templateCategory"
                  type="text"
                  value={newTemplateCategory}
                  onChange={(e) => setNewTemplateCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="e.g., Poster, Banner, Social Media"
                  required
                />
              </div>
              
              <div>
                <label
                  className="block mb-2 font-medium text-gray-300 text-sm"
                  htmlFor="templateImage"
                >
                  Template Image
                </label>
                <div className="relative">
                  <input
                    id="templateImage"
                    type="file"
                    onChange={onPickImage}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-500 file:cursor-pointer focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    accept="image/*"
                    required
                  />
                </div>
                {imageData && (
                  <div className="mt-4 p-3 bg-purple-600/10 border border-purple-500/30 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-purple-300">Image selected</span>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={tplLoading}
              >
                {tplLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Template...
                  </span>
                ) : (
                  "Add Official Template"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
