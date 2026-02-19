"use client";

import { useEffect, useRef, useSyncExternalStore, useCallback } from "react";

function useIsDesktop() {
  const subscribe = useCallback((cb: () => void) => {
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  const getSnapshot = useCallback(
    () => window.matchMedia("(pointer: fine)").matches,
    [],
  );
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = -100;
    let y = -100;
    let visible = false;
    let raf = 0;

    function render() {
      cursor!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor!.style.opacity = visible ? "1" : "0";
      raf = requestAnimationFrame(render);
    }

    function onMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      visible = true;
    }

    function onLeave() {
      visible = false;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.style.cursor = "none";

    raf = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  // Don't render anything on touch devices
  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-99999 opacity-0"
      style={{ willChange: "transform" }}
    >
      <svg
        className="w-6 h-6 -translate-x-0.5 -translate-y-0.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
      >
        <path
          fill="currentColor"
          d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
        />
      </svg>
    </div>
  );
}
