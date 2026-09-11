import { createFileRoute, Link } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/photos";

const g2 = PHOTOS[4];

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
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
      <img
        src={g2}
        alt="Bridal detail photographed by Selva Captures"
        width={1000}
        height={1250}
        loading="lazy"
        className="h-[28rem] w-full rounded-sm border border-border object-cover"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-gold">About Us</p>
        <h1 className="mt-4 font-display text-4xl text-gradient-gold sm:text-5xl">Selva Captures</h1>
        <div className="my-6 h-px w-24 bg-gold/60" />
        <p className="text-base leading-relaxed text-foreground/85">
          Selva Captures is a professional photography studio dedicated to capturing genuine emotions, beautiful
          celebrations and unforgettable wedding moments.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          From the first look to the final celebration, we work quietly alongside you — documenting each ritual, each
          smile and each detail with care, so your story stays exactly as it felt.
        </p>
        <Link
          to="/contact"
          className="btn-gold mt-8 inline-block rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
