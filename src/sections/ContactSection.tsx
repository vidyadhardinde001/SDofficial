"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';
import styles from './Transition.module.css';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [inProp, setInProp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message
    setMessageSent(false); // Reset message sent state

    try {
      const response = await fetch('https://sdofficial-r1zr.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending message');
      }

      setMessageSent(true);
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <CSSTransition
      in={true}
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
                Any Questions? <br />
                Write or call us. <br />
                We will write back <br />
                within 12hrs :)
              </h1>
              <div className="mt-8 space-y-4 text-lg text-gray-700">
                <p className="flex items-center">
                  <span className="mr-2">📞</span>+91 7057272626
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📧</span>siddhivinayakengineers19@gmail.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📍</span> Arjunwad
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
              <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE6D20]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE6D20]"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE6D20]"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Message...."
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE6D20]"
                  required
                ></textarea>

                <div className="flex items-start space-x-2 mt-4">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-sm text-gray-500">
                    I consent to the processing of my personal data by the Administrator in accordance with the Privacy Policy <span className="text-[#FE6D20]">*</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 text-white bg-[#FE6D20] hover:bg-[#ff9f6c] rounded-md font-semibold tracking-wide flex items-center justify-center"
                >
                  {isLoading ? 'Sending...' : 'Submit'}
                </button>
              </form>

              {messageSent && <p className="text-green-600 mt-4">Message sent successfully!</p>}
                {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            </div>
          </div>
        </section>
      </div>
    </CSSTransition>
  );
};

export default ContactSection;
