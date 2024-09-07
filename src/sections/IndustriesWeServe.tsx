'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const industries = [
  { name: 'Automobile', imagePath: '/assets/car.png', details: 'Details about Automobile industry...' },
  { name: 'Metal Industry', imagePath: '/assets/metal.png', details: 'Details about Metal industry...' },
  { name: 'Wire Industry', imagePath: '/assets/wire.png', details: 'Details about Wire industry...' },
  { name: 'Cold Storage', imagePath: '/assets/cold.png', details: 'Details about Cold Storage industry...' },
  { name: 'Animal Feed', imagePath: '/assets/animal.png', details: 'Details about Animal Feed industry...' },
  { name: 'Food Industries', imagePath: '/assets/food.png', details: 'Details about Food industry...' },
  { name: 'Water Treatment & Distribution', imagePath: '/assets/water.png', details: 'Details about Water Treatment & Distribution industry...' },
  { name: 'Environmental', imagePath: '/assets/plant.png', details: 'Details about Environmental industry...' },
  { name: 'Plastic Pipe Industry', imagePath: '/assets/pipe.png', details: 'Details about Plastic Pipe industry...' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};

const IndustriesWeServe: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const toggleDetails = (name: string) => {
    setActiveIndustry(activeIndustry === name ? null : name);
  };

  return (
    <section className="bg-[#263142] text-white py-12">
      <h2 className="text-center text-4xl font-normal mb-12">Industries we serve</h2>
      <motion.div 
        className="flex justify-between items-center gap-20 max-w-6xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {industries.map((industry) => (
          <motion.div
            key={industry.name}
            className="flex flex-col items-center text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Wrapper to keep plus symbol, image, and industry name aligned */}
            <div className="flex flex-col items-center" style={{ minHeight: '200px' }}>
              {/* Plus/Minus symbol with a circle around it */}
              <button 
                onClick={() => toggleDetails(industry.name)} 
                className="flex items-center justify-center w-8 h-8 mb-4 text-white text-2xl rounded-full bg-[#1c2733] border border-white hover:bg-white hover:text-[#1c2733] focus:outline-none"
              >
                {activeIndustry === industry.name ? '−' : '+'}
              </button>

              {/* Industry image */}
              <motion.img
                src={industry.imagePath}
                alt={industry.name}
                className="w-24 h-24 sm:w-20 sm:h-20 mb-4 object-contain"
                whileHover={{ scale: 1.1 }}
              />

              <p className="text-lg font-regular mt-2">{industry.name}</p>
            </div>

            {/* Details section */}
            {activeIndustry === industry.name && (
              <motion.div 
                className="mt-4 text-sm text-left bg-[#1c2733] p-4 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {industry.details}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// Export with dynamic import and client-side rendering
export default dynamic(() => Promise.resolve(IndustriesWeServe), { ssr: false });
