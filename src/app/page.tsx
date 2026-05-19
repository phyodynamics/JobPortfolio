"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FloatingResume from "@/components/FloatingResume";
import SmoothScroll from "@/components/SmoothScroll";
import GSAPProvider from "@/components/GSAPProvider";
import CinematicIntro from "@/components/CinematicIntro";

export default function Home() {
  return (
    <GSAPProvider>
      <SmoothScroll>
        <CinematicIntro />
        <main className="bg-white text-black relative">
          <Navbar />
          <FloatingResume />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </GSAPProvider>
  );
}
