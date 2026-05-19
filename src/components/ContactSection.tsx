"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Send, MapPin, MessageCircle, Facebook, Linkedin, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/phyodynamics", handle: "@phyodynamics" },
  { icon: MessageCircle, label: "Telegram", href: "https://t.me/phyodynamic", handle: "@phyodynamic" },
  { icon: Mail, label: "Email", href: "mailto:phyodynamics@gmail.com", handle: "phyodynamics@gmail.com" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1DqEDhhG88/?mibextid=wwXIfr", handle: "Phyo Zin Ko" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/phyozinko", handle: "phyozinko" },
];

function MagneticLink({ icon: Icon, label, href, handle }: { icon: LucideIcon; label: string; href: string; handle: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);
  const handleMouseLeave = useCallback(() => { gsap.to(ref.current!, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); }, []);

  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="social-link group flex items-center gap-4 py-4 px-5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg transition-all" style={{ willChange: "transform" }}>
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300"><Icon size={18} /></div>
      <div><p className="text-sm font-medium text-black">{label}</p><p className="text-[11px] text-gray-400 truncate max-w-[180px]">{handle}</p></div>
    </a>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bigText = bigTextRef.current;
    const content = contentRef.current;
    if (!section || !bigText || !content) return;

    const ctx = gsap.context(() => {
      const chars = bigText.querySelectorAll(".big-char");
      gsap.fromTo(chars, { y: 200, opacity: 0, rotateX: -90 }, {
        y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: bigText, start: "top 80%", toggleActions: "play none none reverse" },
      });

      const sub = bigText.querySelector(".contact-sub");
      gsap.fromTo(sub!, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: bigText, start: "top 70%", toggleActions: "play none none reverse" } });

      const links = content.querySelectorAll(".social-link");
      gsap.fromTo(links, { opacity: 0, x: -40 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: content, start: "top 80%", toggleActions: "play none none reverse" } });

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play none none reverse" } });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  const handleCtaMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.35, y: (e.clientY - rect.top - rect.height / 2) * 0.35, scale: 1.1, duration: 0.3, ease: "power2.out" });
  }, []);
  const handleCtaLeave = useCallback(() => { gsap.to(ctaRef.current!, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" }); }, []);

  const bigText = "LET'S TALK";

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-32 px-4 md:px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#FF2D55]/[0.03] blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={bigTextRef} className="text-center mb-12 md:mb-20">
          <h2 className="text-5xl md:text-9xl lg:text-[12rem] font-bold text-black tracking-tighter leading-[0.85] overflow-hidden" style={{ perspective: "1000px" }}>
            {bigText.split("").map((char, i) => <span key={i} className="big-char inline-block">{char === " " ? "\u00A0" : char}</span>)}
          </h2>
          <p className="contact-sub mt-4 md:mt-6 text-gray-400 text-base md:text-lg max-w-md mx-auto">Got an idea? I&apos;m listening. My inbox is always open.</p>
        </div>
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gray-400 mb-8"><MapPin size={16} /><span className="text-sm">Myanmar</span></div>
            <a ref={ctaRef} href="mailto:phyodynamics@gmail.com" onMouseMove={handleCtaMove} onMouseLeave={handleCtaLeave}
              className="inline-flex items-center gap-3 px-7 md:px-10 py-4 md:py-5 bg-black text-white text-sm md:text-base font-semibold rounded-full hover:shadow-[0_0_40px_rgba(255,45,85,0.2)] transition-shadow duration-300" style={{ willChange: "transform" }}>
              <Send size={18} />Drop a Message
            </a>
          </div>
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socials.map((s) => <MagneticLink key={s.label} {...s} />)}
          </div>
        </div>
        <div className="mt-16 md:mt-32 pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">© 2026 Phyo Zin Ko</p>
          <p className="text-xs text-gray-300">Built with Next.js & GSAP</p>
        </div>
      </div>
    </section>
  );
}
