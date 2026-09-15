import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import EducationSection from "@/components/sections/EducationSection";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import WebDev from "@/components/sections/WebDev";
import Certifications from "@/components/sections/Certifications";
import Process from "@/components/sections/Process";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <ScrollProgress />
      <Hero />
      <About />
      <EducationSection />
      <Skills />
      <Experience />
      <WebDev />
      {/* UIDesign section hidden until real design screenshots are added. */}
      <Certifications />
      <Process />
      <WhyWorkWithMe />
      <Hobbies />
      <Contact />
      <Footer />
    </PageTransition>
  );
}
