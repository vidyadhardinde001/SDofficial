import React from "react";

const ServicesSection: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-black pt-10 sm:pt-20 pb-5 sm:pb-1 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-5xl font-medium mb-8 sm:mb-12 mt-4 sm:mt-6 text-black text-center pb-8 sm:pb-12">
        Our Services
      </h2>
      <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-3/4 mx-auto">
        
        {/* First Section */}
        <div className="flex flex-col md:flex-row items-center">
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
              an operator using a Human Machine Interface (HMI).<br/><br/>{" "}
              <a 
                href="https://www.dosupply.com/tech/2019/02/04/explaining-hmi-scada-and-plcs-what-they-do-and-how-they-work-together/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#ff7d38] underline"
              >
                Read more about SCADA and PLCs
              </a>
            </p>
          </div>
        </div>
        
        <hr className="border-gray-500 my-6 sm:my-8" />
        
        {/* Second Section */}
        <div className="flex flex-col md:flex-row-reverse items-center">
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
              improve asset performance.<br/><br/>
            </p>
          </div>
        </div>
        
        <hr className="border-gray-500 my-6 sm:my-8" />

        {/* Third Section */}
        <div className="flex flex-col md:flex-row items-center">
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
              An electrical control panel is an enclosure, typically a metal box or plastic moulding which contains important electrical components that control and monitor a number of mechanical processes.<br/><br/>{" "}
              <a 
                href="https://elecsafety.co.uk/electrical-control-panels/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#ff7d38] underline"
              >
                Read more about Control Panel Manufacturing
              </a>
            </p>
          </div>
        </div>

        <hr className="border-gray-500 my-6 sm:my-8" />

        {/* Fourth Section */}
        <div className="flex flex-col md:flex-row-reverse items-center">
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
              In general, field wiring is wiring that is connected between equipment items or equipment components that are connected upon installation in the field.<br/><br/>{" "}
              <a 
                href="https://connectorsupplier.com/field-wiring-the-backbone-of-complex-industrial-environments/#:~:text=Networking%20automation%20and%20control%20technology,sensor%20data%20in%20industrial%20applications." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#ff7d38] underline"
              >
                Read more about Field Wiring
              </a>
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
