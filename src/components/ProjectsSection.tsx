"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

function ProjectContent({
  description,
  tech,
  features,
  liveUrl,
  repoUrl,
  badge,
}: {
  description: string;
  tech: string[];
  features: string[];
  liveUrl?: string;
  repoUrl?: string;
  badge?: string;
}) {
  return (
    <div className="space-y-5">
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase">
          {badge}
        </span>
      )}
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>

      {features.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-800">Key Features</p>
          <ul className="space-y-1.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-800">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source Code
          </a>
        )}
      </div>
    </div>
  );
}

const projects = [
  {
    category: "EdTech · AI Platform (In Development)",
    title: "Wisdom Academy",
    src: "/images/ThumbNail/WisdomAcademy.png",
    screenshot: "/images/Screenshot/WisdomAcademy.png",
    content: (
      <ProjectContent
        description="A comprehensive EdTech platform I am building for Myanmar Grade 12 students. I architected a gamified deep-focus learning environment with personalized AI tutors, interactive subject-based tools, and a collaborative team learning system for students and teachers."
        tech={[
          "TypeScript",
          "Next.js",
          "PostgreSQL",
          "AI Tutor API",
          "WebRTC",
          "Gamification",
        ]}
        features={[
          "Virtual learning environments with seat selection for deep focus",
          "AI-generated dynamic practice assessments (MCQs, fill-in-the-blanks, definitions)",
          "Custom AI Tutors personalized via student onboarding questionnaires",
          "Rich gamified progress tracking with leveling algorithms",
          "Team structures (up to 10 students) with group chat and calling capabilities",
          "Teacher accounts featuring unlimited student tracking and AI tutor integrations",
        ]}
        badge="In Development"
      />
    ),
  },
  {
    category: "Full Stack · Self-Coded",
    title: "Furniture E-Commerce",
    src: "/images/ThumbNail/FurnitureShop.png",
    screenshot: "/images/Screenshot/Furniture.png",
    content: (
      <ProjectContent
        description="A full-stack e-commerce furniture store built entirely from scratch — no AI assistance. I personally designed the system architecture, database schema with Prisma ORM, and implemented secure authentication (JWT-based login, register, password change) with Express.js. Features role-based route protection, input validation with Zod, and a polished Shadcn UI frontend."
        tech={[
          "TypeScript",
          "React",
          "Shadcn UI",
          "Express",
          "Prisma",
          "PostgreSQL",
          "JWT Auth",
          "Zod",
        ]}
        features={[
          "Designed database schema & relational data modeling with Prisma",
          "Implemented JWT authentication & role-based access control",
          "Built secure REST API with Express & Zod input validation",
          "Route-level protection & middleware architecture",
          "Responsive UI with Shadcn components",
        ]}
        badge="Built from scratch"
        repoUrl="https://github.com/phyodynamics/furniture-fullstack"
      />
    ),
  },
  {
    category: "AI · Content Writing · 400+ Users",
    title: "Zen Writer",
    src: "/images/ThumbNail/ZenWriter.png",
    screenshot: "/images/Screenshot/ZenWriter.PNG",
    content: (
      <ProjectContent
        description="A Burmese AI content writer serving 400+ active users. I designed the multi-mode content generation system, user authentication architecture, and admin dashboard. Integrated Gemini 2.5 Flash API for 4 content generation modes — detailed input, conversational prompt, text transformation, and neuro-marketing — plus a Lab mode for AI-powered A/B testing."
        tech={[
          "TypeScript",
          "Next.js",
          "Gemini AI API",
          "JWT Auth",
          "PostgreSQL",
          "Admin Panel",
          "Vercel",
        ]}
        features={[
          "Designed multi-mode AI content generation system architecture",
          "4 content modes + Lab mode (AI A/B testing)",
          "Built user authentication & admin dashboard from scratch",
          "400+ active users with secure session management",
          "Deployed on Vercel with production-grade security",
        ]}
        liveUrl="https://www.zenwriter.online/"
      />
    ),
  },
  {
    category: "AI · Voice · API Platform",
    title: "Pyaw Kyi",
    src: "/images/ThumbNail/PyawKyi.png",
    screenshot: "/images/Screenshot/PyawKyi.PNG",
    content: (
      <ProjectContent
        description="A voice-powered AI platform I architected with 5 intelligent modes — Polish, Plan, Craft, Build, and Learn. I designed the API platform architecture enabling users to generate their own API keys, built the Google OAuth integration, implemented web push notifications, and created maintenance & waitlist mode systems."
        tech={[
          "TypeScript",
          "Next.js",
          "Google OAuth",
          "Speech-to-Text AI",
          "REST API Platform",
          "Web Push",
          "Vercel",
        ]}
        features={[
          "Architected 5-mode voice processing pipeline",
          "Build mode generates actionable mini apps from voice",
          "Designed public API platform with key generation & docs",
          "Implemented Google OAuth & secure session management",
          "Built maintenance mode, waitlist & web push notification systems",
        ]}
        liveUrl="https://pyawkyi.phyozinko.com/"
      />
    ),
  },
  {
    category: "Productivity · AI · Life System",
    title: "NuFlow OS",
    src: "/images/ThumbNail/NuFlowOs.png",
    screenshot: "/images/Screenshot/NuFlowOs.PNG",
    content: (
      <ProjectContent
        description="A comprehensive productivity life system I designed with Notion API as the database layer. I architected the 5-section system — Daily To-Do (time blocking), Journaling (voice-to-text AI), Monthly Summary, Note Master, and Projects (with progress tracking). Built an AI chatbot that queries user data by title mention, and designed the admin panel."
        tech={[
          "TypeScript",
          "Next.js",
          "Notion API",
          "Speech-to-Text AI",
          "AI Chatbot",
          "Admin Panel",
          "Vercel",
        ]}
        features={[
          "Designed 5-section productivity system architecture",
          "Integrated Notion API as user-owned database layer",
          "Built AI chatbot for querying personal data by title mention",
          "Implemented voice-to-text AI across journaling, summaries & notes",
          "Project tracking with progress bars, donut charts & task CRUD",
        ]}
        liveUrl="https://nuflowos.com/"
      />
    ),
  },
  {
    category: "E-Commerce · AI Chatbot",
    title: "Vora",
    src: "/images/ThumbNail/Vora.png",
    screenshot: "/images/Screenshot/Vora.PNG",
    content: (
      <ProjectContent
        description="A full-featured e-commerce platform I designed with user authentication, order management, and real-time status tracking. I architected the Baht-to-Kyat currency conversion system, service fee calculation logic, and integrated an AI chatbot that understands product queries. Built a comprehensive admin panel for store management."
        tech={[
          "TypeScript",
          "Next.js",
          "AI Chatbot",
          "JWT Auth",
          "PostgreSQL",
          "Admin Panel",
          "Payment Logic",
          "Vercel",
        ]}
        features={[
          "Designed order management system with real-time status tracking",
          "Built AI chatbot for product queries by name mention",
          "Architected Baht-to-Kyat currency conversion & fee calculation",
          "Implemented JWT authentication & user account management",
          "Full admin panel for product, order & store management",
        ]}
        liveUrl="https://www.vora.asia/"
      />
    ),
  },
];

const cards = projects.map((card, index) => (
  <Card key={card.src} card={card} index={index} layout={true} />
));

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation variant="zoom">
          <div className="text-center mb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Portfolio
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              Some Things I Built
            </FadeUpWord>
            <p className="mt-4 text-gray-500">
              Click to see what&apos;s inside
            </p>
          </div>
        </ScrollAnimation>

        <Carousel items={cards} />
      </div>
    </section>
  );
}
