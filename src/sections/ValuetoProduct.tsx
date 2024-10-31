"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ValuetoProduct = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/content/valuetoProduct');
        const data = response.data.content.valueList;
        setCards(data);
      } catch (error) {
        console.error('Error fetching ValuetoProduct content:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#232323] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
      {/* Centered Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 text-white text-center">
        How We Add Value to Our Products
      </h1>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-[#313337] hover:text-[#ff7d38] text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl text-sm sm:text-base md:text-lg xl:text-xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden h-16 sm:h-20 md:h-24 lg:h-28"
          >
            <span className="text-center">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuetoProduct;
