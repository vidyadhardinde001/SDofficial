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

  // Placeholder data
  const placeholderServices: Service[] = [
    {
      image: "/assets/scada.jpg",
      name: "PLC, HMI, SCADA Software Development",
      description:
        "HMI/SCADA collects data from RTUs (Remote Terminal Units), PLCs (Programmable Logic Controllers), and other control devices such as flow meters and temperature controllers. This data is presented to an operator using a Human Machine Interface (HMI).",
      read_more_path: "/plc",
    },
    {
      image: "/assets/maintanance.jpg",
      name: "Maintenance Services",
      description:
        "Maintenance is the service done by technicians or mechanics to manage machinery and equipment to increase uptime in order to meet business objectives. It is used across multiple industries and can involve troubleshooting, fixing, and replacing equipment to improve asset performance.",
      read_more_path: "/maintainence",
    },
    {
      image: "/assets/controlpanel.jpg",
      name: "Control Panel Manufacturing",
      description:
        "An electrical control panel is an enclosure, typically a metal box or plastic moulding which contains important electrical components that control and monitor a number of mechanical processes.",
      read_more_path: "/control",
    },
    {
      image: "/assets/field.webp",
      name: "Field Wiring",
      description:
        "In general, field wiring is wiring that is connected between equipment items or equipment components that are connected upon installation in the field.",
      read_more_path: "/field",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/content/service");
        const data = response.data.content;
        if (data && Array.isArray(data.serviceList)) {
          setServices(data.serviceList);
        } else {
          console.error("Error: 'serviceList' is not an array or not present.");
        }
      } catch (error) {
        console.error("Error fetching services", error);
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=JGbLHgO0yId23NSD3Vjcdcu-IwXoP1VvEbG2sy83zCBsfWdk85LVH7oL-rPXLNcTGfw4NBXlqsN01eF7ytYEO5HYwT03wq69m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNoX58wTQim0ILrxFrnQhDK3QdGrvJjxiQBZHnv9-GHTostibzxAxZOFK9eI4qiW375_kc9TEa_2YZYOTXb83n9wIzU36-wAq9z9Jw9Md8uu&lib=M2CSbHZUJlxxbq7HKujHoQ0oLBlaE9kY8");
        const data = response.data.content;
        setServices(data.serviceList);
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

      {/* Responsive Layout */}
      <div
        className={`${
          isPortrait
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        } md:w-full mx-auto max-w-full`}
      >
        {(services.length > 0 ? services : placeholderServices).map(
          (service, index) => (
            <div
              key={index}
              id={service.name.toLowerCase().replace(/ /g, "-")}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Render Image */}
              <div className="flex justify-center mb-6 h-[30vh] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-auto h-full object-cover rounded-lg shadow-md"
                />
              </div>

              <div>
                {/* Clickable Heading */}
                <h3 className="text-xl mb-6 font-semibold text-[#ff7d38] text-center">
                  <Link href={service.read_more_path} className="hover:underline">
                    {service.name}
                  </Link>
                </h3>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-black text-left text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* 80% Horizontal Line Separator */}
      <div className="flex justify-center my-10 sm:my-12">
        <div className="w-4/5 border-t border-gray-500"></div>
      </div>
    </div>
  );
};

export default ServicesSection;
