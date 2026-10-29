"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

/** First-visit intro: counter to 100, then the panel slides up. Skipped later in the session. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ref.current, { display: "none" });
      return;
    }

    const count = { v: 0 };
    const num = ref.current!.querySelector(".preloader-count")!;
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {}
        setDone(true);
      },
    });
    tl.to(count, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => (num.textContent = String(Math.round(count.v))),
    })
      .to(".preloader-name > span", { yPercent: -110, duration: 0.5, ease: "power2.in", stagger: 0.03 }, "-=0.2")
      .to(ref.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "-=0.1")
      .to(ref.current!.querySelector(".preloader-edge"), { scaleY: 0, duration: 0.9, ease: "power3.inOut" }, "<");
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;
  return (
    <div ref={ref} className="preloader" aria-hidden>
      <p className="preloader-name">
        <span>
          <Image src="/logo.webp" alt="" width={1568} height={255} priority />
        </span>
      </p>
      <span className="preloader-count display lg">0</span>
      <span className="preloader-edge" />
    </div>
  );
}
