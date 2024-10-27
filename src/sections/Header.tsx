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
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Image src={logo} alt="Saas Logo" width={80} height={40} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-auto"
              onClick={handleMenuToggle}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <Image
                  src={CloseIcon}
                  alt="Close Menu"
                  width={24}
                  height={24}
                  className="invert filter"
                />
              ) : (
                <Image src={MenuIcon} alt="Open Menu" width={24} height={24} />
              )}
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className={`hidden md:flex md:items-center md:gap-8 text-white`}
            >
              {["/", "/projects", "/gallery", "/contactus", "/aboutus"].map(
                (path, index) => (
                  <Link
                    key={index}
                    href={path}
                    className="relative group hover:text-white font-semibold"
                  >
                    {path === "/"
                      ? "Home"
                      : path.substring(1).replace("us", " Us")}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </Link>
                )
              )}
            </nav>

            {/* Call Us Button for Desktop */}
            <a
              href="tel:+91 7057272626"
              className="hidden md:inline-block bg-[#FE6D20] hover:bg-[#ff9f6c] text-white px-4 py-2 rounded-md font-medium tracking-tight"
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
        } md:hidden fixed inset-0 bg-black bg-opacity-90 text-white z-40`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen py-6 space-y-6">
          {["/", "/projects", "/gallery", "/contactus", "/aboutus"].map(
            (path, index) => (
              <Link
                key={index}
                href={path}
                className="relative group text-xl py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {path === "/"
                  ? "Home"
                  : path.substring(1).replace("us", " Us")}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            )
          )}
          <a
            href="tel:+91 7057272626"
            className="bg-[#ff9f6c] hover:bg-[#6a6a6a] text-white px-6 py-3 rounded-full font-medium mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Call Us
          </a>
        </div>
      </nav>
    </header>
  );
};
