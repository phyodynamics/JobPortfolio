"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const skillRows = [
  [
    { name: "React", svg: "/images/tech/react.svg" },
    { name: "Next.js", svg: "/images/tech/nextjs.svg" },
    { name: "TypeScript", svg: "/images/tech/typescript.svg" },
    { name: "Tailwind", svg: "/images/tech/tailwind.svg" },
    { name: "Redux", svg: "/images/tech/redux.svg" },
    { name: "HTML & CSS", svg: "/images/tech/html5.svg" },
  ],
  [
    { name: "Node.js", svg: "/images/tech/nodejs.svg" },
    { name: "Express", svg: "/images/tech/express.svg" },
    { name: "GraphQL", svg: "/images/tech/graphql.svg" },
    { name: "Prisma", svg: "/images/tech/prisma.svg" },
    { name: "JWT Auth", svg: "/images/tech/jwt.svg" },
    { name: "Docker", svg: "/images/tech/docker.svg" },
  ],
  [
    { name: "Git", svg: "/images/tech/git.svg" },
    { name: "Vercel", svg: "/images/tech/vercel.svg" },
    { name: "AI / Gemini", svg: "/images/tech/gemini.svg" },
    { name: "Java", svg: "/images/tech/java.svg" },
    { name: "C++", svg: "/images/tech/cpp.svg" },
    { name: "PHP", svg: "/images/tech/php.svg" },
  ],
];

function SkillPill({ name, svg }: { name: string; svg: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 shrink-0 group">
      <div className="w-6 h-6 flex items-center justify-center">
        <Image src={svg} alt={name} width={20} height={20} className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      const headingChars = header.querySelectorAll(".skill-heading-char");
      const desc = header.querySelector(".section-desc");
      const line = header.querySelector(".heading-line");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: header, start: "top 75%", toggleActions: "play none none reverse" },
      });

      tl.fromTo(line!, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
      tl.fromTo(headingChars, { y: 80, opacity: 0, rotateX: -90 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.8, ease: "expo.out" }, 0.2);
      tl.fromTo(desc!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

      bandRefs.current.forEach((band, i) => {
        if (!band) return;
        const track = band.querySelector(".marquee-track");
        if (!track) return;
        const direction = i % 2 === 0 ? -1 : 1;
        const speed = 20 + i * 5;

        gsap.to(track, { xPercent: direction * -50, repeat: -1, duration: speed, ease: "none" });

        ScrollTrigger.create({
          trigger: band, start: "top bottom", end: "bottom top", scrub: 0.5,
          onUpdate: (self) => {
            gsap.to(band, { skewX: self.getVelocity() * -0.0003, duration: 0.3, ease: "power2.out" });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const heading = "TECH STACK";

  return (
    <section ref={sectionRef} id="skills" className="py-16 md:py-32 bg-gray-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={headerRef} className="mb-12 md:mb-20">
          <div className="flex items-center gap-6 mb-6">
            <div className="heading-line h-[1px] w-16 bg-[#A3F900] origin-left" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Skills</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-black tracking-tighter overflow-hidden" style={{ perspective: "800px" }}>
            {heading.split("").map((char, i) => (
              <span key={i} className="skill-heading-char inline-block">{char === " " ? "\u00A0" : char}</span>
            ))}
          </h2>
          <p className="section-desc mt-4 md:mt-6 text-gray-500 max-w-xl text-base md:text-lg">Technologies I work with on a daily basis</p>
        </div>
      </div>

      <div className="space-y-4">
        {skillRows.map((row, i) => (
          <div key={i} ref={(el) => { bandRefs.current[i] = el; }} className="overflow-hidden py-2">
            <div className="marquee-track flex gap-3 md:gap-4">
              {[...row, ...row, ...row, ...row].map((skill, j) => (
                <SkillPill key={`${skill.name}-${j}`} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
