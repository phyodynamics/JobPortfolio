"use client";

import { motion } from "motion/react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";
import {
  Store,
  GraduationCap,
  Video,
  Sparkles,
  Laptop,
  Award,
  Search,
  Globe,
  Palette,
  type LucideIcon,
} from "lucide-react";

/* ── Activity rings data ── */

interface ActivityData {
  label: string;
  value: number;
  color: string;
  gradientEnd: string;
  size: number;
  current: string;
  target: string;
  unit: string;
}

const activities: ActivityData[] = [
  {
    label: "PROJECTS",
    value: 85,
    color: "#FF2D55",
    gradientEnd: "#FF6B8B",
    size: 200,
    current: "30+",
    target: "Shipped",
    unit: "APPS",
  },
  {
    label: "TECH YEARS",
    value: 60,
    color: "#A3F900",
    gradientEnd: "#C5FF4D",
    size: 160,
    current: "10",
    target: "Years",
    unit: "WITH TECH",
  },
  {
    label: "DESIGN",
    value: 45,
    color: "#04C7DD",
    gradientEnd: "#4DDFED",
    size: 120,
    current: "UI/UX",
    target: "& GFX",
    unit: "SKILLS",
  },
];

/* ── Circle progress ring ── */

const CircleProgress = ({
  data,
  index,
}: {
  data: ActivityData;
  index: number;
}) => {
  const strokeWidth = 16;
  const radius = (data.size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - data.value) / 100) * circumference;
  const gradientId = `gradient-${data.label.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
    >
      <div className="relative">
        <svg
          width={data.size}
          height={data.size}
          viewBox={`0 0 ${data.size} ${data.size}`}
          className="transform -rotate-90"
          aria-label={`${data.label} - ${data.value}%`}
        >
          <title>{`${data.label} - ${data.value}%`}</title>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: data.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: data.gradientEnd, stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle
            cx={data.size / 2}
            cy={data.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-zinc-200/50"
          />
          <motion.circle
            cx={data.size / 2}
            cy={data.size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: progress }}
            viewport={{ once: true }}
            transition={{
              duration: 1.8,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

/* ── Detailed stats beside rings ── */

const DetailedInfo = () => (
  <motion.div
    className="flex flex-col gap-5 ml-8"
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    {activities.map((a) => (
      <div key={a.label} className="flex flex-col">
        <span className="text-xs font-medium text-zinc-500 tracking-wider">
          {a.label}
        </span>
        <span className="text-2xl font-semibold" style={{ color: a.color }}>
          {a.current}
          <span className="text-sm ml-1 text-zinc-500">{a.target}</span>
        </span>
      </div>
    ))}
  </motion.div>
);

/* ── Experience list items ── */

interface ExpItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const expItems: ExpItem[] = [
  {
    icon: Laptop,
    title: "10 Years with Tech",
    desc: "Using laptops & computers since age 10",
  },
  {
    icon: Store,
    title: "Furniture Shop",
    desc: "Full-stack: React, Node, Prisma, Redis",
  },
  {
    icon: Sparkles,
    title: "30+ Projects Shipped",
    desc: "Landing pages to full-stack apps",
  },
  {
    icon: Award,
    title: "ITPEC IP Certificate",
    desc: "Asia-Pacific IT certification",
  },
  { icon: Globe, title: "Custom Websites", desc: "Solo design to deployment" },
  {
    icon: Search,
    title: "Research & Learning",
    desc: "Always exploring new tech",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Attended graphic design class",
  },
  {
    icon: GraduationCap,
    title: "UI/UX Studies",
    desc: "Design perspective & prototyping",
  },
  {
    icon: Video,
    title: "AI & Content",
    desc: "Creating content about AI tools",
  },
];

/* ── Main section ── */

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation variant="flip">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Experience
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              What I&apos;ve Been Up To
            </FadeUpWord>
            <p className="mt-4 text-gray-500 max-w-md mx-auto">
              20 years old, building since day one
            </p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
          {/* Activity Rings */}
          <div className="shrink-0">
            <div className="flex items-center">
              <div className="relative w-[180px] h-[180px]">
                {activities.map((activity, index) => (
                  <CircleProgress
                    key={activity.label}
                    data={activity}
                    index={index}
                  />
                ))}
              </div>
              <DetailedInfo />
            </div>
          </div>

          {/* Experience list */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center shrink-0">
                    <item.icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-black truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
