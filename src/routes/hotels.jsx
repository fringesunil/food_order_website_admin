import React, { useEffect } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaPlus, FaStore } from 'react-icons/fa';

export async function loader() {
 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants`)
 const hotels = response.data
  return { hotels };
}

export default function Hotels() {
  const {hotels}=useLoaderData()
  return (
  <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl'>
            <FaStore className='text-white text-xl' />
          </div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
            Restaurants
          </h1>
        </div>
        <p className='text-gray-600 text-lg ml-16'>Manage your restaurant network and menu offerings</p>
      </div>

      {/* Action Bar */}
      <div className='flex justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-gray-600'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span className='font-medium'>{hotels.length} Active Restaurants</span>
          </div>
        </div>
        <Link 
          to={`/home/hotels/add`}
          className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
        >
          <FaPlus className='text-sm' />
          Add Restaurant
        </Link>
      </div>

      {/* Restaurants Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
        {hotels.map(hotel => (
          <RestaurantCard key={hotel._id} hotel={hotel}/>
        ))}
      </div>

      {/* Empty State */}
      {hotels.length === 0 && (
        <div className='text-center py-16'>
          <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <FaStore className='text-gray-400 text-3xl' />
          </div>
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>No Restaurants Yet</h3>
          <p className='text-gray-500 mb-6'>Get started by adding your first restaurant</p>
          <Link 
            to={`/home/hotels/add`}
            className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200'
          >
            <FaPlus className='text-sm' />
            Add Your First Restaurant
          </Link>
        </div>
      )}
    </div>
  </main>
  )
}
