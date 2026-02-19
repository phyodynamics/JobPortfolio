"use client";

import { FileDown } from "lucide-react";

export default function FloatingResume() {
  return (
    <a
      href="/resume.pdf"
      download
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-3 py-3 sm:px-5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-medium"
    >
      <FileDown size={18} />
      <span className="hidden sm:inline">Resume</span>
    </a>
  );
}
