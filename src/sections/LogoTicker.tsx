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

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-gray-900">
      <div className="container">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-medium mb-[50px] text-[#FFFFFF]">Our Clients</h2>
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
            <Image
              src={mahabal}
              alt="Mahabal Logo"
              style={logoStyle}
            />
            <Image
              src={alpha}
              alt="Alpha Logo"
              style={logoStyle}
            />
            <Image
              src={suyesh}
              alt="Suyesh Logo"
              style={logoStyle}
            />
            <Image
              src={riba}
              alt="Riba Logo"
              style={logoStyle}
            />
            <Image
              src={pidilite}
              alt="Pidilite Logo"
              style={logoStyle}
            />
            <Image
              src={menon}
              alt="Menon Logo"
              style={logoStyle}
            />
            {/* Second Set of Logos for animation */}
            <Image
              src={mahabal}
              alt="Mahabal Logo"
              style={logoStyle}
            />
            <Image
              src={alpha}
              alt="Alpha Logo"
              style={logoStyle}
            />
            <Image
              src={suyesh}
              alt="Suyesh Logo"
              style={logoStyle}
            />
            <Image
              src={riba}
              alt="Riba Logo"
              style={logoStyle}
            />
            <Image
              src={pidilite}
              alt="Pidilite Logo"
              style={logoStyle}
            />
            <Image
              src={menon}
              alt="Menon Logo"
              style={logoStyle}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
