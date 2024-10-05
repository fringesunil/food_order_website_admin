import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const isConfirmed = window.confirm("Are you sure you want to delete this hotel?");
  
  if (isConfirmed) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/restaurants/${hotelid}`);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting the hotel:', error);
    }
  }
};

  return (
    <article 
      onClick={handleSelect} 
      className="transition transform hover:scale-105 duration-300 ease-in-out cursor-pointer"
    >
      <div className='w-[16rem] h-fit bg-[#F5F5F5] border border-gray-200 rounded-lg shadow-lg mx-2.5 px-3 py-2'>
        <img 
          src={hotel.image} 
          alt="Restaurant" 
          className='w-full h-44 rounded-t-lg object-cover'
        />
        <div className='flex flex-row justify-between mt-2'>
          <h2 className='text-lg font-semibold text-gray-800 truncate'>
            {hotel.name}
          </h2>
        </div>
        <h3 className='text-sm font-medium text-gray-600'>
          {hotel.location}
        </h3>
        
        
        <div className='flex justify-between mt-3 space-x-2'>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(hotel._id); 
            }} 
            className='w-full px-4 py-1 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition'
          >
            Edit
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              handleDelete(hotel._id); 
            }} 
            className='w-full px-4 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition'
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
