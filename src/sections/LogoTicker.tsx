'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';

// Type definition for logos
type Logo = {
  src: string;
  alt: string;
  url: string;
};

// Initial logos (fallback in case fetching fails)
const initialLogos: Logo[] = [
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Mahabal Logo", url: "https://www.mahabalgroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Alpha Logo", url: "http://www.phadkegroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Suyesh Logo", url: "https://www.suyeshgroup.in/suyesh-foundry-pvt-ltd.php" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Riba Logo", url: "https://www.ribatextiles.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Pidilite Logo", url: "https://www.pidilite.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Menon Logo", url: "https://menonindia.in/" },
];

export const LogoTicker = () => {
  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [currentPosition, setCurrentPosition] = useState(0);

  // Fetch logos from an API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get('/api/content/clients');
        const logosData: Logo[] = response.data.content.clientsList;

        if (Array.isArray(logosData)) {
          setLogos(logosData);
        } else {
          console.error('Invalid data format:', logosData);
        }
      } catch (error) {
        console.error('Error fetching logos:', error);
      }
    };

    fetchLogos();
  }, []);

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  // Automatic smooth scrolling
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((prev) => {
        const containerWidth = 150 + 16; // Logo width + padding
        const totalWidth = containerWidth * logos.length;
        let newPosition = prev - 1; // Move by 1 pixel at a time for smooth scrolling

        if (Math.abs(newPosition) >= totalWidth) {
          newPosition = 0; // Reset position to loop smoothly
        }

        return newPosition;
      });
    }, 20); // Adjust the interval for smoothness (smaller value = smoother)

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [logos]);

  // Handle manual scroll with buttons
  const handleScroll = (direction: 'left' | 'right') => {
    const containerWidth = 150 + 16; // Logo width + padding
    const moveAmount = 3 * containerWidth; // Move by 3 logos at a time

    setCurrentPosition((prev) => {
      let newPosition;
      if (direction === 'left') {
        newPosition = prev + moveAmount;
      } else {
        newPosition = prev - moveAmount;
      }

      return newPosition;
    });
  };

  return (
    <div className="py-8 md:py-12 bg-white relative">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-medium mb-6 mt-6 text-[black] pb-14">Our Clients</h2>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Logos container */}
          <div className="relative w-full mx-auto overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: currentPosition }}
              transition={{ duration: 0.05, ease: 'linear' }} // Smooth and fast transition
            >
              {duplicatedLogos.map((logo, index) => (
                <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer" className="flex-none px-4">
                  <Image src={logo.src} alt={logo.alt} width={150} height={100} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Left Button */}
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 bg-[#ff7d38] rounded-full flex items-center justify-center text-white hover:bg-[#ffae82] transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <span className="text-2xl font-bold">&#8249;</span>
            </button>
            {/* Right Button */}
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 bg-[#ff7d38] rounded-full flex items-center justify-center text-white hover:bg-[#ffae82] transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <span className="text-2xl font-bold">&#8250;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
