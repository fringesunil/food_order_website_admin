import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLoaderData, useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaUtensils, FaArrowLeft } from 'react-icons/fa';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);

  useEffect(() => {
    if (hotel?._id) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        });
    }
  }, [hotel]);
  
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl'>
              <FaUtensils className='text-white text-xl' />
            </div>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                Menu Items
              </h1>
              {hotel && (
                <p className='text-gray-600 text-lg'>Managing menu for {hotel.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className='flex justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <div className='flex items-center gap-4'>
            <Link 
              to="/home/hotels"
              className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200'
            >
              <FaArrowLeft className='text-sm' />
              <span className='font-medium'>Back to Restaurants</span>
            </Link>
            <div className='flex items-center gap-2 text-gray-600'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span className='font-medium'>{menulist.length} Menu Items</span>
            </div>
          </div>
          <Link 
            to={{
              pathname: `/home/menu/add`,
            }} 
            state={{ hotelId: hotel?._id }} 
            className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            <FaPlus className='text-sm' />
            Add Menu Item
          </Link>
        </div>

        {/* Menu Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
          {menulist.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>

        {/* Empty State */}
        {menulist.length === 0 && (
          <div className='text-center py-16'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaUtensils className='text-gray-400 text-3xl' />
            </div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No Menu Items Yet</h3>
            <p className='text-gray-500 mb-6'>Start building your menu by adding delicious items</p>
            <Link 
              to={{
                pathname: `/home/menu/add`,
              }} 
              state={{ hotelId: hotel?._id }} 
              className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200'
            >
              <FaPlus className='text-sm' />
              Add Your First Menu Item
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default Menu;