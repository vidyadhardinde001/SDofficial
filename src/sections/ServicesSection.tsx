// src/sections/ServicesSection.tsx
import React from "react";
import Scene from "@/components/laptop";
import Scene2 from "@/components/controlpanel";
import Wrench from "@/components/wrenchscene";
import Fieldscene from "@/components/Fieldscene";

const ServicesSection: React.FC = () => {
  return (
    <div className="bg-[#232323] text-black pt-20 pb-1 px-5">
      <h1 className="text-5xl font-medium mb-12 mt-6 text-white text-center pb-12">Our Services</h1>
      <div className="flex flex-col gap-8 w-full md:w-3/4 mx-auto">
        
        {/* First Section */}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <Scene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#ff7d38]">PLC, HMI, SCADA Software Development</h2>
            <p className="text-white break-words max-w-full sm:max-w-md lg:max-w-lg xl:max-w-2xl">
              HMI/SCADA collects data from RTUs (Remote Terminal Units), PLCs
              (Programmable Logic Controllers), and other control devices such as
              flow meters and temperature controllers. This data is presented to
              an operator using a Human Machine Interface (HMI).
            </p>
          </div>
        </div>
        
        <hr className="border-gray-500 my-8" />
        
        {/* Second Section */}
        <div className="flex flex-col md:flex-row-reverse">
          <div className="flex-1 flex items-center justify-center">
            <Wrench />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#ff7d38]">Maintenance Services</h2>
            <p className="text-white break-words max-w-full sm:max-w-md lg:max-w-lg xl:max-w-2xl">
              Maintenance is the service done by technicians or mechanics to
              manage machinery and equipment to increase uptime in order to meet
              the business objectives. It is used across multiple industries and
              can involve troubleshooting, fixing, and replacing equipment to
              improve asset performance.
            </p>
          </div>
        </div>
        
        <hr className="border-gray-500 my-8" />

        {/* Third Section */}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center h-64">
            <Scene2 />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#ff7d38]">Control Panel Manufacturing</h2>
            <p className="text-white break-words max-w-full sm:max-w-md lg:max-w-lg xl:max-w-2xl">
              An electrical control panel is an enclosure, typically a metal box or plastic moulding 
              which contains important electrical components that control and monitor a number of 
              mechanical processes.
            </p>
          </div>
        </div>

        <hr className="border-gray-500 my-8" />

        {/* Fourth Section */}
        <div className="flex flex-col md:flex-row-reverse">
          <div className="flex-1 flex items-center justify-center">
            <Fieldscene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#ff7d38]">Field Wiring</h2>
            <p className="text-white break-words max-w-full sm:max-w-md lg:max-w-lg xl:max-w-2xl">
              In general, field wiring is wiring that is connected between equipment items or 
              equipment components that are connected upon installation in the field.
            </p>
          </div>
        </div>
      </div>

      {/* 80% Horizontal Line Separator */}
      <div className="flex justify-center my-12">
        <div className="w-4/5 border-t border-gray-500"></div>
      </div>
    </div>
  );
};

export default ServicesSection;
