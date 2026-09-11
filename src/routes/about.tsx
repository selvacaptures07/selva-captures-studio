import { createFileRoute, Link } from "@tanstack/react-router";
import { GALLERY } from "@/lib/photos";

const about = GALLERY[1]!;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Selva Captures Photography" },
      {
        name: "description",
        content:
          "Selva Captures is a professional photography studio capturing genuine emotions and unforgettable wedding moments.",
      },
      { property: "og:title", content: "About Selva Captures" },
      {
        property: "og:description",
        content: "A professional photography studio dedicated to beautiful celebrations and wedding moments.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="section-light">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <img
          src={about.src}
          alt={about.alt}
          width={1000}
          height={1250}
          loading="lazy"
          className="h-72 w-full rounded-sm border border-gold-deep/25 object-cover sm:h-[28rem]"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">About Us</p>
          <h1 className="mt-4 font-display text-3xl text-gradient-gold-deep sm:text-5xl">Selva Captures</h1>
          <div className="my-6 h-px w-24 bg-gold-deep/50" />
          <p className="text-base leading-relaxed text-ink">
            Selva Captures is a professional photography studio dedicated to capturing genuine emotions, beautiful
            celebrations and unforgettable wedding moments.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            From the first look to the final celebration, we work quietly alongside you — documenting each ritual, each
            smile and each detail with care, so your story stays exactly as it felt.
          </p>
          <Link
            to="/contact"
            className="btn-outline-ink mt-8 inline-block rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
