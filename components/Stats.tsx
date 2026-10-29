"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder figures; replace with your agency's numbers.
const stats = [
  { value: 120, suffix: "+", label: "Projects launched", color: "var(--orange)" },
  { value: 9, suffix: "y", label: "In business", color: "var(--peach)" },
  { value: 98, suffix: "%", label: "Clients who return", color: "var(--sand)" },
  { value: 14, suffix: "", label: "Countries served", color: "var(--paper-2)" },
];

/** Big numbers that count up and pop in when scrolled into view. */
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      tl.from(".stat", { y: 80, rotate: (i) => (i % 2 ? 6 : -6), opacity: 0, duration: 0.8, ease: "back.out(1.6)", stagger: 0.1 });
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el, i) => {
        const n = { v: 0 };
        tl.to(n, { v: stats[i].value, duration: 1.4, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(n.v))) }, 0.2);
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat" style={{ background: s.color }}>
          <span className="stat-value display xl">
            <span className="stat-num">{s.value}</span>
            {s.suffix}
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
