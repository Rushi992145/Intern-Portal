import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between p-5 border border-gray-200'>
        <div className="logo">InternNet</div>
        <div className='flex gap-3 items-center justify-center'>
        <img src="./src/assets/profile.png" className='w-7 h-7 rounded-full' alt="" />
        <Link to='/profile'>Profile</Link>
        </div>
    </div>
  )
}

export default Navbar