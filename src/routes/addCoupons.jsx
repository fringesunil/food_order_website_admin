import React from 'react';
import AddCouponForm from '../components/AddCouponForm';

function AddCoupons(props) {
    return (
        <main className='bg-[#B0A1BA] min-h-screen'>
        <h1 className='text-3xl font-bold text-white px-[9rem] pb-3'>Add Coupons</h1>
       <AddCouponForm/>
    </main>
    );
}

export default AddCoupons;