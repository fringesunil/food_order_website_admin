import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CouponCard({ coupon }) {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/home/coupons/edit/${coupon._id}`);
        
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this hotel?");
  
        if (isConfirmed) {
        try{
          const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/coupon/${coupon._id}`)
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting the coupon:', error);
      }
    }
    };

  
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // 'en-GB' ensures the format is dd/MM/yyyy
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-4'>
            <h2 className='text-xl font-semibold'>Coupon Code: {coupon.coupon_code}</h2>
            <p className='text-gray-600'>Exp. Date: {formatDate(coupon.exp_date)}</p>
            <div className='mt-4'>
                <span className='text-lg font-bold text-green-600'>Amount : ₹ {coupon.discount_percentage}</span>
            </div>
            <div className='flex justify-between mt-4'>
                <button
                    onClick={handleEdit}
                    className='flex-1 bg-green-500  text-white py-2 mx-1 rounded'
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className='flex-1 bg-red-500  text-white py-2 mx-1 rounded'
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default CouponCard;
