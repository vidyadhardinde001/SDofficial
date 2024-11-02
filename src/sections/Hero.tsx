"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import axios from "axios";

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

interface HeroContent {
  welcomeMessage: string;
  mainHeading: string;
  subHeading: string;
  videoUrl: string;
}

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const flipVariant = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  const [heroContent, setHeroContent] = useState<HeroContent>({
    welcomeMessage: "",
    mainHeading: "",
    subHeading: "",
    videoUrl: "",
  });

  const fetchHeroContent = useCallback(async () => {
    try {
      const response = await axios.get("/api/content/heroSection");
      setHeroContent(response.data.content);
    } catch (error) {
      console.error("Error fetching Hero content:", error);
    }
  }, []);

  useEffect(() => {
    fetchHeroContent();

    if (!window.botpressWebChat) {
      window.botpressWebChat = {
        botId: "1f02dc69-88ec-4ac9-807e-92b5d1cc4fc9",
        host: "https://cdn.botpress.cloud",
        botName: "SupportBot",
        showMessageHistory: true,
        enableReset: true,
        startOpen: false,
        styles: {
          botMessageColor: "#9A90E2",
          botMessageBackground: "#EAEAEA",
          userMessageColor: "#FFFFFF",
          userMessageBackground: "#000000",
          headerBackground: "#FF5733",
          headerTextColor: "#000000",
          primaryColor: "#3498db",
          messageTextColor: "#333333",
          botAvatarUrl: "https://example.com/avatar.png",
        },
      };

      const injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      injectScript.async = true;
      document.body.appendChild(injectScript);

      const configScript = document.createElement("script");
      configScript.src =
        "https://files.bpcontent.cloud/2024/10/14/15/20241014153951-L6VHID1U.js";
      configScript.async = true;
      document.body.appendChild(configScript);

      return () => {
        if (injectScript) document.body.removeChild(injectScript);
        if (configScript) document.body.removeChild(configScript);
      };
    }
  }, [fetchHeroContent]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroContent.videoUrl || "/assets/bg-video.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full max-w-full h-[300px] bg-black opacity-40 blur-sm rounded-lg"></div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-shadow mt-6 tracking-tighter bg-[#ffffff] text-transparent bg-clip-text"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 0.8 }}
        >
          {heroContent.welcomeMessage || "Welcome to"}
        </motion.h1>

        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl h-[10vh] font-semibold tracking-tighter bg-gradient-to-b from-white to-[#ffffff] text-transparent bg-clip-text mt-2"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {heroContent.mainHeading || "Siddhivinayak Engineers"}
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#ffffff] tracking-tight mt-1 sm:mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full xl:max-w-full text-center mx-auto leading-tight"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {heroContent.subHeading || "One Stop Solution for All your Electric & Automation Needs."}
        </motion.p>
      </div>
    </section>
  );
};
