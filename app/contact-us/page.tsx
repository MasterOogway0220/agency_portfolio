import type { Metadata } from "next";
import { agency } from "@/lib/content";
import { FadeUp } from "@/components/motion";
import { ContactForm, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Contact us" };

export default function Contact() {
  return (
    <>
      <PageHero kicker="Contact" title="Say hello" waveColor="var(--paper)" />
      <section className="section">
        <FadeUp className="two-col">
          <a href={`mailto:${agency.email}`} className="display md link-underline">
            {agency.email}
          </a>
          <a href={`tel:${agency.phone.replace(/\s/g, "")}`} className="display md link-underline">
            {agency.phone}
          </a>
        </FadeUp>
      </section>
      <ContactForm title="Tell us about your project" />
    </>
  );
}
