import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { FaGift, FaPercent, FaCalendarAlt } from 'react-icons/fa';

export default function EditCouponForm(props) {
    const coupon = props.coupons;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formattedDate = coupon.exp_date ? new Date(coupon.exp_date).toISOString().split("T")[0] : "";

    const onSubmit = (data) => {
        axios.patch(`${import.meta.env.VITE_BASE_URL}/coupon/${coupon._id}`, data)
            .then(response => {
                navigate(`/home/coupons`)
            }).catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 py-8 px-2">
            <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-lg w-full mx-auto rounded-3xl shadow-2xl p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                        <FaGift className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text">Edit Coupon</h2>
                </div>

                {/* Coupon Code */}
                <div>
                    <label htmlFor="Code" className="block text-gray-700 font-semibold mb-1">Coupon Code</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGift className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            id="Code"
                            defaultValue={coupon.coupon_code}
                            {...register("coupon_code", { required: "Coupon code is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.coupon_code ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                            placeholder="Enter coupon code"
                        />
                    </div>
                    {errors.coupon_code && <p className="mt-1 text-sm text-red-600">{errors.coupon_code.message}</p>}
                </div>

                {/* Discount Percentage */}
                <div>
                    <label htmlFor="percentage" className="block text-gray-700 font-semibold mb-1">Discount Percentage</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPercent className="text-gray-400" />
                        </span>
                        <input
                            type="number"
                            id="percentage"
                            defaultValue={coupon.discount_percentage}
                            {...register("discount_percentage", { required: "Discount percentage is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.discount_percentage ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                            placeholder="Enter discount percentage"
                        />
                    </div>
                    {errors.discount_percentage && <p className="mt-1 text-sm text-red-600">{errors.discount_percentage.message}</p>}
                </div>

                {/* Expiry Date */}
                <div>
                    <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">Exp Date</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendarAlt className="text-gray-400" />
                        </span>
                        <input
                            type="date"
                            id="date"
                            defaultValue={formattedDate}
                            {...register("exp_date", { required: "Expiry date is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.exp_date ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                        />
                    </div>
                    {errors.exp_date && <p className="mt-1 text-sm text-red-600">{errors.exp_date.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Update Coupon
                    </button>
                </div>
            </form>
        </div>
    )
}