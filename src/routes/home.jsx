import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaGift, FaHome, FaShoppingCart, FaUser, FaStore } from "react-icons/fa";

export default function Home() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/drinn62yk/image/upload/v1728691154/tqxzwkst8yelcpgpg8el.png" 
                alt="Brand Logo" 
                className="h-10 w-auto"
              />
              <div className="ml-4 hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Link 
                to={"/home/hotels"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive('/hotels') 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FaStore size={18} />
                <span className="hidden sm:inline">Restaurants</span>
              </Link>
              
              <Link 
                to={"/home/coupons"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive('/coupons') 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FaGift size={18} />
                <span className="hidden sm:inline">Coupons</span>
              </Link>
              
              <Link 
                to={"/home/profile"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive('/profile') 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FaUser size={18} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <Outlet />
      <footer></footer>
    </>
  )
}
