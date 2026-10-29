import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section hero">
      <div>
        <h1 className="display xxl" style={{ color: "var(--orange)" }}>
          404
        </h1>
        <p className="hero-sub">This page wandered off.</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn btn-orange btn-big">
            Back home
          </Link>
        </p>
      </div>
    </section>
  );
}
