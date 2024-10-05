import React, { useEffect } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";

export async function loader() {
 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants`)
 const hotels = response.data
  return { hotels };
}

export default function Hotels() {
  const {hotels}=useLoaderData()
  return (
  <main className='bg-[#B0A1BA] min-h-screen'>
    <section className='py-2 px-2'>
   <div className='flex justify-between pb-6'>
   <h1 className='text-3xl font-bold text-white'>Restaurants</h1>
   <button className='w-[10rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
    <Link to={`/home/hotels/add`}> Add Hotel</Link>
   </button>
   </div>
      <div className='grid grid-cols-5 gap-4'>
        {
          hotels.map(hotel=>{
            return<RestaurantCard key={hotel._id} hotel={hotel}/>
          })
        }
    
      </div>
    </section>
  </main>
  )
}
