import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const fontSans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Phyo Zin Ko — Full Stack Developer",
  description:
    "Full Stack Developer & Systems Architect. Building production-ready web applications with React, Next.js, Node.js, TypeScript, Prisma, and AI integration. 30+ shipped projects deployed on Vercel & AWS.",
  keywords: [
    "Phyo Zin Ko",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
    "Web Developer",
    "Myanmar",
  ],
  openGraph: {
    title: "Phyo Zin Ko — Full Stack Developer",
    description:
      "Full Stack Web Developer portfolio. 30+ real-world projects with React, Next.js, Node.js, and more.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  other: {
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased bg-white text-black`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
