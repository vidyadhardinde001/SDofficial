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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLandscape, setIsLandscape] = useState(true); // Track orientation
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;
        setProjects(projectsList.slice(0, 10)); // Limit to 10 projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Check orientation on window resize
  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        setIsLandscape(false); // Portrait mode
      } else {
        setIsLandscape(true); // Landscape mode
      }
    };

    checkOrientation(); // Check initial orientation
    window.addEventListener("resize", checkOrientation); // Listen for resize events

    return () => {
      window.removeEventListener("resize", checkOrientation); // Cleanup
    };
  }, []);

  useEffect(() => {
    if (!isPaused && isLandscape && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % projects.length; // Loop back to the first project
          // Smooth scrolling to the next item
          if (containerRef.current) {
            const targetCard = containerRef.current.children[nextIndex] as HTMLElement;
            containerRef.current.scrollTo({
              left: targetCard.offsetLeft,
              behavior: "smooth", // This ensures smooth scroll
            });
          }
          return nextIndex;
        });
      }, 2000); // Scroll every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, projects, isLandscape]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const targetCard = containerRef.current.children[index] as HTMLElement;
      containerRef.current.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500">No projects to display.</div>
    );
  }

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-4xl font-medium text-center mb-8 text-gray-800">
        Featured Projects
      </h2>
      <div
        className="relative flex gap-[50px] overflow-x-hidden justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '1200px', // Ensures the container is centered
          margin: '0 auto', // Centers the container
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[350px] xl:min-w-[380px] transition-transform duration-500 transform ${
              index === currentIndex ? "scale-105" : "scale-100"
            }`}
          >
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer group"
              onClick={() => openLightbox(project.image)}
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={280}
                  height={200}
                  className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white px-4">
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-orange-500">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4 mb-4">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected project"
              width={800}
              height={600}
              className="rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AutoScrollingCards;
