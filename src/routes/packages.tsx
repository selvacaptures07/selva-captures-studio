import { createFileRoute, Link } from "@tanstack/react-router";
import { PACKAGES } from "@/lib/site-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — Selva Captures" },
      {
        name: "description",
        content: "Simple wedding photography packages from ₹39,999 to ₹90,000 by Selva Captures.",
      },
      { property: "og:title", content: "Wedding Packages — Selva Captures" },
      { property: "og:description", content: "Transparent wedding photography packages and pricing." },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-center text-xs uppercase tracking-[0.4em] text-gold">Packages</p>
      <h1 className="mt-4 text-center font-display text-4xl text-gradient-gold sm:text-5xl">Wedding Pricing</h1>
      <div className="mx-auto my-8 h-px w-24 bg-gold/60" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-sm border border-border bg-card/50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.12em] text-gold">{p.name}</h2>
            <p className="mt-5 font-display text-4xl text-foreground">{p.price}</p>
            {p.original && (
              <p className="mt-1 text-sm text-muted-foreground line-through">{p.original}</p>
            )}
            <Link
              to="/contact"
              hash="enquiry"
              className="btn-outline-gold mt-7 rounded-sm px-6 py-3 text-xs uppercase tracking-[0.25em]"
            >
              Enquire Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
