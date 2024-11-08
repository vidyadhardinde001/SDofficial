"use client";

import Image from "next/image"; // Import Next.js Image component
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL to the project image
  category: string;
  progress: number; // Progress percentage
}

const Projects: React.FC = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]); // State to store fetched projects
  const [loading, setLoading] = useState<boolean>(true); // State for loading

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

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div id="projects-section" className="w-full px-4 py-8 bg-white">
      <h1 className="text-4xl font-medium mb-8 text-center text-black">
        Our Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        {/* Set up a responsive grid layout with three columns on medium screens and above */}
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-[#232323] rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
              width={600}
              height={300}
            />
            <div className="p-4">
              <h2
                className={`text-xl font-bold mb-2 text-${
                  project.category === "Ads Production"
                    ? "[#ff7d38]"
                    : "[#ff7d38]"
                }`}
              >
                {project.title}
              </h2>
              <p className="text-white text-sm mb-4">{project.description}</p>
            </div>
            <div className="mt-4 px-4">
              <p className="text-white text-sm mb-2">Progress</p> {/* Add Progress label */}
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-[#ff7d38] h-4 rounded-full"
                  style={{ width: `100%` }} // Default to 100%
                ></div>
              </div>
              <p className="text-white text-sm mt-2 text-right">
                {project.progress || 100}% {/* Default progress to 100% if no value */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
