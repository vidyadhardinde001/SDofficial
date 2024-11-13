"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo1 from "@/assets/logo1.png";
import Image from "next/image";

interface AboutUsContent {
  heading: string;
  description: string[];
  stats: { value: string | number; label: string }[];
  imageUrl: string;
  leadership: {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
  };
}
const CACHE_KEY = "aboutUsContentCache";
const CACHE_EXPIRATION = 60 * 60 * 1000; 
const LearningTransformation: React.FC = () => {
  const [aboutUsContent, setAboutUsContent] = useState<AboutUsContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const isCacheValid = Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
          if (isCacheValid) {
            setAboutUsContent(JSON.parse(cachedData));
            return;
          }
        }

        // If no valid cache, fetch data from the API
        const response = await axios.get("/api/content/aboutUsSection");
        const data = response.data.content;
        setAboutUsContent(data);

        // Save data to localStorage with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Error fetching aboutus section content", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4 lg:max-w-5xl xl:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Text Section */}
          <div className="bg-[#232323] p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl md:text-4xl font-bold text-[#ff7d38] mb-4 leading-tight">
              {aboutUsContent?.heading}
            </h2>
            {aboutUsContent?.description.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image and Stats Section */}
          <div className="flex flex-col items-center space-y-6">
          <Image
            src={logo1.src}
            alt="Logo"
            width={300} // Adjust the width as needed
            height={200} // Adjust the height as needed
            className="w-[80%] md:w-[90%] lg:w-[100%] bg-[#232323] max-w-lg object-contain rounded-lg shadow-lg"
          />


            <div className="grid grid-cols-2 gap-4 w-full">
              {aboutUsContent?.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#232323] p-4 rounded-lg shadow-lg text-center text-white"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-[#ff7d38]">{stat.value}</h3>
                  <p className="text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        {aboutUsContent?.leadership && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Image
              src={aboutUsContent.leadership.imageUrl}
              alt={aboutUsContent.leadership.name}
              width={400} // Specify appropriate width
              height={300} // Specify appropriate height
              className="w-[80%] md:w-[90%] lg:w-[100%] max-w-lg object-contain rounded-lg shadow-lg mx-auto"
            />
            <div className="bg-[#232323] p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl md:text-4xl font-bold text-[#009688] mb-4 leading-tight">
                Leadership
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-[#ff7d38] mb-2">
                {aboutUsContent.leadership.name}
              </h3>
              <p className="text-base md:text-lg">{aboutUsContent.leadership.description}</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default LearningTransformation;
