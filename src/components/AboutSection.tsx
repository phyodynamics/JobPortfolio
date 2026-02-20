"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Bot, Sparkles } from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Developer",
    desc: "I build complete web apps from scratch using React, Node, and whatever else gets the job done.",
  },
  {
    icon: Palette,
    title: "UI/UX Student",
    desc: "Learning to make things look good, not just work good. Obsessed with clean interfaces.",
  },
  {
    icon: Bot,
    title: "AI Educator",
    desc: "I share what I know about AI on social media. Breaking down complex tech for everyone.",
  },
  {
    icon: Sparkles,
    title: "Vibe Coding Pro",
    desc: "I use AI tools like Cursor to build faster. It's not cheating, it's efficient.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation variant="rise">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              About Me
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              Who I Am
            </FadeUpWord>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto leading-relaxed">
              I&apos;m a developer who loves building things. I&apos;ve shipped
              30+ projects, including a full furniture store from the ground up.
              I&apos;m just trying to get better every day and build cool stuff.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, i) => (
            <ScrollAnimation
              key={item.title}
              variant={i % 2 === 0 ? "tiltLeft" : "tiltRight"}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: -3,
                  z: 30,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group relative p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-shadow duration-300 hover:shadow-xl bg-white"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "800px",
                }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
