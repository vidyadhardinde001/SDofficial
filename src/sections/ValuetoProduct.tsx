"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const CACHE_EXPIRATION_MS = 60 * 60 * 1000;

const ValuetoProduct = () => {
  const [cards, setCards] = useState<string[]>([]); // State to store cards data
  const [isPortrait, setIsPortrait] = useState(false); // State to check orientation

  useEffect(() => {
    // Check for portrait orientation
    const updateOrientation = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsPortrait(isPortrait);
    };

    updateOrientation(); // Run on initial render
    window.addEventListener("resize", updateOrientation); // Listen for orientation changes

    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cachedCards = localStorage.getItem("valuetoProductCards");
      const cachedTimestamp = localStorage.getItem(
        "valuetoProductCacheTimestamp"
      );

      if (cachedCards && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          // Use cached data if it's still valid
          setCards(JSON.parse(cachedCards));
          return;
        }
      }

      // If no valid cache, fetch new data from API
      try {
        const response = await axios.get("/api/content/valuetoProduct");
        const data = response.data.content.valueList;
        setCards(data);

        // Cache the new data and timestamp
        localStorage.setItem("valuetoProductCards", JSON.stringify(data));
        localStorage.setItem(
          "valuetoProductCacheTimestamp",
          new Date().getTime().toString()
        );
      } catch (error) {
        console.error("Error fetching ValuetoProduct content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="mix-h-[60vh] flex flex-col items-center justify-center bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/industriesbg.webp')", // Replace with your background image path
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Centered Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-medium py-10 px-1 sm:mb-0 text-white rounded-full text-center relative z-10 shadow-lg w-full">
        How We Add Value to Our Products
      </h2>

      {/* Main Content Section */}
      <div className="w-full p-1 max-w-7xl grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 portrait:grid-cols-1 mb-10 relative z-10">
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
