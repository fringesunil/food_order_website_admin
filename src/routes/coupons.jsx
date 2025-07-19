import React from 'react';
import { Link, useLoaderData } from "react-router-dom";
import CouponCard from '../components/CouponCard';
import axios from 'axios';
import { FaPlus, FaGift, FaPercent } from 'react-icons/fa';

export async function loader() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon`);
    const coupons = response.data;
    return { coupons };
}

function Coupons() {
    const { coupons } = useLoaderData();

    return (
        <main className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header Section */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl'>
                            <FaGift className='text-white text-xl' />
                        </div>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                            Coupons & Discounts
                        </h1>
                    </div>
                    <p className='text-gray-600 text-lg ml-16'>Manage promotional offers and discount codes</p>
                </div>

                {/* Action Bar */}
                <div className='flex justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='font-medium'>{coupons.length} Active Coupons</span>
                        </div>
                    </div>
                    <Link 
                        to={`/home/coupons/add`}
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    >
                        <FaPlus className='text-sm' />
                        Add Coupon
                    </Link>
                </div>

                {/* Coupons Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {coupons.map(coupon => (
                        <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                </div>

                {/* Empty State */}
                {coupons.length === 0 && (
                    <div className='text-center py-16'>
                        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <FaGift className='text-gray-400 text-3xl' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>No Coupons Yet</h3>
                        <p className='text-gray-500 mb-6'>Start creating promotional offers to attract customers</p>
                        <Link 
                            to={`/home/coupons/add`}
                            className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200'
                        >
                            <FaPlus className='text-sm' />
                            Create Your First Coupon
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Coupons;
