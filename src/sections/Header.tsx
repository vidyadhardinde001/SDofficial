"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import logo from "@/assets/logo1.png";
import logo1 from "@/assets/alpha.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null);

  // useEffect(() => {
  //   async function fetchContent() {
  //     try {
  //     //   const cachedContent = localStorage.getItem('headerContent');
  //     // if (cachedContent) {
  //     //   setHeaderContent(JSON.parse(cachedContent));
  //     //   return;
  //     // }
  //       // const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=hdWxvDOxAo37f14rks_1dhsJmxVl1lBzB2yQvp32pZdmoY4K2aBMR5x5WHTBxlKJBj0WQAEHDYpXRt0OjiWck7rn6Xkdb0HYm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBnV1TslBD8CxlmVE9u3evWfF1GXw_KHyfXkWYYt9CYFVnR92-qieb8jHbj1wsQVfR9afHfui3JKrJxwE5HGcJYXJ5K4j08g4g&lib=MdeKoPvhrvM-qhZvace2Bf_Z1uKL4_q0K');
  //       const response = await fetch('/api/content/header');

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log('Fetched data:', data); // Check if this logs the correct data
  //       // data.content.logoUrl = "https://drive.google.com/uc?export=view&id=1F_9eMigSKMiIWycfJdSEVmycBdNMz_mY";
  //       setHeaderContent(data.content); // Ensure this matches the structure
  //       // localStorage.setItem('headerContent', JSON.stringify(data.content));
  //     } catch (error) {
  //       console.error('Error fetching header content:', error);
  //     }
  //   }
  
  //   fetchContent();
  // }, []);
  // if (headerContent==null) {
  //   console.log("Header data is still null or undefined");
  //   return <div>Loading...</div>;
  // }
  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-lg z-50 bg-white">
      <div className="py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="Saas Logo" width={80} height={10} />
            {/* {headerContent ? ( */}
              {/* <Image src={headerContent?.logoUrl || logo1} alt="Saas Logo" height={10} width={80} /> */}
            {/* ) : ( */}
              {/* <p>Loading...</p> */}
            {/* )} */}


            {/* Mobile Menu Button */}
            <button className="md:hidden ml-auto" onClick={handleMenuToggle}>
              <MenuIcon className="h-5 w-5" />
            </button>

            {/* Navigation Links */}
            <nav
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:flex lg:gap-14 md:gap-8 text-black/60 justify-center items-center bg-white px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto`}
            >
              <Link href="/" className="relative group hover:text-black">
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/projects" className="relative group hover:text-black">
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/gallery" className="relative group hover:text-black">
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/contactus" className="relative group hover:text-black">
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/aboutus" className="relative group hover:text-black">
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              {/* {headerContent?.menuItems.map((link) => (
                <Link key={link.href} href={link.href} className="relative group hover:text-black">
                  {link.text}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </Link>
              ))} */}
            </nav>
            <a
              href="tel:+91 7558341063" // Replace with your actual phone number
              className="bg-[#0074F5] hover:bg-black text-white px-4 py-2 rounded-md font-medium inline-flex align-items justify-center tracking-tight ml-auto hidden md:block"
            >
              Call Us
            </a>
            {/* {headerContent && (
              <a
                href={`tel:${headerContent.phone}`}
                className="bg-[#0074F5] hover:bg-black text-white px-4 py-2 rounded-md font-medium inline-flex align-items justify-center tracking-tight ml-auto hidden md:block"
              >
                Call Us
              </a>
            )} */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-0 left-0 w-full bg-white z-40`}
      >
        <div className="flex flex-col items-center py-6">
          <Link href="/" className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/projects" className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
            Projects
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/gallery" className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
            Gallery
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/contactus" className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/aboutus" className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
            About Us
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <a
            href="tel:+91 7558341063" // Replace with your actual phone number
            className="bg-[#575FF2] hover:bg-[#2E38F2] text-white px-4 py-2 rounded-full font-medium mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Call Us
          </a>
          {/* {headerContent?.menuItems.map((link) => (
            <Link key={link.href} href={link.href} className="relative group text-lg py-2" onClick={() => setIsMenuOpen(false)}>
              {link.text}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
          {headerContent && (
            <a
              href={`tel:${headerContent.phone}`}
              className="bg-[#575FF2] hover:bg-[#2E38F2] text-white px-4 py-2 rounded-full font-medium mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Call Us
            </a>
          )} */}
        </div>
      </nav>
    </header>
  );
};
