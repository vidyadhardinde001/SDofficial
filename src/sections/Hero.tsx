"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
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
        localStorage.setItem(
          "heroCacheTimestamp",
          new Date().getTime().toString()
        );
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

  const togglePlayPause = () => {
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

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      }
    };
    
    videoRef.current?.addEventListener("timeupdate", updateProgress);
    return () => {
      videoRef.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

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
      </Head>

      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center min-h-[70vh] sm:min-h-[90vh]"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onClick={togglePlayPause}
          >
            <source src={heroContent.videoUrl || "/assets/bg-video.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute bottom-4 left-4 flex space-x-4">
          <button onClick={togglePlayPause} className="bg-white p-2 rounded-full">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div
            ref={progressBarRef}
            className="relative w-40 h-2 bg-gray-300 rounded cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-full bg-orange-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button onClick={toggleMute} className="bg-white p-2 rounded-full">
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </section>
    </>
  );
};
