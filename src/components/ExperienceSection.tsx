"use client";

import { useState } from "react";
import {
  Store,
  GraduationCap,
  Video,
  Sparkles,
  Laptop,
  Award,
  Search,
  Globe,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";
import { AnimatedList } from "@/components/ui/animated-list";

interface ExperienceItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  period: string;
}

const experiences: ExperienceItem[] = [
  {
    icon: Laptop,
    title: "10+ Years with Tech",
    subtitle:
      "Deep experience with hardware, software, and everything in between.",
    period: "Since 2016",
  },
  {
    icon: Store,
    title: "Full Stack Furniture Shop",
    subtitle:
      "Built a complete e-commerce store — React, Node, Prisma, Redis, BullMQ.",
    period: "Completed",
  },
  {
    icon: Sparkles,
    title: "30+ Real Projects Shipped",
    subtitle:
      "From landing pages to complex full-stack apps. Building is what I do.",
    period: "Ongoing",
  },
  {
    icon: Award,
    title: "ITPEC IP Certificate",
    subtitle:
      "Certified Information Technology Passport — recognized across Asia-Pacific.",
    period: "Certified",
  },
  {
    icon: Globe,
    title: "Custom Website Creator",
    subtitle:
      "I design and build full websites solo — from concept to deployment.",
    period: "Active",
  },
  {
    icon: Search,
    title: "Research & Self-Learning",
    subtitle:
      "Always exploring new tech, frameworks, and best practices on my own.",
    period: "Always",
  },
  {
    icon: Palette,
    title: "Graphic Design Training",
    subtitle:
      "Attended graphic design class — bringing visual thinking to my code.",
    period: "Completed",
  },
  {
    icon: GraduationCap,
    title: "UI/UX Studies",
    subtitle:
      "Studying design because functional isn't enough. It needs to feel right.",
    period: "Learning",
  },
  {
    icon: Video,
    title: "AI & Content Creation",
    subtitle:
      "Creating content about AI tools — helping people use this new technology.",
    period: "Active",
  },
];

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex w-full max-w-lg items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shrink-0">
        <item.icon size={20} strokeWidth={1.5} className="text-white" />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-start justify-between">
          <h3 className="text-sm font-semibold text-black">{item.title}</h3>
          <span className="text-[10px] tracking-wider uppercase text-gray-400 shrink-0">
            {item.period}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation variant="flip">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Experience
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              What I&apos;ve Been Up To
            </FadeUpWord>
            <p className="mt-4 text-gray-500 max-w-md mx-auto">
              A decade of building, learning, and creating
            </p>
          </div>
        </ScrollAnimation>

        <div
          className="relative h-[400px] w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated list — visible when NOT hovered */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <AnimatedList
              stackGap={15}
              columnGap={75}
              scaleFactor={0.04}
              scrollDownDuration={6}
              formationDuration={0.8}
            >
              {experiences.map((item) => (
                <ExperienceCard key={item.title} item={item} />
              ))}
            </AnimatedList>
          </div>

          {/* Scrollable list — visible when hovered */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto scrollbar-hide ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)",
            }}
          >
            <div className="flex flex-col items-center gap-3 py-10">
              {experiences.map((item) => (
                <ExperienceCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Hover to browse all experiences
        </p>
      </div>
    </section>
  );
}
