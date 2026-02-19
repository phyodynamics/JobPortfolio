"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import { CloudOrbit, OrbitingImage } from "@/components/ui/cloud-orbit";
import { useRef, useSyncExternalStore, useCallback } from "react";

function useIsMobile(breakpoint = 768) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [breakpoint],
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
    [breakpoint],
  );
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const orbitingImagesData = [
  {
    speed: 25,
    radius: 160,
    size: 50,
    startAt: 0,
    images: [
      { name: "React", url: "/images/tech/react.svg" },
      { name: "Next.js", url: "/images/tech/nextjs.svg" },
    ],
  },
  {
    speed: 30,
    radius: 160,
    size: 50,
    startAt: 0.25,
    images: [
      { name: "Node.js", url: "/images/tech/nodejs.svg" },
      { name: "TypeScript", url: "/images/tech/typescript.svg" },
    ],
  },
  {
    speed: 20,
    radius: 160,
    size: 50,
    startAt: 0.5,
    images: [
      { name: "Redux", url: "/images/tech/redux.svg" },
      { name: "GraphQL", url: "/images/tech/graphql.svg" },
    ],
  },
  {
    speed: 28,
    radius: 160,
    size: 50,
    startAt: 0.75,
    images: [
      { name: "Tailwind", url: "/images/tech/tailwind.svg" },
      { name: "Prisma", url: "/images/tech/prisma.svg" },
    ],
  },
];

export default function HeroSection() {
  const isMobile = useIsMobile();
  const orbitRadius = isMobile ? 110 : 160;
  const orbitSize = isMobile ? 38 : 50;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const orbitScale = useTransform(smoothProgress, [0, 0.5], [1, 0.6]);
  const orbitY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const orbitRotateX = useTransform(smoothProgress, [0, 0.5], [0, 30]);
  const textY = useTransform(smoothProgress, [0, 0.5], [0, 80]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.3], [0.03, 0.06]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: bgOpacity,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Parallax CloudOrbit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          scale: orbitScale,
          y: orbitY,
          rotateX: orbitRotateX,
          perspective: "1200px",
          willChange: "transform",
        }}
        className="relative z-10 w-65 h-65 md:w-90 md:h-90 mb-8"
      >
        <CloudOrbit
          duration={3}
          size={130}
          images={[{ name: "Profile", url: "/images/profile.jpg" }]}
          className="w-full h-full"
        >
          {orbitingImagesData.map((orbit, index) => (
            <OrbitingImage
              key={index}
              speed={orbit.speed}
              radius={orbitRadius}
              size={orbitSize}
              startAt={orbit.startAt}
              images={orbit.images}
            />
          ))}
        </CloudOrbit>
      </motion.div>

      {/* Name & Title with FadeUpWord */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
          willChange: "transform, opacity",
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <FadeUpWord
          as="h1"
          className="text-5xl md:text-7xl font-bold text-black tracking-tight text-center justify-center"
        >
          Phyo Zin Ko
        </FadeUpWord>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg md:text-xl text-gray-500 text-center max-w-lg"
        >
          I build cool stuff for the web · UI/UX Explorer · Sharing what I learn
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={() =>
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Check My Work
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3.5 border border-gray-300 text-black text-sm font-medium rounded-full hover:border-black transition-all duration-300 hover:scale-105"
          >
            Say Hi
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
