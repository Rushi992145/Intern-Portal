import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import { signOut } from '../redux/user/userSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { toggleTheme } from '../redux/theme/themeSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.user?.currentUser);

    const handleLogout = async () => {
        try {
            await dispatch(signOut());
            navigate('/');
        } catch (error) {
            console.error('Error during logout: ', error);
        }
    };

    return (
        <div className='flex justify-between items-center p-5 border-b border-gray-200 bg-white dark:bg-gray-800'>
            <div className="logo text-xl font-bold text-gray-900 dark:text-gray-100">
                Intern<span className='text-blue-700'>N</span>et
            </div>

            <div className='flex items-center gap-3'>
                {/* Theme Toggle Button */}
                <Button
                    color="gray"
                    pill
                    onClick={() => dispatch(toggleTheme())}
                    className="w-9 h-9 flex justify-center items-center"
                >
                    {theme === 'light' ? (
                        <FaSun className="text-yellow-300" />
                    ) : (
                        <FaMoon className="text-gray-900" />
                    )}
                </Button>

                <img
                    src={user?.profileImage || profileImage}
                    alt="Profile"
                    className='w-7 h-7 rounded-full'
                />

                <Link to={user ? '/profile' : '/signin'} className='text-blue-500 dark:text-blue-400'>
                    <span className='font-medium'>{user?.username || 'Guest'}</span>
                </Link>

                {user ? (
                    <button onClick={handleLogout} className='text-red-500 dark:text-red-400'>
                        Logout
                    </button>
                ) : (
                    <Link to='/signin' className='text-green-500 dark:text-green-400'>
                        Login/Signin
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
