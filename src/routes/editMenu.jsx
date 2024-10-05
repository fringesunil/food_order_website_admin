import React from 'react';

import { useLoaderData } from 'react-router-dom';
import EditMenuForm from '../components/EditMenuFOrm';
import axios from 'axios';

export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/menu/${params.menuid}`)
    const menus = response.data
     return { menus };
   }

function EditMenu() {
    const {menus}=useLoaderData()
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
        <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Update Menu</h1>
        <EditMenuForm menus={menus}/>
    </main>
    );
}

export default EditMenu;