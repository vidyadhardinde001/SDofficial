"use client"; // Add this at the top of the file

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Testimonial {
  testimonial: string;
  name: string;
  company: string;
}

const CACHE_KEY = "testimonialsCache";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        // if (cachedData && cacheTimestamp) {
        //   const isCacheValid = Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
        //   if (isCacheValid) {
        //     setTestimonials(JSON.parse(cachedData));
        //     return;
        //   }
        // }

        const response = await axios.get("/api/content/testimonial");
        const data = response.data.content;

        if (data && Array.isArray(data.testimonialList)) {
          setTestimonials(data.testimonialList);
          localStorage.setItem(CACHE_KEY, JSON.stringify(data.testimonialList));
          localStorage.setItem(
            `${CACHE_KEY}_timestamp`,
            Date.now().toString()
          );
        }
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-8 px-4 sm:py-10 sm:px-6 lg:py-12 lg:px-8 bg-[#232323]">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white text-center mb-10">
        Testimonials
      </h2>
      <div className="flex justify-center items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition duration-300 shadow-lg"
        >
          &lt;
        </button>

        {/* Testimonials */}
        <div className="flex gap-6">
          {testimonials
            .slice(currentIndex, currentIndex + 3)
            .map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
              >
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  &quot;{testimonial.testimonial}&quot;
                </p>
                <div className="text-center">
                  <p className="font-bold text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition duration-300 shadow-lg"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;
