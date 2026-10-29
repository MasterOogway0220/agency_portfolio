import type { Metadata } from "next";
import { services } from "@/lib/content";
import { FadeUp, Parallax, Reveal } from "@/components/motion";
import { ContactForm, Faq, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Services" };

const panels = ["panel-orange", "panel-peach", "panel-sand"];
const blobs = ["var(--peach)", "var(--orange)", "var(--ink-2)"];

export default function Services() {
  return (
    <>
      <PageHero kicker="Services" title="What we can do for you" waveColor="var(--orange)" />

      {services.map((s, i) => (
        <section key={s.title} className={`section stack-panel service-panel ${panels[i % panels.length]}`}>
          <Parallax speed={25} className="service-blob">
            <span style={{ background: blobs[i % blobs.length] }} />
          </Parallax>
          <p className="kicker">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</p>
          <Reveal text={s.title} className="display xl" />
          <FadeUp className="two-col">
            <p>{s.text}</p>
            <ul className="tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </FadeUp>
          <button className="btn btn-ink btn-big" data-discuss>
            Talk about {s.title.toLowerCase()}
          </button>
        </section>
      ))}

      <Faq />
      <ContactForm />
    </>
  );
}
