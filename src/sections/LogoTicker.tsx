'use client';
import { useState, useEffect } from 'react';
// import mahabal from '@/assets/mahabal.png';
// import alpha from '@/assets/alpha.png';
// import suyesh from '@/assets/suyesh.png';
// import riba from '@/assets/riba.png';
// import pidilite from '@/assets/pidilite.png';
// import menon from '@/assets/menon.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';

// Import type for StaticImageData from next/image
import { StaticImageData } from 'next/image';

// Type definition for logos
type Logo = {
  src: string;  // Either a static image import or a URL string
  alt: string;
  url: string;
};

// Define the logos with their respective URLs (initial data)
//1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn
const initialLogos: Logo[] = [
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Mahabal Logo", url: "https://www.mahabalgroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1EvzdmVomzUoqeYsFTx-ZgPlS3DciR6kn", alt: "Alpha Logo", url: "http://www.phadkegroup.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Suyesh Logo", url: "https://www.suyeshgroup.in/suyesh-foundry-pvt-ltd.php" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Riba Logo", url: "https://www.ribatextiles.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Pidilite Logo", url: "https://www.pidilite.com/" },
  { src: "https://drive.google.com/uc?export=view&id=1CvRv0eNTgKDif0Ker3tuo1MyNOOO2886", alt: "Menon Logo", url: "https://menonindia.in/" },
];

const logoStyle = {
  width: 'auto',
  height: '70px', // Adjust this size as needed
};

const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export const LogoTicker = () => {
  // Use the Logo type for better type-checking
  const [logos, setLogos] = useState<Logo[]>(initialLogos);  
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogos = async () => {
      const cachedLogos = localStorage.getItem('clientLogos');
      const cachedTimestamp = localStorage.getItem('cacheTimestamp');

      if (cachedLogos && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        if (cacheAge < CACHE_EXPIRATION_MS) {
          setLogos(JSON.parse(cachedLogos));
          // setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get('/api/content/clients');
        const logosData: Logo[] = response.data.content.clientsList;

        // Ensure the response data is an array of logos
        if (Array.isArray(logosData)) {
          setLogos(logosData);
          localStorage.setItem('clientLogos', JSON.stringify(logosData));
          localStorage.setItem('cacheTimestamp', new Date().getTime().toString());
        } else {
          console.error('Received data is not an array:', logosData);
          setLogos(initialLogos);  // Fallback to initial logos if the data is invalid
        }

        // setLoading(false);
      } catch (error) {
        console.error('Error fetching logos:', error);
        setLogos(initialLogos);  // Fallback to initial logos on error
        // setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-medium mb-6 mt-6 text-[black] pb-14">Our Clients</h2>
        </div>

        {/* Logo Ticker Section */}
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-[100px] flex-none pr-14"
            animate={{
              translateX: '-50%',
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {/* Ensure logos is an array before calling map */}
            {logos.map((logo, index) => (
              <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={130}
                  height={70}
                  // style={logoStyle}
                />
              </a>
            ))}

            {/* Second Set of Logos for animation */}
            {logos.map((logo, index) => (
              <a key={`second-${index}`} href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={130}
                  height={70}
                  // style={logoStyle}
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
