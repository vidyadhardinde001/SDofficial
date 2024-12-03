"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
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

const CACHE_EXPIRATION_MS = 60 * 60 * 1000; 

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

  useEffect(() => {
    const fetchHeroContent = async () => {
      const cachedHeroContent = localStorage.getItem("heroContent");
      const cachedTimestamp = localStorage.getItem("heroCacheTimestamp");

      if (cachedHeroContent && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          // Use the cached data if it's still valid
          setHeroContent(JSON.parse(cachedHeroContent));
          return;
        }
      }

      // If no valid cache or cache expired, fetch from the API
      try {
        const response = await axios.get("/api/content/heroSection");
        const data = response.data.content;
        
        // Store the fetched data in state
        setHeroContent(data);

        // Cache the fetched data and timestamp in localStorage
        localStorage.setItem("heroContent", JSON.stringify(data));
        localStorage.setItem("heroCacheTimestamp", new Date().getTime().toString());
      } catch (error) {
        console.error("Error fetching Hero content:", error);
      }
    };

    fetchHeroContent();

    if (typeof window !== "undefined" && !window.botpressWebChat) {
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
  }, []);

  // useEffect(() => {
  //   fetchHeroContent();

    
  // }, [fetchHeroContent]);

  return (
    <>
      <Head>
        <title>
          Siddhivinayak Engineers - Your Automation Solutions Partner
        </title>
        <meta
          name="description"
          content="Siddhivinayak Engineers specializes in control panel manufacturing, PLC, HMI, and SCADA software development, offering top-notch services across various industries."
        />
        {/* Additional meta tags */}
      </Head>

      <section
  ref={heroRef}
  className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center px-4"
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
      <source
        src={heroContent.videoUrl || "/assets/bg-video.mp4"}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Black Gradient Overlay */}
  <div
    className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/70 to-black/0 -z-10"
  ></div>

  {/* Content */}
  <div className="container relative flex flex-col items-start text-left max-w-none w-[50%] pl-0">
    <motion.h2
      className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-white tracking-tight mt-2"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 1, delay: 0.1 }}
    >
      Welcome to
    </motion.h2>

    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter bg-gradient-to-b from-white to-white/70 text-transparent bg-clip-text mt-2 mb-5 sm:mb-1 w-full pb-1"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 1, delay: 0.1 }}
      style={{ lineHeight: "1.1", paddingBottom: "0em" }}
    >
      {heroContent.mainHeading || "Siddhivinayak Engineers"}
    </motion.h1>

    <motion.p
      className="text-sm sm:text-base md:text-lg lg:text-xl text-white tracking-tight mt-1 sm:mt-6 leading-tight"
      initial="hidden"
      animate="visible"
      variants={flipVariant}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {heroContent.subHeading ||
        "One Stop Solution for All your Electric & Automation Needs."}
    </motion.p>

    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Link
        href="/projects"
        className="bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition hover:bg-orange-600 text-left text-sm sm:text-base"
      >
        Go to Projects
      </Link>
      <Link
        href="/contactus"
        className="bg-white text-orange-500 border border-orange-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition hover:bg-orange-100 text-left text-sm sm:text-base"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>

    </>
  );
};
