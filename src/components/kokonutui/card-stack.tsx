"use client";

/**
 * @author: @dorianbaffier (kokonutui)
 * @description: Card Stack - adapted for experience section
 * @license: MIT
 * @website: https://kokonutui.com
 */

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface ExperienceCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  specs: { label: string; value: string }[];
}

interface CardProps {
  item: ExperienceCardData;
  index: number;
  totalCards: number;
  isExpanded: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const Card = ({
  item,
  index,
  totalCards,
  isExpanded,
  isHovered,
  onHover,
  onLeave,
}: CardProps) => {
  const centerOffset = (totalCards - 1) * 5;

  const defaultX = index * 10 - centerOffset;
  const defaultY = index * 2;
  const defaultRotate = index * 1.5;
  const defaultScale = 1;

  const cardWidth = 320;
  const cardOverlap = 240;
  const totalExpandedWidth =
    cardWidth + (totalCards - 1) * (cardWidth - cardOverlap);
  const expandedCenterOffset = totalExpandedWidth / 2;

  const spreadX =
    index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2;
  const spreadY = 0;
  const spreadRotate = index * 5 - (totalCards - 1) * 2.5;
  const spreadScale = 1;

  const Icon = item.icon;

  const stackedZ = isHovered ? totalCards + 1 : totalCards - index;

  return (
    <motion.div
      animate={{
        x: isExpanded ? spreadX : defaultX,
        y: isExpanded ? spreadY : isHovered ? -30 : defaultY,
        rotate: isExpanded ? spreadRotate : isHovered ? 0 : defaultRotate,
        scale: isExpanded ? spreadScale : isHovered ? 1.05 : defaultScale,
        zIndex: stackedZ,
      }}
      className={cn(
        "absolute inset-0 w-full rounded-2xl p-6",
        "bg-gradient-to-br from-white/60 via-neutral-50/40 to-neutral-100/30",
        "border border-neutral-200/40",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_20px_rgb(0,0,0,0.08)]",
        isHovered && "shadow-[0_16px_50px_rgb(0,0,0,0.15)]",
        "transition-all duration-500 ease-out",
        "transform-gpu overflow-hidden",
      )}
      initial={{
        x: defaultX,
        y: defaultY,
        rotate: defaultRotate,
        scale: defaultScale,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        maxWidth: "320px",
        transformStyle: "preserve-3d",
        perspective: "2000px",
        left: "50%",
        marginLeft: "-160px",
        zIndex: stackedZ,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
      }}
    >
      {/* Inner Card */}
      <div className="absolute inset-1 rounded-xl border border-neutral-200/30 bg-white/60 backdrop-blur-sm" />

      <div className="relative z-10">
        {/* Specs Grid */}
        <dl className="mb-5 grid grid-cols-2 gap-2">
          {item.specs.map((spec) => (
            <div
              className="flex flex-col items-start text-left text-[10px]"
              key={spec.label}
            >
              <dd className="w-full font-medium text-gray-500">{spec.value}</dd>
              <dt className="mb-0.5 w-full text-gray-900">{spec.label}</dt>
            </div>
          ))}
        </dl>

        {/* Icon + Title (replaces image) */}
        <div className="flex items-center gap-4 pt-2 border-t border-neutral-200/30">
          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0">
            <Icon size={22} strokeWidth={1.5} className="text-white" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-left font-bold text-lg text-black tracking-tight leading-tight">
              {item.title}
            </h2>
            <span className="block text-left text-xs text-gray-400">
              {item.subtitle}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CardStackProps {
  items: ExperienceCardData[];
  className?: string;
}

export function CardStack({ items, className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <button
      aria-label="Toggle card stack"
      className={cn(
        "relative mx-auto cursor-pointer",
        "min-h-[300px] w-full max-w-[90vw]",
        "md:max-w-[1200px]",
        "appearance-none border-0 bg-transparent p-0",
        "mb-8 flex items-center justify-center",
        className,
      )}
      onClick={handleToggle}
      type="button"
    >
      {items.map((item, index) => (
        <Card
          index={index}
          isExpanded={isExpanded}
          isHovered={hoveredIndex === index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          key={item.id}
          item={item}
          totalCards={items.length}
        />
      ))}
    </button>
  );
}
