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
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;
        setProjects(projectsList.slice(0, 10)); // Limit to 10 projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!isPaused && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % projects.length;
          if (containerRef.current) {
            const targetCard = containerRef.current.children[
              nextIndex
            ] as HTMLElement;
            containerRef.current.scrollTo({
              left:
                targetCard.offsetLeft -
                containerRef.current.offsetWidth / 2 +
                targetCard.offsetWidth / 2,
              behavior: "smooth",
            });
          }
          return nextIndex;
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isPaused, projects]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (projects.length === 0) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-4xl font-medium text-center mb-8 text-gray-800">
        Featured Projects
      </h2>
      <div
        className="relative gap-[50px] overflow-y-hidden flex overflow-x-auto max-w-[80%] mx-auto h-[50vh] scrollbar-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex-shrink-0 lg:w-[30%] sm:w-[45%] w-full mx-2 transition-transform duration-500 ${
              index === currentIndex ? "scale-105 z-10" : "scale-100 opacity-70"
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
                  className="w-full h-[50vh] sm:h-[250px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay with description */}
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white px-4">
                    {/* Description */}
                    <p className="text-sm sm:text-base">{project.description}</p>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div
                className="absolute bottom-0 left-0 w-full bg-orange-500 text-white text-center py-2 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default AutoScrollingCards;
