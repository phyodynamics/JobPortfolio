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
    category: "Full Stack · Self-Coded",
    title: "Furniture E-Commerce",
    src: "/images/Furniture.png",
    content: (
      <ProjectContent
        description="A full-stack e-commerce furniture store built entirely from scratch — no AI assistance. Features a polished frontend with Shadcn UI, a secure Express backend with robust authentication (login, register, password change), Prisma ORM for database management, and comprehensive route controlling."
        tech={[
          "TypeScript",
          "React",
          "Shadcn UI",
          "Express",
          "Prisma",
          "Zod",
          "JWT",
        ]}
        features={[
          "Full authentication system (login, register, change password)",
          "High-security backend with Express & Zod validation",
          "Prisma database with relational data modeling",
          "API integration with route-level access control",
          "Responsive UI built with Shadcn components",
        ]}
        badge="Built from scratch"
        repoUrl="https://github.com/phyodynamics/furniture-fullstack"
      />
    ),
  },
  {
    category: "AI · Content Writing · 400+ Users",
    title: "Zen Writer",
    src: "/images/ZenWriter.PNG",
    content: (
      <ProjectContent
        description="A Burmese AI content writer powered by Gemini 2.5 Flash, serving 400+ active users. Offers 4 intelligent content generation modes — detailed input, conversational prompt, short-to-attractive text transformation, and neuro-marketing based writing — plus a Lab mode for AI-powered A/B testing."
        tech={[
          "TypeScript",
          "Next.js",
          "Gemini AI",
          "Authentication",
          "Admin Panel",
        ]}
        features={[
          "4 content generation modes + Lab mode (AI A/B testing)",
          "Neuro-marketing based content writing",
          "User accounts with admin panel",
          "400+ active users",
          "High security with authentication system",
        ]}
        liveUrl="https://www.zenwriter.online/"
      />
    ),
  },
  {
    category: "AI · Voice · API Platform",
    title: "Pyaw Kyi",
    src: "/images/PyawKyi.PNG",
    content: (
      <ProjectContent
        description="A voice-powered AI tool with 5 intelligent modes — Polish (refine text from voice), Plan (create actionable plans), Craft (write marketing content), Build (generate mini apps), and Learn (study topics with flashcards). Includes a public API with docs, developer API keys, Google OAuth, web push notifications, maintenance & waitlist modes."
        tech={[
          "TypeScript",
          "Next.js",
          "Google OAuth",
          "Speech AI",
          "API Platform",
          "Web Push",
        ]}
        features={[
          "5 voice modes: Polish, Plan, Craft, Build, Learn",
          "Build mode creates actionable mini apps from voice",
          "Learn mode generates paragraphs, notes & flashcards",
          "Public API & docs — users can generate their own API keys",
          "Maintenance mode, waitlist mode & web push notifications",
        ]}
        liveUrl="https://pyawkyi.phyozinko.com/"
      />
    ),
  },
  {
    category: "Productivity · AI · Life System",
    title: "NuFlow OS",
    src: "/images/NuFlowOs.PNG",
    content: (
      <ProjectContent
        description="A comprehensive productivity life system featuring a live clock, year countdown, and 5 powerful sections — Daily To-Do (with time blocking), Daily Journaling (with voice-to-text AI), Monthly Summary (AI-assisted), Note Master (AI-assisted), and Projects (with progress bars, donut charts, and task management). Includes an AI chatbot that lets users interact with their own data by mentioning entry titles."
        tech={[
          "TypeScript",
          "Next.js",
          "Notion API",
          "Speech AI",
          "AI Chatbot",
          "Admin Panel",
        ]}
        features={[
          "5 sections: To-Do, Journaling, Monthly Summary, Notes, Projects",
          "Voice-to-text AI writing in journaling, summaries & notes",
          "AI chatbot — speak with your own data by mentioning titles",
          "Project tracking with progress bars & donut charts",
          "Uses user's own Notion as database",
        ]}
        liveUrl="https://nuflowos.com/"
      />
    ),
  },
  {
    category: "E-Commerce · AI Chatbot",
    title: "Vora",
    src: "/images/Vora.PNG",
    content: (
      <ProjectContent
        description="A full-featured e-commerce platform where users can create accounts, browse products, place orders, and track order status in real-time. Features an AI chatbot that understands product queries by mention, Baht-to-Kyat currency conversion, automatic service fee calculation, and a comprehensive admin panel."
        tech={[
          "TypeScript",
          "Next.js",
          "AI Chatbot",
          "Authentication",
          "Admin Panel",
          "Payment Logic",
        ]}
        features={[
          "AI chatbot — ask about any product by mentioning its name",
          "User accounts with order tracking & status updates",
          "Baht to Kyat currency conversion logic",
          "Service fees calculation & payment processing",
          "Full admin panel for store management",
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
