"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Splits text into words that slide up from behind a mask when scrolled into view. */
export function Reveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".word > span", {
        yPercent: 120,
        rotate: 8,
        skewX: -12,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.07,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
      // Whole line enters tilted and straightens as it scrolls toward the middle.
      gsap.fromTo(
        ref.current,
        { rotate: -4, xPercent: 3 },
        {
          rotate: 0,
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 40%", scrub: 1.2 },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">
            <span>{w}</span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Wavy edge on top of a section that flattens as the section scrolls up. `color` is the section's fill. */
export function Wave({ color }: { color: string }) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!path.current || reduced()) return;
    const tween = gsap.fromTo(
      path.current,
      { attr: { d: "M0,120 C320,10 640,10 960,70 C1180,115 1340,40 1440,30 L1440,120 Z" } },
      {
        attr: { d: "M0,120 C320,120 640,120 960,120 C1180,120 1340,120 1440,120 L1440,120 Z" },
        ease: "none",
        scrollTrigger: { trigger: path.current, start: "top bottom", end: "top 20%", scrub: 1 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
      <path ref={path} fill={color} d="M0,120 C320,10 640,10 960,70 C1180,115 1340,40 1440,30 L1440,120 Z" />
    </svg>
  );
}

/** Hand-drawn squiggle that draws itself while scrolled through. */
export function DrawLine({
  className,
  color = "var(--orange)",
  auto = false,
}: {
  className?: string;
  color?: string;
  /** true: draw once on load instead of following the scroll */
  auto?: boolean;
}) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduced() ? 0 : len });
    if (reduced()) return;
    const tween = gsap.to(p, {
      strokeDashoffset: 0,
      ease: auto ? "power2.inOut" : "none",
      ...(auto
        ? { duration: 2.2, delay: 0.9 }
        : { scrollTrigger: { trigger: p.ownerSVGElement, start: "top 85%", end: "bottom 30%", scrub: 1 } }),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [auto]);

  return (
    <svg className={`draw-line ${className ?? ""}`} viewBox="0 0 1200 300" fill="none" aria-hidden>
      <path
        ref={path}
        d="M10,220 C180,40 300,40 320,150 C340,260 200,260 240,160 C290,40 520,30 600,140 C660,220 760,250 860,160 C930,95 1000,60 1060,110 C1110,150 1150,120 1190,60"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Round sticker with text on a circle; spins slowly and faster while scrolling. */
export function Sticker({ text, center, className }: { text: string; center: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const spin = gsap.to(ref.current.querySelector(".sticker-ring"), {
      rotate: 360,
      duration: 14,
      ease: "none",
      repeat: -1,
      svgOrigin: "100 100", // centre of the 200x200 viewBox
    });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        spin.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 300, 6));
        gsap.to(spin, { timeScale: 1, duration: 0.8, overwrite: true });
      },
    });
    return () => {
      st.kill();
      spin.kill();
    };
  }, []);

  return (
    <svg ref={ref} className={`sticker ${className ?? ""}`} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <path id="sticker-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="var(--peach)" />
      <g className="sticker-ring">
        <text fontSize="17" letterSpacing="3" fill="var(--ink)" fontWeight="600">
          <textPath href="#sticker-circle">{text}</textPath>
        </text>
      </g>
      <text x="100" y="114" textAnchor="middle" fontSize="44" fill="var(--ink)" className="sticker-center">
        {center}
      </text>
    </svg>
  );
}

/** Fades and lifts children in on scroll. */
export function FadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Moves its content against the scroll direction. `speed` is the yPercent travel. */
export function Parallax({
  children,
  speed = 20,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const tween = gsap.fromTo(
      ref.current,
      { yPercent: speed },
      {
        yPercent: -speed,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Infinite horizontal loop. Content is rendered twice so the loop is seamless. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <ul key={n} aria-hidden={n === 1}>
            {items.map((it) => (
              <li key={it}>
                {it}
                <span className="marquee-dot" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
