"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Original simple icons drawn on coloured tiles.
const tiles = [
  { id: "spark", bg: "var(--peach)", shape: "tile-square", icon: <path d="M50 18 L58 42 L82 50 L58 58 L50 82 L42 58 L18 50 L42 42 Z" /> },
  { id: "chart", bg: "var(--paper-2)", shape: "tile-circle", icon: <g><rect x="26" y="52" width="12" height="22" rx="4" /><rect x="44" y="38" width="12" height="36" rx="4" /><rect x="62" y="24" width="12" height="50" rx="4" /></g> },
  { id: "heart", bg: "var(--orange)", shape: "tile-square", icon: <path d="M50 78 C24 60 18 40 32 30 C42 23 50 30 50 38 C50 30 58 23 68 30 C82 40 76 60 50 78 Z" /> },
  { id: "bolt", bg: "var(--sand)", shape: "tile-arrow", icon: <path d="M56 18 L30 54 L48 54 L42 82 L70 44 L52 44 Z" /> },
  { id: "smile", bg: "var(--peach)", shape: "tile-circle", icon: <g><circle cx="38" cy="42" r="5" /><circle cx="62" cy="42" r="5" /><path d="M32 58 Q50 76 68 58" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></g> },
];

/**
 * Pinned section: a big headline sits above a row of icon tiles. While scrolling,
 * the headline leaves, the tiles fly into slots inside a sentence, and the words fade in around them.
 */
export default function AboutTiles() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 1, invalidateOnRefresh: true },
      });
      tl.to(".about-base", { yPercent: -40, opacity: 0, ease: "none", duration: 0.4 });
      gsap.utils.toArray<HTMLElement>(".about-tile").forEach((tile) => {
        const slot = root.querySelector<HTMLElement>(`.slot-${tile.dataset.id}`)!;
        tl.to(
          tile,
          {
            x: () => slot.getBoundingClientRect().left - tile.getBoundingClientRect().left + Number(gsap.getProperty(tile, "x")),
            y: () => slot.getBoundingClientRect().top - tile.getBoundingClientRect().top + Number(gsap.getProperty(tile, "y")),
            scale: () => slot.offsetWidth / tile.offsetWidth,
            rotate: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0.2,
        );
      });
      tl.fromTo(".about-final", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.3).from(
        ".as-word",
        { opacity: 0, x: (i) => (i % 2 ? 60 : -60), stagger: 0.05, duration: 0.3 },
        0.45,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section about-tiles-sec panel-sand">
      <div className="about-base">
        <p className="kicker">About us</p>
        <h2 className="display xl">
          Placeholder
          <br />
          <span className="about-indent">about headline</span>
        </h2>
        <p className="about-desc">Placeholder: one or two lines with your best results across client projects.</p>
      </div>
      <ul className="about-tiles" aria-hidden>
        {tiles.map((t, i) => (
          <li
            key={t.id}
            data-id={t.id}
            className={`about-tile ${t.shape}`}
            style={{ background: t.bg, rotate: `${(i - 2) * 6}deg` }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor">
              {t.icon}
            </svg>
          </li>
        ))}
      </ul>
      <div className="about-final" aria-hidden>
        <p className="about-sentence display lg">
          <span className="as-line"><span className="as-word">Placeholder line</span><span className="as-slot slot-spark" /><span className="as-word">one</span></span>
          <span className="as-line"><span className="as-word">placeholder</span><span className="as-slot slot-chart" /><span className="as-word">line two.</span></span>
          <span className="as-line"><span className="as-word">Line three.</span><span className="as-slot slot-heart" /></span>
          <span className="as-line"><span className="as-word">Your</span><span className="as-slot slot-bolt" /><span className="as-slot slot-smile" /><span className="as-word">words here.</span></span>
        </p>
      </div>
    </section>
  );
}
