'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define the industries with symbols instead of icons
const industries = [
  { name: 'Automobile', symbol: '🚗' },
  { name: 'Metal Industry', symbol: '⚙️' },
  { name: 'Wire Industry', symbol: '🔧' },
  { name: 'Plastic Pipe Industry', symbol: '🛠️' },
  { name: 'Water Treatment & Distribution', symbol: '💧' },
  { name: 'Food Industries', symbol: '🍔' },
  { name: 'Cold Storage', symbol: '❄️' },
  { name: 'Environmental', symbol: '🌿' },
  { name: 'Animal Feed', symbol: '🐄' },
];

// Animation variants for the rows
const rowVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const IndustriesWeServe: React.FC = () => {
  const [inView, setInView] = useState(false); // Track if section is in view
  const sectionRef = useRef(null); // Create a reference for the section

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Trigger animation when in view
          } else {
            setInView(false); // Reset when out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-[white]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 ">
        {/* Centered Title */}
        <h1 className="text-5xl font-medium mb-6 mt-6 text-[black] ">
          Industries We Serve
        </h1>

        {/* Grid with dynamic number of rows */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Industry Cards */}
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              className="border border-[black] p-4 rounded-lg text-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              animate={inView ? 'visible' : index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              variants={rowVariants}
            >
              <div className="flex justify-center mb-4">
                {/* Render the symbol */}
                <div className="text-4xl text-blue-500">
                  {industry.symbol}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
