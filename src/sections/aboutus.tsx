"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface AboutUsContent {
  heading: string;
  description: string[];
  stats: { value: string; label: string }[];
  imageUrl: string;
}

const LearningTransformation: React.FC = () => {
  const [aboutUsContent, setAboutUsContent] = useState<AboutUsContent | null>(
    null
  );

  useEffect(() => {
    // Fetch content from the backend
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/aboutus'); // Fetching contact content
        const data = await response.json();
        console.log("Fetched data:", data);
        setAboutUsContent(data.content);
        
      } catch (error) {
        console.error('Error fetching aboutus section content', error);
      }
    };
    fetchContent();
  }, []);

  if (!aboutUsContent) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <section className="bg-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: Text */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-black mb-2 leading-tight">
              {aboutUsContent.heading}
            </p>
            <br />
            {aboutUsContent?.description?.map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-lg mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Section: Image and Stats */}
          <div className="flex flex-col items-center">
            {/* Image Section */}
            <div className="w-full mb-6 flex justify-center">
              <img
                src={aboutUsContent.imageUrl}
                alt="Logo"
                className="w-[1500px] h-[1500px] max-w-[1200px] max-h-[360px] object-contain rounded-lg shadow-md bg-[#f7f7f7]" // Adjusted width and height
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6 w-full">
              {aboutUsContent?.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md text-center"
                >
                  <h2 className="text-3xl font-bold text-black">
                    {stat.value}
                  </h2>
                  <p className="text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default  LearningTransformation;
