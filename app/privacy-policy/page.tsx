import type { Metadata } from "next";
import { agency } from "@/lib/content";
import { PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy policy" />
      <section className="section prose" style={{ paddingTop: 0 }}>
        <p>Placeholder privacy policy. Replace with a policy reviewed for your jurisdiction before launch.</p>
        <h2>Data we collect</h2>
        <p>Placeholder text.</p>
        <h2>Contact</h2>
        <p>Questions: {agency.email}</p>
      </section>
    </>
  );
}
