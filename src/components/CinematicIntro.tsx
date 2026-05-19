"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const container = containerRef.current;
    const counter = counterRef.current;
    if (!container || !counter) return;

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Smooth slide-up exit
        gsap.to(container, {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            // Just hide — no React state change, no unmount flash
            container.style.display = "none";
          },
        });
      },
    });

    // Counter — ref-based, zero re-renders
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(counterObj.val)).padStart(3, "0");
      },
    });

    // Name chars
    const nameChars = container.querySelectorAll(".intro-name-char");
    tl.fromTo(
      nameChars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: "power3.out" },
      0.3,
    );

    // Role
    const role = container.querySelector(".intro-role");
    tl.fromTo(role!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 1.2);

    // Progress bar
    const bar = container.querySelector(".intro-bar-fill");
    tl.fromTo(bar!, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0);

    // Brief hold
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const name = "PHYO ZIN KO";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div className="absolute top-8 right-8 text-gray-200 text-sm font-mono">
        <span ref={counterRef}>000</span>
      </div>

      <div className="overflow-hidden">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black">
          {name.split("").map((char, i) => (
            <span key={i} className="intro-name-char inline-block" style={{ willChange: "transform, opacity" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      <p className="intro-role mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 opacity-0">
        Full Stack Developer
      </p>

      <div className="absolute bottom-12 left-8 right-8 h-[1px] bg-gray-100">
        <div className="intro-bar-fill h-full bg-black origin-left" style={{ transform: "scaleX(0)", willChange: "transform" }} />
      </div>
    </div>
  );
}
