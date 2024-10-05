import React from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import EditHotelForm from '../components/EditHotelForm';

export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/restaurants/${params.hotelid}`)
    const hotels = response.data
     return { hotels };  
   }

function EditHotel() {
    const {hotels}=useLoaderData()
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
        <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Update Restaurants</h1>
        <EditHotelForm hotels={hotels}/>
    </main>
    );
}

export default EditHotel;