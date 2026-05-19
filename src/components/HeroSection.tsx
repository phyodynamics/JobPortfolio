"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const marqueeTopRef = useRef<HTMLDivElement>(null);
  const marqueeBotRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileImgRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  // Magnetic profile: follows cursor gently
  const handleProfileMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = profileRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    gsap.to(el, { x, y, rotateY: x * 0.5, rotateX: -y * 0.5, duration: 0.6, ease: "power2.out" });
  }, []);

  const handleProfileLeave = useCallback(() => {
    gsap.to(profileRef.current!, { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 1, ease: "elastic.out(1, 0.4)" });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 2.8,
      });

      // Name chars cascade with 3D flip
      const nameChars = section.querySelectorAll(".hero-name-char");
      tl.fromTo(
        nameChars,
        { y: 120, rotateX: -90, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, stagger: 0.035, duration: 1.2 },
        0,
      );

      // Role line + chars
      const roleLine = section.querySelector(".role-line");
      tl.fromTo(roleLine!, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.5);
      const roleChars = section.querySelectorAll(".role-char");
      tl.fromTo(roleChars, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, duration: 0.6 }, 0.7);

      // Profile circle: scale + bounce in
      tl.fromTo(
        profileRef.current!,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.5)" },
        0.3,
      );

      // Accent ring: rotate in
      if (ringRef.current) {
        tl.fromTo(
          ringRef.current,
          { scale: 0.6, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "power3.out" },
          0.5,
        );
        // Continuous slow spin
        gsap.to(ringRef.current, { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      }

      // Stats counter animation
      const statValues = section.querySelectorAll(".stat-value");
      statValues.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };
        tl.to(obj, {
          val: target, duration: 1.5, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        }, 0.8);
      });

      const statItems = section.querySelectorAll(".stat-item");
      tl.fromTo(statItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 0.8);

      // Buttons stagger
      if (btnsRef.current) {
        const btns = btnsRef.current.querySelectorAll("button");
        tl.fromTo(btns, { opacity: 0, y: 25, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7 }, 1.0);
      }

      // Marquee bands
      gsap.to(marqueeTopRef.current!.querySelector(".marquee-track")!, {
        xPercent: -50, repeat: -1, duration: 30, ease: "none",
      });
      gsap.to(marqueeBotRef.current!.querySelector(".marquee-track")!, {
        xPercent: -50, repeat: -1, duration: 25, ease: "none",
      });

      // Scroll-driven parallax
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(nameRef.current!, { y: p * 200, opacity: 1 - p * 2.5 });
          gsap.set(roleRef.current!, { y: p * 150, opacity: 1 - p * 3 });
          gsap.set(profileRef.current!, { y: p * -80, scale: 1 + p * 0.05 });
          gsap.set(statsRef.current!, { y: p * 100, opacity: 1 - p * 2 });
          if (btnsRef.current) gsap.set(btnsRef.current, { y: p * 80, opacity: 1 - p * 2 });
          gsap.set(marqueeTopRef.current!, { skewX: p * -3 });
          gsap.set(marqueeBotRef.current!, { skewX: p * 3 });
          gsap.set(scrollLineRef.current!, { scaleY: 1 - p * 2 });
        },
      });

      // Scroll indicator pulse
      gsap.fromTo(
        scrollLineRef.current!,
        { opacity: 0 },
        { opacity: 1, delay: 4, duration: 0.6 },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const name = "PHYO ZIN KO";
  const role = "FULL STACK DEVELOPER";
  const marqueeText = "REACT · NEXT.JS · NODE.JS · TYPESCRIPT · PRISMA · AI · GRAPHQL · AWS · DOCKER · ";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#FF2D55]/[0.04] blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#04C7DD]/[0.04] blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A3F900]/[0.02] blur-[150px]" />

      {/* Top marquee */}
      <div ref={marqueeTopRef} className="absolute top-[12%] left-0 w-full overflow-hidden opacity-[0.03]">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[10rem] font-bold tracking-tighter text-black whitespace-nowrap mx-4">{marqueeText}</span>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div ref={marqueeBotRef} className="absolute bottom-[12%] left-0 w-full overflow-hidden opacity-[0.02]">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8rem] font-bold tracking-tighter text-black whitespace-nowrap mx-4">{marqueeText}</span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1
              ref={nameRef}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-black"
              style={{ perspective: "1000px" }}
            >
              {name.split("").map((char, i) => (
                <span key={i} className="hero-name-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <div ref={roleRef} className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="role-line h-[1px] w-12 bg-gray-300 origin-left" />
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400">
                {role.split("").map((char, i) => (
                  <span key={i} className="role-char inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
              </p>
            </div>

            <div ref={statsRef} className="mt-12 flex gap-10 justify-center lg:justify-start">
              <div className="stat-item">
                <div className="stat-value text-3xl md:text-4xl font-bold text-black" data-target="30" data-suffix="+">0</div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-value text-3xl md:text-4xl font-bold text-black" data-target="10" data-suffix="+">0</div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Years Tech</div>
              </div>
              <div className="stat-item">
                <div className="stat-value text-3xl md:text-4xl font-bold text-[#FF2D55]" data-target="400" data-suffix="+">0</div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Users</div>
              </div>
            </div>

            <div ref={btnsRef} className="mt-12 flex gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-8 py-4 bg-black text-white text-sm font-semibold rounded-full overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-[#FF2D55] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="absolute inset-0 flex items-center justify-center text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 font-semibold text-sm">View Projects</span>
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-black hover:text-black transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right: Circle Profile — NO grayscale, bright */}
          <div
            className="flex-shrink-0 relative"
            onMouseMove={handleProfileMove}
            onMouseLeave={handleProfileLeave}
            style={{ perspective: "800px" }}
          >
            {/* Rotating accent ring */}
            <div ref={ringRef} className="absolute -inset-5 opacity-0">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <defs>
                  <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.6" />
                    <stop offset="33%" stopColor="#A3F900" stopOpacity="0.4" />
                    <stop offset="66%" stopColor="#04C7DD" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF2D55" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="145" fill="none" stroke="url(#ring-grad)" strokeWidth="1.5" strokeDasharray="8 12" />
              </svg>
            </div>
            {/* Accent dots */}
            <div ref={ringRef} className="absolute -inset-5 opacity-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-[#FF2D55] shadow-[0_0_10px_rgba(255,45,85,0.5)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2.5 h-2.5 rounded-full bg-[#A3F900] shadow-[0_0_10px_rgba(163,249,0,0.5)]" />
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#04C7DD] shadow-[0_0_10px_rgba(4,199,221,0.5)]" />
              <div className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF2D55]/50" />
            </div>

            <div
              ref={profileRef}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] opacity-0"
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <img
                ref={profileImgRef}
                src="/images/pzk.jpg"
                alt="Phyo Zin Ko"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div ref={scrollLineRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 origin-top opacity-0">
        <div className="w-full h-full bg-gradient-to-b from-black/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
