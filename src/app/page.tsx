import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { ProductShowcase } from "@/sections/ProductShowcase";
{
  /*import { Pricing } from "@/sections/Pricing";*/
}
{
  /*import { Testimonials } from "@/sections/Testimonials";*/
}
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import IndustriesWeServe from "@/sections/IndustriesWeServe";
import ContactSection from "@/sections/ContactSection";
import QuoteSection from "@/sections/QuoteSection";
import ValuetoProduct from "@/sections/ValuetoProduct";
import TestimonialSection from "@/sections/TestimonialSection";
import ServicesSection from "@/sections/ServicesSection";
import Scene from "@/components/Scene";
import Projects from "@/sections/Projects";
import Gallery from "@/sections/gallery";
import AboutUs from "@/sections/aboutus";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <ValuetoProduct />
      <IndustriesWeServe />
<<<<<<< HEAD
=======
      <ServicesSection />
>>>>>>> 3e817c414a3e7c939a2b83a3a8f61e614f47e111
      <LogoTicker />
      <TestimonialSection />
<<<<<<< HEAD
      <AboutUs/>
=======
      <Gallery />
      <AboutUs />
>>>>>>> 3e817c414a3e7c939a2b83a3a8f61e614f47e111
      <ContactSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
