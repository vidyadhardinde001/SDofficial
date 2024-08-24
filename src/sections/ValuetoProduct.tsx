import React from 'react';

const ValuetoProduct = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-medium mb-14 mt-10">How we Add value to our Products</h1>
      <div className="w-[70%] sm:w-10/11 grid grid-cols-3 gap-4">
        {/* First row */}
        <div className="bg-white text-gray-700 border border-gray-300 p-6 rounded-xl flex items-center justify-center h-32">
          Hardware
        </div>
        <div className="bg-orange-400 text-white p-6 rounded-xl flex items-center justify-center h-32">
          Selection Of right Products
        </div>
        <div className="bg-orange-400 text-white p-6 rounded-xl flex items-center justify-center h-32">
          Engineering Products
        </div>
        
        {/* Second row */}
        <div className="bg-orange-500 text-white p-6 rounded-xl flex items-center justify-center h-48 col-span-2">
          Instrumentation & System Integration
        </div>
        <div className="bg-red-400 text-white p-6 rounded-xl flex items-center justify-center h-38">
          Energy Monitoring Systems
        </div>
        <div className="bg-red-400 text-white p-6 rounded-xl flex items-center justify-center h-34">
          Safety Sensor Solutions
        </div>
        
        {/* Third row */}
        <div className="bg-orange-400 text-white p-6 rounded-xl flex items-center justify-center h-48 col-span-2">
        Corrective & Preventive Maintenance
        </div>
        <div className="bg-white text-gray-700 border border-gray-300 p-6 rounded-xl flex items-center justify-center h-32 col-span-3">
        Custom Programming for PLC, HMI, SCADA, VFD, Servo
</div>

      </div>
    </div>
  );
};

export default ValuetoProduct;