"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

function ProjectContent({
  description,
  tech,
}: {
  description: string;
  tech: string[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
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
  );
}

const projects = [
  {
    category: "Full Stack",
    title: "Furniture E-Commerce",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="A full-featured furniture store. Cart, payments, admin panel - it's all there."
        tech={["React", "Node.js", "Prisma", "Redis", "Stripe"]}
      />
    ),
  },
  {
    category: "Data Visualization",
    title: "Dashboard Analytics",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="Real-time analytics dashboard with interactive charts, data filtering, and automated reporting capabilities."
        tech={["Next.js", "D3.js", "PostgreSQL", "WebSocket"]}
      />
    ),
  },
  {
    category: "Mobile App",
    title: "Social Media App",
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="A social media platform with real-time messaging, stories, and content sharing features."
        tech={["React Native", "Firebase", "GraphQL", "TypeScript"]}
      />
    ),
  },
  {
    category: "AI / ML",
    title: "AI Chat Application",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="Conversational AI application powered by large language models with context-aware responses and memory."
        tech={["Python", "LangChain", "OpenAI", "FastAPI", "Redis"]}
      />
    ),
  },
  {
    category: "Web Design",
    title: "Portfolio Website",
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="The site you're looking at right now. 3D animations, smooth vibes."
        tech={["Next.js", "Framer Motion", "Three.js", "Tailwind"]}
      />
    ),
  },
  {
    category: "DevOps",
    title: "API Management Tool",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="Centralized API gateway with rate limiting, monitoring, documentation auto-generation, and team collaboration."
        tech={["Go", "Docker", "Kubernetes", "Redis", "Grafana"]}
      />
    ),
  },
  {
    category: "EdTech",
    title: "E-Learning Platform",
    src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    content: (
      <ProjectContent
        description="Online learning platform with video courses, progress tracking, quizzes, and certificate generation."
        tech={["Next.js", "Prisma", "AWS S3", "Stripe", "FFmpeg"]}
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
