"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardStackProps {
  children: React.ReactNode;
  className?: string;
}

export function CardStack({ children, className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-[450px] overflow-y-auto scrollbar-hide rounded-2xl"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)",
            }}
          >
            <div className="flex flex-col gap-3 py-6">
              {childrenArray.map((child, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.03,
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="stacked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative"
            style={{
              height: `${80 + Math.min(childrenArray.length - 1, 3) * 12 + 16}px`,
            }}
          >
            {childrenArray.map((child, i) => {
              const reverseIndex = childrenArray.length - 1 - i;
              const isVisible = reverseIndex < 4;

              return (
                <motion.div
                  key={i}
                  animate={{
                    y: reverseIndex * 10,
                    scale: 1 - reverseIndex * 0.035,
                    opacity: isVisible ? 1 - reverseIndex * 0.2 : 0,
                    zIndex: childrenArray.length - reverseIndex,
                  }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{ transformOrigin: "top center" }}
                >
                  {child}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
