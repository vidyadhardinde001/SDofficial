'use client';
import mahabal from '@/assets/mahabal.png';
import alpha from '@/assets/alpha.png';
import suyesh from '@/assets/suyesh.png';
import riba from '@/assets/riba.png';
import pidilite from '@/assets/pidilite.png';
import menon from '@/assets/menon.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const logoStyle = {
  width: 'auto',
  height: '70px', // Adjust this size as needed
};

// Define the logos with their respective URLs
const logos = [
  { src: mahabal, alt: "Mahabal Logo", url: "https://www.mahabalgroup.com/" },
  { src: alpha, alt: "Alpha Logo", url: "http://www.phadkegroup.com/" },
  { src: suyesh, alt: "Suyesh Logo", url: "https://www.suyeshgroup.in/suyesh-foundry-pvt-ltd.php" },
  { src: riba, alt: "Riba Logo", url: "https://www.ribatextiles.com/" },
  { src: pidilite, alt: "Pidilite Logo", url: "https://www.pidilite.com/" },
  { src: menon, alt: "Menon Logo", url: "https://menonindia.in/" },
];

export const LogoTicker = () => {
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
            {logos.map((logo, index) => (
              <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  style={logoStyle}
                />
              </a>
            ))}
            {/* Second Set of Logos for animation */}
            {logos.map((logo, index) => (
              <a key={`second-${index}`} href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  style={logoStyle}
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
