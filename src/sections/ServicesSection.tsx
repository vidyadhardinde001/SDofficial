import React from "react";
import Link from "next/link";

const ServicesSection: React.FC = () => {
  return (
    <div id="services" className="bg-[#ffffff] text-black pt-10 sm:pt-20 pb-5 sm:pb-1 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-5xl font-medium mb-8 sm:mb-12 mt-4 sm:mt-6 text-black text-center pb-8 sm:pb-12">
        Our Services
      </h2>
      <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-3/4 mx-auto">
        {/* First Section */}
        <div id="scada-plc" className="flex flex-col md:flex-row items-center">
          <div className="flex-1 flex items-center justify-center mb-4 md:mb-0">
            <img
              src="/assets/scada.jpg"
              alt="PLC, HMI, SCADA Software Development"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#ff7d38] text-center md:text-left">
              PLC, HMI, SCADA Software Development
            </h2>
            <p className="text-black text-sm sm:text-base text-center md:text-left">
              HMI/SCADA collects data from RTUs (Remote Terminal Units), PLCs
              (Programmable Logic Controllers), and other control devices such as
              flow meters and temperature controllers. This data is presented to
              an operator using a Human Machine Interface (HMI).<br /><br />
              <Link href="/plc" className="text-[#ff7d38] underline">
                Read more about SCADA and PLCs
              </Link>
            </p>
          </div>
        </div>

        <hr className="border-gray-500 my-6 sm:my-8" />

        {/* Second Section */}
        <div id="maintenance" className="flex flex-col md:flex-row-reverse items-center">
          <div className="flex-1 flex items-center justify-center mb-4 md:mb-0">
            <img
              src="/assets/maintanance.webp"
              alt="Maintenance Services"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#ff7d38] text-center md:text-left">
              Maintenance Services
            </h2>
            <p className="text-black text-sm sm:text-base text-center md:text-left">
              Maintenance is the service done by technicians or mechanics to
              manage machinery and equipment to increase uptime in order to meet
              business objectives. It is used across multiple industries and can
              involve troubleshooting, fixing, and replacing equipment to
              improve asset performance.<br /><br />
              <Link href="/maintainence" className="text-[#ff7d38] underline">
                Read more about Maintenance Services
              </Link>
            </p>
          </div>
        </div>

        <hr className="border-gray-500 my-6 sm:my-8" />

        {/* Third Section */}
        <div id="control-panel" className="flex flex-col md:flex-row items-center">
          <div className="flex-1 flex items-center justify-center h-48 sm:h-64 mb-4 md:mb-0">
            <img
              src="/assets/controlpanel.jpg"
              alt="Control Panel Manufacturing"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#ff7d38] text-center md:text-left">
              Control Panel Manufacturing
            </h2>
            <p className="text-black text-sm sm:text-base text-center md:text-left">
              An electrical control panel is an enclosure, typically a metal box or plastic moulding
              which contains important electrical components that control and monitor a number of
              mechanical processes.<br /><br />
              <Link href="/control" className="text-[#ff7d38] underline">
                Read more about Control Panel Manufacturing
              </Link>
            </p>
          </div>
        </div>

        <hr className="border-gray-500 my-6 sm:my-8" />

        {/* Fourth Section */}
        <div id="field-wiring" className="flex flex-col md:flex-row-reverse items-center">
          <div className="flex-1 flex items-center justify-center mb-4 md:mb-0">
            <img
              src="/assets/field.webp"
              alt="Field Wiring"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#ff7d38] text-center md:text-left">
              Field Wiring
            </h2>
            <p className="text-black text-sm sm:text-base text-center md:text-left">
              In general, field wiring is wiring that is connected between equipment items or
              equipment components that are connected upon installation in the field.<br /><br />
              <Link href="/field" className="text-[#ff7d38] underline">
                Read more about Field Wiring
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 80% Horizontal Line Separator */}
      <div className="flex justify-center my-10 sm:my-12">
        <div className="w-4/5 border-t border-gray-500"></div>
      </div>
    </div>
  );
};

export default ServicesSection;
