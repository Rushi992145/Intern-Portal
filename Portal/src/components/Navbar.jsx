import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import { logoutUser } from '../redux/authSlice'; // Import logout action

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState(null); // State to manage timeout

    useEffect(() => {}, [user]);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/');
        });
    };

    const handleMouseEnter = () => {
        if (dropdownTimeout) clearTimeout(dropdownTimeout); // Clear any existing timeout
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setDropdownOpen(false);
        }, 200); 
        setDropdownTimeout(timeout); 
    };

    const handleDropdownClick = () => {
        if (!user) {
            navigate('/signin');
        } else {
            setDropdownOpen((prev) => !prev);
        }
    };

    return (
        <div className='flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200'>
            <Link to={'/'}>
                <div className="logo text-2xl font-bold hover:text-blue-900 transition duration-200">
                    Intern<span className='text-blue-500'>N</span>et
                </div>
            </Link>
            <div className='relative flex items-center gap-4' onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} >
               {user && <img
                    src={user?.profileImage || profileImage}
                    alt="Profile"
                    className='w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />}
                <span
                    className='text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer flex items-center'
                    onClick={handleDropdownClick} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {user ? user.username : 'Login/Signin'}
                    {user && <span className="material-symbols-outlined ml-1">
                        keyboard_arrow_down
                    </span>}
                </span>

                {dropdownOpen && user && ( 
                    <div className='absolute right-0 mt-6 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50'>
                        <Link to='/profile' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                            Profile
                        </Link>

                        
                        <button
                            onClick={handleLogout}
                            className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
