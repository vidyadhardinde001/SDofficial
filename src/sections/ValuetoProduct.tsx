import React from 'react';
import 'animate.css'; // Make sure to install this library: npm install animate.css

const ValuetoProduct = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-medium mb-10 mt-8 text-white animate__animated animate__fadeIn">
        How we Add value to our Products
      </h1>
      <div className="w-[80%] sm:w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn animate__delay-1s">
        {/* First row */}
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-32 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Hardware
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-32 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Selection Of right Products
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-32 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Engineering Products
        </div>
        
        {/* Second row */}
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-48 lg:col-span-2 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Instrumentation & System Integration
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-38 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Energy Monitoring Systems
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-34 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Safety Sensor Solutions
        </div>
        
        {/* Third row */}
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-48 lg:col-span-2 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Corrective & Preventive Maintenance
        </div>
        <div className="bg-gray-800 text-gray-100 border border-gray-600 p-4 md:p-6 rounded-xl flex items-center justify-center h-32 lg:col-span-3 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-95 text-lg md:text-2xl">
          Custom Programming for PLC, HMI, SCADA, VFD, Servo
        </div>
      </div>
    </div>
  );
};

export default ValuetoProduct;
