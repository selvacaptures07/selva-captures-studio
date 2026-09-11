import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Selva Captures Photography" },
      {
        name: "description",
        content:
          "Wedding, candid, traditional, pre-wedding and event photography plus cinematic wedding films by Selva Captures.",
      },
      { property: "og:title", content: "Photography Services — Selva Captures" },
      {
        property: "og:description",
        content: "Wedding photography, candid coverage, videography and cinematic wedding films.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-center text-xs uppercase tracking-[0.4em] text-gold">Our Services</p>
      <h1 className="mt-4 text-center font-display text-4xl text-gradient-gold sm:text-5xl">
        Photography &amp; Films
      </h1>
      <div className="mx-auto my-8 h-px w-24 bg-gold/60" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className="rounded-sm border border-border bg-card/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <h2 className="font-display text-xl text-gold">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link to="/packages" className="btn-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
          View Packages
        </Link>
      </div>
    </section>
  );
}
