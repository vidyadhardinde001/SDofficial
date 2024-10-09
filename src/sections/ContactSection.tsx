"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';
import styles from './Transition.module.css';

const ContactSection: React.FC = () => {
  const [inProp, setInProp] = useState(true);

  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // setInProp(false);
    // Fetch content from the backend
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/contact'); // Fetching contact content
        const data = await response.json();
        setContent(data);
        setInProp(true);
      } catch (error) {
        console.error('Error fetching contact section content', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
    // return () => setInProp(false);
  }, []);

  // if (!content) {
  //   return <div>Loading...</div>; // Loading state
  // }
  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames={styles}
      unmountOnExit
    > 
    <div className={styles.fade}>

    
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:mx-0 lg:mx-[200px] mb-[100px]">
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-6/12 md:mt-0">
          <h2 className="text-sm m-2 tracking-[10px] text-gray-500 font-medium">CONTACT</h2>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-tight">
            {/* Any Questions? <br />
            Write or call us. <br />
            We will write back <br />
            within 12hrs :) */}
            {content?.content?.heading.map((line: string, index: number) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <div className="mt-8 space-y-4 text-lg text-gray-700">
            <p className="flex items-center">
              <span className="mr-2">📞</span>{content?.content?.phone}
            </p>
            <p className="flex items-center">
              <span className="mr-2">📧</span> {content?.content?.email}
            </p>
            <p className="flex items-center">
              <span className="mr-2">📍   Arjunwad</span> {content?.content?.location}
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d122237.18993477206!2d74.628396!3d16.781044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc12102e1214d0b%3A0x1527ff323ff45359!2sSiddhivinayak%20Engineers!5e0!3m2!1sen!2sus!4v1727588966231!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full mt-8 md:mt-0 md:w-5/12">
           <form className="space-y-4">
            {/* <input
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
            />  */}
            {content?.content?.formFields.map((field: any, index: number) => (
              <input
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
              />
            ))}
            {/* <textarea
              placeholder="Message...."
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            ></textarea> */}
            <textarea
              placeholder={content?.content?.formFields.find((f: any) => f.type === 'textarea')?.placeholder}
              rows={content?.content?.formFields.find((f: any) => f.type === 'textarea')?.rows}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074F5]"
            ></textarea>
            
            <div className="flex items-start space-x-2 mt-4">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-gray-500">
                {/* I consent to the processing of my personal data by the Administrator in accordance with the Privacy Policy <span className="text-[#0074F5]">*</span> */}
                {content?.content?.consentText}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-[#0074F5] hover:bg-black rounded-md font-semibold tracking-wide flex items-center justify-center"
            >
              {content?.content?.buttonText}
              {/* submit */}
            </button>
          </form>
        </div>
      </div>
    </section>
    </div>
    </CSSTransition>
  );
};

export default ContactSection;