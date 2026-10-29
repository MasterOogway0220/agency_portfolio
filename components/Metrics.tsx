"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: "Speed", value: 98, color: "var(--paper-2)" },
  { label: "SEO", value: 100, color: "var(--peach)" },
  { label: "Motion", value: 92, color: "var(--sand)" },
  { label: "Accessibility", value: 95, color: "var(--orange)" },
];

/** Score cards that pop in and fill their bars, counting up, when scrolled into view. */
export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".metric", ref.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      tl.from(cards, { scale: 0.4, opacity: 0, rotate: (i) => (i % 2 ? 8 : -8), duration: 0.6, ease: "back.out(2)", stagger: 0.1 });
      cards.forEach((card, i) => {
        const target = Number(card.dataset.value);
        const num = card.querySelector(".metric-num")!;
        const n = { v: 0 };
        tl.from(card.querySelector(".metric-fill"), { width: "0%", duration: 1.2, ease: "power2.out" }, 0.3 + i * 0.1).to(
          n,
          { v: target, duration: 1.2, ease: "power2.out", onUpdate: () => (num.textContent = String(Math.round(n.v))) },
          "<",
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="metrics">
      {metrics.map((m) => (
        <div key={m.label} className="metric" data-value={m.value} style={{ "--c": m.color } as React.CSSProperties}>
          <span className="metric-label">{m.label}</span>
          <span className="metric-num">{m.value}</span>
          <span className="metric-bar">
            <span className="metric-fill" style={{ width: `${m.value}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}
