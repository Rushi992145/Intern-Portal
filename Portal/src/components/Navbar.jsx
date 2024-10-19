import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileImage from '../assets/profile.png';

const Navbar = () => {
  return (
    <div className='flex justify-between p-5 border border-gray-200'>
        <div className="logo text-xl flex font-bold ">Intern<div className='text-blue-700'>N</div>et</div>
        <div className='flex gap-3 items-center justify-center'>
        <img src="./src/assets/profile.png" className='w-7 h-7 rounded-full' alt="" />
        <Link to='/profile'>Profile</Link>
        </div>
    </div>
  );
};

export default Navbar;
