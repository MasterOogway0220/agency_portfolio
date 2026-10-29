import type { Metadata } from "next";
import { clients, values } from "@/lib/content";
import Slider from "@/components/Slider";
import Stats from "@/components/Stats";
import { FadeUp, Marquee, Reveal, Sticker } from "@/components/motion";
import { ContactForm, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "About us" };

const steps = [
  { title: "Discover", text: "Placeholder text about the first step of the process.", color: "var(--orange)" },
  { title: "Define", text: "Placeholder text about the second step of the process.", color: "var(--peach)" },
  { title: "Design", text: "Placeholder text about the third step of the process.", color: "var(--sand)" },
  { title: "Build", text: "Placeholder text about the fourth step of the process.", color: "var(--paper-2)" },
  { title: "Launch", text: "Placeholder text about the fifth step of the process.", color: "var(--paper)" },
];

export default function About() {
  return (
    <>
      <PageHero kicker="About us" title="Let's get to know each other" />

      <section className="section panel-sand pills-sec">
        <FadeUp className="pills">
          {values.map((v) => (
            <span key={v} className="pill">
              {v}
            </span>
          ))}
        </FadeUp>
        <Sticker text="• Placeholder • Badge • Text " center="10y" className="pills-sticker" />
      </section>

      <section className="section">
        <p className="kicker">In numbers</p>
        <Reveal text="Small team, big track record" className="display lg" />
        <Stats />
      </section>

      <section className="section stack-panel panel-ink">
        <p className="kicker">How we work</p>
        <Reveal text="Five steps, zero guesswork" className="display lg" />
        <Slider slides={steps} />
      </section>

      <section className="section panel-sand">
        <Reveal text="Trusted by" className="display lg" />
        <Marquee items={clients} />
      </section>

      <ContactForm />
    </>
  );
}
