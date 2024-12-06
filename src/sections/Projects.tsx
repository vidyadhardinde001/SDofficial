"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  progress: number;
}

const Projects: React.FC = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const CACHE_KEY = "projectsData";
  const CACHE_TIMESTAMP_KEY = "projectsCacheTimestamp";
  const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    const fetchProjects = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cachedTimestamp) {
        const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          setProjectsData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;
        setProjectsData(projectsList);
        localStorage.setItem(CACHE_KEY, JSON.stringify(projectsList));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects data:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Set the selected image for lightbox
  };

  const closeLightbox = () => {
    setSelectedImage(null); // Clear the selected image to close the lightbox
  };

  const projectsList = useMemo(
    () =>
      projectsData.map((project) => (
        <div
          key={project.id}
          className="bg-[#232323] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
          onClick={() => handleImageClick(project.image)} // Open lightbox on click
        >
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2
              className={`text-xl font-bold mb-2 ${
                project.category === "Ads Production"
                  ? "text-[#ff7d38]"
                  : "text-[#ff7d38]"
              }`}
            >
              {project.title}
            </h2>
            <p className="text-white text-sm mb-4">{project.description}</p>
          </div>
        </div>
      )),
    [projectsData]
  );

  return (
    <div id="projects-section" className="w-full px-4 py-8 bg-white">
      <h1 className="text-4xl font-medium mb-8 text-center text-black">
        Our Projects
      </h1>
      {loading ? (
        <div className="text-center text-black">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {projectsList}
        </div>
      )}

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
    </div>
  );
};

export default Projects;
