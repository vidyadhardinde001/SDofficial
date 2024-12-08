"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const CACHE_EXPIRATION_MS = 60 * 60 * 1000;

const ValuetoProduct = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false); // State to toggle "See More"
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

  // Number of cards to show initially
  const initialVisibleCards = 3;

  return (
    <div className="mix-h-[60vh] bg-[#ffffff] flex flex-col items-center justify-center">
      {/* Centered Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium py-10 sm:mb-6 text-black text-center">
        How We Add Value to Our Products
      </h2>

      {/* Main Content Section */}
      <div className="w-full p-1 max-w-7xl grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 portrait:grid-cols-1 mb-10">
        {(isPortrait && !showAll
          ? cards.slice(0, initialVisibleCards)
          : cards
        ).map((item, index) => (
          <div
            key={index}
            className="bg-[#313337] hover:text-[#ff7d38] text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl text-sm sm:text-base md:text-lg xl:text-xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden h-16 sm:h-20 md:h-24 lg:h-28"
          >
            <span className="text-center">{item}</span>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {isPortrait && cards.length > initialVisibleCards && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mb-4 px-4 bg-[#ff7d38] text-white font-medium rounded-lg hover:bg-[#ff9a60] transition-all duration-300"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ValuetoProduct;
