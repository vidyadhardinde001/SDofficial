'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const [currentIndex, setCurrentIndex] = useState(0);

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
        setLogos(initialLogos);
      }
    };

    fetchLogos();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (logoContainerRef.current && !isScrolling) {
      setIsScrolling(true);

      // Calculate logo width + gap
      const logoWidth = 150; // Adjust this to your logo width
      const gap = 200; // Adjust this to your gap between logos
      const scrollAmount = logoWidth + gap;

      let newIndex = currentIndex;

      if (direction === 'left') {
        newIndex = (currentIndex - 1 + logos.length) % logos.length;
      } else if (direction === 'right') {
        newIndex = (currentIndex + 1) % logos.length;
      }

      // Scroll the container
      logoContainerRef.current.scrollTo({
        left: newIndex * scrollAmount,
        behavior: 'smooth',
      });

      setCurrentIndex(newIndex);

      // Reset scrolling state after scrolling
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  return (
    <div className="py-8 md:py-12 bg-white relative">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-medium mb-6 mt-6 text-[black] pb-14">Our Clients</h2>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Logos container wrapper restricted to 80% width */}
          <div className="relative w-[80%] mx-auto overflow-hidden">
            {/* Logos container */}
            <div
              ref={logoContainerRef}
              className="flex overflow-hidden"
            >
              <div className="flex gap-[200px] flex-none pr-14">
                {/* Logos */}
                {logos.map((logo, index) => (
                  <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer">
                    <Image src={logo.src} alt={logo.alt} width={150} height={200} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Left Arrow */}
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 bg-[#ff7d38] rounded-full flex items-center justify-center text-white hover:bg-[#ffae82] transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <span className="text-2xl font-bold">&#8249;</span>
            </button>

            {/* Right Arrow */}
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
