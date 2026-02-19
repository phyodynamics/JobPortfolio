"use client";

import { motion } from "framer-motion";
import { Store, GraduationCap, Video, Sparkles } from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

const experiences = [
  {
    icon: Store,
    title: "Furniture Shop — Full Stack Project",
    period: "Completed",
    description:
      "Built a full furniture store from scratch. React frontend, Node backend. Handled payments, caching, the works.",
    tags: ["React", "Express", "Prisma", "Redis", "BullMQ"],
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "30+ Real Projects",
    period: "Ongoing",
    description:
      "I've shipped over 30 projects. From simple landing pages to complex apps. I just love building.",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
    highlight: false,
  },
  {
    icon: GraduationCap,
    title: "Learning UI/UX",
    period: "Studies",
    description:
      "Studying design because functional isn't enough. It needs to look good and feel right.",
    tags: ["Figma", "Design Thinking", "Prototyping"],
    highlight: false,
  },
  {
    icon: Video,
    title: "AI & Content",
    period: "Active",
    description:
      "I make content about AI tools. Helping people understand how to use this new tech.",
    tags: ["AI", "Content Creation", "Education"],
    highlight: false,
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
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
          </div>
        </ScrollAnimation>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gray-200" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <ScrollAnimation
                key={exp.title}
                variant={i % 2 === 0 ? "tiltLeft" : "slide"}
              >
                <div className="relative pl-16 md:pl-20">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className={`absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full border-2 ${
                      exp.highlight
                        ? "bg-black border-black"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      rotateY: 3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    className={`p-8 rounded-2xl border transition-shadow duration-300 hover:shadow-xl ${
                      exp.highlight
                        ? "border-black/10 bg-gray-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "800px",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <exp.icon size={20} className="text-gray-600" />
                      <span className="text-xs tracking-wider uppercase text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
