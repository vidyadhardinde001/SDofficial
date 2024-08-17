import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Pricing } from "@/sections/Pricing";
import { Testimonials } from "@/sections/Testimonials";
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import IndustriesWeServe from "@/sections/IndustriesWeServe";
import ValuetoProduct from "@/sections/ValuetoProduct";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ValuetoProduct/>
      <IndustriesWeServe/>
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
