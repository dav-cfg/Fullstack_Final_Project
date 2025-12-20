import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axiosInstance from '../utils/axiosinstance';

export default function GLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axiosInstance.post("/api/auth/google-login", {
        tokenId: credentialResponse.credential
      });
      const data = res.data;
      // Save full user object with _id and username!
      sessionStorage.setItem('user', JSON.stringify({
        _id: data._id,
        username: data.username,
        role: data.role,
        token: data.token
      }));
      sessionStorage.setItem('token', data.token);
      dispatch(setUser({
        _id: data._id,
        username: data.username,
        role: data.role,
        token: data.token
      }));
      // Confirm in console:
      console.log("After Google login:", JSON.parse(sessionStorage.getItem("user")));
      navigate('/dashboard');
    } catch (error) {
      alert("Google login failed due to network or server error.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => alert('Google login failed')}
    />
  );
}
