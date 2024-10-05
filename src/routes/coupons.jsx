import React from 'react';
import { Link, useLoaderData } from "react-router-dom";
import CouponCard from '../components/CouponCard';
import axios from 'axios';

export async function loader() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon`);
    const coupons = response.data;
    return { coupons };
}

function Coupons() {
    const { coupons } = useLoaderData();

    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
            <section className='py-6 px-6'>
                <div className='flex justify-between items-center pb-6'>
                    <h1 className='text-3xl font-bold text-white'>Coupons</h1>
                    <Link to={`/home/coupons/add`}>
                        <button className='w-[10rem] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Add Coupon
                        </button>
                    </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {coupons.map(coupon => (
                        <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Coupons;
