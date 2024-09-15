import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <section className="relative bg-[white] text-white py-12 px-4 sm:px-6 lg:px-8 mt-0 mb-0">
      {/* Top Section */}
      <div className="relative max-w-screen-xl mx-auto">
        <div className="bg-[#0074F5] rounded-[30px] p-4 md:p-8 text-center absolute inset-x-0 -top-2 transform -translate-y-1/2 mx-auto w-11/12 md:w-10/12 lg:w-8/12">
          <p className="text-sm sm:text-base md:text-lg font-regular leading-relaxed">
            Always to be in the service of prestigious customers to guarantee professionalism and efficiency. We continuously seek to establish a solid reputation as a superior engineering resource through the fundamental principles of ethics, transparency, respect & commitment to all customers, suppliers, and employees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
