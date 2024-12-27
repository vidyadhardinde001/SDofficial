"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AutoScrollingCards: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;
        setProjects(projectsList.slice(0, 10)); // Limit to 10 projects
      } catch (error) {
        console.error("Error fetching projects:", error);
        const response = await axios.get(
          "https://script.googleusercontent.com/macros/echo?user_content_key=jWiOjkrf2ctn2AgdYjCviqqnE6ug9Aidd_OROLJcY_0LmgfZYVE-7st50YzWi5_2L3aAFqee5F2Ppmd-pptFj4drARAV7L3xm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNsCMzeldO4Xb_scTkAnMat5qCrKwegdmpVCvGZHadmqfYT3XWzQJwz-y7I4-Gds87a84TYTPQIyHJ2wmYtgjIjbkze09Tcvtg&lib=MLI_HfzysNsvwOtnrQy7NCvZ1uKL4_q0K"
        );
        const projectsList = response.data.content.projectsList;
        setProjects(projectsList.slice(0, 10));
      }
    };

    fetchProjects();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current || projects.length === 0) return;

    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + projects.length) % projects.length
        : (currentIndex + 1) % projects.length;

    const targetCard = containerRef.current.children[
      newIndex
    ] as HTMLElement;
    containerRef.current.scrollTo({
      left:
        targetCard.offsetLeft - containerRef.current.offsetWidth / 2 +
        targetCard.offsetWidth / 2,
      behavior: "smooth",
    });

    setCurrentIndex(newIndex);
  };

  if (projects.length === 0) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-4xl font-medium text-center mb-8 text-gray-800">
        Featured Projects
      </h2>
      <div className="relative max-w-[80%] mx-auto">
        {/* Cards */}
        <div
          className="flex gap-[50px] overflow-x-auto max-w-full h-[55vh] scrollbar-hidden"
          ref={containerRef}
          style={{
            scrollBehavior: "smooth",
            overflowY: "hidden",
            overflowX: "scroll",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE & Edge
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex-shrink-0 w-[85%] sm:w-[100%] md:w-[50%] lg:w-[30%] mx-2 transition-transform duration-500 ${
                index === currentIndex
                  ? "scale-105 z-10"
                  : "scale-100 opacity-70"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer group h-auto w-full">
                {/* Image Section */}
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-[40vh] sm:h-[45vh] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title Section */}
                <div className="bg-orange-500 text-white text-center py-2 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={() => handleScroll("left")}
            className="w-12 h-12 bg-[#ff7d38] rounded-full flex items-center justify-center text-white hover:bg-[#ffae82] transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <span className="text-2xl font-bold">&#8249;</span>
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-12 h-12 bg-[#ff7d38] rounded-full flex items-center justify-center text-white hover:bg-[#ffae82] transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <span className="text-2xl font-bold">&#8250;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AutoScrollingCards;
