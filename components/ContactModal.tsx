"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { agency } from "@/lib/content";

/** "Let's discuss" popup. Any element with data-discuss opens it; Esc or backdrop click closes it. */
export default function ContactModal() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current!;
    const onClick = (e: MouseEvent) => {
      const opener = (e.target as HTMLElement).closest("[data-discuss]");
      if (!opener) return;
      e.preventDefault();
      dlg.showModal();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(".modal-layer", { scale: 0.6, rotate: -6 }, { scale: 1, rotate: (i) => [-3, 2, 0][i], duration: 0.6, ease: "back.out(1.6)", stagger: 0.06 });
      }
    };
    const onBackdrop = (e: MouseEvent) => e.target === dlg && dlg.close();
    document.addEventListener("click", onClick);
    dlg.addEventListener("click", onBackdrop);
    return () => {
      document.removeEventListener("click", onClick);
      dlg.removeEventListener("click", onBackdrop);
    };
  }, []);

  return (
    <dialog ref={ref} className="modal" aria-label="Start a project">
      <span className="modal-layer modal-layer-1" aria-hidden />
      <span className="modal-layer modal-layer-2" aria-hidden />
      <div className="modal-layer modal-card">
        <button className="modal-close" aria-label="Close" onClick={() => ref.current?.close()}>
          ×
        </button>
        <h2 className="display lg">Start a project</h2>
        {/* shortcut: mailto opens the visitor's mail app; swap for a form service or API route before launch */}
        <form action={`mailto:${agency.email}`} method="post" encType="text/plain" className="modal-form">
          <input name="name" placeholder="Your name" required autoComplete="name" aria-label="Your name" />
          <input name="email" type="email" placeholder="Your email" required autoComplete="email" aria-label="Your email" />
          <input name="company" placeholder="Company website" aria-label="Company website" />
          <textarea name="message" placeholder="Message" rows={4} aria-label="Message" />
          <select name="budget" required defaultValue="" aria-label="Budget">
            <option value="" disabled>
              Choose a budget
            </option>
            <option>Budget range A</option>
            <option>Budget range B</option>
            <option>Budget range C</option>
          </select>
          <select name="service" required defaultValue="" aria-label="Service">
            <option value="" disabled>
              Service you need
            </option>
            <option>Service A</option>
            <option>Service B</option>
            <option>Other</option>
          </select>
          <button type="submit" className="btn btn-orange btn-big">
            Send request
          </button>
        </form>
      </div>
    </dialog>
  );
}
