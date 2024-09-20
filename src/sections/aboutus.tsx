import React from "react";
import Image from "next/image";

const LearningTransformation: React.FC = () => {
  return (
    <section className="bg-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: Text */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-black mb-2 leading-tight">
              About Us
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              We are manufacturers of custom-made industrial control panels and
              industrial automation expertise with over 3 years of experience in
              system integration, plant automation, turnkey projects, and corrective
              and preventive maintenance.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              We offer factory automation products (PLC, SCADA, HMI, VFD, AC Servo) 
              from world-renowned brands, custom software development, on-site 
              commissioning services, energy monitoring, industrial safety products 
              and solutions, and distribution panels for low voltage & MCC panels.
            </p>
            <p className="text-gray-600 text-lg">
              Our products and services&apos; high quality is the result of constant 
              leverage in know-how and technologies, which are essential for offering 
              solutions that perfectly meet our customers&apos; specific needs in terms 
              of technology and efficiency.
            </p>
          </div>

          {/* Right Section: Image and Stats */}
          <div className="flex flex-col items-center">
            {/* Image Section */}
            <div className="w-full mb-6 flex justify-center">
              <Image
                src="/assets/logo1.png"
                alt="Company Logo"
                width={1200} // Ensure the width is appropriate for responsiveness
                height={360} // Ensure the height is appropriate for responsiveness
                className="object-contain rounded-lg shadow-md bg-[#f7f7f7]"
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
                <p className="text-gray-500">Project Challenges</p>
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
