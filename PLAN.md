# Agency site: plan

An original agency site that borrows the page structure and motion style of
crency.agency. No text, images, logos, font files or code are copied from it.

## What the reference site uses (observed, 2026-10-26)

- Stack: Next.js App Router on Vercel, plain CSS files, not Tailwind.
- Motion: GSAP + ScrollTrigger, Lenis smooth scroll, Swiper for sliders.
  No WebGL/three.js and no Framer Motion in the shipped JS.
- Fonts: a tall condensed display face (Thunder, a paid font), a sans body face
  (IBM Plex Sans) and an accent face.
- Animation parameters seen in the JS bundles:
  - Eases are mostly `power2.out`, plus `none` for scrubbed/looping animations
    and `back.out(1.7–2)` for springy hovers.
  - Durations are 0.3–0.6s for UI and 1–1.5s for reveals. One 8s linear loop
    looks like a logo marquee.
  - Text reveals animate `clip-path: inset(...)` with a 0.05–0.2s stagger.
  - Parallax uses `yPercent` ±50 with `scrub: 1.2` and starts at
    `top bottom` / `top 50%`.
  - Lenis `wheelMultiplier` is set to 0.4 on some views and 1 by default.

## Pages and sections (structure only)

| Page | Sections |
|---|---|
| Home | hero, about, trust/logos marquee, 3 service cards, featured cases, view-all, CTA, contact form |
| About | hero, value pills, "we are" + outcomes, slider (Swiper), FAQ, CTA, form |
| Services | hero, service cards, CTA, FAQ, form |
| Cases | hero, case list (rows with hover preview) |
| Case detail `/cases/[slug]` | hero, about/result, FAQ, view-more, CTA, form |
| Blog | hero, filterable post list, CTA, form |
| Contact | hero + form, feedback block |
| Privacy, 404 | text pages |

Every page shares the header, the footer, the CTA block and the contact form.

## Build

1. Scaffold Next.js (App Router, TS) and add `gsap`, `lenis`, `swiper`.
   Check: `npm run build` passes.
2. Add the layout: Lenis provider, header/nav, footer, page transition.
   Check: smooth scroll works and the nav links route.
3. Write the shared pieces: `RevealText` (clip-path stagger), `Parallax`
   (scrubbed yPercent), `Marquee`, magnetic/back-out button, FAQ accordion,
   CTA block, contact form. Check: each one renders on the home page.
4. Build the pages from the table above. Cases and blog read from one
   `content.ts` file so you can edit the copy in one place.
   Check: every route builds statically.
5. Honor `prefers-reduced-motion` by turning off the reveals and parallax and
   using native scroll. Check: browser screenshots at desktop and mobile width.

## Needs from you

- Agency name, tagline, services (3), 3–6 case studies, brand colors, logo
- Fonts: free substitutes are planned. Anton or Bebas Neue for display and
  Inter or IBM Plex Sans for body. Say so if you own other licenses.
- Contact form destination (email service or just `mailto:` for now)
