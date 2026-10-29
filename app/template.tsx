"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Re-mounts on every navigation: the new page fades and slides in,
// and stacked panels sink back as the next one slides over them.
// Everything is scoped to this instance: Next keeps previous pages mounted (hidden),
// so document-wide selectors would also grab their elements.
export default function Template({ children }: { children: React.ReactNode }) {
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = page.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(p, { opacity: 0, y: 40, duration: 0.7, ease: "power3.out", clearProps: "all" });

      // Stick only panels that fit the screen; a taller panel would hide its own bottom content.
      // CSS sticky (a class) instead of a GSAP pin: a pin wraps the element in a new div,
      // which breaks React hydration when it runs before the page has fully hydrated.
      gsap.utils
        .toArray<HTMLElement>(p.querySelectorAll(".stack-panel"))
        .filter((el) => el.nextElementSibling && el.offsetHeight <= window.innerHeight)
        .forEach((el) => {
          el.classList.add("is-sticky");
          gsap.to(el, {
            scale: 0.92,
            filter: "brightness(0.75)",
            ease: "none",
            scrollTrigger: { trigger: el.nextElementSibling, start: "top bottom", end: "top top", scrub: true },
          });
        });
    });
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      p.querySelectorAll(".is-sticky").forEach((el) => el.classList.remove("is-sticky"));
    };
  }, []);

  return <div ref={page}>{children}</div>;
}
