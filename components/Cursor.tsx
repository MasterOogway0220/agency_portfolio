"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: an arrow with a name tag. The tag reads "You" by default, "Click" over
 * links/buttons, or the value of the nearest data-cursor attribute ("Drag", "Explore"...).
 * Buttons (.btn) get a magnetic pull. Off on touch devices and with reduced motion.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !tag.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (el.style.opacity !== "1") gsap.to(el, { opacity: 1, duration: 0.2 });

      const target = e.target as HTMLElement;
      const custom = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const isLink = !!target.closest("a, button, summary, label, select");
      const mode = custom ? "custom" : isLink ? "link" : "default";
      const label = custom ?? (isLink ? "Click" : "You");
      if (tag.current!.textContent !== label) tag.current!.textContent = label;
      el.dataset.mode = mode;

      const btn = target.closest<HTMLElement>(".btn");
      document.querySelectorAll<HTMLElement>(".btn.is-magnet").forEach((b) => {
        if (b !== btn) {
          b.classList.remove("is-magnet");
          gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "back.out(2)" });
        }
      });
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.classList.add("is-magnet");
        gsap.to(btn, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.4,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden data-mode="default">
      <svg className="cursor-arrow" viewBox="0 0 24 24">
        <path d="M3 2 L21 12 L12 13.5 L8 22 Z" />
      </svg>
      <span ref={tag} className="cursor-tag">
        You
      </span>
    </div>
  );
}
