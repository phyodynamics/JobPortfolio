"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { FileDown } from "lucide-react";

export default function FloatingResume() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    gsap.fromTo(btnRef.current!, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, delay: 4, duration: 0.8, ease: "back.out(2)" });
  }, []);
  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.4, y: (e.clientY - rect.top - rect.height / 2) * 0.4, scale: 1.1, duration: 0.3, ease: "power2.out" });
  }, []);
  const handleMouseLeave = useCallback(() => { gsap.to(btnRef.current!, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" }); }, []);

  return (
    <a ref={btnRef} href="/images/Phyo%20Zin%20Ko%20Resume.pdf" download aria-label="Download Resume"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-3 py-3 sm:px-5 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 font-medium opacity-0"
      style={{ willChange: "transform" }}>
      <FileDown size={18} /><span className="hidden sm:inline text-sm">Resume</span>
    </a>
  );
}
