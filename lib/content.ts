// Placeholder content. Replace with your agency's real copy.

export const agency = {
  name: "museone",
  tagline: "Digital products with character",
  email: "hello@example.com",
  phone: "+00 000 000 000",
  year: "2026", // footer copyright; static so pages prerender
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
  ],
};

export const nav = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
];

export const services = [
  {
    title: "Brand identity",
    text: "Placeholder description of the service. Positioning, naming, logo systems and guidelines.",
    tags: ["Strategy", "Logo", "Guidelines"],
  },
  {
    title: "Web design",
    text: "Placeholder description of the service. Websites and product interfaces built around your goals.",
    tags: ["UX", "UI", "Prototyping"],
  },
  {
    title: "Development",
    text: "Placeholder description of the service. Fast, accessible builds with motion that feels alive.",
    tags: ["Next.js", "CMS", "Animation"],
  },
];

export const clients = ["Client One", "Client Two", "Client Three", "Client Four", "Client Five", "Client Six"];

export type Case = {
  slug: string;
  title: string;
  category: string;
  year: string;
  color: string;
  summary: string;
  challenge: string;
  result: string;
};

const caseColors = ["var(--orange)", "var(--peach)", "var(--sand)", "var(--paper-2)", "var(--peach)", "var(--sand)"];

export const cases: Case[] = Array.from({ length: 6 }, (_, i) => ({
  slug: `project-${i + 1}`,
  title: `Project ${i + 1}`,
  category: ["Branding", "Website", "E-commerce", "Product"][i % 4],
  year: String(2026 - (i % 3)),
  color: caseColors[i % caseColors.length],
  summary: "Placeholder summary of the project and what was delivered.",
  challenge: "Placeholder text describing the client's challenge and the starting point of the project.",
  result: "Placeholder text describing the outcome, the numbers that moved and what the client said.",
}));

export const posts = Array.from({ length: 6 }, (_, i) => ({
  slug: `post-${i + 1}`,
  title: `Placeholder article title number ${i + 1}`,
  category: ["Design", "Development", "Business"][i % 3],
  date: `2026-0${(i % 9) + 1}-12`,
}));

export const faq = [
  { q: "How long does a project take?", a: "Placeholder answer. Most projects take between four and twelve weeks." },
  { q: "How much does it cost?", a: "Placeholder answer. Pricing depends on scope; we send a fixed quote after a call." },
  { q: "Do you work with startups?", a: "Placeholder answer. Yes, from first idea to scaling teams." },
  { q: "What happens after launch?", a: "Placeholder answer. We offer support and iteration packages." },
];

export const values = ["Curious", "Honest", "Fast", "Bold", "Detail-driven", "Friendly"];
