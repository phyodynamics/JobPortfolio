"use client";

import { useRef, useState } from "react";
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
    <div className="flex items-center gap-4 w-full rounded-2xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shrink-0">
        <item.icon size={20} strokeWidth={1.5} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-black truncate">
            {item.title}
          </h3>
          <span className="text-[10px] tracking-wider uppercase text-gray-400 shrink-0">
            {item.period}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed truncate">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

        {/* Scrollable marquee container */}
        <div
          className="relative h-105 overflow-hidden max-w-lg mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Fade overlays */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="overflow-y-auto h-full scrollbar-hide"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 60px, black calc(100% - 60px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 60px, black calc(100% - 60px), transparent)",
            }}
          >
            <div
              className={`flex flex-col gap-3 py-16 ${isPaused ? "[animation-play-state:paused]" : ""}`}
              style={{
                animation: isPaused
                  ? "none"
                  : "marquee-vertical 25s linear infinite",
              }}
            >
              {/* Duplicate items for infinite scroll effect */}
              {[...experiences, ...experiences].map((item, i) => (
                <ExperienceCard key={`${item.title}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
