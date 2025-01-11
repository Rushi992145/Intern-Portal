import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import conf from '../conf/conf.js'
const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, error } = useSelector((state) => state.user);

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: '',
        mobileNumber: '',
        password: '',
        birthDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setFormData({
            username: '',
            email: '',
            fullname: '',
            mobileNumber: '',
            password: '',
            birthDate: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());

        if (isLogin) {
            try {
                console.log(formData);
                const response = await axios.post(`${conf.userApiUrl}login`, {
                    username: formData.username,
                    password: formData.password,
                });
                console.log('Login Response:', response);
                    dispatch(signInSuccess(response));
                    navigate('/home');
            } catch (err) {
                dispatch(signInFailure('Login failed. Please check your credentials.'));
            }
        } else {
            try {
                // Simulate signup API call
                const response = await axios.post(`${conf.userApiUrl}register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                console.log(response)
    
                console.log('Signup Response:', response.data);
                dispatch(signInSuccess(response));
                navigate('/home');
            } catch (err) {
                dispatch(signInFailure('Signup failed. Please try again.'));
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>

            <form onSubmit={handleSubmit} className="w-80">
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                        />
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    disabled={isFetching}
                >
                    {isFetching ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                </button>

                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </form>

            <button onClick={handleToggle} className="mt-4 text-blue-500">
                {isLogin
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default SignInPage;
