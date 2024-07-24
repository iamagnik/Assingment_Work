import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from 'react-cookie';




const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);

    const { loginWithRedirect } = useAuth0();



    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://assignment-work-server.onrender.com/api/user/signup', {
                username,
                email,
                password
            });

            console.log(response.data);

            if (response.data.status === 'success') {
                alert('Signup successful! Redirecting to login page...');
                setCookie('token', response.data.user.token, { path: '/' });
                window.location.href = '/login';
            } else {
                alert('Signup failed: ' + response.data.msg);
                console.error('Signup failed:', response.data.msg);
            }
        } catch (error) {
            if (error.response) {
                alert('Error: ' + error.response.data.msg);
                console.error('Error during signup: ', error.response.data);
            } else if (error.request) {
                alert('Network error: Please check your internet connection.');
                console.error('Network error during signup: ', error.request);
            } else {
                alert('An unexpected error occurred: ' + error.message);
                console.error('Unexpected error during signup: ', error.message);
            }
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Create your new account</h2>
                <p className="text-center text-gray-500">Create an account to start looking for the food you like</p>
                <form className="mt-8 space-y-6" onSubmit={submitForm}>
                    <div className="rounded-md shadow-sm">
                        <div className='mb-2'>
                            <h2 className="text-black mb-1.5">Email Address</h2>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                autoComplete="email"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className='mb-2'>
                            <h2 className="text-black mb-1.5">Username</h2>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                autoComplete="username"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Username"
                            />
                        </div>
                        <div className="mt-2 relative">
                            <h2 className="text-black mb-1-">Password</h2>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {
                                showPassword ? (
                                    <FaEye
                                        size={25}
                                        className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer mt-3.5"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={25}
                                        className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer mt-3.5"
                                        onClick={togglePasswordVisibility}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <input
                            id="terms-checkbox"
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 custom-checkbox"
                        />
                        <label htmlFor="terms-checkbox" className="ml-2 block text-sm text-gray-900">
                            I Agree with{' '}
                            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Register
                        </button>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-gray-500">Or register with</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => loginWithRedirect()}
                            type="button"
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Google
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-gray-500">
                        Have an account?{' '}
                        <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
