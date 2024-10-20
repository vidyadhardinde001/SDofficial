"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Next.js Image component

interface industries {
  name: string;
  icon: string;
}

// Updated animation variants for fade-in effect only
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const IndustriesWeServe: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const IndustryData: industries[] = [
    { name: "Automobile Industry", icon: "/assets/car1.png" },
    { name: "Metal Industry", icon: "/assets/metal1.png" },
    { name: "Wire Industry", icon: "/assets/wire1.png" },
    { name: "Plastic Pipe Industry", icon: "/assets/pipe1.png" },
    { name: "Water Treatment & Distribution", icon: "/assets/water1.png" },
    { name: "Food Industries", icon: "/assets/food1.png" },
    { name: "Cold Storage", icon: "/assets/cold1.png" },
    { name: "Environmental", icon: "/assets/environment.png" },
    { name: "Animal Feed", icon: "/assets/feed.png" },
  ];

  // Intersection Observer for triggering animations once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
    <section className="py-10 bg-[#FAFAFC]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-medium mb-12 mt-3 text-black text-center">
          Industries We Serve
        </h1>

        {/* Grid for 2 rows with 9 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {IndustryData.map((industry) => (
            <motion.div
              key={industry.name}
              className="bg-[#313337] p-6 rounded-lg text-center shadow-md transition-transform duration-300 transform hover:scale-105 border border-red-300 hover:border-red-500"
              whileHover={{ scale: 1.01 }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              {/* Icon Container */}
              <div className="flex justify-center mb-4 p-2 rounded">
                <Image
                  src={industry.icon} // Use the icon path from the industries array
                  alt={industry.name} // Provide alt text for accessibility
                  width={80} // Set appropriate width for the icon
                  height={80} // Set appropriate height for the icon
                  className="object-contain hue-rotate-0 brightness-100"
                />
              </div>

              {/* Industry Name */}
              <h3 className="text-l font-medium text-white mb-2">
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
