import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaTrash, FaUtensils, FaRupeeSign } from 'react-icons/fa';

export default function MenuCard(props) {
  const navigate = useNavigate();
  const { menu } = props;

  const handleDelete = async (menuId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this menu item?");
  
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/menu/${menuId}`);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting the menu item:', error);
      }
    }
  };

  const handleEdit = (menuId) => {
    navigate(`/home/menu/edit/${menuId}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={menu.image} 
          alt={menu.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Menu Icon Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <FaUtensils className="text-orange-500 text-lg" />
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          <div className="flex items-center gap-1">
            <FaRupeeSign className="text-xs" />
            {menu.price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Menu Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
          {menu.name}
        </h2>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => handleEdit(menu._id)}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaEdit className="text-sm" />
            Edit
          </button>
          <button 
            onClick={() => handleDelete(menu._id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaTrash className="text-sm" />
            Delete
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
