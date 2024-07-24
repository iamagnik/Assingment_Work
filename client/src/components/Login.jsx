import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from 'react-cookie';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);

  const { loginWithRedirect } = useAuth0();


  const submitForm = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://assignment-work-server.onrender.com/api/user/login', {
            email,
            password
        });

        if (response.data.status === 'success') {
            alert('Login successful! Redirecting...');
            setCookie('token', response.data.user.token, { path: '/' });
            window.location.href = '/login-success';
        } else {
            alert('Login failed: ' + response.data.msg);
            console.error('Login failed:', response.data.msg);
        }
    } catch (error) {
        if (error.response) {
            alert('Error: ' + error.response.data.msg);
            console.error('Error during login: ', error.response.data);
        } else if (error.request) {
            alert('Network error: Please check your internet connection.');
            console.error('Network error during login: ', error.request);
        } else {
            alert('An unexpected error occurred: ' + error.message);
            console.error('Unexpected error during login: ', error.message);
        }
    }
};



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login to your account</h2>
        <p className="text-center text-gray-500">Please sign in to your account</p>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='mb-4'>
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
            <div className="mt-2 relative">
              <h2 className="text-black mb-1.5">Password</h2>
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

          <div>
            <button
              type="submit"
              onClick={submitForm}
              className="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500">Or sign in with</span>
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
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
