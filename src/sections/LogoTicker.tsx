'use client';
import mahabal from '@/assets/mahabal.png'
import alpha from '@/assets/alpha.png'
import suyesh from '@/assets/suyesh.png'
import riba from '@/assets/riba.png'
import pidilite from '@/assets/pidilite.png'
import menon from '@/assets/menon.png'
import Image from 'next/image'
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return <div className="py-8 md:py-12 bg-white">
    <div className="container">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
        <motion.div className="flex gap-14 flex-none pr-14" animate={{
        translateX:'-50%'
        }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType:'loop',
        }}>
        <Image src={mahabal} alt="Mahabal Logo"className="logo-ticker-image" />
        <Image src={alpha} alt="Alpha Logo"className="logo-ticker-image" />
        <Image src={suyesh} alt="Suyesh Logo"className="logo-ticker-image" />
        <Image src={riba} alt="Riba Logo"className="logo-ticker-image" />
        <Image src={pidilite} alt="Pidilite Logo"className="logo-ticker-image" />
        <Image src={menon} alt="Menon Logo" className="logo-ticker-image" />
          {/*Second Set of Logos for animation*/}
        <Image src={mahabal} alt="Mahabal Logo"className="logo-ticker-image" />
        <Image src={alpha} alt="Alpha Logo"className="logo-ticker-image" />
        <Image src={suyesh} alt="Suyesh Logo"className="logo-ticker-image" />
        <Image src={riba} alt="Riba Logo"className="logo-ticker-image" />
        <Image src={pidilite} alt="Pidilite Logo"className="logo-ticker-image" />
        <Image src={menon} alt="Menon Logo"className="logo-ticker-image" />
        </motion.div>
        </div>
    </div>
  </div>
   
};
