"use client";

import React from 'react';

const ValuetoProduct = () => {
  // Card data for easier mapping
  const cards = [
    'Hardware',
    'Selection of Right Products',
    'Engineering Products',
    'Instrumentation & System Integration',
    'Energy Monitoring Systems',
    'Safety Sensor Solutions',
    'Corrective & Preventive Maintenance',
    'Custom Programming for PLC, HMI, SCADA, VFD, Servo'
  ];

  return (
    <div className="min-h-screen bg-[white] flex flex-col items-center justify-center p-6">
      {/* Centered Heading */}
      <h1 className="text-5xl font-medium mb-6 mt-6 text-[black] pb-14 text-center">
        How We Add Value to Our Products
      </h1>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-[transparent] text-[black] p-6 rounded-xl text-lg md:text-2xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden border border-[black] h-24"
          >
            <span className="text-center">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuetoProduct;
