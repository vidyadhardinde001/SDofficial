import React from "react"; // Optional but clear to include in Next.js projects

const PLCPage = () => {
  return (
    <div className="bg-white text-black min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6">
        PLC, HMI, SCADA Software Development
      </h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg sm:text-xl leading-relaxed">
        SCADA (Supervisory Control and Data Acquisition) or HMI (Human Machine Interface) systems allow operators, engineers, supervisors, and CEOs of manufacturing facilities to visualize, control, and analyze plant floor data in order to make decisions about improving processes.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed mt-4">
          Our services include designing, programming, and deploying robust PLC, HMI, 
          and SCADA solutions tailored to meet your specific needs. Whether you are 
          modernizing existing systems or starting from scratch, we provide end-to-end 
          expertise to enhance your operational efficiency.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed mt-4">
        Industrial Automation and Engineering can connect all of your Ethernet based Allen Bradley, Siemens, Omnon, or Modbus controllers with your SQL databases to create a customized visualization client to do all of the following and more:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Control equipment</li>
          <li>Analyze historical data</li>
          <li>Interface with ERP</li>
          <li>
          Create production reports
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PLCPage;
