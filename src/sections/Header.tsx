"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { motion } from "framer-motion";
import Link from 'next/link';



export const Header = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <header className="sticky top-0 backdrop-blur-lg z-20">
      {/* <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div> */}
      <div className="py-3">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="Saas Logo" height={30} width={130} />
            <div className="md:hidden ml-auto">
              <MenuIcon className="h-5 w-5" />
            </div>

            {/*<nav className="hidden md:flex lg:gap-14 md:gap-8 text-black/60 justify-center items-center bg-white px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto">
            <Link href="/" className="relative group hover:text-black">
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/projects" className="relative group hover:text-black">
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/gallery" className="relative group hover:text-black">
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/contact" className="relative group hover:text-black">
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/about" className="relative group hover:text-black">
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>*/}

            <nav className="hidden md:flex lg:gap-14 md:gap-8 text-black/60 justify-center items-center bg-[#F5F5F5] px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto">
              <Link href="/" className="relative group hover:text-black">
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="/projects" className="relative group hover:text-black">
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="#" className="relative group hover:text-black">
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="#" className="relative group hover:text-black">
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
              <Link href="#" className="relative group hover:text-black">
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0074F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            </nav>
            <button className="bg-[#0074F5] hover:bg-black text-white px-4 py-2 rounded-full font-medium inline-flex align-items justify-center tracking-tight ml-auto hidden md:block">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
