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
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://sdofficial-r1zr.onrender.com/api/content/projects"
        );
        setProjectsData(response.data.content.projectsList); // Access the 'projectsList' inside 'content'
        setLoading(false); // Turn off loading once data is fetched
      } catch (error) {
        console.error("Error fetching projects data:", error);
        setLoading(false); // Turn off loading in case of error
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
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-200 h-4 rounded-full"
                  style={{ width: `100%` }}
                ></div>
              </div>
              <p className="text-white text-sm mt-2 text-right">
                {project.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
