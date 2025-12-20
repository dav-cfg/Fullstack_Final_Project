import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../Cards/UserCard";
import { setAllUsers } from "../store/userSlice"; 
import axiosInstance from "../utils/axiosinstance";

function Users() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers) || [];
  const token = sessionStorage.getItem("token");

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = (id) => {
    // Refresh user list after deletion
    fetchUsers();
  };

  async function fetchUsers() {
    try {
      const res = await axiosInstance.get("/api/admin/getUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res && res.data) {
        dispatch(setAllUsers(res.data));
        console.log("✅ Fetched all users:", res.data.length);
      }
    } catch (error) { 
      console.error('❌ Error fetching allUsers:', error);
      alert("Failed to fetch users: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fadeUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            All Users
          </h1>
          <p className="text-gray-400 text-lg">Manage and monitor user accounts</p>
        </div>
        
        {allUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeUp">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No users found</h3>
            <p className="text-gray-400">No registered users in the system yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideIn">
            {allUsers.map((user) => (
              <UserCard key={user._id} user={user} onDelete={handleDeleteUser} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
