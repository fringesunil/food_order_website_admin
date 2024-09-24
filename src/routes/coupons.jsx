import React from 'react';
import { Link, useLoaderData } from "react-router-dom";
import CouponCard from '../components/CouponCard';
import axios from 'axios';

export async function loader() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon`)
    const coupons = response.data
     return { coupons };
   }

function Coupons(props) {
    const {coupons}= useLoaderData();
    return (
        <main className='bg-[#B0A1BA] h-screen'>
<section className='py-2 px-2'>
<div className='flex justify-between pb-6'>
   <h1 className='px-2 py-2'>Coupons</h1>
   <button className='w-[10rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
    <Link to={`/home/coupons/add`}> Add Coupon</Link>
   </button>
       </div>
      <div className='grid grid-cols-5 gap-4'>
        {
          coupons.map(coupon=>{
            return<CouponCard key={coupon._id} coupon={coupon}/>
          })
        }
    
      </div>
</section>
    </main>
    );
}

export default Coupons;