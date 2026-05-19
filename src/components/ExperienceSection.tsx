"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Store, GraduationCap, Video, Sparkles, Laptop, Award, Search, Globe, Palette, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ActivityData { label: string; value: number; color: string; gradientEnd: string; size: number; current: string; target: string; }

const activities: ActivityData[] = [
  { label: "PROJECTS", value: 85, color: "#FF2D55", gradientEnd: "#FF6B8B", size: 180, current: "30+", target: "Shipped" },
  { label: "JOURNEY", value: 60, color: "#A3F900", gradientEnd: "#C5FF4D", size: 140, current: "Since 10", target: "y/o" },
  { label: "DESIGN", value: 45, color: "#04C7DD", gradientEnd: "#4DDFED", size: 100, current: "UI/UX", target: "& GFX" },
];

const CircleProgress = ({ data, index }: { data: ActivityData; index: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const strokeWidth = 14;
  const radius = (data.size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const targetOffset = ((100 - data.value) / 100) * circumference;
  const gradientId = `grad-${data.label.toLowerCase()}`;

  useEffect(() => {
    const circle = svgRef.current?.querySelector(".progress-ring") as SVGCircleElement;
    if (!circle) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(circle, { strokeDashoffset: circumference }, {
        strokeDashoffset: targetOffset, duration: 2, delay: index * 0.3, ease: "power2.inOut",
        scrollTrigger: { trigger: svgRef.current!, start: "top 80%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, [circumference, targetOffset, index]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg ref={svgRef} width={data.size} height={data.size} viewBox={`0 0 ${data.size} ${data.size}`} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: data.color }} />
            <stop offset="100%" style={{ stopColor: data.gradientEnd }} />
          </linearGradient>
        </defs>
        <circle cx={data.size / 2} cy={data.size / 2} r={radius} fill="none" stroke="#f0f0f0" strokeWidth={strokeWidth} />
        <circle className="progress-ring" cx={data.size / 2} cy={data.size / 2} r={radius} fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={circumference} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${data.color}30)` }} />
      </svg>
    </div>
  );
};

interface ExpItem { icon: LucideIcon; title: string; desc: string; accent: string; }

const expItems: ExpItem[] = [
  { icon: Laptop, title: "10 Years with Tech", desc: "Using laptops & computers since age 10", accent: "#FF2D55" },
  { icon: Store, title: "Furniture Shop", desc: "Full-stack: React, Node, Prisma, Redis", accent: "#A3F900" },
  { icon: Sparkles, title: "30+ Projects Shipped", desc: "Landing pages to full-stack apps", accent: "#04C7DD" },
  { icon: Award, title: "ITPEC IP Certificate", desc: "Asia-Pacific IT certification", accent: "#FF2D55" },
  { icon: Globe, title: "Custom Websites", desc: "Solo design to deployment", accent: "#A3F900" },
  { icon: Search, title: "Research & Learning", desc: "Always exploring new tech", accent: "#04C7DD" },
  { icon: Palette, title: "Graphic Design", desc: "Currently studying graphic design", accent: "#FF2D55" },
  { icon: GraduationCap, title: "UI/UX Design", desc: "Design perspective & prototyping", accent: "#A3F900" },
  { icon: Video, title: "AI & Content", desc: "Creating content about AI tools", accent: "#04C7DD" },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!section || !header || !timeline || !line) return;

    const ctx = gsap.context(() => {
      const headingChars = header.querySelectorAll(".exp-heading-char");
      const desc = header.querySelector(".section-desc");
      const headingLine = header.querySelector(".heading-line");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: header, start: "top 75%", toggleActions: "play none none reverse" },
      });
      tl.fromTo(headingLine!, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
      tl.fromTo(headingChars, { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.8, ease: "expo.out" }, 0.2);
      tl.fromTo(desc!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 30%", scrub: 1 },
      });

      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const heading = "EXPERIENCE";

  return (
    <section ref={sectionRef} id="experience" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-12 md:mb-20">
          <div className="flex items-center gap-6 mb-6">
            <div className="heading-line h-[1px] w-16 bg-[#04C7DD] origin-left" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Experience</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-black tracking-tighter overflow-hidden" style={{ perspective: "800px" }}>
            {heading.split("").map((char, i) => (
              <span key={i} className="exp-heading-char inline-block">{char === " " ? "\u00A0" : char}</span>
            ))}
          </h2>
          <p className="section-desc mt-4 md:mt-6 text-gray-500 max-w-xl text-base md:text-lg">20 years old, building since day one</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="shrink-0">
            <div className="flex items-center gap-6">
              <div className="relative w-[130px] h-[130px] md:w-[170px] md:h-[170px]">
                {activities.map((activity, index) => (
                  <CircleProgress key={activity.label} data={activity} index={index} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {activities.map((a) => (
                  <div key={a.label} className="flex flex-col">
                    <span className="text-[10px] font-medium text-gray-400 tracking-wider">{a.label}</span>
                    <span className="text-xl font-semibold" style={{ color: a.color }}>
                      {a.current}<span className="text-xs ml-1 text-gray-400">{a.target}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={timelineRef} className="flex-1 w-full relative">
            <div ref={lineRef} className="absolute left-3 md:left-4 top-0 bottom-0 w-[2px] gradient-line origin-top" style={{ transform: "scaleY(0)" }} />
            <div className="space-y-3 md:space-y-4 pl-9 md:pl-12">
              {expItems.map((item) => (
                <div key={item.title} className="timeline-item relative flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="absolute -left-[1.9rem] md:-left-[2.35rem] top-5 md:top-6 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 bg-white" style={{ borderColor: item.accent }} />
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.accent}10` }}>
                    <item.icon size={18} strokeWidth={1.5} style={{ color: item.accent }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
