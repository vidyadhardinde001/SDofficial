"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import logo from "@/assets/logo1.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import CloseIcon from "@/assets/cross.png"; // Import the Close Icon
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-lg z-50 bg-black">
      <div className="py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="Saas Logo" width={80} height={10} />

            {/* Mobile Menu Button */}
            <button className="md:hidden ml-auto" onClick={handleMenuToggle}>
              {isMenuOpen ? (
                <Image
                  src={CloseIcon}
                  alt="Close Menu"
                  width={24}
                  height={24}
                  className="invert filter"
                />
              ) : (
                <Image
                  src={MenuIcon}
                  alt="Open Menu"
                  width={24}
                  height={24}
                />
              )}
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className={`hidden md:flex lg:gap-14 md:gap-8 text-white justify-center items-center bg-black px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto`}
            >
              <Link
                href="/"
                className="relative group hover:text-white font-semibold"
              >
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/projects"
                className="relative group hover:text-white font-semibold"
              >
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/gallery"
                className="relative group hover:text-white font-semibold"
              >
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/contactus"
                className="relative group hover:text-white font-semibold"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/aboutus"
                className="relative group hover:text-white font-semibold"
              >
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </nav>

            {/* Call Us Button for Desktop */}
            <a
              href="tel:+91 7558341063"
              className="bg-[#FE6D20] hover:bg-[#ff9f6c] text-white px-4 py-2 rounded-md font-medium inline-flex justify-center tracking-tight ml-auto hidden md:block"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-0 left-0 w-full bg-white z-40`}
      >
        <div className="flex flex-col items-center py-6">
          <Link
            href="/"
            className="relative group text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link
            href="/projects"
            className="relative group text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link
            href="/gallery"
            className="relative group text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link
            href="/contactus"
            className="relative group text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link
            href="/aboutus"
            className="relative group text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <a
            href="tel:+91 7558341063"
            className="bg-[#ff9f6c] hover:bg-[#6a6a6a] text-white px-4 py-2 rounded-full font-medium mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Call Us
          </a>
        </div>
      </nav>
    </header>
  );
};
