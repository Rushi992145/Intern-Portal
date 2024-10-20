import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import { logoutUser } from '../redux/authSlice'; // Import logout action

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth); 

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/');
        });
    };
    
    return (
        <div className='flex justify-between items-center p-5 border-b border-gray-200'>
            <div className="logo text-xl font-bold">
                Intern<span className='text-blue-700'>N</span>et
            </div>

            <div className='flex items-center gap-3'>
                <img
                    src={user?.profileImage || profileImage} 
                    alt="Profile"
                    className='w-7 h-7 rounded-full'
                />
                

                <Link to='/profile' className='text-blue-500'> <span className='font-medium'>{user?.username || 'Guest'}</span> </Link>

                {user ? (
                    <button
                        onClick={handleLogout}
                        className='text-red-500'>
                        Logout
                    </button>
                ) : (
                    <Link to='/signin' className='text-green-500'>Login/Signin</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;