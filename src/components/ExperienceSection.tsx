"use client";

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
} from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";
import {
  CardStack,
  type ExperienceCardData,
} from "@/components/kokonutui/card-stack";

const experiences: ExperienceCardData[] = [
  {
    id: "tech",
    title: "10+ Years with Tech",
    subtitle: "Hardware, software, and everything in between",
    icon: Laptop,
    specs: [
      { label: "Scope", value: "Full-Stack" },
      { label: "Since", value: "2016" },
      { label: "Focus", value: "Web Dev" },
      { label: "Tools", value: "Modern" },
    ],
  },
  {
    id: "furniture",
    title: "Furniture Shop",
    subtitle: "Full Stack E-commerce Project",
    icon: Store,
    specs: [
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "Node.js" },
      { label: "Database", value: "Prisma" },
      { label: "Queue", value: "BullMQ" },
    ],
  },
  {
    id: "projects",
    title: "30+ Projects",
    subtitle: "From landing pages to full-stack apps",
    icon: Sparkles,
    specs: [
      { label: "Count", value: "30+" },
      { label: "Types", value: "Diverse" },
      { label: "Stack", value: "Modern" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    id: "itpec",
    title: "ITPEC IP Cert",
    subtitle: "Information Technology Passport",
    icon: Award,
    specs: [
      { label: "Exam", value: "ITPEC" },
      { label: "Region", value: "Asia-Pacific" },
      { label: "Level", value: "IP" },
      { label: "Status", value: "Certified" },
    ],
  },
  {
    id: "websites",
    title: "Custom Websites",
    subtitle: "Solo design to deployment",
    icon: Globe,
    specs: [
      { label: "Role", value: "Solo Dev" },
      { label: "Design", value: "Custom" },
      { label: "Deploy", value: "Full" },
      { label: "Clients", value: "Multiple" },
    ],
  },
  {
    id: "research",
    title: "Research & Learning",
    subtitle: "Always exploring new technologies",
    icon: Search,
    specs: [
      { label: "Scope", value: "Broad" },
      { label: "Pace", value: "Daily" },
      { label: "Focus", value: "New Tech" },
      { label: "Method", value: "Self-led" },
    ],
  },
  {
    id: "design",
    title: "Graphic Design",
    subtitle: "Visual thinking meets code",
    icon: Palette,
    specs: [
      { label: "Tool", value: "Figma" },
      { label: "Training", value: "Class" },
      { label: "Focus", value: "UI/UX" },
      { label: "Approach", value: "Creative" },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Studies",
    subtitle: "Making things feel right",
    icon: GraduationCap,
    specs: [
      { label: "Design", value: "Thinking" },
      { label: "Proto", value: "Figma" },
      { label: "Focus", value: "UX" },
      { label: "Status", value: "Learning" },
    ],
  },
  {
    id: "ai",
    title: "AI & Content",
    subtitle: "Creating content about AI tools",
    icon: Video,
    specs: [
      { label: "Topic", value: "AI" },
      { label: "Type", value: "Education" },
      { label: "Focus", value: "Tools" },
      { label: "Status", value: "Active" },
    ],
  },
];

export default function ExperienceSection() {
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
              Click to explore • A decade of building
            </p>
          </div>
        </ScrollAnimation>

        <CardStack items={experiences} />
      </div>
    </section>
  );
}
