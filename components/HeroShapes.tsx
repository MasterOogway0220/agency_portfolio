"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Placeholder facts shown on the floating stickers; replace with your agency's numbers.
const shapes = [
  { kind: "star", label: "4.9★ rating" },
  { kind: "pill", label: "Replies in 1h" },
  { kind: "circle", label: "120+ launches" },
  { kind: "leaf", label: "Ongoing support" },
  { kind: "blob", label: "Free audit" },
] as const;

/** Labelled shapes that pop in, spin or sway idly, and drift toward the cursor. */
export default function HeroShapes({ labels = true }: { labels?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".shape-wrap", { scale: 0, rotate: -40, duration: 1, ease: "back.out(2)", stagger: 0.1, delay: 0.4 });
      gsap.to(".shape-wrap", {
        y: "+=18",
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });
      gsap.to(".shape-star, .shape-blob", { rotate: 360, duration: 24, ease: "none", repeat: -1 });
      gsap.to(".shape-pill, .shape-leaf", { rotate: "+=8", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, ref);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      gsap.to(ref.current, { x: dx * 30, y: dy * 30, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className="hero-shapes" aria-hidden>
      {shapes.map((s) => (
        <span key={s.kind} className={`shape-wrap wrap-${s.kind}`}>
          <span className={`shape shape-${s.kind}`} />
          {labels && <span className="shape-label">{s.label}</span>}
        </span>
      ))}
    </div>
  );
}
