import Link from "next/link";
import { agency, faq as faqItems, nav } from "@/lib/content";
import { DrawLine, FadeUp, Marquee, Reveal, Wave } from "./motion";
import HeroShapes from "./HeroShapes";
import Metrics from "./Metrics";

export function PageHero({
  title,
  kicker,
  waveColor = "var(--sand)",
}: {
  title: string;
  kicker?: string;
  /** colour of the section that follows, so the wave blends into it */
  waveColor?: string;
}) {
  return (
    <>
      <section className="section page-hero">
        <HeroShapes labels={false} />
        <div className="hero-inner">
          {kicker && <p className="kicker">{kicker}</p>}
          <Reveal as="h1" text={title} className="display xl" delay={0.2} />
          <DrawLine auto className="hero-pen page-pen" />
        </div>
      </section>
      <div className="wave-wrap">
        <Wave color={waveColor} />
      </div>
    </>
  );
}

export function Cta() {
  return (
    <section className="section cta">
      <div className="cta-head">
        <Reveal text="Got an idea? Let's build it" className="display xl" />
        <Metrics />
      </div>
      <FadeUp className="cta-actions">
        <Link href="/contact-us" className="btn btn-orange btn-big" data-discuss>
          Start a project
        </Link>
        <a href={`mailto:${agency.email}`} className="link-underline">
          {agency.email}
        </a>
      </FadeUp>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq">
      <Reveal text="Questions" className="display lg" />
      <FadeUp className="faq-list">
        {faqItems.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span className="faq-icon" aria-hidden />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </FadeUp>
    </section>
  );
}

export function ContactForm({ title = "Tell us about your project" }: { title?: string }) {
  return (
    <section className="section contact-form">
      <Reveal text={title} className="display lg" />
      {/* shortcut: mailto opens the visitor's mail app; swap for a form service or API route before launch */}
      <form action={`mailto:${agency.email}`} method="post" encType="text/plain" className="form">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="full">
          Project details
          <textarea name="message" rows={4} required />
        </label>
        <button type="submit" className="btn btn-peach btn-big">
          Send request
        </button>
      </form>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Marquee items={[agency.name, agency.name, agency.name]} className="footer-marquee" />
      <div className="footer-cols">
        <nav>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div>
          <a href={`mailto:${agency.email}`}>{agency.email}</a>
          <a href={`tel:${agency.phone.replace(/\s/g, "")}`}>{agency.phone}</a>
        </div>
        <div>
          {agency.socials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {agency.year} {agency.name}
        </span>
        <Link href="/privacy-policy">Privacy policy</Link>
      </div>
    </footer>
  );
}
