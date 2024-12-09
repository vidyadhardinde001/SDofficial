"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Service {
  image: string;
  name: string;
  description: string;
  read_more_path: string;
}

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isPortrait, setIsPortrait] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Placeholder data
  const placeholderServices: Service[] = [
    {
      image: "/assets/scada.jpg",
      name: "PLC, HMI, SCADA Software Development",
      description:
        "HMI/SCADA collects data from RTUs (Remote Terminal Units), PLCs, and other control devices...",
      read_more_path: "/plc-hmi-scada-software-development",
    },
    {
      image: "/assets/maintanance.jpg",
      name: "Maintenance Services",
      description:
        "Maintenance is the service done by technicians or mechanics to manage machinery and equipment...",
      read_more_path: "/maintenance-services",
    },
    {
      image: "/assets/controlpanel.jpg",
      name: "Control Panel Manufacturing",
      description:
        "An electrical control panel is an enclosure, typically a metal box or plastic moulding...",
      read_more_path: "/control-panel-manufacturing",
    },
    {
      image: "/assets/field.webp",
      name: "Field Wiring",
      description:
        "In general, field wiring is wiring that is connected between equipment items...",
      read_more_path: "/field-wiring",
    },
  ];

  useEffect(() => {
    const CACHE_KEY = "services_data";
    const CACHE_EXPIRATION = 60 * 60 * 1000; // 24 hours

    const fetchServices = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const isCacheValid =
            Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
          if (isCacheValid) {
            setServices(JSON.parse(cachedData));
            return;
          }
        }

        // Fetch data from the API if no valid cache
        const response = await axios.get("/api/content/service");
        const data = response.data.content;
        if (data && Array.isArray(data.serviceList)) {
          setServices(data.serviceList);
          // Save data to localStorage with timestamp
          localStorage.setItem(CACHE_KEY, JSON.stringify(data.serviceList));
          localStorage.setItem(
            `${CACHE_KEY}_timestamp`,
            Date.now().toString()
          );
        } else {
          console.error(
            "Error: 'serviceList' is not an array or not present."
          );
        }
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    // Check screen orientation
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    fetchServices();
    updateOrientation();

    // Listen for window resize events
    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return (
    <div
      id="services"
      className="bg-[#ffffff] text-black pt-10 sm:pt-20 pb-5 sm:pb-1 px-4 sm:px-5"
    >
      <h2 className="text-2xl sm:text-5xl font-medium mb-1 text-black text-center pb- sm:pb-12">
        Our Services
      </h2>

      {/* Grid Layout with Responsive Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:w-[90%] mx-auto">
        {(services.length > 0 ? services : placeholderServices).map(
          (service, index) => (
            <div
              key={index}
              id={service.name.toLowerCase().replace(/ /g, "-")}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Conditionally Render Image */}
              {!isPortrait || expandedService === index ? (
                <div className="flex justify-center mb-6 h-[30vh] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-auto h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ) : null}

              <div>
                <h3 className="text-xl mb-6 font-semibold text-[#ff7d38] text-center">
                  {service.name}
                </h3>

                {/* Conditionally show description and link based on orientation */}
                {!isPortrait ? (
                  <div className="space-y-4">
                    <p className="text-black text-left text-sm sm:text-base">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <Link
                        href={service.read_more_path}
                        className="text-[#ff3838] font-bold underline"
                      >
                        READ MORE
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-4">
                    <button
                      className="text-black underline"
                      onClick={() =>
                        setExpandedService(
                          expandedService === index ? null : index
                        )
                      }
                    >
                      {expandedService === index ? "Hide Info" : "Show Info"}
                    </button>
                    {expandedService === index && (
                      <div className="space-y-4 mt-2">
                        <p className="text-black text-sm sm:text-base">
                          {service.description}
                        </p>
                        <div>
                          <Link
                            href={service.read_more_path}
                            className="text-[#ff3838] font-bold underline"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* 80% Horizontal Line Separator */}
      <div className="flex justify-center my-10 sm:my-12">
        <div className="w-4/5 border-t border-gray-500"></div>
      </div>

      {/* Custom Styles for Portrait Mode */}
      <style jsx>{`
        @media (max-width: 767px) and (orientation: portrait) {
          .grid {
            display: block;
          }
          .grid > div {
            margin-bottom: 20px; /* Space between cards */
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
