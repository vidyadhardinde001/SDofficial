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
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=yIf-C8I1vOPKOskf4jp7kVUTG7mpBLmSb3_HFPvEwkpOpR3ncZau8PmWyC0iGGJCf_18hywsRE2UfI1h8vsc29XncDIATNFJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPSes8K7rVC4cBQF2LqNz5wTxp2unB-jQa368GhxUbYHGxZqVBdM0i6thF3ZyONz4XQJmmtVdaPpBUVnQgDnpzCJuDlzVxqDkQ&lib=MhOghx2ivbIsU-792mgpTLfZ1uKL4_q0K");
        const data = response.data.content;
        setHeroContent(data);
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
        className={`relative overflow-hidden flex items-center min-h-[70vh] sm:min-h-[90vh] ${
          isPortrait ? "justify-center text-center" : "justify-start text-left"
        }`}
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
        <div className="absolute inset-0 w-full h-full opacity-70 bg-gradient-to-r from-black via-black/60 to-black/0 -z-10"></div>

        {/* Content */}
        <div
          className={`relative z-10 flex flex-col w-full px-4 sm:px-6 lg:px-[50px] ${
            isPortrait ? "items-center" : "items-start"
          }`}
        >
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter bg-gradient-to-b from-white to-white/70 text-transparent bg-clip-text mt-2 mb-5 sm:mb-1 pb-1"
            initial="hidden"
            animate="visible"
            variants={flipVariant}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ lineHeight: "1.1" }}
          >
            {heroContent.mainHeading || "Siddhivinayak Engineers"}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-base md:text-lg lg:text-2xl text-white tracking-tight mt-1 sm:mt-6 leading-tight"
            initial="hidden"
            animate="visible"
            variants={flipVariant}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {heroContent.subHeading ||
              "One Stop Solution for All your Electric & Automation Needs."}
          </motion.p>

          <motion.div
            className="text-sm sm:text-base md:text-sm lg:text-sm text-white tracking-tight mt-1 sm:mt-6 leading-tight hidden lg:block"
            initial="hidden"
            animate="visible"
            variants={flipVariant}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span>
                We Are Manufacturers Of Custom made Industrial Control Panels
                And Industrial Automation.
              </li>
              <li className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span>
                We Offer Factory Automation Products (PLC, SCADA, HMI, VFD, AC
                Servo) of world renowned brands.
              </li>
              <li className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span>
                Custom Software development & On site commissioning services.
              </li>
            </ul>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="#services"
              className="bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition hover:bg-orange-600 text-sm sm:text-base"
            >
              Go to Services
            </Link>
            <Link
              href="/contactus"
              className="bg-white text-orange-500 border border-orange-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition hover:bg-orange-100 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
