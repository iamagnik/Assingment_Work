import React from 'react';
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';


const Onboarding3 = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full bg-cover bg-center text-white" style={{ backgroundImage: 'url(https://res.cloudinary.com/djrdw0sqz/image/upload/v1721766291/image_9_dmseqo.png)' }}>
            <div className="bg-orange-500 bg-opacity-75 p-8 rounded-lg text-center w-3/4 md:w-1/2 h-auto flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">We serve incomparable delicacies</h1>
                <p className="text-sm md:text-lg mb-8 leading-relaxed">All the best restaurants with their top menu waiting for you, they can’t wait for your order!!</p>
                <div className="flex flex-col items-center mt-4">
                    <div className="flex space-x-2 mb-4">
                        <span className="block w-8 h-2 bg-white opacity-50 rounded-r-lg rounded-l-lg"></span>
                        <span className="block w-8 h-2 bg-white opacity-50 rounded-r-lg rounded-l-lg"></span>
                        <span className="block w-12 h-2 bg-white rounded-r-lg rounded-l-lg"></span>
                    </div>
                    <div className="p-1 rounded-full border-1 border-t-4 border-r-4 border-b-4 border-white">
                        <Link to="/login" className="bg-white text-orange-500 p-4 rounded-full shadow-lg flex items-center justify-center">
                            <GrLinkNext className="text-3xl" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding3