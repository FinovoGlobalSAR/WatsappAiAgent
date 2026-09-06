import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Workflow from "./components/Workflow";
import Automation from "./components/Automation";
import Powerful from "./components/Powerful";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll", window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#F6FAFA] text-[#033232]">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Workflow />
        <Automation />
        <Powerful />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
