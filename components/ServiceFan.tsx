"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cards start stacked in a messy pile and fan out into a row as the section scrolls in.
 * Each card flips on hover/focus to a back face with a call to action.
 */
export default function ServiceFan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 743px)").matches) return; // phones get a plain stack
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      const mid = (cards.length - 1) / 2;
      gsap.from(cards, {
        xPercent: (i) => (mid - i) * 100,
        yPercent: (i) => 30 + i * 6,
        rotate: (i) => (i - mid) * 9,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 25%", scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="cards">
      {services.map((s) => (
        <div key={s.title} className="card" tabIndex={0}>
          <div className="card-inner">
            <div className="card-face card-front">
              <h3 className="display md">{s.title}</h3>
              <ul className="tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p>{s.text}</p>
            </div>
            <div className="card-face card-back">
              <p className="display md">Need {s.title.toLowerCase()}?</p>
              <Link href="/services" className="btn btn-ink">
                Learn more
              </Link>
              <button className="btn btn-orange" data-discuss>
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
