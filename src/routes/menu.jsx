import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLoaderData, useLocation,Link } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);


  useEffect(() => {
    if (hotel?._id) {
      axios.get(`http://localhost:3000/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        });
    }
  }, [hotel]);
  
  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <section className='py-2 px-2'>
      <div className='flex justify-between pb-6'>
   <h1 className='px-2 py-2'>Menu</h1>
   <button className='w-[10rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
   <Link 
              to={{
                pathname: `/home/menu/add`,
              }} 
              state={{ hotelId: hotel?._id }} // Passing hotel._id via state
            >
    Add New Menu
    </Link>
   </button>
   </div>
        <div className='grid grid-cols-5 gap-4'>
        {menulist.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      </section>
    </main>
  );
}


export default Menu;