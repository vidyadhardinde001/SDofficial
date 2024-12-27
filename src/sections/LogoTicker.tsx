'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';

// Type definition for logos
type Logo = {
  src: string;
  alt: string;
  url: string;
};

const initialLogos: Logo[] = [
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Mahabal Logo", url: "https://www.mahabalgroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Alpha Logo", url: "http://www.phadkegroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Suyesh Logo", url: "https://www.suyeshgroup.in/suyesh-foundry-pvt-ltd.php" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Riba Logo", url: "https://www.ribatextiles.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Pidilite Logo", url: "https://www.pidilite.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Menon Logo", url: "https://menonindia.in/" },
];

const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export const LogoTicker = () => {
  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [isScrolling, setIsScrolling] = useState(false);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      const cachedLogos = localStorage.getItem('clientLogos');
      const cachedTimestamp = localStorage.getItem('cacheTimestamp');

      if (cachedLogos && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          setLogos(JSON.parse(cachedLogos));
          return;
        }
      }

      try {
        const response = await axios.get('/api/content/clients');
        const logosData: Logo[] = response.data.content.clientsList;

        if (Array.isArray(logosData)) {
          setLogos(logosData);
          localStorage.setItem('clientLogos', JSON.stringify(logosData));
          localStorage.setItem('cacheTimestamp', new Date().getTime().toString());
        } else {
          console.error('Received data is not an array:', logosData);
          setLogos(initialLogos);
        }
      } catch (error) {
        console.error('Error fetching logos:', error);
        const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=XE6VU7KrXAv_AfT6lB_EjczQE34Cntbh-fofCeehVSooTEiayCvnF0XmF9uElaWHoBJuOAZ_5D3GXGJ9TXEO0ZHubWQWm63Gm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKbES-7aEjHyludqHW24UDeyqd_nTAp1qkKYGXDiRJ_E35GG8uU1tG7jjt5KmL-SKUp2DOLQ2inzdYcb2CkXj4F2sgp6fkp_uA&lib=MD3k01dNQnOzBmwiq3sDuNPZ1uKL4_q0K');
        const logosData: Logo[] = response.data.content.clientsList;
        setLogos(logosData);
        // setLogos(initialLogos);
      }
    };

    fetchLogos();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (logoContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const scrollAmount = direction === 'left' ? -200 : 200; // Adjust scroll distance
      logoContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        setIsScrolling(false);
      }, 500); // Wait for scroll to complete
    }
  };

  return (
    <div className="py-8 md:py-12 bg-white relative">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-medium mb-6 mt-6 text-[black] pb-14">Our Clients</h2>
        </div>

        <div className="relative">
          <div
            ref={logoContainerRef}
            className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]"
          >
            <motion.div
              className="flex gap-[100px] flex-none pr-14"
              animate={{ translateX: '-50%' }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
            >
              {logos.map((logo, index) => (
                <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer">
                  <Image src={logo.src} alt={logo.alt} width={150} height={200} />
                </a>
              ))}

              {logos.map((logo, index) => (
                <a key={`second-${index}`} href={logo.url} target="_blank" rel="noopener noreferrer">
                  <Image src={logo.src} alt={logo.alt} width={150} height={200} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          >
            &#8592;
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};
