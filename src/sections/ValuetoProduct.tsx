"use client";

import React, { useState } from 'react';

const ValuetoProduct = () => {
  // State to track the index of the expanded card
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Function to handle card click
  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-medium mb-6 mt-6 text-[#FFFFFF]">
        How we Add value to our Products
      </h1>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`bg-[#282828] text-[#AAAAAA] p-6 rounded-xl text-lg md:text-2xl flex flex-col transition-all duration-300 ease-in-out overflow-hidden border border-[#282828] ${
              expandedCard === index ? 'h-[150px]' : 'h-24'
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="flex justify-between items-center">
              <span>{item}</span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-2xl font-bold cursor-pointer ${
                  expandedCard === index ? 'bg-[#A259FF] text-[#FFFFFF]' : 'bg-[#CCCCCC] text-[#121212]'
                }`}
              >
                +
              </span>
            </div>
            {expandedCard === index && (
              <div className="mt-2 text-[#AAAAAA]">
                {/* Additional content here */}
                <p>More details about {item}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuetoProduct;
