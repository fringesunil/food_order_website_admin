import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { FaStore, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

export default function AddHotelForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("location", data.location);
        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }
        axios.post(`${import.meta.env.VITE_BASE_URL}/restaurants`, formData)
            .then(response => {
                navigate(`/home/hotels`)
            }).catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-2">
            <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-lg w-full mx-auto rounded-3xl shadow-2xl p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                        <FaStore className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text">Add New Hotel</h2>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Hotel Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaStore className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Hotel name is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                            placeholder="Enter hotel name"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">Location</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            id="location"
                            {...register("location", { required: "Location is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                            placeholder="Enter location"
                        />
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Image</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaImage className="text-gray-400" />
                        </span>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image", { required: "Image is required" })}
                            className={`pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                        />
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Hotel
                    </button>
                </div>
            </form>
        </div>
    )
}