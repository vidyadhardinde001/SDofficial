"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Animation variants for flip effect
  const flipVariant = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  return (
    <section
  ref={heroRef}
  className="relative overflow-hidden h-[80vh] flex items-center justify-center"
>
  {/* Video Background */}
  <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/assets/bg-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Black Box with Blurred Edges */}
  <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full max-w-[100%] h-[300px] bg-black opacity-40 blur-sm rounded-lg"></div>

  <div className="container relative z-10 flex flex-col items-center text-center">
    {/* Text content */}
    <motion.h1
      className="text-2xl md:text-5xl font-regular text-shadow mt-6 tracking-tighter bg-[#cfcfcf] text-transparent bg-clip-text"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 0.8 }}
    >
      Welcome to
    </motion.h1>

    <motion.h1
      className="text-3xl md:text-7xl font-medium tracking-tighter bg-gradient-to-b from-white to-[#ffffff] text-transparent bg-clip-text mt-2"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 1, delay: 0.2 }}
    >
      Siddhivinayak Engineers
    </motion.h1>

    <motion.p
      className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-[#ffffff] tracking-tight mt-4 sm:mt-6 lg:mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full xl:max-w-full text-center mx-auto leading-tight"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 1, delay: 0.4 }}
    >
      One Stop Solution for All your Electric & Automation Needs.
    </motion.p>
  </div>
</section>

  );
};
