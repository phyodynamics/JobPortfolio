"use client";

import { useEffect, createContext, useContext, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAPContext = createContext<boolean>(false);

export function useGSAPReady() {
  return useContext(GSAPContext);
}

export default function GSAPProvider({ children }: { children: ReactNode }) {
  const ready = useRef(false);

  useEffect(() => {
    ready.current = true;

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    // Configure GSAP defaults for performance
    gsap.defaults({
      force3D: true,
    });

    // Refresh on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <GSAPContext.Provider value={true}>{children}</GSAPContext.Provider>;
}
