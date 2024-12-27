"use client";

import logo from "@/assets/logo1.png";
import Image from "next/image";
import MenuIcon from "@/assets/icons8-menu-64.png";
import CloseIcon from "@/assets/cross.png"; // Import the Close Icon
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Fetch the logo URL from the API
    const fetchLogo = async () => {
      try {
        const response = await fetch("/api/content/aboutUsSection"); // Replace with your actual API endpoint
        const data = await response.json();
        setLogoUrl(data.content.imageUrl); // Assuming `imageUrl` is the key for the image URL in the API response
        console.log("error",data);
      } catch (error) {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=nlaUMw9FNa1EIqEuKLu-gjrPZTAxppG7Ziwc7GEhbdRwh2nOrIPC6-BfBnAo2DQlvyS35k0QYkWOAcylyFqhm0OPRqQO4bJym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPqMLSOjrwHZzK4mYvDdiHLGQJ-sHsTjH8OGIT8v3wDXNf-klVZLuzilP1FveXtpdQO_gPawdAHBn8CdIZfxHGG40252Hhbnptz9Jw9Md8uu&lib=MmfELZ3pWjpi07YwspSVeGEoLBlaE9kY8"); // Replace with your actual API endpoint
        const data = await response.json();
        setLogoUrl(data.content.imageUrl);
        console.error("Failed to fetch logo URL:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <header className="sticky top-0 backdrop-blur-lg z-50 bg-white">
      <div className="py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
          {logoUrl ? (
              <Image src={logoUrl} alt="Dynamic Logo" width={110} height={100} />
            ) : (
              <Image src={logo} alt="Dynamic Logo" width={110} height={100} />
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden ml-auto" onClick={handleMenuToggle}>
              {isMenuOpen ? (
                <Image
                  src={CloseIcon}
                  alt="Close Menu"
                  width={24}
                  height={24}
                  className=""
                />
              ) : (
                <Image
                  src={MenuIcon}
                  alt="Open Menu"
                  width={24}
                  height={24}
                  className = "invert filter"
                />
              )}
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className={`hidden md:flex lg:gap-14 md:gap-8 text-black justify-center items-center bg-white px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto`}
            >
              <Link
                href="/"
                className="relative group hover:text-orange-400 font-semibold"
              >
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/projects"
                className="relative group hover:text-orange-400 font-semibold"
              >
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/gallery"
                className="relative group hover:text-orange-400 font-semibold"
              >
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/contactus"
                className="relative group hover:text-orange-400 font-semibold"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link
                href="/aboutus"
                className="relative group hover:text-orange-400 font-semibold"
              >
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff9f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-0 left-0 w-full bg-white z-40`}
      >
        <div className="flex flex-col items-center py-6 relative">
        <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src={CloseIcon}
              alt="Close Menu"
              width={24}
              height={24}
            />
          </button>
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
        </div>
      </nav>
    </header>
  );
};
