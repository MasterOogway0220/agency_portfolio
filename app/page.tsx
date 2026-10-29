import Link from "next/link";
import { agency, cases, clients } from "@/lib/content";
import HeroShapes from "@/components/HeroShapes";
import ServiceFan from "@/components/ServiceFan";
import AboutTiles from "@/components/AboutTiles";
import CaseStack from "@/components/CaseStack";
import MoodPicker from "@/components/MoodPicker";
import { DrawLine, FadeUp, Marquee, Parallax, Reveal, Sticker, Wave } from "@/components/motion";
import { Cta } from "@/components/sections";

export default function Home() {
  return (
    <>
      <section className="section hero">
        <HeroShapes />
        <div className="hero-inner">
          <h1 className="display xl hero-title">
            <Reveal as="span" text="Placeholder" className="hero-line" delay={0.2} />
            <Reveal as="span" text="hero headline." className="hero-line accent" delay={0.35} />
          </h1>
          <DrawLine auto className="hero-pen" />
          <FadeUp>
            <p className="hero-sub">{agency.tagline}. Placeholder line about what the studio does.</p>
          </FadeUp>
        </div>
        <Sticker text="• Brand • Web • Motion • Brand • Web • Motion " center="100+" className="hero-sticker" />
      </section>

      <div className="wave-wrap">
        <Wave color="var(--sand)" />
      </div>
      <AboutTiles />

      <section className="section trust panel-sand">
        <div className="trust-grid">
          <Reveal text="Placeholder statement about why design builds trust." className="display lg trust-title" />
          <Parallax speed={12} className="trust-art">
            <svg viewBox="0 0 200 200" aria-hidden>
              <path
                d="M100 8 L118 70 L182 52 L136 100 L182 148 L118 130 L100 192 L82 130 L18 148 L64 100 L18 52 L82 70 Z"
                fill="var(--orange)"
              />
              <circle cx="84" cy="96" r="9" fill="var(--ink)" />
              <circle cx="116" cy="96" r="9" fill="var(--ink)" />
              <path d="M82 118 Q100 134 118 118" fill="none" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </Parallax>
        </div>
        <button className="arrow-pill" data-discuss>
          <span className="arrow-pill-ico">↗</span>
          <span>Let&apos;s talk</span>
          <span className="arrow-pill-ico">→</span>
        </button>
        <Marquee items={clients} />
      </section>

      <section className="section services-sec">
        <Wave color="var(--paper)" />
        <Reveal text="What are we building?" className="display lg" />
        <ServiceFan />
      </section>

      <section className="section cases-sec">
        <Reveal text="Selected work" className="display xl" />
        <CaseStack items={cases.slice(0, 4)} />
      </section>

      <section className="view-split">
        <Link href="/blog" className="split split-left">
          <span className="split-arrow">←</span>
          <span className="display md">View all blogs</span>
        </Link>
        <Link href="/cases" className="split split-right">
          <span className="display md">View all cases</span>
          <span className="split-arrow">→</span>
        </Link>
      </section>

      <Cta />

      <section className="section feedback panel-sand">
        <Wave color="var(--sand)" />
        <Reveal text="Placeholder question for visitors?" className="display lg" />
        <MoodPicker />
      </section>
    </>
  );
}
