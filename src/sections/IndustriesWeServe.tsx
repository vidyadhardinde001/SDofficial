'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { motion } from 'framer-motion';

const industries = [
  { name: 'Automobile', imagePath: '/assets/car.png' },
  { name: 'Metal Industry', imagePath: '/assets/metal.png' },
  { name: 'Wire Industry', imagePath: '/assets/wire.png' },
  { name: 'Cold Storage', imagePath: '/assets/cold.png' },
  { name: 'Animal Feed', imagePath: '/assets/animal.png' },
  { name: 'Food Industries', imagePath: '/assets/food.png' },
  { name: 'Water Treatment & Distribution', imagePath: '/assets/water.png' },
  { name: 'Environmental', imagePath: '/assets/plant.png' },
  { name: 'Plastic Pipe Industry', imagePath: '/assets/pipe.png' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="bg-black text-white py-12">
      <h2 className="text-center text-4xl font-normal mb-12">Industries we serve</h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
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
            <motion.img
              src={industry.imagePath}
              alt={industry.name}
              className="w-20 h-20 sm:w-15 sm:h-15 mb-4 object-contain"
              whileHover={{ scale: 1.1 }}
            />
            <p className="text-lg font-regular">{industry.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// Export with dynamic import and client-side rendering
export default dynamic(() => Promise.resolve(IndustriesWeServe), { ssr: false });
