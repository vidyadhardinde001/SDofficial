"use client";
import Link from "next/link";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import { useEffect, useState } from "react";

// interface FooterContent {
//   socialLinks: {
//     twitter: string;
//     instagram: string;
//     linkedin: string;
//   };
//   copyrightText: string;
// }

interface FooterContent {
  socialLinks: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  navigationLinks: {
    href: string;
    text: string;
  }[];
  copyrightText: string;
}


export const Footer = () => {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);
  // const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null);

  useEffect(() => {
    async function fetchFooterContent() {
      try {
        const response = await fetch('/api/content/footer');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFooterContent(data.content);
      } catch (error) {
        console.error('Error fetching footer content:', error);
      }
    }
    // async function fetchHeaderContent() {
    //   try {
    //     const response = await fetch("/api/content/header");
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setHeaderContent(data);
    //   } catch (error) {
    //     console.error("Error fetching header content:", error);
    //   }
    // }

    fetchFooterContent();
    // fetchHeaderContent();
  }, []);

  // if (!footerContent) {
  //   return <div>Loading...</div>;
  // }
  return (
    <footer className="bg-[#121825] text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="/">Home</a>
          <Link href="/projects">Projects</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contactus">Contact</Link>
          <Link href="/aboutus">About Us</Link>
          {/* {footerContent.navigationLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              <a>{item.text}</a> 
            </Link>
          ))} */}
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          {/* Social Media Icons with Links */}
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <SocialX />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <SocialInsta />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <SocialLinkedIn />
          </a>
          {/* {footerContent.socialLinks &&
            Object.entries(footerContent.socialLinks).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                {platform === "twitter" && <SocialX />}
                {platform === "instagram" && <SocialInsta />}
                {platform === "linkedin" && <SocialLinkedIn />}
              </a>
            ))} */}
          
        </div>
        <p className="mt-6">
          &copy; 2024 Siddhivinayak Engineers, Inc. All rights reserved.
          {/* &copy; {new Date().getFullYear()} {footerContent.copyrightText} */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
