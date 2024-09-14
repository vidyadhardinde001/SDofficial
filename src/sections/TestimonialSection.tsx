"use client";

import React, { useRef } from 'react';

const TestimonialSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div className="py-10 px-5 bg-[#EAEEFE]">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-scroll cursor-grab select-none custom-scrollbar"
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[300px] bg-white shadow-md rounded-lg p-6 flex-shrink-0"
            >
              <p className="text-gray-600 mb-4">
                "This product exceeded my expectations! The quality is top-notch and the service was excellent."
              </p>
              <div className="flex items-center">
                <img
                  src={`https://i.pravatar.cc/100?img=${index + 1}`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">John Doe {index + 1}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
      `}</style>
    </>
  );
};

export default TestimonialSection;
