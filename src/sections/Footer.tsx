"use client";
import Link from "next/link";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import { useEffect, useState } from "react";

// Define the structure of the footer content
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

  useEffect(() => {
    // Fetch the footer content from the API
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

    fetchFooterContent();
  }, []);

  if (!footerContent) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="bg-[#121825] text-[#BCBCBC] text-sm py-20 text-center">
      <div className="container">
        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          {footerContent.navigationLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              <a>{item.text}</a> {/* Client-side navigation */}
            </Link>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          {footerContent.socialLinks &&
            Object.entries(footerContent.socialLinks).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                {platform === "twitter" && <SocialX className="hover:text-blue-500" />}
                {platform === "instagram" && <SocialInsta className="hover:text-blue-500" />}
                {platform === "linkedin" && <SocialLinkedIn className="hover:text-blue-500" />}
              </a>
            ))}
        </div>

        {/* Copyright Text */}
        <p className="mt-6">
          &copy; {new Date().getFullYear()} {footerContent.copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
