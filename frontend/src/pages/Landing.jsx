import Hero from "../components/landing/Hero/Hero";
import Features from "../components/landing/Features/Features";
import LandingNavbar from "../components/landing/LandingNavbar/LandingNavbar";
import HowItWorks from "../components/landing/HowItWorks/HowItWorks";
import CTA from "../components/landing/CTA/CTA"
import Footer from "../components/landing/Footer/Footer"

export default function Landing() {
  return (
    <>
      <LandingNavbar/>
      <Hero />
      <Features />
      <HowItWorks/>
      <section id="cta">
        <CTA/>
        <Footer/>
      </section>
    </>
  );
}