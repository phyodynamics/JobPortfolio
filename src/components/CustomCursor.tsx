"use client";

import { useEffect, useRef, useSyncExternalStore, useCallback } from "react";
import gsap from "gsap";

function useIsDesktop() {
  const subscribe = useCallback((cb: () => void) => {
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  const getSnapshot = useCallback(() => window.matchMedia("(pointer: fine)").matches, []);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let visible = false;

    function onMove(e: PointerEvent) {
      if (!visible) { visible = true; gsap.to([cursor!, follower!], { opacity: 1, duration: 0.3 }); }
      gsap.to(cursor!, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower!, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
    }
    function onLeave() { visible = false; gsap.to([cursor!, follower!], { opacity: 0, duration: 0.3 }); }
    function onEnterInteractive() {
      gsap.to(follower!, { scale: 2.5, opacity: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.to(cursor!, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    }
    function onLeaveInteractive() {
      gsap.to(follower!, { scale: 1, opacity: 0.3, duration: 0.3 });
      gsap.to(cursor!, { scale: 1, duration: 0.3 });
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.style.cursor = "none";

    const interactiveEls = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactiveEls.forEach((el) => { el.addEventListener("mouseenter", onEnterInteractive); el.addEventListener("mouseleave", onLeaveInteractive); });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.style.cursor = "";
      observer.disconnect();
      interactiveEls.forEach((el) => { el.removeEventListener("mouseenter", onEnterInteractive); el.removeEventListener("mouseleave", onLeaveInteractive); });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-[99999] opacity-0 mix-blend-difference" style={{ willChange: "transform", transform: "translate(-50%, -50%)" }}>
        <div className="w-3 h-3 rounded-full bg-black" />
      </div>
      <div ref={followerRef} className="pointer-events-none fixed top-0 left-0 z-[99998] opacity-0 mix-blend-difference" style={{ willChange: "transform", transform: "translate(-50%, -50%)" }}>
        <div className="w-8 h-8 rounded-full border border-black/40 opacity-30" />
      </div>
    </>
  );
}
