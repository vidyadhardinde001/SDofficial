"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const ValuetoProduct: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/content/valuetoProduct");
        const data = response.data.content.valueList;
        setCards(data);
      } catch (error) {
        console.error("Error fetching ValuetoProduct content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-[#232323] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      {/* Centered Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white text-center mb-6 lg:mb-8">
        How We Add Value to Our Products
      </h1>

      {/* Card Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-[#313337] hover:bg-[#ff7d38] hover:text-white text-gray-200 p-4 lg:p-6 rounded-lg text-center flex items-center justify-center transition-all duration-300 ease-in-out h-20 lg:h-28 xl:h-32"
          >
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuetoProduct;
