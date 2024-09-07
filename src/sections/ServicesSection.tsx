// src/sections/ServicesSection.tsx
import React from "react";
import Scene from "@/components/Scene";
import Scene2 from "@/components/Scene2";

const ServicesSection: React.FC = () => {
  return (
    <div className="bg-[#263142] text-white py-10 px-5">
      <h1 className="text-center text-4xl font-bold mb-10">Our Services</h1>
      <div className="flex flex-col gap-8 w-full md:w-3/4 mx-auto">
        
        {/* First Card */}
        <div className="flex flex-col md:flex-row bg-[#121212] p-5 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[300px]">
          <div className="flex-1 flex items-center justify-center md:justify-center">
            <Scene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold">PLC, HMI, SCADA Software Development</h2>
            <p>
              HMI/SCADA collects data from RTUs (Remote Terminal Units), PLCs
              (Programmable Logic Controllers), and other control devices such as
              flow meters and temperature controllers. This data is presented to
              an operator using a Human Machine Interface (HMI).
            </p>
            <a href="#" className="text-blue-400">READ MORE &gt;</a>
          </div>
        </div>
        
        {/* Second Card */}
        <div className="flex flex-col md:flex-row-reverse bg-[#121212] p-5 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[300px]">
          <div className="flex-1 flex items-center justify-center md:justify-center">
            <Scene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold">Maintenance Services</h2>
            <p>
              Maintenance is the service done by technicians or mechanics to
              manage machinery and equipment to increase uptime in order to meet
              the business objectives. It is used across multiple industries and
              can involve troubleshooting, fixing, and replacing equipment to
              improve asset performance.
            </p>
            <a href="#" className="text-blue-400">READ MORE &gt;</a>
          </div>
        </div>

        {/* Third Card */}
        <div className="flex flex-col md:flex-row bg-[#121212] p-5 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[300px]">
          <div className="flex-1 flex items-center justify-center md:justify-center h-64">
            <Scene2 />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold">Control Panel Manufacturing</h2>
            <p>
              An electrical control panel is an enclosure, typically a metal box or plastic moulding which contains important electrical components that control and monitor a number of mechanical processes.
            </p>
            <a href="#" className="text-blue-400">READ MORE &gt;</a>
          </div>
        </div>

        {/* Fourth Card */}
        <div className="flex flex-col md:flex-row-reverse bg-[#121212] p-5 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[300px]">
          <div className="flex-1 flex items-center justify-center md:justify-center">
            <Scene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold">Field Wiring</h2>
            <p>
              In general, field wiring is wiring that is connected between equipment items or equipment components that are connected upon installation in the field.
            </p>
            <a href="#" className="text-blue-400">READ MORE &gt;</a>
          </div>
        </div>

        {/* fifth Card */}
        <div className="flex flex-col md:flex-row-reverse bg-[#121212] p-5 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[300px]">
          <div className="flex-1 flex items-center justify-center md:justify-center">
            <Scene />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-4">
            <h2 className="text-xl font-semibold">Field Wiring</h2>
            <p>
              In general, field wiring is wiring that is connected between equipment items or equipment components that are connected upon installation in the field.
            </p>
            <a href="#" className="text-blue-400">READ MORE &gt;</a>
          </div>
        </div>

     

      </div>
    </div>
  );
};

export default ServicesSection;