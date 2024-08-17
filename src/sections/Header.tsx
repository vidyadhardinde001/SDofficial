import ArrowRight from "@/assets/arrow-right.svg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

export const Header = () => {
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
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="Saas Logo" height={30} width={130} />
            <div className="md:hidden ml-auto">
              <MenuIcon className="h-5 w-5" />
            </div>
            <nav className="hidden md:flex lg:gap-14 md:gap-8 text-black/60 justify-center items-center bg-white px-4 py-2 rounded-full sm:w-[320px] md:w-[500px] lg:w-[700px] xl:w-[1200px] max-w-screen-md mx-auto">
              <a href="#" className="relative group hover:text-black">
                Home
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
              <a href="#" className="relative group hover:text-black">
                Projects
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
              <a href="#" className="relative group hover:text-black">
                Gallery
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
              <a href="#" className="relative group hover:text-black">
                Contact
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
              <a href="#" className="relative group hover:text-black">
                About Us
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#fb845d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
            </nav>
            <button className="bg-[#fb845d] hover:bg-black text-white px-4 py-2 rounded-full font-medium inline-flex align-items justify-center tracking-tight ml-auto hidden md:block">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
