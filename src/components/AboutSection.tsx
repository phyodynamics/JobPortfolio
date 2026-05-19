"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Bot, Sparkles, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Developer",
    desc: "I build complete web apps from scratch using React, Node, and whatever else gets the job done.",
    accent: "#FF2D55",
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    desc: "I design clean, user-centric interfaces. Currently expanding into graphic design to sharpen my visual craft.",
    accent: "#A3F900",
  },
  {
    icon: Bot,
    title: "Agency Founder",
    desc: "Running Phyodynamics Academy (vibe coding education) and Dev Base Studio (web/webapp service agency).",
    accent: "#04C7DD",
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Architect",
    desc: "I design system architectures, databases, and security layers — then leverage AI tools to accelerate development.",
    accent: "#FF2D55",
  },
];

function TiltCard({
  icon: Icon,
  title,
  desc,
  accent,
  index,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 0.4,
        ease: "power2.out",
      });

      const glow = card.querySelector(".card-glow") as HTMLElement;
      if (glow) {
        gsap.to(glow, {
          x: x * 80 + "%",
          y: y * 80 + "%",
          opacity: 0.15,
          duration: 0.4,
        });
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="about-card group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden"
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
    >
      <div
        className="card-glow absolute w-60 h-60 rounded-full opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: `${accent}10`,
            transform: "translateZ(30px)",
          }}
        >
          <Icon size={22} strokeWidth={1.5} style={{ color: accent }} />
        </div>
        <h3
          className="text-lg font-semibold text-black mb-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-gray-500 leading-relaxed"
          style={{ transform: "translateZ(10px)" }}
        >
          {desc}
        </p>
      </div>
      {/* Index number */}
      <span className="absolute top-6 right-6 text-[10px] font-mono text-gray-300">
        0{index + 1}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      const headingChars = header.querySelectorAll(".about-heading-char");
      const desc = header.querySelector(".section-desc");
      const line = header.querySelector(".heading-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(line!, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
      tl.fromTo(
        headingChars,
        { y: 80, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.8, ease: "expo.out" },
        0.2,
      );
      tl.fromTo(desc!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

      const cardEls = cards.querySelectorAll(".about-card");
      cardEls.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const heading = "WHO I AM";

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-12 md:mb-20">
          <div className="flex items-center gap-6 mb-6">
            <div className="heading-line h-[1px] w-16 bg-[#FF2D55] origin-left" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400">About</span>
          </div>
          <h2
            className="text-4xl md:text-7xl font-bold text-black tracking-tighter overflow-hidden"
            style={{ perspective: "800px" }}
          >
            {heading.split("").map((char, i) => (
              <span key={i} className="about-heading-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="section-desc mt-4 md:mt-6 text-gray-500 max-w-xl text-base md:text-lg leading-relaxed">
            A developer who architects and builds full-stack systems from the
            ground up. Running two agencies — Phyodynamics Academy &amp; Dev Base Studio — while shipping 30+ production-ready projects.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <TiltCard key={item.title} icon={item.icon} title={item.title} desc={item.desc} accent={item.accent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
