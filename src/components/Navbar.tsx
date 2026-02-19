"use client";

import clsx from "clsx";
import { useState } from "react";

const navItems = {
  "#hero": { name: "home" },
  "#about": { name: "about" },
  "#skills": { name: "skills" },
  "#experience": { name: "exp" },
  "#projects": { name: "projects" },
  "#contact": { name: "contact" },
};

export default function Navbar() {
  const [activePath, setActivePath] = useState("#hero");

  const isActiveLink = (path: string) => {
    return activePath === path;
  };

  const handleClick = (path: string) => {
    setActivePath(path);
    document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 mx-auto w-[calc(100%-1rem)] sm:w-auto max-w-4xl px-1 sm:px-4 py-2">
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(navItems).map(([path, { name }], index, array) => {
            const isActive = isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <button
                className={clsx(
                  "flex items-center justify-center bg-gray-100 p-1 px-2 sm:p-1.5 sm:px-4 text-xs sm:text-sm text-black transition-all duration-300 capitalize",
                  isActive
                    ? "mx-1 sm:mx-2 rounded-xl font-semibold bg-gray-200 text-black"
                    : clsx(
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-r-xl",
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
