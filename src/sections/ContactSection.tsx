import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:mx-0 lg:mx-[200px] mb-[100px]">
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-6/12 md:mt-0">
          <h2 className="text-sm m-2 tracking-[10px] text-gray-500 font-medium">CONTACT</h2>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-tight">
            Any Questions? <br />
            Write or call us. <br />
            We will write back <br />
            within 12hrs :)
          </h1>
          <div className="mt-8 space-y-4 text-lg text-gray-700">
            <p className="flex items-center">
              <span className="mr-2">📞</span> (+91) 7057272626
            </p>
            <p className="flex items-center">
              <span className="mr-2">📧</span> siddhivinayakengineers19@gmail.com
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full mt-8 md:mt-0 md:w-5/12">
          <form className="space-y-4">
            <input
              type="email"
              placeholder="E-mail Address"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            />
            <textarea
              placeholder="Message...."
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            ></textarea>
            
            <div className="flex items-start space-x-2 mt-4">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-gray-500">
                I consent to the processing of my personal data by the Administrator in accordance with the Privacy Policy <span className="text-[#0074F5]">*</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-[#0074F5] hover:bg-black rounded-md font-semibold tracking-wide flex items-center justify-center"
            >
              Send <span className="ml-2">➔</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
