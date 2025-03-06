"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";

export const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const [heroContent, setHeroContent] = useState({
    welcomeMessage: "Welcome to",
    mainHeading: "Siddhivinayak Engineers",
    subHeading: "One Stop Solution for All your Electric & Automation Needs.",
    videoUrl: "/assets/bg-video.mp4",
  });

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axios.get("/api/content/heroSection");
        setHeroContent(response.data.content);
      } catch (error) {
        console.error("Error fetching Hero content:", error);
      }
    };

    fetchHeroContent();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const percent =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(percent);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <Head>
        <title>Siddhivinayak Engineers - Your Automation Solutions Partner</title>
        <meta
          name="description"
          content="Siddhivinayak Engineers specializes in control panel manufacturing, PLC, HMI, and SCADA software development, offering top-notch services across various industries."
        />
      </Head>

      <section ref={heroRef} className="relative overflow-hidden flex items-center min-h-[90vh]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted>
            <source src={heroContent.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Black Gradient Overlay */}
        <div className="absolute inset-0 w-full h-full opacity-70 bg-gradient-to-r from-black via-black/60 to-black/0 -z-10"></div>

        {/* Play/Pause Button (Bottom Left) */}
        <button
          onClick={togglePlay}
          className="absolute bottom-5 left-5 bg-white text-black p-2 rounded-full shadow-md"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>

        {/* Mute/Unmute Button (Bottom Right) */}
        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 bg-white text-black p-2 rounded-full shadow-md"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Video Progress Bar (Bottom Center) */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Content (Left Side) */}
        <div className="relative z-10 flex flex-col w-full px-6 lg:px-[50px] items-start text-left max-w-[50%]">
          <motion.h2
            className="text-2xl lg:text-5xl text-white tracking-tight mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {heroContent.welcomeMessage}
          </motion.h2>

          <motion.h1
            className="text-4xl lg:text-6xl font-semibold text-white mt-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            {heroContent.mainHeading}
          </motion.h1>

          <motion.p
            className="text-lg lg:text-2xl text-white mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {heroContent.subHeading}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="#services" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Go to Services
            </Link>
            <Link href="/contactus" className="bg-white text-orange-500 border px-4 py-2 rounded-md hover:bg-orange-100">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
