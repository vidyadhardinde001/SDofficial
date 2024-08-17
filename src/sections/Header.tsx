import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
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
            <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            <div className="md:hidden ml-auto">
              <MenuIcon className="h-5 w-5" />
            </div>
            <nav className="hidden md:flex gap-14 text-black/60 justify-center items-center bg-white px-4 py-2 rounded-full sm:w-[320px] md:w-[590px] lg:w-[700px] xl:w-[1200px] file: max-w-screen-md mx-auto">
              <a href="#" className="hover:text-black">
                Home
              </a>
              <a href="#" className="hover:text-black">
                Projects
              </a>
              <a href="#" className="hover:text-black">
                Gallery
              </a>
              <a href="#" className="hover:text-black">
                Contact
              </a>
              <a href="#" className="hover:text-black">
                About Us
              </a>
            </nav>
            <button className="bg-[#fb845d] text-white px-4 py-2 rounded-full font-medium inline-flex align-items justify-center tracking-tight ml-auto hidden md:block">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
