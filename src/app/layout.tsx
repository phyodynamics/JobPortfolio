import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phyo Zin Ko — Full Stack Developer",
  description:
    "Full Stack Web Developer portfolio. React, Next.js, Node.js, Express, GraphQL, Redux, Prisma, and more. 30+ real-world projects.",
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
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontSans.variable} font-sans antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
