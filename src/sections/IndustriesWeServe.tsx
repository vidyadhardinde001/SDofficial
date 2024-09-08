'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import the Link component from Next.js

const industries = [
  { name: 'Automobile', icon: '✔️' },
  { name: 'Metal Industry', icon: '✔️' },
  { name: 'Wire Industry', icon: '✔️' },
  { name: 'Plastic Pipe Industry', icon: '✔️' },
  { name: 'Water Treatment & Distribution', icon: '✔️' },
  { name: 'Food Industries', icon: '✔️' },
  { name: 'Cold Storage', icon: '✔️' },
  { name: 'Environmental', icon: '✔️' },
  { name: 'Animal Feed', icon: '✔️' },
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
    <section className="py-12 bg-gray-900" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Centered Title */}
        <h2 className="text-center text-3xl font-semibold text-white mb-8">
          Industries We Serve
        </h2>

        {/* Grid with two rows, 5 items per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Industry Cards */}
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              className="border border-gray-700 p-4 w-full min-h-[160px] md:min-h-[200px] rounded-lg text-left bg-gray-800 text-white shadow-lg flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
              initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              animate={inView ? 'visible' : index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              variants={rowVariants}
            >
              <div className="text-3xl mb-2 text-green-400">{industry.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {industry.name}
              </h3>
              <Link href="#" className="text-green-400 mt-2 inline-block hover:underline">
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
