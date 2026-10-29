import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { Cta, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Blog" };

export default function Blog() {
  return (
    <>
      <PageHero kicker="Blog" title="Notes from the studio" waveColor="var(--paper)" />
      <section className="section" style={{ paddingTop: 0 }}>
        <BlogList />
      </section>
      <Cta />
    </>
  );
}
