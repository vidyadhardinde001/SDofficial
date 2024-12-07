"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!isPaused && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 1500); // Scroll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused, projects]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
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
    <section className="py-1 bg-gray-100">
      <h2 className="text-4xl font-medium text-center mb-8 text-gray-800">
        Featured Projects
      </h2>
      <div
        className="relative flex gap-0 px-6 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`min-w-[300px] max-w-[300px] flex-shrink-0 transition-transform duration-500 transform ${
              index === currentIndex ? "scale-105" : "scale-100"
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 320}px)`,
            }}
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
