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
      <h2 className="text-2xl sm:text-5xl font-medium mb-8 sm:mb-12 mt-4 sm:mt-6 text-black text-center pb-8 sm:pb-12">
        Our Services
      </h2>
      <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-3/4 mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.name.toLowerCase().replace(/ /g, "-")}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center`}
          >
            <div className="flex-1 flex items-center justify-center mb-4 md:mb-0">
              <img
                src={service.image}
                alt={service.name}
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#ff7d38] text-center md:text-left">
                {service.name}
              </h2>
              <p className="text-black text-sm sm:text-base text-center md:text-left">
                {service.description}
                <br />
                <br />
                <Link href={service.read_more_path} className="text-[#ff7d38] underline">
                  Read more about {service.name}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 80% Horizontal Line Separator */}
      <div className="flex justify-center my-10 sm:my-12">
        <div className="w-4/5 border-t border-gray-500"></div>
      </div>
    </div>
  );
};

export default ServicesSection;
