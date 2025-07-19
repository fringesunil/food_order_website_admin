import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

function RestaurantCard(props) {
  const { hotel } = props;
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/home/menu', { state: { hotel } });
  };

  const handleEdit = (hotelid) => {
    navigate(`/home/hotels/edit/${hotelid}`);
  };

  const handleDelete = async (hotelid) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this restaurant?");
    
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/restaurants/${hotelid}`);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting the restaurant:', error);
      }
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Restaurant Icon Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <FaStore className="text-blue-600 text-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Restaurant Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 truncate">
          {hotel.name}
        </h2>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <FaMapMarkerAlt className="text-red-500 text-sm" />
          <span className="text-sm font-medium truncate">{hotel.location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaStore className="text-sm" />
            View Menu
          </button>
        </div>

        {/* Edit/Delete Buttons */}
        <div className="flex gap-2 mt-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(hotel._id); 
            }} 
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-1.5"
          >
            <FaEdit className="text-xs" />
            Edit
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              handleDelete(hotel._id); 
            }} 
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-1.5"
          >
            <FaTrash className="text-xs" />
            Delete
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default RestaurantCard;
