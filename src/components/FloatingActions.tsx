"use client";

import { useRef, useEffect, useState, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { FileDown, ArrowUp, X, Home, User, Wrench, Briefcase, FolderOpen, MessageCircle } from "lucide-react";

const sections = [
  { id: "#hero", label: "Home", icon: Home },
  { id: "#about", label: "About", icon: User },
  { id: "#skills", label: "Skills", icon: Wrench },
  { id: "#experience", label: "Experience", icon: Briefcase },
  { id: "#projects", label: "Projects", icon: FolderOpen },
  { id: "#contact", label: "Contact", icon: MessageCircle },
];

export default function FloatingActions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);
  const navBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 });
    tl.fromTo(containerRef.current!, { opacity: 0, y: 40, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(2)" });
  }, []);

  // Menu open/close animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (open) {
      menu.style.display = "flex";
      const items = menu.querySelectorAll(".nav-item");
      gsap.fromTo(menu, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" });
      gsap.fromTo(items, { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.04, duration: 0.3, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.to(menu, {
        opacity: 0, y: 10, scale: 0.95, duration: 0.2, ease: "power2.in",
        onComplete: () => { menu.style.display = "none"; },
      });
    }
  }, [open]);

  const navigateTo = useCallback((id: string) => {
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Resume magnetic
  const handleResumeMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const btn = resumeRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);
  const handleResumeLeave = useCallback(() => {
    gsap.to(resumeRef.current!, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <>
      {/* Floating action bar */}
      <div ref={containerRef} className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 opacity-0">
        {/* Navigate button */}
        <button
          ref={navBtnRef}
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
          aria-label="Navigate to section"
        >
          {open ? <X size={18} /> : <ArrowUp size={18} />}
        </button>

        {/* Resume button */}
        <a
          ref={resumeRef}
          href="/images/Phyo%20Zin%20Ko%20Resume.pdf"
          download
          aria-label="Download Resume"
          onMouseMove={handleResumeMove}
          onMouseLeave={handleResumeLeave}
          className="flex items-center gap-2 bg-black text-white px-3 py-3 sm:px-5 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 font-medium"
          style={{ willChange: "transform" }}
        >
          <FileDown size={18} />
          <span className="hidden sm:inline text-sm">Resume</span>
        </a>
      </div>

      {/* Section picker popup */}
      <div
        ref={menuRef}
        className="fixed bottom-[5.5rem] right-4 md:right-6 z-50 flex-col gap-1 p-2 rounded-2xl bg-white border border-gray-100 shadow-2xl"
        style={{ display: "none" }}
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigateTo(id)}
            className="nav-item flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 transition-all duration-200"
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
