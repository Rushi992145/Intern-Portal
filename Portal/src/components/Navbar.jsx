import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileImage from '../assets/profile.png';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 border border-gray-200 shadow-md'>
      <div className="logo">
        <img src={logo} alt="Logo" className="w-32" /> {/* Increased the size of the logo */}
      </div>
      <div className='flex gap-4 items-center'>
        <img src={profileImage} className='w-9 h-9 rounded-full border-2 border-gray-300' alt="Profile" />
        <Link to='/profile' className='text-gray-700 font-bold hover:text-black transition-all duration-300'>
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
