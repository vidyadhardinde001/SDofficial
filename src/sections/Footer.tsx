"use client";
import Link from "next/link";
import FacebookIcon from "@/assets/social-facebook.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#232323] text-[#BCBCBC] text-sm py-8 text-center">
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-6 mt-0 md:flex-row md:justify-center">
          <a href="/" className="hover:text-white">Home</a>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/gallery" className="hover:text-white">Gallery</Link>
          <Link href="/contactus" className="hover:text-white">Contact</Link>
          <Link href="/aboutus" className="hover:text-white">About Us</Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          {/* Social Media Icons with Links */}
          <a href="https://www.instagram.com/siddhivinayakengineers19?igsh=Nml3cnZ0cHgxYmo3" target="_blank" rel="noopener noreferrer">
            <SocialInsta className="w-6 h-6 md:w-8 md:h-8 hover:opacity-75 transition-opacity duration-200" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <SocialLinkedIn className="w-6 h-6 md:w-8 md:h-8 hover:opacity-75 transition-opacity duration-200" />
          </a>
          <a href="https://www.facebook.com/SiddhivinayakEngineerss" target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="w-6 h-6 md:w-8 md:h-8 hover:opacity-75 transition-opacity duration-200" />
          </a>
        </div>

        {/* Copyright Text */}
        <p className="mt-6 text-xs md:text-sm lg:text-base">
          &copy; 2024 Siddhivinayak Engineers, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
