"use client";

import { useState } from "react";

// Original face drawings: mouth curve differs per mood.
const moods = [
  { id: "later", label: "Option one", bg: "var(--sand)", mouth: "M30 66 Q50 56 70 66" },
  { id: "website", label: "Option two", bg: "var(--orange)", mouth: "M30 60 Q50 76 70 60" },
  { id: "audit", label: "Option three", bg: "var(--peach)", mouth: "M28 56 Q50 86 72 56 Z" },
];

/** Three-way picker that pre-selects the reason, then opens the contact popup. */
export default function MoodPicker() {
  const [mood, setMood] = useState("website");

  return (
    <form className="mood" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend className="kicker">What do you want to do?</legend>
        <div className="mood-options">
          {moods.map((m) => (
            <label key={m.id} className={`mood-option ${mood === m.id ? "is-on" : ""}`} style={{ background: m.bg }}>
              <input
                type="radio"
                name="mood"
                value={m.id}
                checked={mood === m.id}
                onChange={() => setMood(m.id)}
                className="sr-only"
              />
              <svg viewBox="0 0 100 100" aria-hidden>
                <circle cx="36" cy="40" r="6" fill="var(--ink)" />
                <circle cx="64" cy="40" r="6" fill="var(--ink)" />
                <path d={m.mouth} fill={m.mouth.endsWith("Z") ? "var(--ink)" : "none"} stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <span className="mood-label">{m.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="button" className="btn btn-orange btn-big" data-discuss>
        Let&apos;s talk →
      </button>
    </form>
  );
}
