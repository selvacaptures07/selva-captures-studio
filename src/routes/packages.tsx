import { createFileRoute, Link } from "@tanstack/react-router";
import { usePackages } from "@/lib/site-content";

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
  const { data: packages } = usePackages();
  return (
    <section className="section-light">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-gold-deep">Packages</p>
        <h1 className="mt-4 text-center font-display text-3xl text-gradient-gold-deep sm:text-5xl">Wedding Pricing</h1>
        <div className="mx-auto my-8 h-px w-24 bg-gold-deep/50" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.id} className="card-light flex flex-col rounded-sm p-8 text-center">
              <h2 className="font-display text-lg uppercase tracking-[0.12em] text-gold-deep">{p.name}</h2>
              <p className="mt-5 font-display text-4xl text-ink">{p.price}</p>
              {p.original_price && <p className="mt-1 text-sm text-ink-muted line-through">{p.original_price}</p>}
              <Link
                to="/contact"
                hash="enquiry"
                className="btn-outline-ink mt-7 rounded-sm px-6 py-3 text-xs uppercase tracking-[0.25em]"
              >
                Enquire Now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
