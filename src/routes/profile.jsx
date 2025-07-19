import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCamera } from 'react-icons/fa';

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${userId}`);
  const user = response.data;
  return { user };
}

export default function Profile() {
  const navigate= useNavigate()
  const { user } = useLoaderData();
  const [profileImage, setProfileImage] = useState(user.image);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/${userId}`, formData);
        const newImageUrl = response.data.imageUrl;
        setProfileImage(newImageUrl); 
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Optional background pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <section className="w-full max-w-md z-10">
        <div className="glass rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full mb-2 shadow-lg">
              <FaUserCircle className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-1">Profile</h2>
            <p className="text-gray-500 text-sm">Manage your admin account</p>
          </div>

          {/* Profile Image Upload */}
          <div className="relative group mb-6">
            <img
              src={profileImage ? profileImage : 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'}
              alt="profile picture"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              onClick={handleProfileImageClick}
            />
            {/* Overlay for upload */}
            <div
              className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={handleProfileImageClick}
            >
              {uploading ? (
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : (
                <FaCamera className="text-white text-2xl" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* Name */}
          <h1 className="mb-6 text-xl font-bold text-gray-800 text-center w-full truncate">{user.name}</h1>

          {/* Logout Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </section>
    </main>
  )
}
