import React from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import EditCouponForm from '../components/EditCouponForm';

export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon/${params.couponid}`)
    const coupons = response.data
     return { coupons };
   }

function EditCoupon() {
    const {coupons}=useLoaderData()
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
        <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Update Coupon</h1>
        <EditCouponForm coupons={coupons}/>
    </main>
    );
}

export default EditCoupon;