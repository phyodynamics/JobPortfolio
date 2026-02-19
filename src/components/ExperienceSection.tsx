"use client";

import { motion } from "framer-motion";
import { Store, GraduationCap, Video, Sparkles } from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

const experiences = [
  {
    icon: Store,
    title: "Furniture Shop",
    subtitle: "Full Stack Project",
    period: "Completed",
    description:
      "Built a complete furniture store from scratch — React frontend, Node backend, payments, caching, the works.",
    tags: ["React", "Express", "Prisma", "Redis", "BullMQ"],
    highlight: true,
    gradient: "from-violet-500/10 to-fuchsia-500/10",
    iconBg: "bg-violet-100 text-violet-600",
    accentBorder: "border-l-violet-500",
  },
  {
    icon: Sparkles,
    title: "30+ Real Projects",
    subtitle: "Ongoing Portfolio",
    period: "Ongoing",
    description:
      "Shipped over 30 projects — from landing pages to complex full-stack apps. Building is what I do.",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
    highlight: false,
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-100 text-blue-600",
    accentBorder: "border-l-blue-500",
  },
  {
    icon: GraduationCap,
    title: "Learning UI/UX",
    subtitle: "Design Studies",
    period: "Studies",
    description:
      "Studying design because functional isn't enough. It needs to look and feel right.",
    tags: ["Figma", "Design Thinking", "Prototyping"],
    highlight: false,
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-100 text-emerald-600",
    accentBorder: "border-l-emerald-500",
  },
  {
    icon: Video,
    title: "AI & Content",
    subtitle: "Education & Sharing",
    period: "Active",
    description:
      "Creating content about AI tools — helping people understand and use this new technology.",
    tags: ["AI", "Content Creation", "Education"],
    highlight: false,
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-100 text-amber-600",
    accentBorder: "border-l-amber-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation variant="flip">
          <div className="text-center mb-20">
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
              From side projects to full-stack builds — here&apos;s my journey
            </p>
          </div>
        </ScrollAnimation>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-br ${exp.gradient} p-px`}
            >
              <div className="relative h-full rounded-2xl bg-white p-7">
                {/* Accent left border */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-0.75 rounded-full border-l-4 ${exp.accentBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${exp.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <exp.icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-black leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {exp.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${
                      exp.highlight
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
