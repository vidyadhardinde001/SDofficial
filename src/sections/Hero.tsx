"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
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

  const [isPortrait, setIsPortrait] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchHeroContent = async () => {
      const cachedHeroContent = localStorage.getItem("heroContent");
      const cachedTimestamp = localStorage.getItem("heroCacheTimestamp");

      if (cachedHeroContent && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          setHeroContent(JSON.parse(cachedHeroContent));
          return;
        }
      }

      try {
        const response = await axios.get("/api/content/heroSection");
        const data = response.data.content;
        setHeroContent(data);

        localStorage.setItem("heroContent", JSON.stringify(data));
        localStorage.setItem("heroCacheTimestamp", new Date().getTime().toString());
      } catch (error) {
        console.error("Error fetching Hero content:", error);
      }
    };

    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    fetchHeroContent();
    updateOrientation();

    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const progressPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  const seekVideo = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
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

      <section
        ref={heroRef}
        className={`relative overflow-hidden flex items-center min-h-[70vh] sm:min-h-[90vh] ${isPortrait ? "justify-center text-center" : "justify-start text-left"}`}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={updateProgress}
          >
            <source src={heroContent.videoUrl || "/assets/bg-video.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute inset-0 w-full h-full opacity-70 bg-gradient-to-r from-black via-black/60 to-black/0 -z-10"></div>

        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <button onClick={togglePlay} className="text-white bg-gray-800 px-3 py-2 rounded">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={toggleMute} className="text-white bg-gray-800 px-3 py-2 rounded">
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <div ref={progressBarRef} className="w-40 h-2 bg-gray-600 rounded overflow-hidden cursor-pointer" onClick={seekVideo}>
            <div className="h-full bg-white" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="absolute top-10 left-10 text-white text-xs">
          <p className="flex items-center text-[10px]"><span className="text-orange-500 mr-2">&#8226;&#8226;&#8226;</span> We Are Manufacturers Of Custom made Industrial Control Panels And Industrial Automation.</p>
          <p className="flex items-center text-[10px]"><span className="text-orange-500 mr-2">&#8226;&#8226;&#8226;</span> We Offer Factory Automation Products (PLC, SCADA, HMI, VFD, AC Servo) of world-renowned brands.</p>
          <p className="flex items-center text-[10px]"><span className="text-orange-500 mr-2">&#8226;&#8226;&#8226;</span> Custom Software development & On-site commissioning services.</p>
        </div>
      </section>
    </>
  );
};
