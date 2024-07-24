import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-use-gesture';
import loginSuccess from "../../public/Illustration Success.png";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useCookies } from 'react-cookie';





const LoginSuccess = () => {
    const { logout } = useAuth0();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);



    const [position, setPosition] = useState({ y: 0 });
    const ref = useRef(null);

    const bind = useDrag(({ down, movement: [, my], memo = position.y }) => {
        if (ref.current) {
            ref.current.style.transform = `translateY(${down ? memo + my : position.y}px)`;
        }
        if (!down) setPosition({ y: memo + my });
        return memo;
    });



    const logoutHandler = async () => {
        try {
            await axios.post('https://assignment-work-server.onrender.com/api/user/logout');

            removeCookie('token', { path: '/' });

            window.location.href = '/login';
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed. Please try again.');
        }
    };






    return (
        <div className="h-screen flex items-center justify-center relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transform scale-x-[-1] z-[-1]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/djrdw0sqz/image/upload/v1721765887/13a478aa6d3cc9bebac1c6fe29b1cf35_dl5asm.png')`,
                }}
            ></div>
            <div className="relative">
                <div
                    ref={ref}
                    {...bind()}
                    className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
                >
                    <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
                    </div>
                    <div className="text-center flex flex-col md:px-20 px-10 items-center justify-center">
                        <img src={loginSuccess} alt="" />
                        <h2 className="text-2xl font-bold mb-2">Login Successful</h2>
                        <Link to='/track'>
                            <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-full mb-2">
                                Go to Tracking Screen
                            </button>
                        </Link>
                        <button
                            onClick={() => logoutHandler()}
                            className="w-full py-2 px-4 text-black rounded-full">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSuccess;
