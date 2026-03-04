"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";
import { useRef, MouseEvent } from "react";
import Image from "next/image";

const skills = [
  { name: "HTML & CSS", svg: "/images/tech/html5.svg", category: "Frontend" },
  { name: "React", svg: "/images/tech/react.svg", category: "Frontend" },
  { name: "Next.js", svg: "/images/tech/nextjs.svg", category: "Frontend" },
  {
    name: "TypeScript",
    svg: "/images/tech/typescript.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    svg: "/images/tech/tailwind.svg",
    category: "Frontend",
  },
  {
    name: "Redux / RTK Query",
    svg: "/images/tech/redux.svg",
    category: "State",
  },
  {
    name: "React Compiler",
    svg: "/images/tech/react.svg",
    category: "Frontend",
  },
  {
    name: "Navigation",
    svg: "/images/tech/reactrouter.svg",
    category: "Frontend",
  },
  { name: "Node.js", svg: "/images/tech/nodejs.svg", category: "Backend" },
  { name: "Express.js", svg: "/images/tech/express.svg", category: "Backend" },
  { name: "GraphQL API", svg: "/images/tech/graphql.svg", category: "Backend" },
  { name: "API Integration", svg: "/images/tech/api.svg", category: "Backend" },
  { name: "Prisma ORM", svg: "/images/tech/prisma.svg", category: "Backend" },
  { name: "JWT & OAuth", svg: "/images/tech/jwt.svg", category: "Security" },
  { name: "Testing", svg: "/images/tech/jest.svg", category: "Backend" },
  { name: "Git & GitHub", svg: "/images/tech/git.svg", category: "Tools" },
  { name: "Vercel & AWS", svg: "/images/tech/vercel.svg", category: "DevOps" },
  { name: "Docker", svg: "/images/tech/docker.svg", category: "DevOps" },
  { name: "AI Integration", svg: "/images/tech/openai.svg", category: "AI" },
  {
    name: "Optimization",
    svg: "/images/tech/optimization.svg",
    category: "Tools",
  },
];

function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-shadow cursor-default"
    >
      <div
        className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        <Image
          src={skill.svg}
          alt={skill.name}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span
        className="text-sm font-medium text-gray-700 text-center"
        style={{ transform: "translateZ(20px)" }}
      >
        {skill.name}
      </span>
      <span
        className="text-[10px] tracking-wider uppercase text-gray-400"
        style={{ transform: "translateZ(10px)" }}
      >
        {skill.category}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation variant="zoom">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Tech Stack
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              Skills & Technologies
            </FadeUpWord>
            <p className="mt-4 text-gray-500">
              Technologies I work with on a daily basis
            </p>
          </div>
        </ScrollAnimation>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          style={{ perspective: "1200px" }}
        >
          {skills.map((skill, i) => (
            <ScrollAnimation
              key={skill.name}
              variant={
                i % 3 === 0 ? "rise" : i % 3 === 1 ? "tiltLeft" : "tiltRight"
              }
            >
              <SkillCard skill={skill} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
