"use client";

import clsx from "clsx";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = {
  "#hero": { name: "home" },
  "#about": { name: "about" },
  "#skills": { name: "skills" },
  "#experience": { name: "experience" },
  "#projects": { name: "projects" },
  "#contact": { name: "contact" },
};

export default function Navbar() {
  const [activePath, setActivePath] = useState("#hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActiveLink = (path: string) => {
    return activePath === path;
  };

  const handleClick = (path: string) => {
    setActivePath(path);
    setMobileOpen(false);
    document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 mx-auto w-[calc(100%-2rem)] max-w-4xl px-2 sm:px-4 py-2">
      <div className="flex items-center justify-center">
        {/* Desktop nav */}
        <div className="glass hidden lg:flex items-center justify-between overflow-hidden rounded-xl">
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
                  "flex items-center justify-center bg-gray-100 p-1.5 px-4 text-sm text-black transition-all duration-300",
                  isActive
                    ? "mx-2 rounded-xl font-semibold bg-gray-200 text-black"
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

        {/* Mobile hamburger button */}
        <div className="lg:hidden glass rounded-xl">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center justify-center w-10 h-10 text-black"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden mt-2 glass rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = isActiveLink(path);
                return (
                  <button
                    key={path}
                    onClick={() => handleClick(path)}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-xl text-sm capitalize transition-all duration-200",
                      isActive
                        ? "bg-gray-200 font-semibold text-black"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black",
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
