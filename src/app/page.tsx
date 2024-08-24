import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Pricing } from "@/sections/Pricing";
import { Testimonials } from "@/sections/Testimonials";
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

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ServicesSection />
      <ValuetoProduct />
      <IndustriesWeServe />
      <LogoTicker />
      <Projects />
      {/* <ProductShowcase /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <CallToAction /> */}
      <TestimonialSection />
      <ContactSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
