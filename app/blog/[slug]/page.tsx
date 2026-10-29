import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { FadeUp } from "@/components/motion";
import { Cta, PageHero } from "@/components/sections";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: posts.find((p) => p.slug === slug)?.title };
}

export default async function Post(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const post = posts[i];
  const next = posts[(i + 1) % posts.length];

  return (
    <>
      <PageHero kicker={`${post.category} · ${post.date}`} title={post.title} waveColor="var(--paper)" />
      <section className="section">
        <FadeUp className="prose post-body">
          <p>Placeholder article body. Replace with your post content, or connect a CMS or MDX files.</p>
          <h2>A placeholder subheading</h2>
          <p>Placeholder paragraph.</p>
          <h2>Another subheading</h2>
          <p>Placeholder paragraph.</p>
        </FadeUp>
        <Link href={`/blog/${next.slug}`} className="btn btn-orange btn-big post-next">
          Next article →
        </Link>
      </section>
      <Cta />
    </>
  );
}
