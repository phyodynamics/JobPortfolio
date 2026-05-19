"use client";

import { useRef, useEffect, useState, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconX } from "@tabler/icons-react";
import { useLenis } from "@/components/SmoothScroll";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ProjectContent({ description, tech, features, liveUrl, repoUrl, badge }: {
  description: string; tech: string[]; features: string[]; liveUrl?: string; repoUrl?: string; badge?: string;
}) {
  return (
    <div className="space-y-5">
      {badge && <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase">{badge}</span>}
      <p className="text-gray-500 text-base leading-relaxed">{description}</p>
      {features.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-black">Key Features</p>
          <ul className="space-y-1.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF2D55] shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-black">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">{t}</span>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-[#FF2D55] transition-colors">
            <ArrowUpRight size={16} />Live Demo
          </a>
        )}
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:border-black hover:text-black transition-colors">Source Code</a>
        )}
      </div>
    </div>
  );
}

const projects = [
  {
    category: "EdTech · AI Platform", title: "Wisdom Academy",
    src: "/images/ThumbNail/WisdomAcademy.png", screenshot: "/images/Screenshot/WisdomAcademy.png", accent: "#FF2D55",
    content: <ProjectContent description="A comprehensive EdTech platform for Myanmar Grade 12 students with gamified learning, personalized AI tutors, and collaborative team system." tech={["TypeScript", "Next.js", "PostgreSQL", "AI Tutor API", "WebRTC", "Gamification"]} features={["Virtual learning environments with seat selection", "AI-generated dynamic practice assessments", "Custom AI Tutors personalized via onboarding", "Gamified progress tracking with leveling", "Team structures with group chat and calling", "Teacher accounts with student tracking"]} badge="In Development" />,
  },
  {
    category: "Full Stack · Self-Coded", title: "Furniture E-Commerce",
    src: "/images/ThumbNail/FurnitureShop.png", screenshot: "/images/Screenshot/Furniture.png", accent: "#A3F900",
    content: <ProjectContent description="Full-stack e-commerce built from scratch — no AI. System architecture, Prisma ORM, JWT auth with Express.js." tech={["TypeScript", "React", "Shadcn UI", "Express", "Prisma", "PostgreSQL", "JWT Auth", "Zod"]} features={["Database schema & relational modeling", "JWT authentication & role-based access", "REST API with Express & Zod", "Route-level protection", "Responsive Shadcn UI"]} badge="Built from scratch" repoUrl="https://github.com/phyodynamics/furniture-fullstack" />,
  },
  {
    category: "AI · 400+ Users", title: "Zen Writer",
    src: "/images/ThumbNail/ZenWriter.png", screenshot: "/images/Screenshot/ZenWriter.PNG", accent: "#04C7DD",
    content: <ProjectContent description="Burmese AI content writer with 400+ users. 4 content modes + Lab mode for AI A/B testing." tech={["TypeScript", "Next.js", "Gemini AI", "JWT Auth", "PostgreSQL", "Admin Panel"]} features={["Multi-mode AI content generation", "Lab mode for A/B testing", "Auth & admin dashboard", "400+ active users", "Production on Vercel"]} liveUrl="https://www.zenwriter.online/" />,
  },
  {
    category: "AI · Voice · API", title: "Pyaw Kyi",
    src: "/images/ThumbNail/PyawKyi.png", screenshot: "/images/Screenshot/PyawKyi.PNG", accent: "#FF2D55",
    content: <ProjectContent description="Voice-powered AI with 5 modes. Public API platform, Google OAuth, web push notifications." tech={["TypeScript", "Next.js", "Google OAuth", "Speech-to-Text", "REST API", "Web Push"]} features={["5-mode voice pipeline", "Build mode generates mini apps", "Public API with key generation", "Google OAuth & sessions", "Waitlist & web push"]} liveUrl="https://pyawkyi.phyozinko.com/" />,
  },
  {
    category: "Productivity · AI", title: "NuFlow OS",
    src: "/images/ThumbNail/NuFlowOs.png", screenshot: "/images/Screenshot/NuFlowOs.PNG", accent: "#A3F900",
    content: <ProjectContent description="Productivity life system with Notion API. 5-section system with AI chatbot." tech={["TypeScript", "Next.js", "Notion API", "Speech-to-Text", "AI Chatbot", "Admin Panel"]} features={["5-section productivity system", "Notion API database layer", "AI chatbot for data queries", "Voice-to-text integration", "Progress tracking & CRUD"]} liveUrl="https://nuflowos.com/" />,
  },
  {
    category: "E-Commerce · AI", title: "Vora",
    src: "/images/ThumbNail/Vora.png", screenshot: "/images/Screenshot/Vora.PNG", accent: "#04C7DD",
    content: <ProjectContent description="E-commerce with auth, order management, currency conversion, and AI chatbot." tech={["TypeScript", "Next.js", "AI Chatbot", "JWT Auth", "PostgreSQL", "Admin Panel"]} features={["Order management & tracking", "AI chatbot for products", "Currency conversion", "JWT auth", "Full admin panel"]} liveUrl="https://www.vora.asia/" />,
  },
];

/* ── Full-screen Horizontal Scroll Card ── */

function HorizontalProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen: (i: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Parallax image within card
    gsap.to(img, { x: x * 30, y: y * 20, scale: 1.08, duration: 0.6, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(imgRef.current!, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "power2.out" });
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-hcard flex-shrink-0 w-[80vw] md:w-[45vw] h-[50vh] md:h-[70vh] relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
      onClick={() => onOpen(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image with parallax */}
      <img
        ref={imgRef}
        src={project.src}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="project-overlay absolute inset-0 z-10" />

      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: project.accent }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-12 z-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
          <p className="text-xs tracking-[0.2em] uppercase text-white/60">{project.category}</p>
        </div>
        <h3 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-3 md:mb-4">{project.title}</h3>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-sm text-white/70">View Details</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
            <ArrowUpRight size={14} className="text-white group-hover:text-black transition-colors" />
          </div>
        </div>
      </div>

      {/* Index */}
      <div className="absolute top-8 right-8 z-20">
        <span className="text-6xl md:text-8xl font-bold text-white/5">0{index + 1}</span>
      </div>
    </div>
  );
}

/* ── Modal ── */
function ProjectModal({ card, onClose }: { card: (typeof projects)[number]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current!, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(contentRef.current!, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 0.1);
    function onKeyDown(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current!, { opacity: 0, y: 40, scale: 0.95, duration: 0.3, ease: "power2.in" });
    tl.to(overlayRef.current!, { opacity: 0, duration: 0.2 }, 0.1);
  };

  return (
    <div className="fixed inset-0 z-[9999] h-screen overflow-auto" data-lenis-prevent>
      <div ref={overlayRef} className="fixed inset-0 bg-black/60 backdrop-blur-xl opacity-0" onClick={handleClose} />
      <div ref={contentRef} className="relative z-[60] mx-auto my-10 max-w-5xl rounded-3xl bg-white border border-gray-100 shadow-2xl p-4 md:p-10 opacity-0">
        <button className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black" onClick={handleClose}>
          <IconX className="h-5 w-5 text-white" />
        </button>
        <p className="text-sm font-medium text-gray-400">{card.category}</p>
        <p className="mt-4 text-2xl font-bold text-black md:text-5xl">{card.title}</p>
        {card.screenshot && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
            <img src={card.screenshot} alt={`${card.title} screenshot`} className="w-full h-auto object-cover" loading="lazy" />
          </div>
        )}
        <div className="py-10">{card.content}</div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (openIndex !== null) { document.body.style.overflow = "hidden"; lenis?.stop(); }
    else { document.body.style.overflow = "auto"; lenis?.start(); }
  }, [openIndex, lenis]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !header || !track || !container) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Header animation
      const headingChars = header.querySelectorAll(".proj-heading-char");
      const desc = header.querySelector(".section-desc");
      const line = header.querySelector(".heading-line");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: header, start: "top 75%", toggleActions: "play none none reverse" },
      });
      tl.fromTo(line!, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
      tl.fromTo(headingChars, { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.8, ease: "expo.out" }, 0.2);
      tl.fromTo(desc!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

      if (isDesktop) {
        // Desktop: horizontal scroll pinning
        const totalWidth = track.scrollWidth - container.clientWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 15%",
            end: () => `+=${totalWidth * 1.3}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // Mobile: simple vertical stagger
        const cards = section.querySelectorAll(".project-vcard");
        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
            },
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const heading = "PROJECTS";

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-16 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="mb-10 md:mb-16">
            <div className="flex items-center gap-6 mb-6">
              <div className="heading-line h-[1px] w-16 bg-[#FF2D55] origin-left" />
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-black tracking-tighter overflow-hidden" style={{ perspective: "800px" }}>
              {heading.split("").map((char, i) => (
                <span key={i} className="proj-heading-char inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </h2>
            <p className="section-desc mt-4 md:mt-6 text-gray-500 max-w-xl text-base md:text-lg">
              Click to see details
            </p>
          </div>
        </div>

        {/* Desktop: Horizontal scroll */}
        <div ref={containerRef} className="hidden md:block overflow-hidden">
          <div ref={trackRef} className="flex gap-6 pl-6" style={{ perspective: "1200px" }}>
            {projects.map((project, i) => (
              <HorizontalProjectCard key={project.title} project={project} index={i} onOpen={setOpenIndex} />
            ))}
            <div className="flex-shrink-0 w-[10vw]" />
          </div>
        </div>

        {/* Mobile: Vertical cards */}
        <div className="md:hidden space-y-4">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-vcard relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "16/10" }}
              onClick={() => setOpenIndex(i)}
            >
              <img src={project.src} alt={project.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="project-overlay absolute inset-0 z-10" />
              <div className="absolute top-0 left-0 right-0 h-[2px] z-30" style={{ background: project.accent }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/60">{project.category}</p>
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {openIndex !== null && (
        <ProjectModal card={projects[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}

