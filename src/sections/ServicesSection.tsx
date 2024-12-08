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

  useEffect(() => {
    const CACHE_KEY = "services_data";
    const CACHE_EXPIRATION = 60 * 60 * 1000; // 24 hours

    const fetchServices = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const isCacheValid = Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION;
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
          localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
        } else {
          console.error("Error: 'serviceList' is not an array or not present.");
        }
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div id="services" className="bg-[#ffffff] text-black pt-10 sm:pt-20 pb-5 sm:pb-1 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-5xl font-medium mb-1 text-black text-center pb-3 sm:pb-12">
        Our Services
      </h2>

      {/* Grid Layout with Responsive Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:w-3/4 mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.name.toLowerCase().replace(/ /g, "-")}
            className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex justify-center mb-6">
              <img
                src={service.image}
                alt={service.name}
                className="w-full max-w-[320px] rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#ff7d38] text-center">{service.name}</h3>
              <p className="text-black text-sm sm:text-base text-center">{service.description}</p>
              <div className="text-center">
                <Link href={service.read_more_path} className="text-[#ff7d38] underline">
                  Read more about {service.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
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
