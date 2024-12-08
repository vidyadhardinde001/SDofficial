"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface industries {
  name: string;
  icon: string;
}

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
    <section className="py-10 bg-[#232323]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl font-medium mb-12 mt-3 text-white text-center">
          Industries We Serve
        </h2>

        {/* Grid with internal borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
          {IndustryData.map((industry, index) => (
            <motion.div
              key={industry.name}
              className={`relative flex flex-col items-center p-4 ${
                index % 3 !== 2 ? "border-r border-[#ffffff]" : "" // Add right border except for the last column
              } ${
                index < IndustryData.length - 3 ? "border-b border-[#ffffff]" : "" // Add bottom border except for the last row
              }`}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              {/* Icon */}
              <div className="w-20 h-20 flex justify-center items-center mb-3 portrait:hidden">
                <Image
                  src={industry.icon}
                  alt={industry.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* Industry Name */}
              <h3 className="text-sm font-medium text-white text-center">
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
