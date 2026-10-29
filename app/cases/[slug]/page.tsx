import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/lib/content";
import { FadeUp, Parallax, Reveal } from "@/components/motion";
import { Cta, PageHero } from "@/components/sections";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: cases.find((c) => c.slug === slug)?.title };
}

export default async function CasePage(props: PageProps<"/cases/[slug]">) {
  const { slug } = await props.params;
  const i = cases.findIndex((c) => c.slug === slug);
  if (i === -1) notFound();
  const c = cases[i];
  const next = cases[(i + 1) % cases.length];

  return (
    <>
      <PageHero kicker={c.category} title={c.title} waveColor="var(--paper)" />

      <div className="case-cover">
        <Parallax speed={10}>
          <div style={{ background: c.color, height: "100%" }} />
        </Parallax>
      </div>

      <section className="section">
        <p className="kicker">About the project</p>
        <Reveal text={c.summary} className="display md" />
        <FadeUp>
          <dl className="case-facts">
            <div>
              <dt>Category</dt>
              <dd>{c.category}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{c.year}</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>{c.title}</dd>
            </div>
          </dl>
        </FadeUp>
        <FadeUp className="two-col">
          <div>
            <h3>Challenge</h3>
            <p>{c.challenge}</p>
          </div>
          <div>
            <h3>Result</h3>
            <p>{c.result}</p>
          </div>
        </FadeUp>
      </section>

      <section className="section">
        <p className="kicker">Next case</p>
        <Link href={`/cases/${next.slug}`} className="link-underline">
          <Reveal text={next.title} className="display xl" />
        </Link>
      </section>

      <Cta />
    </>
  );
}
