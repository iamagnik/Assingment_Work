import React from 'react';
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const Onboarding = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    {
        isAuthenticated ? console.log(user.name) : ""
    }
    return (
        <div className="flex flex-col justify-center items-center h-full bg-cover bg-center text-white" style={{ backgroundImage: 'url(https://res.cloudinary.com/djrdw0sqz/image/upload/v1721765887/13a478aa6d3cc9bebac1c6fe29b1cf35_dl5asm.png)' }}>
            <div className="bg-orange-500 bg-opacity-75 p-8 rounded-lg text-center w-3/4 md:w-1/2 h-auto flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">We serve incomparable delicacies</h1>
                <p className="text-sm md:text-lg mb-8 leading-relaxed">All the best restaurants with their top menu waiting for you, they can’t wait for your order!!</p>
                <div className="flex space-x-2 mb-4">
                    <span className="block w-12 h-2 bg-white rounded-r-lg rounded-l-lg"></span>
                    <span className="block w-8 h-2 bg-white opacity-50 rounded-r-lg rounded-l-lg"></span>
                    <span className="block w-8 h-2 bg-white opacity-50 rounded-r-lg rounded-l-lg"></span>
                </div>
                <div className="flex justify-between w-full px-4">
                    <Link to='/login'>
                        <button className="bg-transparent text-white px-4 py-2 rounded-md">Skip</button>
                    </Link>
                    <Link to='/onboarding2'>
                        <button className="text-white px-4 py-2 rounded-md flex items-center">Next <GrLinkNext className="ml-2" /></button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Onboarding;
