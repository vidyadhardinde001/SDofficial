"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL to the project image
  category: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Mixer Plant Automation",
    description:
      "Scope of Work: Control Panel, PLC, VFD, Programming, SCADA Software Development, Commissioning of Plant. Integration of Instrumentation like Temperature, Weight etc.PID loop for temperature control.",
    image: "/assets/mixer.png",
    category: "Market research",
  },
  {
    id: 2,
    title: "Incinerators Plant Automation",
    description:
      "Scope Of Work : Turnkey Electric Project including Distribution Panel, Control Panel, Field wiring, PLC, VFD, SCADA with IOT functions Instrumentation integrated like Temperature , Pressure, Flow, Burner Control System etc. VFD Synchronization with change in temperature.",
    image: "/assets/incernator.png",
    category: "Market research",
  },
  {
    id: 3,
    title: "Water Treatment Plant Automation",
    description:
      "Scope Of Work: Turn Key Electrical Project, Distribution Panels, Control Panels, MCC Panels, Field wiring, PLC, VFD, SCADA, Remote I/O Instrumentation Integrated: Actuators for Valves, Ultrasonic Level Sensors, Ph, Turbidity, Flow, Pressure etc.",
    image: "/assets/treatment.png",
    category: "Branding strategies",
  },
  {
    id: 4,
    title: "Wire Stranding Machine",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, Field Wiring etc., Giving and Taking Command & Feedback to Robot ",
    image: "/assets/wirestranding.png",
    category: "Branding strategies",
  },
  {
    id: 5,
    title: "Special Purpose Machines",
    description:
      "Scope OF Supply: Control Panel, PLC, Servo, etc., Control Panel, Field wiring, PLC, VFD .Instrumentation integrated like Temperature , Pressure, Flow, Servo Motion Control System etc.",
    image: "/assets/specialpurpose.png",
    category: "Branding strategies",
  },
  {
    id: 6,
    title: "Robo Interfacing With SPMs",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
    image: "/assets/robo.png",
    category: "Branding strategies",
  },
  {
    id: 7,
    title: "Foundry Core Making Machine",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
    image: "/assets/foundary.png",
    category: "Branding strategies",
  },
  // You can add more projects here
];

const Projects: React.FC = () => {
  // const [projectsData, setProjectsData] = useState<Project[]>([]); // State to store fetched projects
  // const [loading, setLoading] = useState<boolean>(true); // State for loading

  // // Fetch project data from the API
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get("/api/content/projects");
  //       setProjectsData(response.data.content.projectsList); // Access the 'projectsList' inside 'content'
  //       setLoading(false); // Turn off loading once data is fetched
  //     } catch (error) {
  //       console.error("Error fetching projects data:", error);
  //       setLoading(false); // Turn off loading in case of error
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // if (loading) {
  //   return <div>Loading projects...</div>; // Loading state
  // }
  return (
    <div id="projects-section" className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-medium mb-8 text-center text-black">
        Our Projects
      </h1>
      <div className="flex flex-col space-y-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full md:w-1/2 h-auto object-cover"
            />
            <div className="p-6 flex flex-col justify-between md:w-1/2">
              <div>
                <h2
                  className={`text-2xl font-bold mb-2 text-${
                    project.category === "Ads Production"
                      ? "purple-500"
                      : "white"
                  }`}
                >
                  {project.title}
                </h2>
                <p className="text-gray-400">{project.description}</p>
              </div>
              <a href="#" className="mt-4 text-white text-xl self-end">
                →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
