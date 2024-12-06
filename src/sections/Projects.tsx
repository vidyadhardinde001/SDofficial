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

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch project data from the API
  const CACHE_KEY = "projectsData";
  const CACHE_TIMESTAMP_KEY = "projectsCacheTimestamp";
  const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    const fetchProjects = async () => {
      // Check if data is in cache and hasn't expired
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cachedTimestamp) {
        const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          // Use cached data
          setProjectsData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data from API if cache is expired or not available
      try {
        const response = await axios.get("/api/content/projects");
        const projectsList = response.data.content.projectsList;

        // Update state and cache the data
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

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const projectsList = useMemo(
    () =>
      projectsData.map((project) => (
        <div
          key={project.id}
          className="bg-[#232323] rounded-lg overflow-hidden shadow-lg transform hover:shadow-2xl"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={700}
            height={400}
            className="w-full h-[350px] object-cover cursor-pointer"
            onClick={() => openModal(project.image)} // Open modal on click
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

      {/* Modal */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal} // Close modal when background is clicked
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Full view"
              width={1200}
              height={800}
              className="rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
