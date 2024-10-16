"use client";

import React, { useRef } from 'react';
import Image from 'next/image'; // Import Next.js Image component

const TestimonialSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging = true;
    startX = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    scrollLeft = scrollContainerRef.current.scrollLeft || 0;
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
      <div className="py-10 px-5 bg-[#232323]">
        <h2 className="text-5xl font-medium mb-6 text-white pb-5 text-center">Testimonials</h2>
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
              &quot;This product exceeded my expectations! The quality is top-notch and the service was excellent.&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src={`https://i.pravatar.cc/100?img=${index + 1}`}
                  alt="User Avatar"
                  width={48} // Width for the image
                  height={48} // Height for the image
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
