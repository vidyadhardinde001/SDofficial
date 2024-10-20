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
        setCards(data); // Assuming the response follows the same structure
      } catch (error) {
        console.error('Error fetching ValuetoProduct content:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#232323] flex flex-col items-center justify-center px-6">
      {/* Centered Heading */}
      <h1 className="text-5xl font-medium mb-6 mt-0 text-white pb-14 text-center">
        How We Add Value to Our Products
      </h1>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl grid grid-cols-0 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-[#313337] hover:text-[#ff7d38] text-[white] p-6 rounded-xl text-lg md:text-xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden h-24"
          >
            <span className="text-center">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuetoProduct;
