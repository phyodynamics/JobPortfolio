"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = {
  "#hero": { name: "home" },
  "#about": { name: "about" },
  "#skills": { name: "skills" },
  "#experience": { name: "exp" },
  "#projects": { name: "projects" },
  "#contact": { name: "contact" },
};

function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveId("#" + visible[0].target.id);
      },
      { rootMargin: `-${offset}px 0px -40% 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => { const el = document.querySelector(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids, offset]);
  return activeId;
}

export default function Navbar() {
  const sectionIds = Object.keys(navItems);
  const activePath = useScrollSpy(sectionIds);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: "back.out(1.7)" });
    let lastScrollY = 0;
    ScrollTrigger.create({
      start: "top top", end: "max",
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY > lastScrollY && scrollY > 200) gsap.to(nav, { y: -80, duration: 0.3, ease: "power2.in" });
        else gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
        lastScrollY = scrollY;
      },
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] mx-auto w-[calc(100%-1rem)] sm:w-auto max-w-4xl px-1 sm:px-4 py-2 opacity-0">
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(navItems).map(([path, { name }], index, array) => {
            const isActive = activePath === path;
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath = index < array.length - 1 ? array[index + 1][0] : null;
            return (
              <button
                className={clsx(
                  "flex items-center justify-center p-1 px-2.5 sm:p-1.5 sm:px-4 text-xs sm:text-sm transition-all duration-300 capitalize focus-visible:outline-black",
                  isActive
                    ? "mx-1 sm:mx-2 rounded-xl font-semibold bg-black text-white"
                    : clsx("text-gray-400 hover:text-black", (activePath === (prevPath || "") || isFirst) && "rounded-l-xl", (activePath === (nextPath || "") || isLast) && "rounded-r-xl"),
                )}
                key={path}
                onClick={() => document.querySelector(path)?.scrollIntoView({ behavior: "smooth" })}
                aria-current={isActive ? "true" : undefined}
              >{name}</button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
