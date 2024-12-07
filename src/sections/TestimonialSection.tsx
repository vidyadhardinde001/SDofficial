"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Image from "next/image";

interface Testimonial {
  testimonial: string;
  name: string;
  avatarUrl: string;
}

const CACHE_KEY = "testimonialsCache";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const isCacheValid = Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
          if (isCacheValid) {
            setTestimonials(JSON.parse(cachedData));
            return;
          }
        }

        // Fetch data from the API if no valid cache
        const response = await axios.get("/api/content/testimonial");
    console.log("API Response:", response.data); // Log the whole response

    const data = response.data.content; // Access 'content' in response
    console.log("Data Content:", data);
        if (data && Array.isArray(data.testimonialList)) {
          setTestimonials(data.testimonialList);  // Set the array of testimonials correctly
        } else {
          console.error("Error: 'testimonialList' is not an array or not present.");
        }
        setTestimonials(data.testimonialList);

        // Save data to localStorage with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.testimonialList));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  }, []);

  const handleMouseLeaveOrUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  return (
    <section className="py-8 px-4 sm:py-10 sm:px-6 lg:py-12 lg:px-8 bg-[#232323]">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white text-center mb-6">
        Testimonials
      </h2>
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        role="region"
        aria-label="Testimonials"
        className="flex gap-4 sm:gap-6 overflow-x-scroll cursor-grab select-none custom-scrollbar pb-4"
      >
         {Array.isArray(testimonials) && testimonials.map((testimonial, index) => (
  <div key={index} className="min-w-[240px] sm:min-w-[280px] lg:min-w-[300px] max-w-[280px] lg:max-w-[320px] bg-white shadow-md rounded-lg p-4 sm:p-6 flex-shrink-0">
    <p className="text-gray-600 text-sm sm:text-base mb-3">
      &quot;{testimonial.testimonial}&quot;
    </p>
    <div className="flex items-center">
      <Image src={testimonial.avatarUrl} alt="User Avatar" width={48} height={48} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4" />
      <div>
        <p className="font-bold text-sm sm:text-base">{testimonial?.name}</p>
        <p className="text-xs sm:text-sm text-gray-500">Customer</p>
      </div>
    </div>
  </div>
))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
