"use client"; // Ensure this is marked as a Client Component

import React, { useState } from 'react';

const testimonials = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Another testimonial here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "One more testimonial to showcase. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Fourth testimonial just to add more content.",
  "Fifth testimonial as an extra card."
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-[500px] bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-medium mb-10">Hear what they have to say about our professional services.</h1>

      <div className="relative w-full max-w-screen-lg overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * (100 / 2)}%)` }} // Adjust to show two cards at once
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-[700px] h-70 flex-shrink-0 p-4">
              <div className="bg-[#0074F5] text-white p-8 rounded-xl flex items-center justify-center h-[300px]"> 
                <p className="text-lg text-center">
                  <span className="text-2xl">“</span>
                  {testimonial}
                  <span className="text-2xl">”</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          «
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
