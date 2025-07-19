import React from 'react'
import { Link, Outlet } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import { FaShieldAlt, FaUtensils } from 'react-icons/fa';

export default function Login() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Login Container */}
      <div className='relative w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
            <FaShieldAlt className='text-white text-2xl' />
          </div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Sign in to your admin account</p>
        </div>

        {/* Login Form Card */}
        <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8'>
          <LoginForm/>
        </div>

        {/* Footer */}
        <div className='text-center mt-6'>
          <div className='flex items-center justify-center gap-2 text-gray-500'>
            <FaUtensils className='text-orange-500' />
            <span className='text-sm'>Food Order Admin Panel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
