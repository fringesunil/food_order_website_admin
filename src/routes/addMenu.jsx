import React from 'react';
import AddMenuForm from '../components/AddMenuForm';
import { useLocation } from 'react-router-dom';


function AddMenu() {
    const location = useLocation();
    const { hotelId } = location.state || {};
    return (
        <main className='bg-[#B0A1BA] h-screen'>
        <h1>ADD Menu</h1>
        <AddMenuForm hotelid={hotelId}/>
    </main>
    );
}

export default AddMenu;