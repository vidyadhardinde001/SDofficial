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

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Blurred Background */}
        <div className="blr-background w-[1000px]">
          <h1 className="text-2xl md:text-5xl font-regular text-shadow mt-6 tracking-tighter bg-[#cfcfcf] text-transparent bg-clip-text">
            Welcome to
          </h1>
          <h1 className="text-3xl md:text-7xl font-medium tracking-tighter bg-gradient-to-b from-white to-[#ffffff] text-transparent bg-clip-text mt-2">
            Siddhivinayak Engineers
          </h1>
          <p className="text-lg md:text-xl text-[#ffffff] tracking-tight mt-6 ">
            One Stop Solution for All your Electric & Automation Needs.
          </p>
          <div className="flex flex-row justify-center gap-2 items-center mt-[30px]">
            <button className="btn btn-primary rounded-full bg-[#fb845d]">Go to Projects</button>
            <button className="btn rounded-full bg-white gap-1 flex items-center">
              <span>Contact Us</span>
              <ArrowIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
