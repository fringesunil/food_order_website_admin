import React from 'react';
import AddHotelForm from '../components/AddHotelForm';

function AddHotels(props) {
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
      <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Add Restaurant</h1>
      <AddHotelForm/>
  </main>
    );
}

export default AddHotels;