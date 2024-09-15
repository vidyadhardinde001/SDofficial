import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";


export const Footer = () => {
  return (
    <footer className="bg-[#121825] text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">Home</a>
          <a href="#">Projects</a>
          <a href="#">Gallery</a>
          <a href="#">Contact</a>
          <a href="#">About Us</a>
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
          
        </div>
        <p className="mt-6">
          &copy; 2024 Siddhivinayak Engineers, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
