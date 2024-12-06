"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo1 from "@/assets/logo1.png";
import Image from "next/image";

interface AboutUsContent {
  heading: string;
  description: string[];
  stats: { value: string | number; label: string }[];
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
          const isCacheValid =
            Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
          if (isCacheValid) {
            setAboutUsContent(JSON.parse(cachedData));
            return;
          }
        }

        const response = await axios.get("/api/content/aboutUsSection");
        const data = response.data.content;
        setAboutUsContent(data);

        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Error fetching about us section content", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          

          {/* Middle Row: About Us Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg lg:row-span-1">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">
              {aboutUsContent?.heading}
            </h2>
            {aboutUsContent?.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Logo Section (Centered) */}
          <div className="lg:col-span-1 flex justify-center items-center flex-col space-y-6">
            <Image
              src={logo1.src}
              alt="Company Logo"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>

          {/* Top Left: Leadership Image */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <Image
              src={aboutUsContent?.leadership.imageUrl || ""}
              alt={aboutUsContent?.leadership.name || "Leadership"}
              width={300}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Top Right: Leadership Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leadership</h2>
            <h3 className="text-3xl font-semibold text-teal-600 mb-2">
              {aboutUsContent?.leadership.name}
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {aboutUsContent?.leadership.description}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {aboutUsContent?.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#FE6D20] text-white p-6 rounded-lg text-center shadow-lg"
            >
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningTransformation;
