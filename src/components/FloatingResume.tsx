"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function FloatingResume() {
  return (
    <motion.a
      href="/resume.pdf"
      download
      aria-label="Download Resume"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-3 py-3 sm:px-5 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 font-medium focus-visible:outline-white"
    >
      <FileDown size={18} />
      <span className="hidden sm:inline text-sm">Resume</span>
    </motion.a>
  );
}
