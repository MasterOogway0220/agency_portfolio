"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Case } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/** Stack of case cards: drag (or click the arrow) the top card away and it goes to the back. */
export default function CaseStack({ items }: { items: Case[] }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const top = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Cards are dealt in from below when the stack scrolls into view, then the top one wiggles as a drag hint.
  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
        .from(".stack-card", { y: 300, rotate: (i) => (i % 2 ? 18 : -18), opacity: 0, duration: 0.9, ease: "back.out(1.4)", stagger: 0.12 })
        .to(".stack-card:last-child", { rotate: 4, x: 30, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 3 });
    }, root);
    return () => ctx.revert();
  }, []);

  const sendBack = (dir = 1) => {
    gsap.to(top.current, {
      x: dir * 600,
      rotate: dir * 25,
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(top.current, { x: 0, y: 0, rotate: 0, opacity: 1 });
        setOrder((o) => [...o.slice(1), o[0]]);
      },
    });
  };

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    gsap.set(top.current, { x: dx, y: (e.clientY - drag.current.y) * 0.3, rotate: dx / 20 });
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) > 120) sendBack(Math.sign(dx));
    else gsap.to(top.current, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: "back.out(2)" });
  };

  return (
    <>
    <p className="stack-hint">Drag the card or tap → to flip through</p>
    <div ref={root} className="case-stack" data-cursor="Drag">
      {order
        .slice(0, 4)
        .reverse()
        .map((idx, depth, arr) => {
          const c = items[idx];
          const isTop = depth === arr.length - 1;
          const pos = arr.length - 1 - depth;
          return (
            <div
              key={c.slug}
              ref={isTop ? top : undefined}
              className="stack-card"
              style={{ background: c.color, transform: `translate(${pos * 18}px, ${pos * -14}px) rotate(${pos * 3}deg)`, zIndex: depth }}
              onPointerDown={isTop ? onDown : undefined}
              onPointerMove={isTop ? onMove : undefined}
              onPointerUp={isTop ? onUp : undefined}
            >
              <span className="stack-count">
                {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <blockquote className="stack-quote">“Placeholder client quote about working together on {c.title}.”</blockquote>
              <div className="stack-foot">
                <span className="stack-rating">5.0</span>
                <span>{c.title}</span>
                <span className="stack-label">{c.category}</span>
              </div>
              {isTop && (
                <div className="stack-actions">
                  <Link href={`/cases/${c.slug}`} className="btn btn-ink" onPointerDown={(e) => e.stopPropagation()}>
                    View case
                  </Link>
                  <button
                    className="stack-next"
                    aria-label="Next case"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => sendBack(1)}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </div>
    </>
  );
}
