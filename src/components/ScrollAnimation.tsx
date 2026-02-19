"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "tiltLeft" | "tiltRight" | "zoom" | "flip" | "slide";
}

function useSmooth(value: ReturnType<typeof useTransform<number, number>>) {
  return useSpring(value, { stiffness: 80, damping: 40, mass: 0.8 });
}

export default function ScrollAnimation({
  children,
  className = "",
  variant = "rise",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Gentle fade – no harsh pop-in/out
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const opacity = useSmooth(rawOpacity);

  // --- All hooks called unconditionally (React rules) ---

  // rise – gentle vertical slide
  const riseY = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]),
  );
  const riseScale = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]),
  );

  // tiltLeft – subtle horizontal drift
  const tiltLeftX = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-30, 0, 0, 30]),
  );
  const tiltLeftRotateY = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [4, 0, 0, -4]),
  );

  // tiltRight
  const tiltRightX = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]),
  );
  const tiltRightRotateY = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-4, 0, 0, 4]),
  );

  // zoom – gentle scale
  const zoomScale = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]),
  );
  const zoomY = useSmooth(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]),
  );

  // flip – very mild rotation
  const flipRotateX = useSmooth(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [6, 0, 0, -6]),
  );
  const flipY = useSmooth(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [30, 0, 0, -30]),
  );
  const flipScale = useSmooth(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.96]),
  );

  // slide – gentle horizontal
  const slideX = useSmooth(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-50, 0, 0, 50]),
  );
  const slideScale = useSmooth(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.96]),
  );

  const styleMap: Record<string, Record<string, unknown>> = {
    rise: { y: riseY, scale: riseScale },
    tiltLeft: { x: tiltLeftX, rotateY: tiltLeftRotateY },
    tiltRight: { x: tiltRightX, rotateY: tiltRightRotateY },
    zoom: { scale: zoomScale, y: zoomY },
    flip: { rotateX: flipRotateX, y: flipY, scale: flipScale },
    slide: { x: slideX, scale: slideScale },
  };

  const animValues = styleMap[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1200px", perspectiveOrigin: "center" }}
    >
      <motion.div
        style={{
          opacity,
          ...animValues,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
