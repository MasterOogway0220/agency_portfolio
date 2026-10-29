"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import type { Case } from "@/lib/content";

/** Case rows with a colored preview card that follows the cursor on hover. */
export default function CaseList({ items }: { items: Case[] }) {
  const preview = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    gsap.to(preview.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
  };
  const show = (c: Case) => {
    if (!preview.current) return;
    preview.current.style.background = c.color;
    preview.current.textContent = c.title;
    gsap.to(preview.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };
  const hide = () => gsap.to(preview.current, { scale: 0.6, opacity: 0, duration: 0.3, ease: "power2.in" });

  return (
    <div className="case-list" onMouseMove={move} onMouseLeave={hide}>
      {items.map((c, i) => (
        <Link key={c.slug} href={`/cases/${c.slug}`} className="case-row" onMouseEnter={() => show(c)}>
          <span className="case-index">{String(i + 1).padStart(2, "0")}</span>
          <h2 className="case-title">{c.title}</h2>
          <span className="case-meta">
            {c.category} · {c.year}
          </span>
        </Link>
      ))}
      <div ref={preview} className="case-preview" aria-hidden />
    </div>
  );
}
