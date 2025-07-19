import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaGift, FaCalendarAlt, FaPercent } from 'react-icons/fa';

function CouponCard({ coupon }) {
    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate(`/home/coupons/edit/${coupon._id}`);
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this coupon?");
  
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/coupon/${coupon._id}`);
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
        return date.toLocaleDateString('en-GB', options);
    };

    // Check if coupon is expired
    const isExpired = new Date(coupon.exp_date) < new Date();

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Header with Coupon Code */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <FaGift className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{coupon.coupon_code}</h2>
                            <p className="text-purple-100 text-sm">Discount Code</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Discount Amount */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                        <FaPercent className="text-lg" />
                        <span>{coupon.discount_percentage}% OFF</span>
                    </div>
                    <p className="text-gray-500 text-sm">Discount Percentage</p>
                </div>

                {/* Expiry Date */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        <span className="text-sm">Expires: {formatDate(coupon.exp_date)}</span>
                    </div>
                    {isExpired && (
                        <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            <span>Expired</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleEdit}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <FaEdit className="text-sm" />
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <FaTrash className="text-sm" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Status Badge */}
            {isExpired && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    EXPIRED
                </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}

export default CouponCard;
