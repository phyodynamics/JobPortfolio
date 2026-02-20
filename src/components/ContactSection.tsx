"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Send,
  MapPin,
  MessageCircle,
  Facebook,
} from "lucide-react";
import { FadeUpWord } from "@/components/ui/fade-up-word";
import ScrollAnimation from "./ScrollAnimation";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/phyodynamics",
    handle: "@phyodynamics",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    href: "https://t.me/phyodynamic",
    handle: "@phyodynamic",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:phyodynamics@gmail.com",
    handle: "phyodynamics@gmail.com",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1DqEDhhG88/?mibextid=wwXIfr",
    handle: "Phyo Zin Ko",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollAnimation variant="flip">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              Contact
            </p>
            <FadeUpWord
              as="h2"
              className="text-4xl md:text-5xl font-bold text-black justify-center"
            >
              Let&apos;s Build Something
            </FadeUpWord>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              Got an idea? I&apos;m listening. My inbox is always open.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation variant="rise">
          <div className="flex flex-col items-center gap-8">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-500"
            >
              <MapPin size={16} />
              <span className="text-sm">Myanmar</span>
            </motion.div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
              {socials.map((social, i) => (
                <ScrollAnimation
                  key={social.label}
                  variant={i % 2 === 0 ? "tiltLeft" : "tiltRight"}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label}: ${social.handle}`}
                    className="group flex flex-col items-center gap-3 px-4 py-6 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <social.icon size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-black">
                        {social.label}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[140px]">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                </ScrollAnimation>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              href="mailto:phyodynamics@gmail.com"
              className="mt-4 inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Send size={16} />
              Drop a Message
            </motion.a>
          </div>
        </ScrollAnimation>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Phyo Zin Ko · Built with Next.js & Framer Motion
          </p>
        </div>
      </div>
    </section>
  );
}
