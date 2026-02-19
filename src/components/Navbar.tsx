"use client";

import clsx from "clsx";
import { useEffect, useState, useCallback, useSyncExternalStore } from "react";

const navItems = [
  { path: "#hero", name: "home" },
  { path: "#about", name: "about" },
  { path: "#skills", name: "skills" },
  { path: "#experience", name: "exp" },
  { path: "#projects", name: "projects" },
  { path: "#contact", name: "contact" },
];

function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId("#" + visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

function useIsScrolled(threshold = 10) {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, []);
  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  );
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Navbar() {
  const sectionIds = navItems.map((item) => item.path);
  const activePath = useScrollSpy(sectionIds);
  const isScrolled = useIsScrolled();

  const handleClick = (path: string) => {
    document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={clsx(
        "fixed top-4 left-1/2 -translate-x-1/2 z-9999 mx-auto w-[calc(100%-1rem)] sm:w-auto max-w-4xl px-1 sm:px-4 py-2 transition-all duration-500",
      )}
    >
      <div className="flex items-center justify-center">
        <div
          className={clsx(
            "flex items-center justify-between overflow-hidden rounded-2xl transition-all duration-500 shadow-lg",
            isScrolled
              ? "bg-black/90 backdrop-blur-xl"
              : "bg-black/80 backdrop-blur-md",
          )}
        >
          {navItems.map(({ path, name }, index, array) => {
            const isActive = activePath === path;
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevActive =
              index > 0 && activePath === array[index - 1].path;
            const nextActive =
              index < array.length - 1 && activePath === array[index + 1].path;

            return (
              <button
                className={clsx(
                  "flex items-center justify-center p-1.5 px-2.5 sm:p-2 sm:px-4 text-xs sm:text-sm transition-all duration-300 capitalize",
                  isActive
                    ? "mx-1 sm:mx-1.5 rounded-xl font-semibold bg-white text-black"
                    : clsx(
                        "text-gray-300 hover:text-white",
                        (prevActive || isFirst) && "rounded-l-xl",
                        (nextActive || isLast) && "rounded-r-xl",
                      ),
                )}
                key={path}
                onClick={() => handleClick(path)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
