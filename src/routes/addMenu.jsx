import React from 'react';
import AddMenuForm from '../components/AddMenuForm';
import { useLocation } from 'react-router-dom';


function AddMenu() {
    const location = useLocation();
    const { hotelId } = location.state || {};
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
        <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Add Menu</h1>
        <AddMenuForm hotelid={hotelId}/>
    </main>
    );
}

export default AddMenu;