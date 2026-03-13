import React from 'react';
// Agar tum react-router-dom use kar rahe ho, toh Link import karna zaroori hai
// import { Link } from 'react-router-dom'; 

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0c10] text-gray-300 font-sans selection:bg-cyan-500 selection:text-white">

            {/* Glitchy/Cinematic 404 Text */}
            <h1 className="text-[12rem] md:text-[15rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 tracking-widest drop-shadow-lg opacity-80">
                404
            </h1>

            {/* Floating Badge overlay */}
            <div className="bg-cyan-600 text-white px-3 py-1 text-sm md:text-base rounded shadow-lg -mt-24 md:-mt-32 z-10 uppercase tracking-widest">
                Signal Lost
            </div>

            {/* Main Message */}
            <div className="mt-16 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    Looks like you're drifting in deep space.
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                    The page you are looking for has crossed the event horizon and no longer exists. Let's get you safely back to familiar coordinates.
                </p>
            </div>

            {/* Return Button */}
            {/* Agar React Router hai, toh <a href> ki jagah <Link to="/"> use karna */}
            <a
                href="/"
                className="mt-10 px-8 py-3 text-lg font-medium text-cyan-400 border border-cyan-500 rounded-full hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)]"
            >
                Return to Base
            </a>

        </div>
    );
};

export default NotFound;