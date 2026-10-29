"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { agency, nav } from "@/lib/content";

/** Label that rolls up to a duplicate of itself on hover (pure CSS, see .roll). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-stack">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  // Hide the top bar while scrolling down past the hero, show again on any upward scroll.
  useEffect(() => {
    const st = ScrollTrigger.create({
      onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 300),
    });
    return () => st.kill();
  }, []);

  // Fullscreen menu: circle wipe in, links rise one by one.
  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    document.documentElement.classList.toggle("menu-open", open);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline();
    if (open) {
      tl.fromTo(
        el,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 100%)", duration: 0.8, ease: "power3.inOut" },
      ).from(".menu-link", { yPercent: 120, rotate: 6, duration: 0.7, ease: "power3.out", stagger: 0.06 }, "-=0.35");
    }
    return () => {
      tl.kill();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`header ${hidden ? "is-hidden" : ""}`}>
        <Link href="/" className="logo">
          <Image src="/logo.webp" alt={agency.name} width={1568} height={255} priority />
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={pathname.startsWith(n.href) ? "is-active" : ""}>
              <Roll>{n.label}</Roll>
            </Link>
          ))}
        </nav>
        <Link href="/contact-us" className="btn btn-orange" data-discuss>
          <Roll>Let&apos;s talk</Roll>
        </Link>
      </header>

      <div className="dock">
        <button className="dock-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <span className="dock-divider" />
        <Link href="/contact-us" className="btn btn-orange" data-discuss onClick={() => setOpen(false)}>
          Start a project
        </Link>
      </div>

      <div
        ref={overlay}
        id="site-menu"
        className={`menu-overlay ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <nav>
          {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact-us" }].map((n) => (
            <Link key={n.href} href={n.href} className="menu-link-wrap" onClick={() => setOpen(false)}>
              <span className="menu-link display xl">{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-blobs" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
