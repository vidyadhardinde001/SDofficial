"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo1 from "@/assets/logo1.png";


interface AboutUsContent {
  heading: string;
  description: string[];
  stats: { value: string; label: string }[];
  imageUrl: string;
}

const LearningTransformation: React.FC = () => {
  const [aboutUsContent, setAboutUsContent] = useState<AboutUsContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/aboutus');
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
    return <p>Loading...</p>;
  }

  return (
    <section className="bg-white py-6 md:py-12">
      <div className="container mx-auto px-4 lg:max-w-5xl xl:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left Section: Text */}
          <div className="bg-[#232323] p-4 md:p-8 rounded-lg shadow-md">
            <p className="text-2xl md:text-4xl font-bold text-[#ff7d38] mb-2 leading-tight">
              {aboutUsContent.heading}
            </p>
            <br />
            {aboutUsContent.description.map((paragraph, index) => (
              <p key={index} className="text-white text-base md:text-lg mb-2 md:mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Section: Image and Stats */}
          <div className="flex flex-col items-center">
            {/* Image Section */}
            <div className="w-full mb-4 md:mb-6 flex justify-center">
              <img
                src={logo1.src}
                alt="Logo"
                className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:max-w-[1000px] lg:max-h-[600px] object-contain rounded-lg shadow-md bg-[#232323]"
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full">
              {aboutUsContent.stats.map((stat, index) => (
                <div key={index} className="bg-[#232323] p-2 md:p-4 rounded-lg shadow-md text-center">
                  <h2 className="text-xl md:text-3xl font-bold text-[#ff7d38]">{stat.value}</h2>
                  <p className="text-white text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left Section: Image */}
          <div className="flex justify-center">
            <img
              src="/path-to-your-uploaded-image.jpg"
              alt="Mr. Nikhil Sutar"
              className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:max-w-[1000px] lg:max-h-[600px] object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Right Section: Description */}
          <div className="p-4 md:p-8 rounded-lg shadow-md bg-[#232323]">
            <h2 className="text-2xl md:text-4xl font-bold text-[#009688] mb-2 leading-tight">
              Leadership
            </h2>
            <hr className="border-[#009688] mb-2 md:mb-4 w-1/3" />
            <h3 className="text-xl md:text-2xl font-bold text-[#ff7d38] mb-2">
              Mr. Nikhil Sutar
            </h3>
            <p className="text-white text-base md:text-lg">
              An Electronics Engineer with over 3 years of hands-on experience in the Industrial Automation Industry, he is the backbone of Microlog. His relentless efforts have yielded his organization an outstanding reputation in understanding customer needs. His special skills in programming, graphic visualization, design & development, and computer software provide an edge while working out embedded solutions for numerous industrial clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningTransformation;
