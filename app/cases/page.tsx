import type { Metadata } from "next";
import { cases } from "@/lib/content";
import CaseList from "@/components/CaseList";
import { Cta, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Cases" };

export default function Cases() {
  return (
    <>
      <PageHero kicker="Cases" title="Work we're proud of" waveColor="var(--paper)" />
      <section className="section">
        <CaseList items={cases} />
      </section>
      <Cta />
    </>
  );
}
