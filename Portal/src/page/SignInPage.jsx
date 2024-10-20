import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'; 

const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { loading, error } = useSelector((state) => state.auth); 

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginUser({
                username: formData.username,
                password: formData.password,
            })).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/home');
                }
            });
        } else {
            const formDataWithFile = new FormData();
            formDataWithFile.append('username', formData.username);
            formDataWithFile.append('email', formData.email);
            formDataWithFile.append('fullname', formData.fullname);
            formDataWithFile.append('mobileNumber', formData.mobileNumber);
            formDataWithFile.append('password', formData.password);
            formDataWithFile.append('birthDate', formData.birthDate);

            dispatch(signupUser(formDataWithFile)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/home'); 
                }
            });
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
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                </button>

                {error && <p  className="text-red-500 mt-2 text-center">{error}</p>}
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
