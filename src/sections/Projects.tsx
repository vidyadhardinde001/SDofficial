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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/content/projects");
        setProjectsData(response.data.content.projectsList || []);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectsList = useMemo(
    () =>
      projectsData.map((project) => (
        <div
          key={project.id}
          className="bg-[#232323] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
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
          <div className="mt-4 px-4">
            <p className="text-white text-sm mb-2">Progress</p>
            <div className="w-full bg-gray-700 rounded-full h-4 mr-9">
              <div
                className="bg-[#ff7d38] h-4 rounded-full"
                style={{ width: `${project.progress ?? 100}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2 text-right">
              {project.progress ?? 100}%
            </p>
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
    </div>
  );
};

export default Projects;
