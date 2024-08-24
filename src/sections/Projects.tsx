// src/pages/Projects.tsx

import React from "react";

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
    image: "/path/to/market-research-image.jpg",
    category: "Market research",
  },
  {
    id: 2,
    title: "Incinerators Plant Automation",
    description:
      "Scope Of Work : Turnkey Electric Project including Distribution Panel, Control Panel, Field wiring, PLC, VFD, SCADA with IOT functions Instrumentation integrated like Temperature , Pressure, Flow, Burner Control System etc. VFD Synchronization with change in temperature.",
    image: "/path/to/market-research-image.jpg",
    category: "Market research",
  },
  {
    id: 3,
    title: "Water Treatment Plant Automation",
    description:
      "Scope Of Work: Turn Key Electrical Project, Distribution Panels, Control Panels, MCC Panels, Field wiring, PLC, VFD, SCADA, Remote I/O Instrumentation Integrated: Actuators for Valves, Ultrasonic Level Sensors, Ph, Turbidity, Flow, Pressure etc.",
    image: "/path/to/branding-strategies-image.jpg",
    category: "Branding strategies",
  },
  {
    id: 4,
    title: "Wire Stranding Machine",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, Field Wiring etc., Giving and Taking Command & Feedback to Robot ",
    image: "/path/to/branding-strategies-image.jpg",
    category: "Branding strategies",
  },
  {
    id: 5,
    title: "Special Purpose Machines",
    description:
      "Scope OF Supply: Control Panel, PLC, Servo, etc., Control Panel, Field wiring, PLC, VFD .Instrumentation integrated like Temperature , Pressure, Flow, Servo Motion Control System etc.",
    image: "/path/to/branding-strategies-image.jpg",
    category: "Branding strategies",
  },
  {
    id: 6,
    title: "Robo Interfacing With SPMs",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
    image: "/path/to/branding-strategies-image.jpg",
    category: "Branding strategies",
  },
  {
    id: 5,
    title: "Foundry Core Making Machine",
    description:
      "Scope OF Supply: Control Panel, PLC, VFD, etc., VVFD Synchronization With Respect to Speed By Taking Encoder feedback .Instrumentation integrated like Temperature , Pressure,. ",
    image: "/path/to/branding-strategies-image.jpg",
    category: "Branding strategies",
  },
  // You can add more projects here
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div key={project.id} className="relative p-6 bg-gray-800 rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2
              className={`text-2xl font-bold mb-2 text-${
                project.category === "Ads Production" ? "purple-500" : "white"
              } border-b-2 border-${
                project.category === "Ads Production"
                  ? "purple-500/75"
                  : "white/75"
              } pb-2`}
            >
              {project.title}
            </h2>

            <p className="text-gray-400 mb-4">{project.description}</p>
            <a
              href="#"
              className="absolute bottom-4 right-4 text-white text-xl"
            >
              →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
