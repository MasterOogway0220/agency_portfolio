"use client";

import Link from "next/link";
import { useState } from "react";
import { posts } from "@/lib/content";

const colors = ["var(--orange)", "var(--peach)", "var(--sand)", "var(--rust)", "var(--sand)", "var(--ink-2)"];

export default function BlogList() {
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button key={c} aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="posts">
        {shown.map((p, i) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="post" data-cursor="Read">
            <div className="post-thumb" style={{ background: colors[i % colors.length] }} />
            <span className="post-meta">
              {p.category} · {p.date}
            </span>
            <h3>{p.title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
