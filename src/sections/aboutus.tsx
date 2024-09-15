import React from "react";

const LearningTransformation = () => {
  return (
    <section className="bg-[gray-600] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: Text */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-black mb-2 leading-tight">
              About Us
            </p>
            <br />
            <p className="text-gray-600 text-lg">
              We Are Manufacturers Of Custom made Industrial Control Panels And
              Industrial Automation Expertise over 3 Years with System
              Integration, Plant Automation, Turnkey Projects & Corrective and
              Preventive maintenance.
            </p>
            <br />
            <p className="text-gray-600 text-lg">
              We Offer Factory Automation Products (PLC, SCADA, HMI, VFD, AC
              Servo) of world-renowned brands. Custom Software development &
              On-site commissioning services, Energy Monitoring, Industrial
              Safety Products & solutions, Distribution Panel for low Voltage &
              MCC Panels.
            </p>
            <br />
            <p className="text-gray-600 text-lg">
              Our products & services ’ high quality is the result of constant
              leverage in know-how as well as in technologies which are
              essential characteristics for offering solutions that perfectly
              meet our Customer's specific needs in terms of technology and
              efficiency.
            </p>
          </div>

          {/* Right Section: Image and Stats */}
          <div className="flex flex-col items-center">
            {/* Image Section */}
            <div className="w-full mb-6 flex justify-center">
              <img
                src="/assets/SDlogo.png"
                alt="Logo"
                className="max-w-[200px] max-h-[200px] object-contain rounded-lg shadow-md" // Adjusted width and height
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold text-black">3.5</h2>
                <p className="text-gray-500">Years Experience</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold text-black">23</h2>
                <p className="text-gray-500">Project Challenge</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold text-black">830+</h2>
                <p className="text-gray-500">Positive Reviews</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold text-black">100K</h2>
                <p className="text-gray-500">Trusted Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningTransformation;
