"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import { useEffect ,useState} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import axios from "axios";

declare global {
  interface Window {
    botpressWebChat: any; // Declare the botpressWebChat property
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

  // Animation variants for flip effect
  const flipVariant = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  const [heroContent, setHeroContent] = useState<HeroContent>({
    welcomeMessage: '',
    mainHeading: '',
    subHeading: '',
    videoUrl: ''
  });

  // Load Botpress script and configuration
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axios.get('/api/content/heroSection');
        const data = response.data.content;
        // const response = await fetch('/api/content/heroSection');
        // const data = await response.json();
        setHeroContent(data);
      } catch (error) {
        console.error('Error fetching Hero content:', error);
      }
    };

    fetchHeroContent();

    window.botpressWebChat = {
      botId: "1f02dc69-88ec-4ac9-807e-92b5d1cc4fc9", // Your bot ID
      host: "https://cdn.botpress.cloud",
      botName: "SupportBot", // Optional: customize the bot name
      showMessageHistory: true,
      enableReset: true,
      startOpen: false, // Keep the bot closed initially
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
      }
    };

    // Dynamically add the Botpress Webchat script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    const configScript = document.createElement("script");
    configScript.src = "https://mediafiles.botpress.cloud/1f02dc69-88ec-4ac9-807e-92b5d1cc4fc9/webchat/v2.1/config.js";
    configScript.async = true;
    document.body.appendChild(configScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(configScript);
    };
  }, []);

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
          className="text-2xl md:text-5xl font-medium text-shadow mt-6 tracking-tighter bg-[#ffffff] text-transparent bg-clip-text"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 0.8 }}
        >
          {heroContent?.welcomeMessage}
        </motion.h1>

        <motion.h1
          className="text-3xl md:text-6xl h-[10vh] font-semibold tracking-tighter bg-gradient-to-b from-white to-[#ffffff] text-transparent bg-clip-text mt-2"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {heroContent?.mainHeading}
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-[#ffffff] tracking-tight mt-1 sm:mt-6 lg:mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full xl:max-w-full text-center mx-auto leading-tight"
          initial="hidden"
          animate="visible"
          variants={flipVariant}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {heroContent?.subHeading}
        </motion.p>
      </div>
    </section>
  );
};